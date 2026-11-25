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
const tokens=v=>v.toLowerCase().normalize('NFKD').replace(/[^a-z0-9+]+/g,' ').trim().split(/\s+/).filter(Boolean);
const alpha=(a,b)=>a.make.localeCompare(b.make,'en-CA')||a.model.localeCompare(b.model,'en-CA')||a.id.localeCompare(b.id);
export function buildCatalogue(records){
  const rows=records.map(toVehicle), unique=(k)=>[...new Set(rows.map(r=>r[k]))];
  return {rows, byId:new Map(rows.map(r=>[r.id,r])),years:unique('year').sort((a,b)=>b-a),makes:unique('make').sort((a,b)=>a.localeCompare(b,'en-CA')),classes:unique('body').sort()};
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
  const parts=tokens(s.q);
  const matches=catalogue.rows.filter(r=>(!s.year||String(r.year)===s.year)&&(!s.make||r.make===s.make)&&(!s.class||r.body===s.class)&&(!s.range||r.range>=Number(s.range))&&
    (!parts.length||parts.every(t=>tokens(r.year+' '+r.make+' '+r.model+' '+r.body).some(word=>word.includes(t)))));
  matches.sort((a,b)=>(s.sort==='range'?b.range-a.range:s.sort==='efficiency'?a.combined-b.combined:s.sort==='recharge'?a.recharge-b.recharge:0)||b.year-a.year||alpha(a,b));
  const pages=Math.max(1,Math.ceil(matches.length/PAGE_SIZE)),page=Math.min(s.page,pages);
  return {matches:matches.length,pages,page,rows:matches.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE)};
}
