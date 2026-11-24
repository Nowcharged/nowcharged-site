"use client";

import { useRef, useState } from "react";

export default function PickupPreview() {
  const [complete,setComplete] = useState(false);
  const area = useRef(null);
  const status = useRef(null);
  function checkPreview() {
    if (!area.current.reportValidity()) return;
    setComplete(true);
    requestAnimationFrame(()=>status.current?.focus());
  }
  return <main data-field-page="request" className="nc-shell nc-section nc-request">
    <div className="nc-request-overview"><p className="nc-kicker">PICKUP PLANNER / PREVIEW</p><h1 className="nc-h1">Preview an EV callback.</h1><p className="nc-lede">See what the request process would ask for. This preview does not send requests or book times.</p>
      <div className="nc-request-summary" data-service="ev"><p className="nc-kicker">SERVICE SUMMARY</p><h2>EV charging valet</h2><strong>$50 scheduled / $75 priority CAD</strong><p>Charging electricity is billed separately at cost. Priority is subject to availability.</p></div>
      <a href="/coverage" className="nc-jump">Check our service area</a>
    </div>
    <section className="nc-card nc-pickup-card" aria-labelledby="sandbox-title"><p className="nc-kicker">DEMO / NO DATA SENT</p><h2 id="sandbox-title">Try the request flow</h2><p className="nc-muted">Use sample information only. Everything you enter stays on this page.</p>
      <fieldset className="nc-pickup-fields"><legend className="sr-only">Sample pickup details</legend>
        <label>Pickup postal code <span>(sample)</span><input className="nc-field" ref={area} required pattern="[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]" autoComplete="off" placeholder="M5V 2T6" maxLength={7} onInput={()=>setComplete(false)}/></label>
        <label>Parking access or your preferred charging target <span>(optional sample)</span><textarea className="nc-field" rows={3} maxLength={250} autoComplete="off" placeholder="Example: aim for 80% charge" onInput={()=>setComplete(false)}/></label>
      </fieldset>
      <button type="button" className="nc-button nc-button--dark" onClick={checkPreview}>Preview callback</button>
      <noscript><p>Turn on JavaScript to try the interactive demo. No requests can be sent from this preview.</p></noscript>
      {complete && <div className="nc-pickup-result" role="status" ref={status} tabIndex={-1}><strong>Preview complete. No request was sent.</strong><p>No time was booked and no one was contacted.</p></div>}
    </section>
  </main>;
}
