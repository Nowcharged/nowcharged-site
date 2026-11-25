import EvLibraryNav from '../ev-library-nav';
import { isLiveHost } from '../release';
import data from './ratings.json';
import FilterForm from './filter-form';
import { buildCatalogue, readState, searchCatalogue, href, PATH, SOURCES, PAGE_SIZE } from './catalogue.mjs';
import styles from './database.module.css';

const catalogue=buildCatalogue(data);
const format=n=>n.toLocaleString('en-CA');
const TITLE='Canadian EV Database: Range, Efficiency & Recharge Time';
const DESCRIPTION='Search 1,250 Canadian battery-electric vehicle ratings by year, make and configuration. Compare official range, electricity use and estimated 240 V recharge time.';
export async function generateMetadata({searchParams}){
  const query=await searchParams;
  const filtered=Object.keys(query??{}).length>0;
  const live=await isLiveHost();
  return {title:TITLE,description:DESCRIPTION,alternates:{canonical:PATH},robots:{index:live&&!filtered,follow:live},
    openGraph:{title:TITLE,description:DESCRIPTION,url:PATH,type:'website'}};
}
const metrics=[['range','Rated range','km'],['combined','Combined energy use','kWh/100 km'],['city','City energy use','kWh/100 km'],['highway','Highway energy use','kWh/100 km'],['recharge','240 V full recharge','h']];
const name=r=>`${r.year} ${r.make} ${r.model}`;

function Comparison({state,items}){
  if(!items.length)return null;
  return <section className={styles.compare} id="compare" aria-labelledby="compare-heading">
    <div className={styles.bar}><div><span className={styles.stamp}>Comparison bench · {items.length}/3</span><h2 id="compare-heading">Side by side</h2></div>
      <a href={href(state,{compare:[]},'results')}>Clear comparison</a></div>
    <div className={styles.tableScroll} role="region" tabIndex={0} aria-label="Comparison of selected vehicles">
      <table><caption className={styles.sr}>Official Canadian battery-electric vehicle ratings</caption>
        <thead><tr><th scope="col">Measurement</th>{items.map(r=><th key={r.id} scope="col">{name(r)}</th>)}</tr></thead>
        <tbody>{metrics.map(([key,label,unit])=><tr key={key}><th scope="row">{label}</th>{items.map(r=><td key={r.id}>{format(r[key])} {unit}</td>)}</tr>)}
          <tr><th scope="row">Selection</th>{items.map(r=><td key={r.id}><a href={href(state,{compare:state.compare.filter(v=>v!==r.id)},items.length>1?'compare':'results')} aria-label={`Remove ${name(r)} from comparison`}>Remove</a></td>)}</tr></tbody>
      </table>
    </div>
    <p>Copy this page’s address to share the comparison. On a narrow screen, scroll the table sideways.</p>
  </section>;
}

function Result({r,state}){
  const selected=state.compare.includes(r.id), full=state.compare.length===3&&!selected;
  return <article className={styles.card}>
    <div className={styles.cardTop}><span>{r.year}</span><span>{r.body}</span></div>
    <h3><small>{r.make}</small>{r.model}</h3>
    <dl><div><dt>Rated range</dt><dd>{format(r.range)} <small>km</small></dd></div><div><dt>Combined</dt><dd>{format(r.combined)} <small>kWh/100 km</small></dd></div><div><dt>240 V recharge</dt><dd>{format(r.recharge)} <small>h</small></dd></div></dl>
    <details><summary>City and highway ratings</summary><p>City: <b>{format(r.city)}</b> kWh/100 km<br/>Highway: <b>{format(r.highway)}</b> kWh/100 km</p></details>
    {full?<span className={styles.limit}>Remove a vehicle above to compare another.</span>:<a rel="nofollow" className={styles.add} href={href(state,{compare:selected?state.compare.filter(v=>v!==r.id):[...state.compare,r.id]},selected?'results':'compare')} aria-label={selected?`Remove ${name(r)} from comparison`:`Compare ${name(r)}`}>{selected?'Remove from comparison':'Add to comparison'}</a>}
  </article>;
}

export default async function DatabasePage({searchParams}){
 const state=readState(await searchParams,catalogue);
 const result=searchCatalogue(catalogue,state),selected=state.compare.map(id=>catalogue.byId.get(id));
 const clear=href({compare:state.compare},{},'search');
 const low=(result.page-1)*PAGE_SIZE+1,high=Math.min(result.page*PAGE_SIZE,result.matches);
 return <><EvLibraryNav current={PATH}/><main className={styles.database} id="ev-database">
   <header className={styles.intro}><div><span className={styles.stamp}>Field library / Canadian ratings</span><h1>EV database<span>.</span></h1>
    <p>Find the exact model year and configuration you’re considering. Compare how far it is rated to go, how much electricity it uses, and how long a full recharge takes at 240 volts.</p></div>
    <aside className={styles.counter} aria-label="Database coverage"><span>CATALOGUE / CA</span><strong>{format(catalogue.rows.length)}</strong><span>rated configurations<br/>{catalogue.years.at(-1)}–{catalogue.years[0]} model years</span></aside>
   </header>
   <section id="search" className={styles.panel} aria-labelledby="search-heading"><h2 id="search-heading">Search the ratings</h2>
     <FilterForm state={state} years={catalogue.years} makes={catalogue.makes} classes={catalogue.classes} clearURL={clear}/>
   </section>
   <Comparison state={state} items={selected}/>
   <section id="results" aria-labelledby="results-heading">
     <div className={styles.bar}><div><span className={styles.stamp}>Results / Canada</span><h2 id="results-heading">{format(result.matches)} {result.matches===1?'match':'matches'}</h2></div>
     <p>{result.matches?`Showing ${format(low)}–${format(high)}. Compare up to three.`:'No configuration matches these filters.'}</p></div>
     {!result.matches?<div className={styles.empty}><strong>No exact match here.</strong><p>Try the model name without the trim, broaden the model year or clear your filters. This edition covers battery-electric vehicles only.</p><a href={clear}>Reset the search</a></div>:
     <div className={styles.grid}>{result.rows.map(r=><Result key={r.id} r={r} state={state}/>)}</div>}
     {result.pages>1&&<nav className={styles.pages} aria-label="Results pages">
       {result.page>1?<a rel="prev" href={href(state,{page:result.page-1},'results')}>Previous</a>:<span/>}
       <span>Page {result.page} of {result.pages}</span>
       {result.page<result.pages?<a rel="next" href={href(state,{page:result.page+1},'results')}>Next page</a>:<span/>}
     </nav>}
   </section>
   <section className={styles.notes} id="rating-notes"><div><span className={styles.stamp}>How to read a rating</span><h2>Compare like with like.</h2></div>
   <div><p><b>Range is an estimate.</b> It is the official distance on a full charge under standard test conditions, not a promise for a cold highway drive or a used battery.</p>
   <p><b>Lower kWh/100 km means less electricity for the same distance.</b> The combined rating reflects 55% city and 45% highway driving. Compare equivalent trims: wheel size, battery options and drivetrain can change the numbers.</p>
   <p><b>Recharge time is not fast-charge time.</b> NRCan’s figure estimates a full recharge at 240 V. It is not a 10–80% DC benchmark, and it does not identify which plug your car uses. See <a href="/chargers">Charging 101</a> for connector and speed guidance.</p></div></section>
   <footer className={styles.provenance}><h2>Source and coverage</h2><p>Source: Natural Resources Canada, <a href={SOURCES.catalogue}>Battery-electric vehicles 2012–2026</a>, published data snapshot September 29, 2026. This catalogue contains Canadian BEV ratings, not plug-in hybrids, new-car inventory, prices, battery health or compatibility claims. A missing configuration means it is not in this snapshot.</p>
   <p>Contains information licensed under the <a href={SOURCES.licence}>Open Government Licence – Canada</a>. Independent presentation; no government endorsement is implied.</p>
   <div><a href={SOURCES.csv}>Download the official English CSV</a><a href={SOURCES.label}>Understand the EnerGuide label</a><a href={SOURCES.guide}>Check for newer ratings</a></div>
   </footer>
 </main></>;
}
