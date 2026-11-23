"use client";

import { useRef, useState } from "react";

const options = {
  ev: { title: "EV charging valet", rate: "$50 scheduled / $75 priority CAD", note: "Charging electricity is billed separately at cost. Priority is subject to availability.", details:"Parking access or your preferred charging target", example:"Example: aim for 80% charge" },
  dealer: { title: "Dealership pickup and return", rate: "$80 CAD / hour", note: "The valet rate is for transport only. Your dealership bills you separately for its work.", details:"Dealership name and appointment details", example:"Example: Sample Motors, Tuesday morning" },
};

export default function PickupPreview({ initialService }) {
  const [service,setService] = useState(initialService);
  const [complete,setComplete] = useState(false);
  const area = useRef(null);
  const selected = useRef(null);
  const status = useRef(null);
  const item = options[service];
  function checkPreview() {
    if (!selected.current.reportValidity() || !area.current.reportValidity()) return;
    setComplete(true);
    requestAnimationFrame(()=>status.current?.focus());
  }
  return <main className="nc-shell nc-section nc-request">
    <div className="nc-request-overview"><p className="nc-kicker">PICKUP PLANNER / PREVIEW</p><h1 className="nc-h1">Explore a pickup.</h1><p className="nc-lede">See what the request process would ask for. This preview does not send requests or book times.</p>
      <div className="nc-request-summary" data-service={service}><p className="nc-kicker">SERVICE SUMMARY</p><h2>{item?.title || "Choose your service"}</h2>{item ? <><strong>{item.rate}</strong><p>{item.note}</p></> : <p>Choose EV charging or dealership pickup to see the fee and sample handoff details.</p>}</div>
      <a href="/coverage" className="nc-jump">Check our service area <span aria-hidden="true">↗</span></a>
    </div>
    <section className="nc-card nc-pickup-card" aria-labelledby="sandbox-title"><p className="nc-kicker">DEMO / NO DATA SENT</p><h2 id="sandbox-title">Try the request flow</h2><p className="nc-muted">Use sample information only. Everything you enter stays on this page.</p>
      <fieldset className="nc-pickup-fields"><legend className="sr-only">Sample pickup details</legend>
        <label>Which service?<select className="nc-field" ref={selected} value={service} required onChange={event=>{setService(event.target.value);setComplete(false);}}><option value="" disabled>Choose one</option><option value="ev">EV charging valet</option><option value="dealer">Dealership pickup and return</option></select></label>
        <label>Pickup postal code <span>(sample)</span><input className="nc-field" ref={area} required pattern="[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]" autoComplete="off" placeholder="M5V 2T6" maxLength={7} onInput={()=>setComplete(false)}/></label>
        {item && <label key={service}>{item.details} <span>(optional sample)</span><textarea className="nc-field" rows={3} maxLength={250} autoComplete="off" placeholder={item.example} onInput={()=>setComplete(false)}/></label>}
      </fieldset>
      <button type="button" className="nc-button nc-button--dark" onClick={checkPreview}>Preview request <span aria-hidden="true">→</span></button>
      <noscript><p>Turn on JavaScript to try the interactive demo. No requests can be sent from this preview.</p></noscript>
      {complete && <div className="nc-pickup-result" role="status" ref={status} tabIndex={-1}><strong>Preview complete. No request was sent.</strong><p>No time was booked and no one was contacted.</p></div>}
    </section>
  </main>;
}
