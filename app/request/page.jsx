import { isLiveHost, productionOrigin } from "../release";
import PickupPreview from "./pickup-preview";

export const metadata = { title: "Request an EV pickup", robots: { index: false, follow: false } };

function EvCallback() {
  return <main data-field-page="request" className="nc-shell nc-section nc-request">
    <div className="nc-request-overview"><p className="nc-kicker">EV CHARGING VALET / TORONTO &amp; GTA</p><h1 className="nc-h1">Request a callback.</h1><p className="nc-lede">Share a few details and we’ll call to confirm coverage, pricing and pickup timing before you decide to book.</p>
      <div className="nc-request-summary" data-service="ev"><p className="nc-kicker">EV VALET FEES</p><h2>$50 scheduled · $75 priority</h2><p>CAD per visit. Priority is subject to availability. Electricity is billed separately at cost. Custom monthly plans are available.</p></div>
      <a href="/pricing#ev" className="nc-jump">See EV pricing and extras</a>
    </div>
    <section className="nc-card nc-pickup-card" aria-labelledby="callback-title"><p className="nc-kicker">STEP 01 / SHARE YOUR DETAILS</p><h2 id="callback-title">EV callback request</h2><p className="nc-muted">Submitting this form does not book a pickup.</p>
      <form method="post" action="https://formsubmit.co/info@nowcharged.com">
        <input type="hidden" name="_subject" value="New NowCharged Callback Request" />
        <input type="hidden" name="_next" value={productionOrigin + "/thank-you"} />
        <input type="hidden" name="_captcha" value="false" />
        <fieldset className="nc-pickup-fields"><legend className="sr-only">EV pickup details</legend>
          <label>Name <input className="nc-field" type="text" name="name" required autoComplete="name" placeholder="Your name" maxLength={120}/></label>
          <label>Phone number <input className="nc-field" type="tel" name="phone" required autoComplete="tel" placeholder="647-555-1234" maxLength={40}/></label>
          <label>Pickup postal code <input className="nc-field" name="postal_code" required autoComplete="postal-code" placeholder="M5V 2T6" maxLength={8}/></label>
          <label>Best time to call <select className="nc-field" name="best_time_to_call"><option>ASAP</option><option>Morning (8am–12pm)</option><option>Afternoon (12pm–5pm)</option><option>Evening (5pm–8pm)</option><option>Tomorrow</option></select></label>
          <label>What do you need? <span>(optional)</span><textarea className="nc-field" name="message" rows={3} maxLength={800} placeholder="For example: no home charger, interested in monthly pickups"/></label>
        </fieldset>
        <label className="nc-ev-consent"><input type="checkbox" name="contact_consent" required/> <span>I agree that NowCharged may contact me about this request.</span></label>
        <p className="nc-ev-form-note">FormSubmit delivers these details to NowCharged.</p>
        <button type="submit" className="nc-button nc-button--dark">Request an EV callback</button>
      </form>
    </section>
  </main>;
}

function DealerStatus() {
  return <main data-field-page="request" className="nc-shell nc-section nc-request">
    <div className="nc-request-overview"><p className="nc-kicker">DEALERSHIP PICKUP AND RETURN</p><h1 className="nc-h1">Not booking yet.</h1><p className="nc-lede">We’re not taking dealership pickup bookings yet while we confirm coverage. The EV callback form is for charging only.</p><a href="/services/dealership-pickup" className="nc-jump">See how dealership pickup will work</a></div>
    <section className="nc-request-summary" data-service="dealer"><p className="nc-kicker">DEALERSHIP TRANSPORT</p><h2>$80 CAD per hour</h2><p>The rate is for dealership pickup and return. The dealership performs the service and bills you separately.</p></section>
  </main>;
}

export default async function RequestPage({ searchParams }) {
  const raw = (await searchParams)?.service;
  const service = raw === "ev" || raw === "dealer" ? raw : "";
  const isLive = await isLiveHost();
  if (service === "dealer") return <DealerStatus />;
  if (!isLive) return <PickupPreview />;
  if (service === "ev" || raw === undefined) return <EvCallback />;
  return <main data-field-page="request" className="nc-shell nc-section nc-request"><div><p className="nc-kicker">CHOOSE A SERVICE</p><h1 className="nc-h1">Which pickup?</h1><p className="nc-lede">This link doesn’t identify a supported service.</p></div><div className="nc-request-summary"><a className="nc-button" href="/request?service=ev">Request an EV callback</a> <a className="nc-jump" href="/services/dealership-pickup">Dealership pickup details</a></div></main>;
}
