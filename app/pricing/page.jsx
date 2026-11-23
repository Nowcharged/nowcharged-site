"use client";

const FONTS = `
*, html { scroll-behavior: smooth; }`;

const display = { fontFamily: "'Manrope', sans-serif" };
const body = { fontFamily: "'DM Sans', system-ui, sans-serif" };

function Icon({ name, className = "h-6 w-6" }) {
  const p = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const icons = {
    zap:     <svg {...p}><path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z" /></svg>,
    arrow:   <svg {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
    arrowL:  <svg {...p}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>,
    check:   <svg {...p}><path d="M20 6 9 17l-5-5" /></svg>,
    x:       <svg {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>,
  };
  return icons[name] || icons.zap;
}

export default function PricingPage() {
  const tiers = [
    {
      name: "Scheduled Charge",
      price: "$50",
      sub: "per visit",
      detail: "A planned pickup. Best when you can give us a day's notice.",
      features: [
        "Pickup from your parking spot",
        "Drive to a nearby DC fast charger",
        "Charging while we wait",
        "Return to your spot",
      ],
      highlighted: false,
    },
    {
      name: "Same-Day / Priority",
      price: "$75",
      sub: "per visit",
      detail: "Need it today? We do our best when availability allows.",
      features: [
        "Same-day pickup when slots are open",
        "Confirmed by phone before we start",
        "Faster turnaround",
        "Subject to availability",
      ],
      highlighted: true,
    },
    {
      name: "Monthly Plan",
      price: "Custom",
      sub: "talk to us",
      detail: "For drivers who charge with us regularly. Lower per-visit pricing.",
      features: [
        "Recurring scheduled pickups",
        "Preferred time slots locked in",
        "Pricing based on frequency",
        "Better rate than one-off bookings",
      ],
      highlighted: false,
    },
  ];

  const whatIncluded = [
    { included: true, text: "Driver pickup at your parking spot" },
    { included: true, text: "Driving to and from the charger" },
    { included: true, text: "Supervision during the charging session" },
    { included: true, text: "Photo documentation of your vehicle" },
    { included: true, text: "Return to your designated spot" },
  ];

  const whatExtra = [
    { included: false, text: "DC fast charging electricity costs (billed separately at-cost)" },
    { included: false, text: "Parking fees at the charging location, if any" },
    { included: false, text: "Tolls or special access fees, if applicable" },
    { included: false, text: "HST (added to final invoice)" },
  ];

  const faqs = [
    { q: "Do you charge by time or per visit?", a: "Per visit. Our flat fee covers the whole job from pickup to return, regardless of how long the charging session takes." },
    { q: "What if the charger is broken or unavailable?", a: "If we can't complete the service because of charger issues outside our control, we'll discuss next steps with you by phone. You won't be charged the full fee for a service we couldn't deliver." },
    { q: "Are tips expected?", a: "Tips are appreciated but never expected. Your driver is paid for the job either way." },
    { q: "How do I pay?", a: "E-transfer or cash. We'll send you an invoice after each completed service." },
    { q: "Can I cancel?", a: "Cancellations more than 2 hours before pickup are free. Within 2 hours, a small cancellation fee may apply to cover the driver's time." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={body}>
      <style>{FONTS}</style>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
              <Icon name="zap" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight leading-none" style={display}>NowCharged</p>
              <p className="text-xs text-slate-400 mt-0.5">EV Charging Valet · Toronto & GTA</p>
            </div>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <Icon name="arrowL" className="h-4 w-4" /> Back to home
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 py-20 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(52,211,153,0.16),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(56,189,248,0.09),transparent_45%)]" />
          <div className="relative mx-auto max-w-5xl">
            <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Pricing</p>
            <h1 className="mt-4 text-5xl font-black leading-[1.04] tracking-tight md:text-7xl" style={display}>
              Simple pricing. No surprises.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Our service fee is flat. Charging electricity is billed separately at-cost. Everything else is reviewed with you on the call before we start.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {tiers.map(t => (
                <div
                  key={t.name}
                  className={`rounded-3xl border p-8 flex flex-col ${t.highlighted ? "border-emerald-400 bg-slate-900 shadow-2xl shadow-emerald-900/20" : "border-white/10 bg-white/[0.04]"}`}
                >
                  {t.highlighted && (
                    <span className="self-start mb-5 inline-flex rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-slate-950">Most requested</span>
                  )}
                  <h3 className="text-xl font-bold" style={display}>{t.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <p className="text-5xl font-black" style={display}>{t.price}</p>
                    <p className="text-sm text-slate-400">{t.sub}</p>
                  </div>
                  <p className="mt-3 text-sm text-slate-400 leading-6">{t.detail}</p>
                  <div className="mt-6 space-y-3 flex-1">
                    {t.features.map(f => (
                      <div key={f} className="flex items-start gap-3">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <p className="text-sm text-slate-300">{f}</p>
                      </div>
                    ))}
                  </div>
                  <a href="/" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-colors">
                    Get Started <Icon name="arrow" className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">What's included</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                In the price, and outside of it.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/5 p-7">
                <h3 className="text-lg font-bold text-emerald-300 mb-5" style={display}>What's in your service fee</h3>
                <div className="space-y-3">
                  {whatIncluded.map(item => (
                    <div key={item.text} className="flex items-start gap-3">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <p className="text-sm text-slate-200">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <h3 className="text-lg font-bold text-slate-200 mb-5" style={display}>Billed separately</h3>
                <div className="space-y-3">
                  {whatExtra.map(item => (
                    <div key={item.text} className="flex items-start gap-3">
                      <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                      <p className="text-sm text-slate-300">{item.text}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-xs text-slate-500 leading-6">
                  All extra costs are confirmed by phone before we start. Nothing is added without your approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Pricing FAQ</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                What people ask about cost.
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map(f => (
                <div key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <p className="text-base font-semibold mb-3" style={display}>{f.q}</p>
                  <p className="text-sm leading-7 text-slate-300">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Returning customer booking */}
        <section className="bg-slate-900 px-6 py-16">
          <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-400/30 bg-emerald-400/5 p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-center">
              <div>
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Returning customer</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight" style={display}>Already worked with us?</h2>
                <p className="mt-3 text-sm text-slate-300 leading-7">
                  Skip the callback. Pick a time slot that works and we'll be there.
                </p>
              </div>
              <div className="flex justify-start md:justify-end">
                <a
                  href="https://calendar.app.google/oQTVVQLVHtXfe68f7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-colors"
                >
                  Book a time <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-emerald-400 p-10 text-center text-slate-950 md:p-16">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl" style={display}>
              Ready to skip the wait?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-800">
              Pick a service level and we'll handle the rest. The first call confirms everything.
            </p>
            <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-base font-bold text-white hover:bg-slate-800 transition-colors">
              Get Started <Icon name="arrow" className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

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
        </div>
      </footer>
    </div>
  );
}
