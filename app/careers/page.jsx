"use client";

import { useState } from "react";

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
    xclose:  <svg {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>,
    menu:    <svg {...p}><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>,
    check:   <svg {...p}><path d="M20 6 9 17l-5-5" /></svg>,
    car:     <svg {...p}><path d="M5 17h14" /><path d="M6 17v2" /><path d="M18 17v2" /><path d="M4 13 6.2 7.5A2.4 2.4 0 0 1 8.4 6h7.2a2.4 2.4 0 0 1 2.2 1.5L20 13" /><path d="M3 13h18v4H3z" /><circle cx="7" cy="15" r="1" /><circle cx="17" cy="15" r="1" /></svg>,
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

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white" style={body}>
      <style>{FONTS}</style>

      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-6 py-20 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(52,211,153,0.16),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(56,189,248,0.09),transparent_45%)]" />
          <div className="relative mx-auto max-w-5xl">
            <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Careers</p>
            <h1 className="mt-4 text-5xl font-black leading-[1.04] tracking-tight md:text-7xl" style={display}>
              Drive with NowCharged.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              We're looking for reliable, professional drivers in Toronto and the GTA. You set your availability. We send you the jobs.
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2">

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                  <Icon name="car" className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-black" style={display}>EV Valet Driver</h2>
                <p className="mt-1 text-sm text-slate-400">Independent Contractor · Toronto & GTA · Flexible</p>

                <div className="mt-8">
                  <p className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">What you'll do</p>
                  <div className="space-y-3">
                    {[
                      "Pick up customer EVs from their parking spot",
                      "Drive to a nearby DC fast charger and supervise the session",
                      "Return the car to the customer's spot",
                      "Work on-call. Jobs are sent when available, you choose to accept",
                      "Document vehicle condition at pickup and return",
                    ].map(pt => (
                      <div key={pt} className="flex items-start gap-3">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <p className="text-sm text-slate-200 leading-6">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                  <p className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">What we're looking for</p>
                  <div className="space-y-3">
                    {[
                      "Valid Ontario G driver's licence",
                      "Clean driving record",
                      "Comfortable driving electric vehicles",
                      "Familiarity with public DC fast charging is a plus",
                      "Reliable, punctual, and professional",
                      "Based in Toronto or the GTA",
                    ].map(pt => (
                      <div key={pt} className="flex items-start gap-3">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <p className="text-sm text-slate-200 leading-6">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-emerald-400/40 bg-emerald-400/5 p-8">
                  <h3 className="text-xl font-bold" style={display}>How to apply</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Send a short email introducing yourself, your driving experience, and your general availability. Successful applicants will be asked to sign an independent contractor agreement before onboarding.
                  </p>
                  <a
                    href="mailto:info@nowcharged.com?subject=Driver Application – NowCharged"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-colors"
                  >
                    Email us to apply <Icon name="arrow" className="h-4 w-4" />
                  </a>
                  <p className="mt-4 text-xs text-slate-500">
                    We'll get back to you within a few business days.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">What to expect</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl" style={display}>
                How the contractor relationship works.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-base font-bold mb-2" style={display}>You're a contractor, not an employee</p>
                <p className="text-sm leading-6 text-slate-300">No salary, no taxes withheld. You're responsible for your own income taxes and HST if applicable.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-base font-bold mb-2" style={display}>Paid per completed job</p>
                <p className="text-sm leading-6 text-slate-300">Flat rate per service, paid via e-transfer or cash. Rate confirmed before each job.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-base font-bold mb-2" style={display}>You choose your jobs</p>
                <p className="text-sm leading-6 text-slate-300">We send job offers based on your location and availability. You accept or decline.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-base font-bold mb-2" style={display}>You bring yourself to the job</p>
                <p className="text-sm leading-6 text-slate-300">You're responsible for getting to and from the customer's location.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-emerald-400 p-10 text-center text-slate-950 md:p-16">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl" style={display}>
              Sound like a fit?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-800">
              Send us an email. We'll get back to you in a few business days.
            </p>
            <a
              href="mailto:info@nowcharged.com?subject=Driver Application – NowCharged"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-base font-bold text-white hover:bg-slate-800 transition-colors"
            >
              Apply by email <Icon name="arrow" className="h-5 w-5" />
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
