"use client";

import { useState } from "react";

const FONTS = ``;

function Icon({ name, className = "h-6 w-6" }) {
 const p = {
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
 };
 const icons = {
  zap:   <svg {...p}><path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z"/></svg>,
  battery: <svg {...p}><rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2"/><path d="M7 11h4"/><path d="m10 9-2 3h3l-2 3"/></svg>,
  calendar: <svg {...p}><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-5"/></svg>,
  pin:   <svg {...p}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  shield:  <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></svg>,
  clock:  <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  check:  <svg {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  arrow:  <svg {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  car:   <svg {...p}><path d="M5 17h14"/><path d="M6 17v2"/><path d="M18 17v2"/><path d="M4 13 6.2 7.5A2.4 2.4 0 0 1 8.4 6h7.2a2.4 2.4 0 0 1 2.2 1.5L20 13"/><path d="M3 13h18v4H3z"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/></svg>,
  phone:  <svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L8 9.72a16 16 0 0 0 6.28 6.28l1.29-1.29a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92Z"/></svg>,
  document: <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/></svg>,
  chevron: <svg {...p}><path d="m6 9 6 6 6-6"/></svg>,
  menu:   <svg {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>,
  close:  <svg {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
  building: <svg {...p}><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/></svg>,
  key:   <svg {...p}><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>,
  bolt:   <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
 };
 return icons[name] ?? icons.zap;
}

const display = { fontFamily: "'Manrope', sans-serif" };
const body  = { fontFamily: "'DM Sans', system-ui, sans-serif" };

const scrollTo = (id) => {
 document.getElementById(id)?.scrollIntoView();
};

const services = [
 { id: "ev", name: "EV charging valet", icon: "battery", description: "We pick up your EV, take it to a DC fast charger, and return it to your spot." },
 { id: "dealership", name: "Dealership service valet", icon: "car", description: "Ask about pickup and return for your dealership appointment. Inquiries only; pickups are not yet available." },
];

// Preview branch only: this version cannot send callback data.
const previewOnly = true;

export default function NowChargedLandingPage() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [openFaq, setOpenFaq]  = useState(null);

 const [service, setService] = useState("");
 const [previewNotice, setPreviewNotice] = useState(false);
 const [details, setDetails] = useState("");
 const RequestPanel = previewOnly ? "div" : "form";

 function chooseService(id) {
  setService(id);
  document.getElementById("request-service")?.focus({ preventScroll: true });
  scrollTo("callback");
 }

 const steps = [
  { icon: "phone", num: "01", title: "Tell us what you need", text: "Choose a service and share your pickup postal code. For dealership service, include the dealership and appointment details if you have them." },
  { icon: "key", num: "02", title: "Confirm the details", text: "We discuss pickup, timing, price and key handoff with you before any booking." },
  { icon: "car", num: "03", title: "Get your car back", text: "We return your EV after charging. Our planned dealership valet would bring the car back after service; the dealership handles all maintenance and repairs." },
 ];

 const faqs = [
  {
   q: "What happens before pickup?",
   a: "We review the pickup, key handoff and return details with you before you decide whether to book.",
  },
  {
   q: "Do I need to be there for pickup or drop-off?",
   a: "Nope. Most customers leave their car in their spot. We sort out the key handoff, access codes, and parking details on the call.",
  },
  {
   q: "Are charging costs included in the service fee?",
   a: "No. Our fee covers the pickup, drive, and return. DC fast charging electricity is billed separately and confirmed before we start.",
  },
  {
   q: "What areas do you cover?",
   a: "Toronto and the Greater Toronto Area. Drop your postal code in the form and we'll confirm right away whether we cover your area.",
  },
  {
   q: "Is dealership pickup available now?",
   a: "Not yet. You can ask about the planned service, but we aren’t taking dealership bookings.",
  },
  {
   q: "Does filling out the form book a job?",
   a: "No. It just asks us to call you. Nothing is booked or charged until we've spoken, you know the price, and you say go.",
  },
 ];

 const inputCls = "mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-500 text-sm";

 return (
  <div className="nc-site min-h-screen bg-slate-950 text-white" style={body}>
   <style>{FONTS}</style>

   {/* ── Header ── */}
   <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
     <a href="#top" className="flex items-center gap-3 text-left">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
       <Icon name="zap" className="h-5 w-5" />
      </div>
      <div>
       <p className="text-lg font-extrabold tracking-tight leading-none" style={display}>NowCharged</p>
       <p className="text-xs text-slate-400 mt-0.5">Car Valet · Toronto & GTA</p>
      </div>
     </a>

     <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
      <button onClick={() => scrollTo("how")} className="hover:text-white transition-colors">How it works</button>
      <a href="/pricing" className="hover:text-white transition-colors">EV Pricing</a>
      <a href="/tools" className="hover:text-white transition-colors">Find your EV</a>
      <a href="/chargers" className="hover:text-white transition-colors">Chargers 101</a>
      <a href="/trust" className="hover:text-white transition-colors">Trust</a>
      <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
     </nav>

     <div className="flex items-center gap-3">
      <button onClick={() => scrollTo("callback")} className="hidden lg:inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-colors">
       Request a callback <Icon name="arrow" className="h-4 w-4" />
      </button>
      <button onClick={() => setMenuOpen(o => !o)} className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 p-2 text-white lg:hidden" aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="mobile-navigation">
       <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
      </button>
     </div>
    </div>

    <div id="mobile-navigation" className={menuOpen ? "border-t border-white/10 bg-slate-950 px-6 py-5 lg:hidden" : "hidden"}>
      <nav className="flex flex-col gap-4 text-sm">
       <button onClick={() => { scrollTo("how"); setMenuOpen(false); }} className="text-left text-slate-300 hover:text-white">How it works</button>
       <a href="/pricing" className="text-slate-300 hover:text-white" onClick={() => setMenuOpen(false)}>EV Pricing</a>
       <a href="/tools" className="text-slate-300 hover:text-white" onClick={() => setMenuOpen(false)}>Find your EV</a>
       <a href="/trust" className="text-slate-300 hover:text-white" onClick={() => setMenuOpen(false)}>Trust & Safety</a>
       <a href="/chargers" className="text-slate-300 hover:text-white" onClick={() => setMenuOpen(false)}>Chargers 101</a>
       <a href="/faq" className="text-slate-300 hover:text-white" onClick={() => setMenuOpen(false)}>FAQ</a>
       <button onClick={() => { scrollTo("callback"); setMenuOpen(false); }} className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950">
        Request a callback <Icon name="arrow" className="h-4 w-4" />
       </button>
      </nav>
     </div>
   </header>

   <main id="top" className="scroll-mt-24">

    <section className="nc-hero">
      <div className="nc-wrap nc-cover">
       <div><p className="nc-label"><span className="nc-dot" /> TORONTO + GREATER TORONTO AREA</p>
       <h1>Your car goes.<br/><em>You stay.</em></h1>
       <p className="nc-deck">Book a callback about EV charging valet, or ask about our planned dealership pickup and return service.</p>
       <a className="nc-action" href="#services">Choose your service <span aria-hidden="true">↓</span></a></div>
       <figure className="nc-plate">
       <div className="nc-legend"><span>NC / FIELD NOTES</span><span>FIG. 01</span></div>
       <svg viewBox="0 0 440 250" role="img" aria-label="Illustrated round trip from your parking spot to a charger or dealership and back">
       <defs><pattern id="blocks" width="50" height="34" patternTransform="rotate(-22)" patternUnits="userSpaceOnUse"><rect x="3" y="3" width="42" height="26" rx="3" fill="#326558"/></pattern></defs>
       <rect width="440" height="250" fill="url(#blocks)"/><path d="M0 212Q94 175 170 202T315 187T440 156V250H0" fill="#143d39"/>
       <path d="M48 162H112L169 105H231L283 53H364" fill="none" stroke="#183e33" strokeWidth="16" strokeLinejoin="round"/>
       <path d="M48 162H112L169 105H231L283 53H364" fill="none" stroke="#e2fd78" strokeWidth="5" strokeLinejoin="round"/>
       <path d="M364 64V111L302 173H171L130 214H49V175" fill="none" stroke="#e8f5d4" strokeWidth="3" strokeDasharray="7 6"/>
       <g fill="#e2fd78" stroke="#183e33" strokeWidth="4"><circle cx="48" cy="162" r="9"/><circle cx="364" cy="53" r="9"/></g>
       <g fill="#f7f7df" fontFamily="monospace" fontWeight="bold" fontSize="13"><rect x="22" y="121" width="69" height="23" rx="3" fill="#143d39"/><text x="29" y="137">PICKUP</text><rect x="254" y="17" width="138" height="24" rx="3" fill="#143d39"/><text x="264" y="34">SERVICE STOP</text></g></svg>
       <figcaption><span>OUT &amp; BACK</span><span>Route illustration</span></figcaption></figure>
      </div></section>
      <section id="services" className="nc-directory"><div className="nc-wrap">
       <p className="nc-label">SERVICE DIRECTORY / 02 ROUTES</p>
       <h2>Where’s the car headed?</h2>
       <div className="nc-services">{services.map((item,i)=><article key={item.id}>
       <div className="nc-ticket"><span>ROUTE 0{i+1}</span><Icon name={item.icon}/></div>
       <h3>{i===0?"To the charger.":"To the dealership."}</h3><p>{item.description}</p>
       <small>{i===0?"Scheduled $50 · Same-day priority $75 · Electricity extra":"Independent valet · Your dealership handles all service work"}</small>
       <button type="button" onClick={()=>chooseService(item.id)}>{i===0?"Request EV charging":"Ask about dealership pickup"} <span aria-hidden="true">↗</span></button></article>)}</div>
      </div></section>

    {/* ── How it works ── */}
    <section id="how" className="scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16">
     <div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">How it works</p>
      <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight md:text-5xl" style={display}>
       From your spot and back.
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
       {steps.map(s => (
        <div key={s.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
         <p className="text-6xl font-black leading-none text-white/10 select-none" style={display}>{s.num}</p>
         <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
          <Icon name={s.icon} className="h-6 w-6" />
         </div>
         <h3 className="mt-5 text-xl font-bold" style={display}>{s.title}</h3>
         <p className="mt-3 text-sm leading-7 text-slate-300">{s.text}</p>
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* ── Pricing Preview ── */}
    <section className="bg-white px-6 py-20 text-slate-950">
     <div className="mx-auto max-w-5xl">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
       <div>
        <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">EV charging pricing</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
         The cost of a charge run.
        </h2>
        <p className="mt-4 text-slate-600 text-base leading-7">
         Flat service fee. Charging electricity is billed separately at-cost. No surprises, no hidden fees, no fine print.
        </p>
        <a href="/pricing" className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-colors">
         See EV charging pricing <Icon name="arrow" className="h-4 w-4" />
        </a>
       </div>

       <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex items-center justify-between">
         <div>
          <p className="text-sm font-bold text-slate-900" style={display}>Scheduled Charge</p>
          <p className="text-xs text-slate-500 mt-0.5">Plan a day ahead</p>
         </div>
         <p className="text-2xl font-black text-slate-900" style={display}>$50</p>
        </div>
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-5 flex items-center justify-between">
         <div>
          <p className="text-sm font-bold text-slate-900" style={display}>Same-Day / Priority</p>
          <p className="text-xs text-slate-500 mt-0.5">When availability allows</p>
         </div>
         <p className="text-2xl font-black text-slate-900" style={display}>$75</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex items-center justify-between">
         <div>
          <p className="text-sm font-bold text-slate-900" style={display}>Monthly Plan</p>
          <p className="text-xs text-slate-500 mt-0.5">Recurring, lower per-visit</p>
         </div>
         <p className="text-2xl font-black text-slate-900" style={display}>Custom</p>
        </div>
       </div>
      </div>
     </div>
    </section>

    {/* ── FAQ ── */}
    <section id="faq" className="bg-slate-900 px-6 py-20">
     <div className="mx-auto max-w-4xl">
      <div className="mb-10">
       <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">FAQ</p>
       <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>Before we take the keys.</h2>
       <p className="mt-3 text-sm text-slate-400">The five most common ones. Full list on the FAQ page.</p>
      </div>

      <div className="space-y-3">
       {faqs.map((faq, i) => (
        <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
         <button
          onClick={() => setOpenFaq(openFaq === i ? null : i)}
          aria-expanded={openFaq === i}
          className="flex w-full items-center justify-between gap-4 p-5 text-left"
         >
          <h3 className="text-base font-semibold leading-snug pr-2">{faq.q}</h3>
          <Icon
           name="chevron"
           className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
          />
         </button>
         {openFaq === i && (
          <div className="px-5 pb-5">
           <p className="text-sm leading-7 text-slate-300">{faq.a}</p>
          </div>
         )}
        </div>
       ))}
      </div>

      <div className="mt-10 text-center">
       <a href="/faq" className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-6 py-3 text-sm font-bold text-emerald-300 hover:bg-emerald-400/20 transition-colors">
        See all questions <Icon name="arrow" className="h-4 w-4" />
       </a>
      </div>

     </div>
    </section>

    {/* ── Callback Form ── */}
    <section id="callback" className="scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16">
     <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
      <div>
       <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Request a callback</p>
       <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>Let’s plan your pickup.</h2>
       <p className="mt-4 leading-8 text-slate-300 text-sm">
        Choose a service and leave a number where we can reach you. Sending this form does not book a pickup.
       </p>

       <div className="mt-6 space-y-3">
        {[
         "Service area confirmed by postal code",
         "Pricing explained before scheduling",
         "Key handoff details sorted on the call",
        ].map(item => (
         <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
          <Icon name="check" className="h-4 w-4 shrink-0 text-emerald-400" /> {item}
         </div>
        ))}
       </div>
      </div>

      <RequestPanel
       action={previewOnly ? undefined : "https://formsubmit.co/info@nowcharged.com"}
       method={previewOnly ? undefined : "POST"}
       className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8"
      >
       <input type="hidden" name="_subject" value="New NowCharged Callback Request" />
       <input type="hidden" name="_next" value="https://nowcharged.com/thank-you" />
       <input type="hidden" name="_captcha" value="false" />

       <label className="mb-4 block">
        <span className="text-sm font-semibold text-slate-300">Which service? *</span>
        <select id="request-service" required value={service} onChange={event => setService(event.target.value)} className={inputCls}>
         <option value="">Choose a service</option>
         {services.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
        </select>
       </label>

       <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
         <span className="text-sm font-semibold text-slate-300">Name *</span>
         <input name="name" autoComplete="name" required className={inputCls} placeholder="Your name" />
        </label>
        <label className="block">
         <span className="text-sm font-semibold text-slate-300">Phone number *</span>
         <input name="phone" type="tel" autoComplete="tel" required className={inputCls} placeholder="647-555-1234" />
        </label>
        <label className="block">
         <span className="text-sm font-semibold text-slate-300">Postal code *</span>
         <input name="postal_code" autoComplete="postal-code" required className={inputCls} placeholder="M5V 2T6" />
        </label>
        <label className="block">
         <span className="text-sm font-semibold text-slate-300">Best time to call</span>
         <select name="best_time_to_call" className={inputCls}>
          <option>ASAP</option>
          <option>Morning (8am–12pm)</option>
          <option>Afternoon (12pm–5pm)</option>
          <option>Evening (5pm–8pm)</option>
          <option>Tomorrow</option>
         </select>
        </label>
       </div>

       <input type="hidden" name="message" value={`Service: ${services.find(option => option.id === service)?.name ?? ""}${details.trim() ? `\n\n${details.trim()}` : ""}`} />
       <label className="mt-4 block">
        <span className="text-sm font-semibold text-slate-300">Anything else? <span className="font-normal text-slate-500">(optional)</span></span>
        <textarea
         value={details}
         onChange={event => setDetails(event.target.value)}
         className={`${inputCls} min-h-28 resize-none`}
         placeholder={service === "dealership" ? "Dealership name, location, and appointment information if known." : "What do you drive, and where do you normally park?"}
        />
       </label>

       <label className="mt-5 flex items-start gap-3 text-sm text-slate-300 cursor-pointer">
        <input type="checkbox" name="contact_consent" required className="mt-1 shrink-0 accent-emerald-400" />
        <span>I agree that NowCharged may contact me about this request.</span>
       </label>

       <button
        type={previewOnly ? "button" : "submit"}
        onClick={previewOnly ? () => setPreviewNotice(true) : undefined}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3.5 font-bold text-slate-950 hover:bg-emerald-300 transition-colors"
       >
        {previewOnly ? "Preview request" : "Send callback request"} <Icon name="arrow" className="h-5 w-5" />
       </button>
       {previewOnly && <p className="mt-3 text-sm text-slate-300" role="status">{previewNotice ? "Preview only. No request was sent." : "Preview only. Don’t enter real contact details. This form will not send."}</p>}
      </RequestPanel>
     </div>
    </section>

       </main>

   {/* ── Footer ── */}
   <footer className="border-t border-white/10 bg-slate-950 px-6 py-14">
    <div className="mx-auto max-w-7xl">
     <div className="grid gap-10 md:grid-cols-4">

      {/* Brand column */}
      <div className="md:col-span-1">
       <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
         <Icon name="zap" className="h-5 w-5" />
        </div>
        <p className="font-extrabold text-white" style={display}>NowCharged</p>
       </div>
       <p className="text-sm text-slate-400 leading-6">
        EV charging and dealership service valet in Toronto and the GTA.
       </p>
       <p className="mt-4 text-sm">
        <a href="mailto:info@nowcharged.com" className="text-emerald-300 hover:text-emerald-200 transition-colors">info@nowcharged.com</a>
       </p>
      </div>

      {/* Service column */}
      <div>
       <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Service</p>
       <div className="space-y-3 text-sm">
        <button onClick={() => scrollTo("how")} className="block text-slate-300 hover:text-white transition-colors">How it works</button>
        <a href="/pricing" className="block text-slate-300 hover:text-white transition-colors">EV Pricing</a>
        <a href="/tools" className="block text-slate-300 hover:text-white transition-colors">Find your EV</a>
        <button onClick={() => scrollTo("callback")} className="block text-slate-300 hover:text-white transition-colors">Request a callback</button>
       </div>
      </div>

      {/* Resources column */}
      <div>
       <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Resources</p>
       <div className="space-y-3 text-sm">
        <a href="/chargers" className="block text-slate-300 hover:text-white transition-colors">Chargers 101</a>
        <a href="/trust" className="block text-slate-300 hover:text-white transition-colors">Trust & safety</a>
        <a href="/faq" className="block text-slate-300 hover:text-white transition-colors">FAQ</a>
       </div>
      </div>

      {/* Company column */}
      <div>
       <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Company</p>
       <div className="space-y-3 text-sm">
        <a href="/careers" className="block text-slate-300 hover:text-white transition-colors">Drive with us</a>
        <a href="mailto:info@nowcharged.com" className="block text-slate-300 hover:text-white transition-colors">Contact</a>
       </div>
      </div>

     </div>

     <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-500">
      <p>© 2026 NowCharged. Registered Ontario business.</p>
      <p>Serving Toronto & the Greater Toronto Area.</p>
     </div>
    </div>
   </footer>
  </div>
 );
}
