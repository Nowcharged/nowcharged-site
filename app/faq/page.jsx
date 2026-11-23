import styles from './support.module.css';

export const metadata = {title:'Frequently asked questions'};
const groups=[
  {id:'basics', title:'Before you request', items:[
    ['What does NowCharged do?', 'We drive your car on a planned round trip. Choose EV charging at a public DC fast charger, or pickup and return for servicing at a dealership you choose.'],
    ['Where is the service available?', 'NowCharged serves Toronto and the Greater Toronto Area. Pickup location, destination and availability are confirmed before you book.'],
    ['Is a callback request a booking?', 'No. A callback lets you confirm details and price before you decide to book. This preview does not send any requests.'],
    ['Can I use this for a breakdown?', 'No. This is planned vehicle valet, not towing, roadside assistance or emergency charging.'],
  ]},
  {id:'ev', title:'EV charging valet', items:[
    ['Do you bring a charger to me?', 'No. A driver takes your EV to a compatible public DC fast charger, supervises the session and returns it to your agreed parking spot.'],
    ['What is included in the EV valet fee?', 'Scheduled charging is $50 per visit and priority is $75 per visit when available. Monthly pricing is custom. Electricity is charged separately at cost; HST and applicable parking, tolls or special access fees are extra.'],
    ['What if I cancel or the charger is unavailable?', 'More than two hours before pickup, cancellation is free. Within two hours, a small driver-time fee may apply. If a charger issue prevents completion, we discuss next steps by phone and do not charge the full valet fee for an incomplete service.'],
    ['How do I pay for EV valet?', 'After a completed service, we send an invoice. Payment is by e-transfer or cash.'],
  ]},
  {id:'dealer', title:'Dealership pickup and return', items:[
    ['Do I choose the dealership?', 'Yes. We pick up your vehicle, take it to the dealership you choose and retrieve and return it when the servicing is complete.'],
    ['Who does and bills for the work?', 'The dealership handles and bills for servicing. NowCharged’s separate $80 CAD per hour rate covers the dealership transport service, not repairs, diagnostics or parts.'],
    ['Do I need to hand over my keys in person?', 'We confirm the key handoff before you book. Depending on your building and preferences, it may be in person, through your concierge or via a lockbox you control.'],
  ]},
];
export default function FAQ(){return <main className={styles.shell} id="main-content"><header className={styles.intro}><p className={styles.kicker}>Customer desk / 01</p><h1>Questions before the keys change hands?</h1><p>Here’s what to know about your pickup, the trip and the return.</p></header><div className={styles.indexLayout}><nav aria-label="FAQ topics" className={styles.index}><p className={styles.kicker}>Jump to</p>{groups.map((g,i)=><a href={'#'+g.id} key={g.id}><span>0{i+1}</span>{g.title}</a>)}<a href="/pricing"><span>↗</span> Compare pricing</a></nav><div>{groups.map((g,i)=><section id={g.id} className={styles.faqGroup} key={g.id}><p className={styles.kicker}>0{i+1}</p><h2>{g.title}</h2>{g.items.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>)}</div></div></main>}
