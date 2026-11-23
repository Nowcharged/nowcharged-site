import Link from "next/link";
import s from "../valet.module.css";

export const metadata = {title:"Dealership Pickup & Return",description:"NowCharged drives your car to the dealership you choose for its service appointment, then brings it back once the work is complete."};

export default function DealershipPickup(){
 const stops=[["Pick up your car","We agree on the pickup window, location and key handoff."],["Drop it at your dealership","We drive your car to the dealership you chose for your service appointment. The dealership handles the mechanical work."],["Bring it back","Once the dealership finishes, we pick your car up and return it to the agreed location."]];
 return <main id="main" className={s.page+" "+s.dealer}>
  <section className={s.intro}><div className={s.wrap+" "+s.split}>
   <div><p className={s.eyebrow}>02 / Dealership pickup &amp; return</p><h1 className={s.title}>Your appointment. <em>Our drive.</em></h1><p className={s.deck}>You choose the dealership. We take your car in for service, then bring it back when the dealership is finished.</p><div className={s.actions}><Link className={s.cta} href="/request?service=dealer">Request dealership pickup <span aria-hidden="true">↗</span></Link></div></div>
   <aside className={s.receipt}><p className={s.kicker}>Dealership transport only</p><p className={s.money}>$80</p><p>CAD per hour</p><dl><div><dt>Driver and vehicle handoffs</dt><dd>NowCharged</dd></div><div><dt>Servicing and its invoice</dt><dd>Your dealership</dd></div></dl><p>Dealership charges are separate from NowCharged’s transport fee.</p></aside>
  </div></section>
  <section className={s.band+" "+s.line}><div className={s.wrap}><p className={s.eyebrow}>One appointment, two handoffs</p><h2 className={s.subhead}>We handle the trip both ways.</h2><ol className={s.route}>{stops.map(([title,copy],i)=><li key={title}><span className={s.kicker}>STOP 0{i+1}</span><strong>{title}</strong><p>{copy}</p></li>)}</ol></div></section>
  <section className={s.band+" "+s.last}><div className={s.wrap+" "+s.split}>
   <div><p className={s.eyebrow}>Before you request</p><h2 className={s.subhead}>Have the appointment details handy.</h2><p className={s.copy}>Tell us the pickup area, dealership location and appointment timing so we can check if the trip fits.</p></div>
   <div className={s.faqs}><details><summary>Do I choose the dealership?</summary><p>Yes. We transport your car to the dealership you choose for your appointment.</p></details><details><summary>Who approves and pays for repairs?</summary><p>You deal directly with your dealership for approvals and payment. NowCharged handles transport, not repairs.</p></details><details><summary>Does my car need to be electric?</summary><p>No. The dealership pickup and return lane is separate from EV charging valet.</p></details></div>
  </div></section>
 </main>;
}
