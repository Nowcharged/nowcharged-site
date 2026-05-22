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
    chevron: <svg {...p}><path d="m6 9 6 6 6-6" /></svg>,
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

export default function FAQPage() {
  const [openId, setOpenId] = useState(null);

  const sections = [
    {
      title: "The basics",
      faqs: [
        {
          q: "What is NowCharged exactly?",
          a: "We're an EV charging valet service. A driver picks up your electric vehicle from your parking spot, takes it to a nearby DC fast charger, charges it, and returns it to you. We're not a portable charger that comes to your car, and we're not roadside assistance.",
        },
        {
          q: "What areas do you cover?",
          a: "Toronto and the Greater Toronto Area. Drop your postal code in our callback form and we'll confirm right away whether we cover your area.",
        },
        {
          q: "Is this emergency or roadside service?",
          a: "No. NowCharged is scheduled only. We don't do emergency dispatch or roadside recovery for stranded vehicles. Everything is planned in advance.",
        },
        {
          q: "Does filling out the callback form book a job?",
          a: "No. The form just asks us to call you. Nothing is booked or charged until we've spoken with you, you know the price, and you say go.",
        },
      ],
    },
    {
      title: "How the service works",
      faqs: [
        {
          q: "Do you actually drive my car?",
          a: "Yes. Our driver picks up your vehicle, drives it to a nearby DC fast charger, and returns it to your spot. Insurance details are reviewed with you by phone before any booking is confirmed.",
        },
        {
          q: "What type of charger do you use?",
          a: "We use DC fast chargers at public charging stations near you. Not portable units, not Level 2 home chargers. We drive your EV to the charger, charge it quickly, and bring it back.",
        },
        {
          q: "How long does the whole thing take?",
          a: "Most visits take 45 minutes to a couple of hours. The exact time depends on your battery state and which charger we use. We give you the expected window before we start.",
        },
        {
          q: "Do I need to be there for pickup or drop-off?",
          a: "Nope. Most customers leave their car in their spot. We sort out the key handoff, access codes, and parking details during the callback so there are no surprises on the day.",
        },
        {
          q: "How does key handoff work?",
          a: "Multiple options. We can meet you in person, your building concierge can hand the keys over, or you can use a lockbox you control. We confirm the method during the callback.",
        },
      ],
    },
    {
      title: "Pricing & payment",
      faqs: [
        {
          q: "Are charging costs included in the service fee?",
          a: "No. Our fee covers the pickup, drive, and return. DC fast charging electricity is billed separately and at-cost. Both are confirmed before we start. No surprises.",
        },
        {
          q: "How do I pay?",
          a: "E-transfer or cash. We send an invoice after each completed service.",
        },
        {
          q: "Can I cancel a booking?",
          a: "Cancellations more than 2 hours before pickup are free. Within 2 hours, a small cancellation fee may apply to cover the driver's time.",
        },
        {
          q: "What if the charger is broken or unavailable?",
          a: "If we can't complete the service because of charger issues outside our control, we'll discuss next steps with you by phone. You won't be charged the full fee for a service we couldn't deliver.",
        },
      ],
    },
    {
      title: "Safety & trust",
      faqs: [
        {
          q: "Is my car safe when you drive it?",
          a: "Yes. Every driver passes a clean driving record check, criminal background check, and an interview before they ever touch a customer's vehicle. Photos of your car are taken at pickup and return.",
        },
        {
          q: "What if my car gets damaged?",
          a: "Photos taken at pickup and return give you a clear baseline. For driving-related incidents, the driver's auto insurance and our commercial coverage handle the claim. We provide all documentation.",
        },
        {
          q: "Can you guarantee how much charge my car gets?",
          a: "Honestly, no. Battery state, charger speed, and appointment length all affect the result. We give you a real estimate on the call based on your specific car and situation, not a number we can't back up.",
        },
        {
          q: "Will my insurance cover this?",
          a: "Most personal auto insurance policies allow third-party drivers for valet services, but it's worth confirming with your insurer before booking. We're happy to share proof of our commercial coverage if helpful.",
        },
      ],
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
            <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">FAQ</p>
            <h1 className="mt-4 text-5xl font-black leading-[1.04] tracking-tight md:text-7xl" style={display}>
              Every question, answered.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Everything we get asked, organized by topic. Don't see your question? Email us at info@nowcharged.com.
            </p>
          </div>
        </section>

        {sections.map((section, sIdx) => (
          <section key={section.title} className={`px-6 py-16 ${sIdx % 2 === 1 ? "bg-slate-900" : ""}`}>
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-black tracking-tight md:text-3xl mb-8" style={display}>
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.faqs.map((faq, fIdx) => {
                  const id = `${sIdx}-${fIdx}`;
                  return (
                    <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
                      <button
                        onClick={() => setOpenId(openId === id ? null : id)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                      >
                        <h3 className="text-base font-semibold leading-snug pr-2">{faq.q}</h3>
                        <Icon
                          name="chevron"
                          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${openId === id ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openId === id && (
                        <div className="px-5 pb-5">
                          <p className="text-sm leading-7 text-slate-300">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-emerald-400 p-10 text-center text-slate-950 md:p-16">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl" style={display}>
              Still have questions?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-800">
              The callback is the easiest way to get answers specific to your situation. Or email us anytime.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-base font-bold text-white hover:bg-slate-800 transition-colors">
                Get Started <Icon name="arrow" className="h-5 w-5" />
              </a>
              <a href="mailto:info@nowcharged.com" className="inline-flex items-center gap-2 rounded-full border-2 border-slate-950 px-7 py-3.5 text-base font-bold text-slate-950 hover:bg-slate-950/10 transition-colors">
                Email us
              </a>
            </div>
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
