"use client";
import { useState } from "react";
import styles from "./learning.module.css";

function searchable(value) { return value.normalize("NFKD").toLowerCase().replace(/[^a-z0-9 ]/g," "); }
export default function TopicFinder({ topics }) {
  const [query,setQuery]=useState("");
  const terms=searchable(query).trim().split(/\s+/).filter(Boolean);
  const matches=topics.filter(t=>terms.every(term=>searchable([t.title,t.summary,t.tags].join(" ")).includes(term)));
  return <>
    <div className={styles.topicSearch}><label htmlFor="charging-topics">Search charging guides</label><input id="charging-topics" type="search" maxLength={100} placeholder="Try adapters, charging cost or offline" value={query} onChange={e=>setQuery(e.target.value)}/></div>
    <p role="status" aria-live="polite">{matches.length ? `${matches.length} ${matches.length === 1 ? "guide" : "guides"}` : "No matches. Try one term, such as adapter or cost."}</p>
    <ul className={styles.topicGrid}>{matches.map(t=><li key={t.slug}><span className="learning-label">{t.code}</span><a href={"/chargers/"+t.slug}>{t.title}</a><p>{t.summary}</p></li>)}</ul>
  </>;
}
