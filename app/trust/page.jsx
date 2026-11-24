import styles from '../faq/support.module.css';
import { isLiveHost } from '../release';

export const metadata = {title:'EV Valet Vehicle & Key Handoff', description:'See what happens when NowCharged collects your keys, documents your vehicle, supervises charging and returns your EV.', alternates: { canonical: "/trust" } };
const steps=[
 ['Before pickup','Agree on the details','Confirm the pickup spot, who will hand over the keys and where the vehicle should be returned. For EV valet, review the service agreement before your first trip. Ask about vehicle handling and coverage before deciding to book.'],
 ['At pickup','Document the vehicle’s condition','We document vehicle condition with photos at pickup and return. Flag any existing damage, relevant access rules or driving instructions beforehand.'],
 ['During charging','Know who’s with your car','The valet driver supervises the session. If the original fast charger is down, we follow the backup and return plan described in our FAQ.'],
 ['On return','Close the loop','The driver returns your EV and keys to the agreed spot and lets you know how much charge was added.'],
];
export default async function Trust(){const live = await isLiveHost();return <main data-field-page="trust" className={styles.shell} id="main-content"><header className={styles.intro+" field-support-intro"}><p className={styles.kicker+" field-support-kicker"}>Vehicle handoff / 02</p><h1>How we handle your EV</h1><p>Here’s what to expect at pickup, during charging and when your keys come back.</p></header><ol className={styles.timeline+" field-support-timeline"}>{steps.map(([when,title,desc],i)=><li key={when}><span className={styles.stepNumber+" field-support-stepNumber"}>0{i+1}</span><div><p className={styles.kicker+" field-support-kicker"}>{when}</p><h2>{title}</h2><p>{desc}</p></div></li>)}</ol><section className={styles.band+" field-support-band"}><h2>Before you request a callback</h2><div className={styles.actions}><a href="/faq#ev">Read the EV valet FAQ</a><a href="/request?service=ev">{live ? "Request an EV callback" : "Preview an EV callback"}</a></div></section></main>}
