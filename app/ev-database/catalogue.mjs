export const PAGE_SIZE=12;
export const PATH='/ev-database';
export const SOURCES={
  catalogue:'https://open.canada.ca/data/en/dataset/98f1a129-f628-4ce4-b24d-6f16bf24dd64/resource/026e45b4-eb63-451f-b34f-d9308ea3a3d9',
  csv:'https://open.canada.ca/data/dataset/98f1a129-f628-4ce4-b24d-6f16bf24dd64/resource/026e45b4-eb63-451f-b34f-d9308ea3a3d9/download/my2012-2026-battery-electric-vehicles.csv',
  guide:'https://natural-resources.canada.ca/energy-efficiency/transportation-energy-efficiency/fuel-consumption-guide',
  label:'https://natural-resources.canada.ca/energy-efficiency/product-energy-ratings/energuide/energuide-label-battery-electric-vehicles',
  licence:'https://open.canada.ca/en/open-government-licence-canada',
};
export function toVehicle([id,year,make,model,body,city,highway,combined,range,recharge]){
  return {id,year,make,model,body,city,highway,combined,range,recharge};
}
const sortNames={recent:'Newest model year',range:'Longest rated range',efficiency:'Lowest energy use',recharge:'Shortest 240 V recharge'};
export const SORTS=Object.entries(sortNames);
const str=v=>typeof v==='string'?v.trim().slice(0,140):'';
// Normalize punctuation and letter/number joins (ID.4, ID4; IONIQ 5, IONIQ5).
const tokens=v=>v.toLowerCase().normalize('NFKD').replace(/\p{M}/gu,'')
  .replace(/([a-z])(?=\d)/g,'$1 ').replace(/(\d)(?=[a-z])/g,'$1 ')
  .replace(/[^a-z0-9+]+/g,' ').trim().split(/\s+/).filter(Boolean);
const yearToken=/^(?:19|20)\d{2}$/;
function containsPhrase(haystack,needle){
  return needle.length===0||haystack.some((_,start)=>needle.every((word,i)=>{
    const value=haystack[start+i];
    // Autocomplete only a trailing plain word, not model numbers or trim markers.
    return value===word||(i===needle.length-1&&/^[a-z]{3,}$/.test(word)&&value?.startsWith(word));
  }));
}
const drivetrains=new Set(['awd','fwd','rwd','4wd','4x4']);
function modelMatches(model,words){
  if(containsPhrase(model,words))return true;
  const suffix=words.at(-1), phrase=words.slice(0,-1);
  if(!phrase.length||!drivetrains.has(suffix))return false;
  return model.some((_,start)=>phrase.every((word,i)=>model[start+i]===word)
    &&model.slice(start+phrase.length).includes(suffix));
}
function rowMatches(entry,words,year){
  if(year && entry.year!==year)return false;
  if(!words.length)return true;
  if(entry.make.every((word,i)=>word===words[i]))return modelMatches(entry.model,words.slice(entry.make.length));
  return modelMatches(entry.model,words)||
    (words.length<=entry.make.length&&containsPhrase(entry.make,words));
}
const alpha=(a,b)=>a.make.localeCompare(b.make,'en-CA')||a.model.localeCompare(b.model,'en-CA')||a.id.localeCompare(b.id);
export function buildCatalogue(records){
  const rows=records.map(toVehicle), unique=(k)=>[...new Set(rows.map(r=>r[k]))];
  const searchById=new Map(rows.map(r=>[r.id,{year:String(r.year),make:tokens(r.make),model:tokens(r.model)}]));
  return {rows, searchById, byId:new Map(rows.map(r=>[r.id,r])),years:unique('year').sort((a,b)=>b-a),makes:unique('make').sort((a,b)=>a.localeCompare(b,'en-CA')),classes:unique('body').sort()};
}
export function readState(params={},catalogue) {
  const q=str(params.q), year=str(params.year), make=str(params.make), body=str(params.class),range=str(params.range),sort=str(params.sort);
  const selected=[...new Set((typeof params.compare==='string'?params.compare:'').slice(0,700).split(',').filter(id=>catalogue.byId.has(id)))].slice(0,3);
  return {q,year:catalogue.years.map(String).includes(year)?year:'',make:catalogue.makes.includes(make)?make:'',class:catalogue.classes.includes(body)?body:'',
    range:['200','300','400','500','600'].includes(range)?range:'',sort:Object.hasOwn(sortNames,sort)?sort:'recent',
    page:/^[1-9]\d{0,4}$/.test(str(params.page))?Number(str(params.page)):1,compare:selected};
}
export function href(state,overrides={},fragment=''){
  const s={...state,...overrides}, p=new URLSearchParams();
  for(const k of ['q','year','make','class','range','sort','page','compare']){
    const v=k==='compare'?(s.compare??[]).join(','):s[k];
    if(v && !(k==='sort'&&v==='recent') && !(k==='page'&&Number(v)===1))p.set(k,String(v));
  }
  return PATH+(p.size?'?'+p.toString():'')+(fragment?'#'+fragment:'');
}
export function searchCatalogue(catalogue,s){
  const parts=tokens(s.q), years=[...new Set(parts.filter(w=>yearToken.test(w)))], words=parts.filter(w=>!yearToken.test(w));
  if(words[0]==='vw')words[0]='volkswagen';
  const matches=catalogue.rows.filter(r=>(!s.year||String(r.year)===s.year)&&(!s.make||r.make===s.make)&&(!s.class||r.body===s.class)&&(!s.range||r.range>=Number(s.range))&&
    (years.length<2&&rowMatches(catalogue.searchById.get(r.id),words,years[0])));
  matches.sort((a,b)=>(s.sort==='range'?b.range-a.range:s.sort==='efficiency'?a.combined-b.combined:s.sort==='recharge'?a.recharge-b.recharge:0)||b.year-a.year||alpha(a,b));
  const pages=Math.max(1,Math.ceil(matches.length/PAGE_SIZE)),page=Math.min(s.page,pages);
  return {matches:matches.length,pages,page,rows:matches.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE)};
}
