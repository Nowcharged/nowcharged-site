'use client';
import Form from 'next/form';
import { useState } from 'react';
import { SORTS,PATH } from './catalogue.mjs';
import styles from './database.module.css';

export default function FilterForm({state,years,makes,classes,clearURL}){
  // next/form preserves a plain GET form when JavaScript is unavailable.
  const [advanced,setAdvanced]=useState(Boolean(state.class || state.range || state.sort !== SORTS[0][0]));
  const options=values=>values.map(v=><option key={v} value={v}>{v}</option>);
  return <Form action={PATH} className={styles.search} scroll={false}>
    <label className={styles.query}><span>Find a vehicle</span><input type="search" name="q" defaultValue={state.q} maxLength={140} placeholder="Try IONIQ 5, Mach-E or LEAF" /></label>
    <div className={styles.facets}>
      <label><span>Model year</span><select name="year" defaultValue={state.year}><option value="">All years</option>{options(years)}</select></label>
      <label><span>Make</span><select name="make" defaultValue={state.make}><option value="">All makes</option>{options(makes)}</select></label>
    </div>
    <details className={styles.advanced} open={advanced} onToggle={e=>setAdvanced(e.currentTarget.open)}>
      <summary>More filters</summary>
      <div className={styles.advancedFields}><label><span>Vehicle class</span><select name="class" defaultValue={state.class}><option value="">All classes</option>{options(classes)}</select></label>
      <label><span>Rated range</span><select name="range" defaultValue={state.range}><option value="">Any distance</option>{[200,300,400,500,600].map(n=><option key={n} value={n}>At least {n} km</option>)}</select></label>
      <label><span>Sort by</span><select name="sort" defaultValue={state.sort}>{SORTS.map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
      </div>
    </details>
    {state.compare.length>0&&<input type="hidden" name="compare" value={state.compare.join(',')}/>}
    <div className={styles.actions}><button type="submit">Search vehicles</button>{(state.q || state.year || state.make || state.class || state.range || state.sort !== SORTS[0][0]) && <a href={clearURL}>Clear filters</a>}</div>
  </Form>;
}
