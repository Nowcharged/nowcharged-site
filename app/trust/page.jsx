"use client";

import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
*, html { scroll-behavior: smooth; }`;

const display = { fontFamily: "'Manrope', sans-serif" };
const body = { fontFamily: "'DM Sans', system-ui, sans-serif" };

function Icon({ name, className = "h-6 w-6" }) {
  const p = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const icons = {
    zap:     <svg {...p}><path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z" /></svg>,
    arrow:   <svg {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
    arrowL:  <svg {...p}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>,
    xclose:  <svg {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>,
    menu:    <svg {...p}><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>,
    check:   <svg {...p}><path d="M20 6 9 17l-5-5" /></svg>,
    shield:  <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></svg>,
    user:    <svg {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    eye:     <svg {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>,
    document: <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></svg>,
    key:     <svg {...p}><circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" /></svg>,
    camera:  <svg {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="3" /></svg>,
  };
  return icons[name] || icons.zap;
}

// Shared nav header used across all sub-pages
function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "/#how", label: "How it works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/tools", label: "Find your EV" },
    { href: "/chargers", label: "Chargers 101" },
    { href: "/trust", label: "Trust" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
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

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-300 hover:text-white"
          aria-label="Menu"
        >
          <Icon name={menuOpen ? "xclose" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950 px-6 py-5">
          <nav className="flex flex-col gap-4 text-sm">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-white">{link.label}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default function TrustSafetyPage() {
  const pillars = [
    {
      icon: "user",
      title: "Vetted drivers",
      detail: "Every driver passes a clean driving record check, criminal background check, and an interview before they ever touch a customer's vehicle.",
    },
    {
      icon: "shield",
      title: "Fully insured",
      detail: "We carry the commercial insurance designed for businesses that handle customer vehicles. Details available on request.",
    },
    {
      icon: "camera",
      title: "Photo documentation",
      detail: "Every job starts with photos of your vehicle at pickup and ends with photos at return. You see the exact condition we received and returned the car in.",
    },
    {
      icon: "document",
      title: "Signed service agreement",
      detail: "Every customer receives a clear service agreement before the first job. No hidden terms, no surprises, no fine print buried in a contract.",
    },
    {
      icon: "key",
      title: "Secure key handoff",
      detail: "Keys are handled in person, through a building concierge, or with a lockbox you control. We never keep keys overnight.",
    },
    {
      icon: "eye",
      title: "Transparent communication",
      detail: "You hear from us before pickup, after pickup, and at return. We tell you exactly what's happening at every stage, no guessing.",
    },
  ];

  const drivers = [
    "Valid Ontario G driver's licence",
    "Clean driving abstract for the past 6 years",
    "Criminal background check via local police",
    "Comfortable driving electric vehicles",
    "Knowledge of public DC fast charging networks",
    "Professional, respectful, and punctual",
    "Signed independent contractor agreement",
  ];

  const damageProcess = [
    {
      step: "1",
      title: "Photos at pickup",
      text: "Your driver photographs your vehicle from multiple angles before moving it. This is your baseline.",
    },
    {
      step: "2",
      title: "If something happens",
      text: "Our driver contacts you immediately. We don't try to hide or minimize anything that goes wrong.",
    },
    {
      step: "3",
      title: "Photos at return",
      text: "Photos taken again at drop-off. You can compare them yourself with the pickup photos.",
    },
    {
      step: "4",
      title: "We make it right",
      text: "If something happens that's on us, we handle it. Our coverage is in place for exactly this kind of situation. We don't make customers chase claims alone.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={body}>
      <style>{FONTS}</style>

      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-6 py-20 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(52,211,153,0.16),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(56,189,248,0.09),transparent_45%)]" />
          <div className="relative mx-auto max-w-5xl">
            <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Trust & Safety</p>
            <h1 className="mt-4 text-5xl font-black leading-[1.04] tracking-tight md:text-7xl" style={display}>
              Your car deserves better than a stranger.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              We're handing the keys back to people who already trust us. Here's exactly how we earn that trust.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">How we protect you</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                Six things we do every job.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pillars.map(p => (
                <div key={p.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300 mb-5">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={display}>{p.title}</h3>
                  <p className="text-sm leading-7 text-slate-300">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Driver standards</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                Not just anyone drives your car.
              </h2>
              <p className="mt-3 max-w-xl text-slate-400 text-sm leading-7">
                Every NowCharged driver meets all of these requirements before their first job. No exceptions.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
              <div className="space-y-4">
                {drivers.map(d => (
                  <div key={d} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm text-slate-200 leading-7">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">If something goes wrong</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl" style={display}>
                A clear process. No drama.
              </h2>
              <p className="mt-3 max-w-xl text-slate-400 text-sm leading-7">
                Things rarely go wrong. When they do, here's exactly what happens.
              </p>
            </div>

            <div className="space-y-4">
              {damageProcess.map(d => (
                <div key={d.step} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 text-xl font-black" style={display}>
                      {d.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={display}>{d.title}</h3>
                      <p className="text-sm leading-7 text-slate-300">{d.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-emerald-400 p-10 text-center text-slate-950 md:p-16">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl" style={display}>
              Confident? Let's go.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-800">
              Every question gets answered on the call before any booking. No commitment to reach out.
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
