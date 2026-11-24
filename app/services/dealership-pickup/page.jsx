import Link from "next/link";
import s from "../valet.module.css";

export const metadata = {title:"Dealership Pickup & Return",description:"Learn about planned NowCharged dealership pickup and return, at $80 CAD per hour for transport. Bookings are not open.", alternates: { canonical: "/services/dealership-pickup" } };

export default function DealershipPickup(){
 const stops=[["Pick up your car","We agree on the pickup window, location and key handoff."],["Drop it at your dealership","We drive your car to the dealership you chose for your service appointment. The dealership handles the mechanical work."],["Bring it back","Once the dealership finishes, we pick your car up and return it to the agreed location."]];
 return <main data-field-page="dealership-pickup" id="main" className={s.page+" "+s.dealer+" field-valet-page"}>
  <section className={s.intro+" field-valet-intro"}><div className={s.wrap+" "+s.split}>
   <div><p className={s.eyebrow+" field-valet-eyebrow"}>02 / Dealership pickup &amp; return</p><h1 className={s.title}>Dealership pickup <em>and return.</em></h1><p className={s.deck}>A planned round trip for your service appointment. You choose the dealership and pay it directly for the work. This service is not taking bookings.</p><div className={s.actions}><Link className={s.link} href="#availability">See booking status</Link></div></div>
   <aside className={s.receipt+" field-valet-receipt"}><p className={s.kicker+" field-valet-kicker"}>Planned transport rate</p><p className={s.money}>$80</p><p>CAD per hour</p><dl><div><dt>Driver and vehicle handoffs</dt><dd>NowCharged</dd></div><div><dt>Servicing and its invoice</dt><dd>Your dealership</dd></div></dl><p>Dealership charges are separate from NowCharged’s transport fee.</p></aside>
  </div></section>
  <section className={s.band+" "+s.line}><div className={s.wrap}><p className={s.eyebrow+" field-valet-eyebrow"}>One appointment, two handoffs</p><h2 className={s.subhead}>How the round trip would work.</h2><ol className={s.route+" field-valet-route"}>{stops.map(([title,copy],i)=><li key={title}><span className={s.kicker+" field-valet-kicker"}>STOP 0{i+1}</span><strong>{title}</strong><p>{copy}</p></li>)}</ol></div></section>
  <section id="availability" className={s.band+" "+s.last+" field-valet-last"}><div className={s.wrap+" "+s.split}>
   <div><p className={s.eyebrow+" field-valet-eyebrow"}>Availability</p><h2 className={s.subhead}>Not taking bookings yet.</h2><p className={s.copy}>We’re confirming insurance for paid driving before we take bookings. The EV callback form is for charging only.</p><div className={s.actions}><Link className={s.link} href="/services/ev-charging">Looking for EV charging instead?</Link></div></div>
   <div className={s.faqs}><details><summary>Do I choose the dealership?</summary><p>Yes. The planned service is for an appointment at the dealership you choose.</p></details><details><summary>Who approves and pays for repairs?</summary><p>You deal directly with your dealership for approvals and payment. The NowCharged transport fee would not cover repairs or other dealership charges.</p></details><details><summary>Does my car need to be electric?</summary><p>No. The dealership pickup and return lane is separate from EV charging valet.</p></details></div>
  </div></section>
 </main>;
}
