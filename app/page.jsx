"use client";

import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
*, html { scroll-behavior: smooth; }
`;

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
    zap:      <svg {...p}><path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z"/></svg>,
    battery:  <svg {...p}><rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2"/><path d="M7 11h4"/><path d="m10 9-2 3h3l-2 3"/></svg>,
    calendar: <svg {...p}><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-5"/></svg>,
    pin:      <svg {...p}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    shield:   <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></svg>,
    clock:    <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    check:    <svg {...p}><path d="M20 6 9 17l-5-5"/></svg>,
    arrow:    <svg {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
    car:      <svg {...p}><path d="M5 17h14"/><path d="M6 17v2"/><path d="M18 17v2"/><path d="M4 13 6.2 7.5A2.4 2.4 0 0 1 8.4 6h7.2a2.4 2.4 0 0 1 2.2 1.5L20 13"/><path d="M3 13h18v4H3z"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/></svg>,
    phone:    <svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L8 9.72a16 16 0 0 0 6.28 6.28l1.29-1.29a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92Z"/></svg>,
    document: <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/></svg>,
    chevron:  <svg {...p}><path d="m6 9 6 6 6-6"/></svg>,
    menu:     <svg {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>,
    close:    <svg {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
    building: <svg {...p}><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/></svg>,
    key:      <svg {...p}><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>,
    bolt:     <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
  };
  return icons[name] ?? icons.zap;
}

const display = { fontFamily: "'Manrope', sans-serif" };
const body    = { fontFamily: "'DM Sans', system-ui, sans-serif" };

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function NowChargedLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq]   = useState(null);

  const services = [
    {
      name: "Scheduled Charge",
      price: "From $50",
      tag: null,
      detail: "Pick a time, we handle the rest. Best when you can plan a day ahead.",
      features: [
        "We come to your parking spot",
        "Drive your EV to a DC fast charger",
        "Return it charged and ready",
        "Price confirmed before we start",
      ],
      dark: false,
    },
    {
      name: "Same-Day / Priority",
      price: "From $75",
      tag: "Most requested",
      detail: "Need it today? We'll do our best to make it happen.",
      features: [
        "Faster turnaround when available",
        "Same pickup-charge-return process",
        "Confirmed by phone first",
        "Subject to availability",
      ],
      dark: true,
    },
    {
      name: "Monthly Plan",
      price: "Custom",
      tag: null,
      detail: "For drivers who charge with us regularly. Better pricing, preferred slots, less hassle.",
      features: [
        "Recurring scheduled pickups",
        "Your preferred time slots locked in",
        "Custom pricing by frequency",
        "Better rate than one-off bookings",
      ],
      dark: false,
    },
    {
      name: "Business / Fleet",
      price: "Custom",
      tag: null,
      detail: "Multiple vehicles, one solution. We coordinate the runs so you don't have to.",
      features: [
        "Multi-vehicle coordination",
        "Building or lot pickup",
        "Fleet-level scheduling",
        "Custom billing arrangements",
      ],
      dark: false,
    },
  ];

  const steps = [
    {
      icon: "phone",
      num: "01",
      title: "You tell us where",
      text: "Share your location, parking spot, and when you need your car back. We call to confirm — takes two minutes.",
    },
    {
      icon: "car",
      num: "02",
      title: "We grab your keys",
      text: "A NowCharged driver comes to your spot and takes your EV to the nearest DC fast charger.",
    },
    {
      icon: "key",
      num: "03",
      title: "It comes back charged",
      text: "Your car is back in its spot, charged and ready to go. You don't even need to be there.",
    },
  ];

  const audiences = [
    {
      icon: "car",
      title: "Daily EV drivers",
      sub: "Skip the slow home charge. Spend the time doing literally anything else.",
      points: [
        "We pick up from wherever you park",
        "Drive to a DC fast charger nearby",
        "Return it ready for the next day",
        "Faster than charging overnight",
      ],
    },
    {
      icon: "building",
      title: "Condo & apartment residents",
      sub: "No outlet in your building? Doesn't matter — we've got it.",
      points: [
        "No equipment installation required",
        "Works for any parking setup",
        "Lockbox or concierge key handoff",
        "Built around buildings without EV infrastructure",
      ],
    },
    {
      icon: "car",
      title: "Businesses & fleets",
      sub: "Your vehicles stay charged. You stay focused on what matters.",
      points: [
        "Multi-vehicle coordination",
        "Workplace or lot pickup",
        "Monthly and fleet plans available",
        "Scheduling built around your hours",
      ],
    },
  ];

  const faqs = [
    {
      q: "Is my car safe when you drive it?",
      a: "We handle your vehicle with full care from pickup to return. Insurance and liability details are reviewed with you by phone before any booking is confirmed — we don't skip that step.",
    },
    {
      q: "What type of charger do you use?",
      a: "DC fast chargers at nearby public charging locations — not a portable unit that comes to your car. We drive your EV to the charger, not the other way around.",
    },
    {
      q: "How long does the whole thing take?",
      a: "Most visits run 45 minutes to a couple of hours depending on your battery state and the charger available. We confirm the expected window before we start.",
    },
    {
      q: "Do I need to be there for pickup or drop-off?",
      a: "Nope. Most customers leave their car in their spot. We sort out key handoff — access codes, parking details — on the call so there are no surprises on the day.",
    },
    {
      q: "Are charging costs included in the service fee?",
      a: "No — and we're upfront about that. Our fee covers the pickup, drive, and return. DC fast charging electricity is billed separately and confirmed before we start.",
    },
    {
      q: "Is this emergency or roadside?",
      a: "No. NowCharged is scheduled only. We don't do emergency dispatch or roadside recovery — everything is planned in advance.",
    },
    {
      q: "What areas do you cover?",
      a: "Toronto and the Greater Toronto Area. Drop your postal code in the form and we'll confirm right away whether we cover your area.",
    },
    {
      q: "Does filling out the form book a job?",
      a: "No. It just asks us to call you. Nothing is booked or charged until we've spoken, you know the price, and you say go.",
    },
  ];

  const beforeYouBook = [
    {
      q: "Do you actually drive my car?",
      a: "Yes. Our driver picks up your vehicle, drives it to a nearby DC fast charger, and returns it to your spot. We walk through how that works — including insurance — on the call before anything is scheduled.",
    },
    {
      q: "What are the two costs I'm paying?",
      a: "First is our service fee — that covers pickup, driving, and return. Second is the DC fast charging electricity cost, billed separately. Both are confirmed before we start. No surprises.",
    },
    {
      q: "Do you serve my area?",
      a: "We're in Toronto and the GTA right now. The fastest way to check is to drop your postal code in the form — we'll confirm on the call whether you're covered.",
    },
    {
      q: "Can you guarantee how much charge my car gets?",
      a: "Honestly, no. Battery state, charger speed, and appointment length all affect the result. We'll give you a real estimate on the call based on your specific car and situation — not a number we can't back up.",
    },
  ];

  const inputCls = "mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-500 text-sm";

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={body}>
      <style>{FONTS}</style>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={() => scrollTo("top")} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
              <Icon name="zap" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight leading-none" style={display}>NowCharged</p>
              <p className="text-xs text-slate-400 mt-0.5">EV Charging Valet · Toronto & GTA</p>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            {[["how", "How it works"], ["services", "Services"], ["faq", "FAQ"], ["book", "Book"], ["careers", "Careers"]].map(([id, l]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-white transition-colors">{l}</button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo("callback")} className="hidden md:inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-colors">
              Get Started <Icon name="arrow" className="h-4 w-4" />
            </button>
            <button onClick={() => setMenuOpen(o => !o)} className="rounded-xl border border-white/10 p-2 text-white md:hidden" aria-label="Toggle menu">
              <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-slate-950 px-6 py-5 md:hidden">
            <nav className="flex flex-col gap-4 text-sm">
              {[["how", "How it works"], ["services", "Services"], ["faq", "FAQ"], ["book", "Book"], ["careers", "Careers"]].map(([id, l]) => (
                <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false); }} className="text-left text-slate-300 hover:text-white">{l}</button>
              ))}
              <button onClick={() => { scrollTo("callback"); setMenuOpen(false); }} className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950">
                Get Started <Icon name="arrow" className="h-4 w-4" />
              </button>
            </nav>
          </div>
        )}
      </header>

      <main id="top">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(52,211,153,0.16),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(56,189,248,0.09),transparent_45%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-1.5 text-sm text-emerald-200">
              <Icon name="pin" className="h-3.5 w-3.5" /> Serving Toronto & the Greater Toronto Area
            </div>

            <img
              src="/toronto-pulse.png"
              alt="Toronto skyline pulse line"
              className="mt-8 h-14 md:h-20 w-auto opacity-70 select-none pointer-events-none"
            />

            <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[1.04] tracking-tight md:text-7xl" style={display}>
              Your EV, picked up,<br />charged, and returned.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              NowCharged is a charging valet for EV drivers in Toronto and the GTA. We pick up your car, drive it to a DC fast charger, and bring it back ready — no waiting, no home setup needed.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => scrollTo("callback")} className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 text-base font-bold text-slate-950 hover:bg-emerald-300 transition-colors">
                Get Started <Icon name="arrow" className="h-5 w-5" />
              </button>
              <a
                href="https://calendar.app.google/oQTVVQLVHtXfe68f7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-300/10 px-7 py-3.5 text-base font-bold text-emerald-200 hover:bg-emerald-300/20 transition-colors"
              >
                Book a Time <Icon name="arrow" className="h-5 w-5" />
              </a>
              <button onClick={() => scrollTo("how")} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base text-white hover:bg-white/10 transition-colors">
                See how it works
              </button>
            </div>

            <p className="mt-5 text-sm text-slate-400">
              New here? Start with <button onClick={() => scrollTo("callback")} className="text-emerald-300 hover:text-emerald-200 underline underline-offset-4">Get Started</button>. Looking to book again? <a href="https://calendar.app.google/oQTVVQLVHtXfe68f7" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline underline-offset-4">Pick a time</a>.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {["We drive your car to the charger", "No home outlet required", "Scheduled, not emergency"].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <Icon name="check" className="h-4 w-4 text-emerald-400 shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who it's for ── */}
        <section className="bg-white px-6 py-20 text-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Who it's for</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight md:text-5xl" style={display}>
                  If you drive an EV, it's for you.
                </h2>
                <p className="mt-3 max-w-xl text-slate-500 text-sm leading-6">
                  Whether you're skipping the slow home charge, living in a condo with no outlet, or running a fleet — we make charging the easiest part of your day.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img
                  src="/ev-charging.png"
                  alt="EV charging at a NowCharged station"
                  className="w-full max-w-md h-auto"
                />
              </div>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {audiences.map(a => (
                <div key={a.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-emerald-400">
                    <Icon name={a.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold" style={display}>{a.title}</h3>
                  <p className="mt-1 text-slate-500 text-sm">{a.sub}</p>
                  <div className="mt-5 space-y-3">
                    {a.points.map(pt => (
                      <div key={pt} className="flex items-start gap-3">
                        <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <p className="text-slate-700 text-sm">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">How it works</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight md:text-5xl" style={display}>
              Three steps. Zero hassle.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
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

        {/* ── Services ── */}
        <section id="services" className="bg-white px-6 py-20 text-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Services & pricing</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>Pick what works for you.</h2>
              <p className="mt-3 max-w-lg text-slate-500 text-sm leading-6">
                Our fee covers the pickup, drive, and return. Charging electricity is separate — confirmed before we start.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
              {services.map(s => (
                <div
                  key={s.name}
                  className={`rounded-3xl border p-7 flex flex-col ${s.dark ? "border-emerald-400 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-950"}`}
                >
                  {s.tag && (
                    <span className="mb-4 self-start inline-flex rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-slate-950">{s.tag}</span>
                  )}
                  <h3 className="text-xl font-bold" style={display}>{s.name}</h3>
                  <p className="mt-3 text-4xl font-black" style={display}>{s.price}</p>
                  <p className={`mt-3 text-sm leading-6 ${s.dark ? "text-slate-300" : "text-slate-500"}`}>{s.detail}</p>
                  <div className="mt-6 space-y-3 flex-1">
                    {s.features.map(f => (
                      <div key={f} className="flex items-start gap-3">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <p className={`text-sm ${s.dark ? "text-slate-200" : "text-slate-600"}`}>{f}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => scrollTo("callback")} className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${s.dark ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
                    Check Availability <Icon name="arrow" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="bg-slate-900 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">FAQ</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>Got questions?</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
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

            {/* Before you book subsection */}
            <div className="mt-14">
              <div className="mb-6 border-t border-white/10 pt-10">
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Before you book</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight md:text-3xl" style={display}>
                  The stuff worth knowing upfront.
                </h3>
                <p className="mt-2 text-sm text-slate-400">We'd rather you read this now than be surprised later.</p>
              </div>
              <div className="space-y-3">
                {beforeYouBook.map((item, i) => (
                  <div key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === `b${i}` ? null : `b${i}`)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <h3 className="text-base font-semibold leading-snug pr-2">{item.q}</h3>
                      <Icon
                        name="chevron"
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === `b${i}` ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openFaq === `b${i}` && (
                      <div className="px-5 pb-5">
                        <p className="text-sm leading-7 text-slate-300">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── Callback Form ── */}
        <section id="callback" className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
            <div>
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Get Started</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>Tell us about your situation.</h2>
              <p className="mt-4 leading-8 text-slate-300 text-sm">
                Fill in the basics and we'll call you back to confirm your location, check availability, and walk you through pricing — no commitment, no surprises.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm leading-7 text-slate-300">
                  <span className="font-semibold text-white">This is not a sales call.</span> We call to confirm your postal code is covered, explain exactly what the service costs, and answer any questions — before anything is booked.
                </p>
              </div>

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

            <form
              action="https://formsubmit.co/info@nowcharged.com"
              method="POST"
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8"
            >
              <input type="hidden" name="_subject" value="New NowCharged Callback Request" />
              <input type="hidden" name="_next" value="https://nowcharged.com/thank-you" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">Name *</span>
                  <input name="name" required className={inputCls} placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">Phone number *</span>
                  <input name="phone" required className={inputCls} placeholder="647-555-1234" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">Postal code *</span>
                  <input name="postal_code" required className={inputCls} placeholder="M5V 2T6" />
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

              <label className="mt-4 block">
                <span className="text-sm font-semibold text-slate-300">What do you need? <span className="font-normal text-slate-500">(optional)</span></span>
                <textarea
                  name="message"
                  className={`${inputCls} min-h-28 resize-none`}
                  placeholder="e.g. condo resident, no home charging, want a monthly plan. Or just say 'not sure yet' and we'll walk you through it."
                />
              </label>

              <label className="mt-5 flex items-start gap-3 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" name="contact_consent" required className="mt-1 shrink-0 accent-emerald-400" />
                <span>I agree that NowCharged may contact me about this request.</span>
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3.5 font-bold text-slate-950 hover:bg-emerald-300 transition-colors"
              >
                Get Started <Icon name="arrow" className="h-5 w-5" />
              </button>
            </form>
          </div>
        </section>

        {/* ── Returning Customer Booking ── */}
        <section id="book" className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 md:p-14">
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Booking again?</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                  Pick a time. We'll handle the rest.
                </h2>
                <p className="mt-4 text-slate-300 leading-7">
                  Skip the back-and-forth. Choose a slot that works for you and we'll be there.
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  First time? <button onClick={() => scrollTo("callback")} className="text-emerald-300 hover:text-emerald-200 underline underline-offset-4">Start with a callback</button> so we can confirm coverage in your area.
                </p>
              </div>
              <div className="flex justify-start md:justify-end">
                <a
                  href="https://calendar.app.google/oQTVVQLVHtXfe68f7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-8 py-4 text-base font-bold text-slate-950 hover:bg-emerald-300 transition-colors"
                >
                  Book a time <Icon name="arrow" className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-emerald-400 p-10 text-center text-slate-950 md:p-16">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl" style={display}>
              Your EV deserves a charge.<br />We'll make it happen.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-800">
              Tell us where you are and what you drive. Two minutes to fill out, we call you back and handle everything else.
            </p>
            <button onClick={() => scrollTo("callback")} className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-base font-bold text-white hover:bg-slate-800 transition-colors">
              Get Started Today <Icon name="arrow" className="h-5 w-5" />
            </button>
          </div>
        </section>

        {/* ── Careers ── */}
        <section id="careers" className="bg-slate-900 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Careers</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                Drive with NowCharged.
              </h2>
              <p className="mt-4 max-w-xl text-slate-300 text-sm leading-7">
                We're looking for reliable, professional drivers in Toronto and the GTA to join NowCharged as independent contractors. You set your availability — we send you the jobs.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Role card */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                  <Icon name="car" className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold" style={display}>EV Valet Driver</h3>
                <p className="mt-1 text-sm text-slate-400">Independent Contractor · Toronto & GTA · Flexible</p>

                <div className="mt-6 space-y-3">
                  {[
                    "Pick up customer EVs from their parking spot",
                    "Drive to a nearby DC fast charger and charge the vehicle",
                    "Return the car to the customer's spot",
                    "Work on-call — jobs are sent when available, you choose to accept",
                    "Competitive hourly pay, paid per completed job",
                  ].map(pt => (
                    <div key={pt} className="flex items-start gap-3">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <p className="text-sm text-slate-300">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements + apply card */}
              <div className="flex flex-col gap-6">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                  <h3 className="text-lg font-bold mb-4" style={display}>What we're looking for</h3>
                  <div className="space-y-3">
                    {[
                      "Valid Ontario G driver's licence",
                      "Clean driving record",
                      "Comfortable driving electric vehicles",
                      "Familiarity with public DC fast charging is a plus",
                      "Reliable, punctual, and professional with customer vehicles",
                      "Based in Toronto or the GTA",
                    ].map(pt => (
                      <div key={pt} className="flex items-start gap-3">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <p className="text-sm text-slate-300">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/5 p-8">
                  <h3 className="text-lg font-bold" style={display}>How to apply</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Send a short email introducing yourself, your driving experience, and your general availability. Successful applicants will be asked to review and sign an independent contractor agreement before onboarding.
                  </p>
                  <a
                    href="mailto:info@nowcharged.com?subject=Driver Application – NowCharged"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-colors"
                  >
                    Email us to apply <Icon name="arrow" className="h-4 w-4" />
                  </a>
                  <p className="mt-4 text-xs text-slate-500">
                    Send your email to info@nowcharged.com — we'll get back to you within a few business days.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-bold text-white" style={display}>NowCharged</p>
            <p className="mt-1 text-sm text-slate-400">EV Charging Valet · Toronto & Greater Toronto Area</p>
            <p className="mt-1 text-sm text-slate-400">
              <a href="mailto:info@nowcharged.com" className="hover:text-white transition-colors">info@nowcharged.com</a>
            </p>
            <p className="mt-1 text-sm text-slate-500">© 2026 NowCharged. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            {[["how","How it works"],["services","Services"],["callback","Get Started"],["faq","FAQ"],["careers","Careers"]].map(([id,l])=>(
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-white transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
