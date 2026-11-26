import { notFound } from "next/navigation";
import EvLibraryNav from "../../ev-library-nav";
import styles from "../learning.module.css";
import { chargingTopics } from "../topics.mjs";

export const dynamicParams = false;
export function generateStaticParams() { return chargingTopics.map(({slug})=>({topic:slug})); }
const getTopic = (slug) => chargingTopics.find(item => item.slug === slug);

export async function generateMetadata({params}) {
  const item = getTopic((await params).topic);
  return item ? { title:item.title, description:item.summary, alternates:{canonical:"/chargers/"+item.slug} } : {};
}
export default async function ChargingArticle({params}) {
  const item=getTopic((await params).topic);
  if(!item) notFound();
  const other=chargingTopics.filter(x=>x!==item);
  return <><EvLibraryNav current="/chargers"/><main className={styles.learning}>
    <header className="guide-mast"><p className="learning-label">EV Library / Charging 101 / {item.code}</p><h1 className={styles.articleTitle}>{item.title}</h1><p>{item.summary}</p><nav aria-label="Article shortcuts"><a href="/chargers">All charging guides</a><a href="#checklist">Quick checklist</a><a href="#sources">Sources</a></nav></header>
    <div className={styles.articleLayout}>
      <div>{item.sections.map(([heading, paragraphs])=><section className="guide-section" key={heading}><h2>{heading}</h2>{paragraphs.map(t=><p key={t}>{t}</p>)}</section>)}</div>
      <aside className={styles.actionCard} id="checklist"><p className="learning-label">Save for later</p><h2>Quick checklist</h2><ol>{item.checklist.map(t=><li key={t}>{t}</li>)}</ol><a href="/tools">Open the charging calculator</a></aside>
    </div>
    <section className="guide-section" id="sources"><p className="learning-label">Reference notes / Checked November 25, 2026</p><h2>Sources and further reading</h2><ul className={styles.sourceList}>{item.sources.map(([name,url])=><li key={url}><a href={url} rel="noreferrer">{name}</a></li>)}</ul></section>
    <section className="guide-section"><p className="learning-label">Keep learning</p><h2>More charging guides</h2><ul className={styles.topicGrid}>{other.map(t=><li key={t.slug}><a href={"/chargers/"+t.slug}>{t.title}</a><p>{t.summary}</p></li>)}</ul></section>
  </main></>;
}
