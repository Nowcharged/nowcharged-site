import styles from '../faq/support.module.css';

export const metadata = {title:'Vehicle handoff', alternates: { canonical: "/trust" } };
const steps=[
 ['Before pickup','Agree on the details','Confirm the pickup spot, who will hand over the keys and where the vehicle should be returned. For EV valet, review the service agreement before your first trip. Ask about vehicle handling and coverage before deciding to book.'],
 ['At pickup','Document the vehicle’s condition','We document vehicle condition with photos at pickup and return. Flag any existing damage, relevant access rules or driving instructions beforehand.'],
 ['During service','Know who does what','For charging valet, our driver supervises the charging session. For dealership valet, the dealership handles service work; NowCharged handles transport.'],
 ['On return','Close the loop','We return your vehicle and keys as arranged. If your dealership’s timeline changes, confirm the updated return plan before assuming a new time.'],
];
export default function Trust(){return <main data-field-page="trust" className={styles.shell} id="main-content"><header className={styles.intro+" field-support-intro"}><p className={styles.kicker+" field-support-kicker"}>Vehicle handoff / 02</p><h1>Know the plan before you hand over the keys.</h1><p>Your pickup, key handoff and return should never be a guessing game.</p></header><ol className={styles.timeline+" field-support-timeline"}>{steps.map(([when,title,desc],i)=><li key={when}><span className={styles.stepNumber+" field-support-stepNumber"}>0{i+1}</span><div><p className={styles.kicker+" field-support-kicker"}>{when}</p><h2>{title}</h2><p>{desc}</p></div></li>)}</ol><section className={styles.band+" field-support-band"}><h2>Review your next step</h2><div className={styles.actions}><a href="/request?service=ev">EV charging request →</a><a href="/services/dealership-pickup">Learn about dealership pickup →</a></div></section></main>}
