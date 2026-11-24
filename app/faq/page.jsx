import { isLiveHost } from '../release';
import styles from './support.module.css';

export const metadata = {title:'Frequently asked questions', alternates: { canonical: "/faq" } };
const groups=[
  {id:'basics', title:'Before you request', items:[
    ['What does NowCharged do?', 'We drive your car on a planned round trip. Choose EV charging at a public DC fast charger, or pickup and return for servicing at a dealership you choose.'],
    ['Where is the service available?', 'NowCharged serves Toronto and the Greater Toronto Area. Pickup location, destination and availability are confirmed before you book.'],
    ['Is a callback request a booking?', 'No. An EV callback lets you confirm details and price before you decide to book.'],
    ['Can I use this for a breakdown?', 'No. This is planned vehicle valet, not towing, roadside assistance or emergency charging.'],
  ]},
  {id:'ev', title:'EV charging valet', items:[
    ['Do you bring a charger to me?', 'No. A driver takes your EV to a compatible public DC fast charger, supervises the session and returns it to your agreed parking spot.'],
    ['What is included in the EV valet fee?', 'Scheduled charging is $50 per visit and priority is $75 per visit when available. Monthly pricing is custom. Electricity is charged separately at cost; HST and applicable parking, tolls or special access fees are extra.'],
    ['What if I cancel?', 'More than two hours before pickup, cancellation is free. Within two hours, a small driver-time fee may apply.'],
    ['What if the charger is out of service?', 'We check for a compatible backup before pickup. If the first charger is down, we’ll try that backup only if there’s enough range to get your car back safely and on time. If fast charging isn’t available, we’ll call to offer a slower top-up, if available, and quote a reduced price before plugging in. We’ll only go ahead if you agree. A slower top-up is capped at 60 minutes plugged in, or less if needed to meet your return time. We can’t guarantee a battery percentage. If we can’t reach you, we’ll bring your car back rather than switch to slower charging. If the outage prevents us from charging your car, there’s no service fee.'],
    ['How do I pay for EV valet?', 'After a completed service, we send an invoice. Payment is by e-transfer or cash.'],
  ]},
  {id:'dealer', title:'Dealership pickup and return', items:[
    ['Can I book dealership pickup now?', 'No. We’re not taking dealership bookings yet. The callback form is for EV charging only.'],
    ['Do I choose the dealership?', 'Yes. We pick up your vehicle, take it to the dealership you choose and retrieve and return it when the servicing is complete.'],
    ['Who does and bills for the work?', 'The dealership handles and bills for servicing. NowCharged’s separate $80 CAD per hour rate covers the dealership transport service, not repairs, diagnostics or parts.'],
    ['Do I need to hand over my keys in person?', 'We confirm the key handoff before you book. Depending on your building and preferences, it may be in person, through your concierge or via a lockbox you control.'],
  ]},
];
export default async function FAQ(){const live = await isLiveHost();return <main data-field-page="faq" className={styles.shell} id="main-content"><header className={styles.intro+" field-support-intro"}><p className={styles.kicker+" field-support-kicker"}>Customer desk / 01</p><h1>Questions before the keys change hands?</h1><p>Here’s what to know about your pickup, the trip and the return.</p></header><div className={styles.indexLayout}><nav aria-label="FAQ topics" className={styles.index+" field-support-index"}><p className={styles.kicker+" field-support-kicker"}>Jump to</p>{groups.map((g,i)=><a href={'#'+g.id} key={g.id}><span>0{i+1}</span>{g.title}</a>)}<a href="/pricing"><span aria-hidden="true">04</span> Compare pricing</a></nav><div>{groups.map((g,i)=><section id={g.id} className={styles.faqGroup} key={g.id}><p className={styles.kicker+" field-support-kicker"}>0{i+1}</p><h2>{g.title}</h2>{g.items.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}{!live && q === 'Is a callback request a booking?' && ' This preview does not send any requests.'}</p></details>)}</section>)}</div></div></main>}
