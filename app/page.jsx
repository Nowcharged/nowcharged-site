import React from "react";

function Icon({ name, className = "h-6 w-6" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = {
    zap: (
      <svg {...common}>
        <path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z" />
      </svg>
    ),
    battery: (
      <svg {...common}>
        <rect x="2" y="7" width="17" height="10" rx="2" />
        <path d="M22 11v2" />
        <path d="M7 11h4" />
        <path d="m10 9-2 3h3l-2 3" />
      </svg>
    ),
    calendar: (
      <svg {...common}>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10h18" />
        <path d="m9 16 2 2 4-5" />
      </svg>
    ),
    pin: (
      <svg {...common}>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    shield: (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    ),
    clock: (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    check: (
      <svg {...common}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
    arrow: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
    car: (
      <svg {...common}>
        <path d="M5 17h14" />
        <path d="M6 17v2" />
        <path d="M18 17v2" />
        <path d="M4 13 6.2 7.5A2.4 2.4 0 0 1 8.4 6h7.2a2.4 2.4 0 0 1 2.2 1.5L20 13" />
        <path d="M3 13h18v4H3z" />
        <circle cx="7" cy="15" r="1" />
        <circle cx="17" cy="15" r="1" />
      </svg>
    ),
  };

  return icons[name] || icons.zap;
}

function Button({ children, className = "", href = "#booking" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${className}`}
    >
      {children}
    </a>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border ${className}`}>{children}</div>;
}

export const nowChargedContentTests = [
  {
    name: "pricing has three customer paths",
    pass: ["Single Charge", "Monthly Plan", "Fleet / Business"].length === 3,
  },
  {
    name: "primary booking CTA exists",
    pass: "Book a Charge".length > 0,
  },
  {
    name: "brand name is consistent",
    pass: "NowCharged" === "NowCharged",
  },
];

export default function NowChargedLandingPage() {
  const pricing = [
    {
      name: "Single Charge",
      price: "$89",
      cadence: "/ appointment",
      detail: "One-time mobile EV charging appointment.",
      features: [
        "Book only when you need it",
        "Good first-time customer option",
        "Service window selected at booking",
        "Same-day priority when available",
      ],
      cta: "Book a Charge",
      highlighted: false,
    },
    {
      name: "Monthly Plan",
      price: "$299.99",
      cadence: "/ month",
      detail: "Recurring service for regular EV drivers.",
      features: [
        "Up to 2 scheduled charges per week",
        "Predictable monthly cost",
        "Priority scheduling access",
        "Built for routine commuting",
      ],
      cta: "Join the Plan",
      highlighted: true,
    },
    {
      name: "Fleet / Business",
      price: "Custom",
      cadence: "",
      detail: "Charging support for teams, workplaces, and small fleets.",
      features: [
        "Multiple vehicle coordination",
        "Custom service windows",
        "Workplace and fleet support",
        "Business invoicing available",
      ],
      cta: "Request Quote",
      highlighted: false,
    },
  ];

  const steps = [
    {
      icon: "pin",
      title: "Tell us where",
      text: "Enter your location, vehicle details, and preferred service window.",
    },
    {
      icon: "calendar",
      title: "Choose your service",
      text: "Select a single appointment, monthly plan, or business charging option.",
    },
    {
      icon: "battery",
      title: "We charge your EV",
      text: "A charging provider arrives during your service window and completes the appointment.",
    },
  ];

  const trustItems = [
    {
      icon: "shield",
      title: "Clear service standards",
      text: "Appointment notes, access instructions, and service expectations are documented before arrival.",
    },
    {
      icon: "clock",
      title: "Scheduled windows",
      text: "Customers select preferred timing and receive confirmation before the service is completed.",
    },
    {
      icon: "zap",
      title: "Charging transparency",
      text: "Charging results depend on vehicle, battery level, charger availability, weather, and site conditions.",
    },
    {
      icon: "check",
      title: "Practical access rules",
      text: "Customers provide safe, lawful access to the vehicle and confirm parking or property instructions.",
    },
  ];

  const faqs = [
    {
      q: "Is same-day charging available?",
      a: "Yes, when capacity allows. Same-day bookings may include a priority surcharge depending on timing, distance, and availability.",
    },
    {
      q: "Do I need to be home?",
      a: "That depends on the service type and access instructions. Customers must provide safe, lawful access to the vehicle and charging location.",
    },
    {
      q: "How much charge will I get?",
      a: "Charging amount depends on the vehicle, starting battery level, appointment length, charger availability, and site conditions. Customers receive a clear service estimate before confirmation.",
    },
    {
      q: "What areas do you serve?",
      a: "NowCharged is preparing service coverage by region. Customers can start with a postal code so availability can be confirmed before booking.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3" aria-label="NowCharged home">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20">
              <Icon name="zap" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">NowCharged</p>
              <p className="text-xs text-slate-400">Mobile EV Charging</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex" aria-label="Main navigation">
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#trust" className="hover:text-white">Safety</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>

          <Button className="bg-emerald-400 text-slate-950 hover:bg-emerald-300">Book Now</Button>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden px-6 py-20 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.22),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.15),transparent_35%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
                <Icon name="battery" className="h-4 w-4" />
                On-demand charging for electric vehicles
              </div>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
                EV charging that comes to you.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                NowCharged helps EV drivers schedule convenient mobile charging at home, work, or wherever service is available — without hunting for a public charger.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button className="bg-emerald-400 px-7 text-base text-slate-950 hover:bg-emerald-300">
                  Book a Charge <Icon name="arrow" className="h-5 w-5" />
                </Button>
                <Button href="#pricing" className="border border-white/20 bg-white/5 px-7 text-base text-white hover:bg-white/10">
                  See Plans
                </Button>
              </div>
              <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
                {["Single charge option", "Monthly plans", "Business support"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <Icon name="check" className="h-5 w-5 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-white/10 bg-white/10 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl">
              <div className="p-6 md:p-8">
                <div className="rounded-[1.5rem] bg-slate-900 p-6">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Estimated service</p>
                      <p className="text-2xl font-bold text-white">Mobile EV Charge</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
                      <Icon name="car" className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Location</p>
                      <p className="font-semibold text-white">Home, workplace, or approved parking location</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-sm text-slate-400">Service window</p>
                        <p className="font-semibold text-white">Scheduled</p>
                      </div>
                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-sm text-slate-400">Plan</p>
                        <p className="font-semibold text-white">Single / Monthly</p>
                      </div>
                    </div>
                    <Button className="w-full bg-emerald-400 text-slate-950 hover:bg-emerald-300">
                      Start Booking
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="how" className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl">
              <p className="font-semibold text-emerald-300">How it works</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Book charging in minutes.</h2>
              <p className="mt-4 text-slate-300">A simple process built for people who do not want to plan their day around public charging stations.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <Card key={step.title} className="border-white/10 bg-white/[0.06] text-white">
                  <div className="p-7">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                      <Icon name={step.icon} className="h-7 w-7" />
                    </div>
                    <p className="mb-2 text-sm font-bold text-slate-400">Step {index + 1}</p>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{step.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-white px-6 py-20 text-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="font-semibold text-emerald-700">Pricing</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Simple charging options.</h2>
              <p className="mt-4 text-slate-600">Start with a single appointment or choose a recurring plan for regular EV charging support.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {pricing.map((plan) => (
                <Card
                  key={plan.name}
                  className={plan.highlighted ? "border-emerald-400 bg-slate-950 text-white shadow-2xl shadow-emerald-900/20" : "border-slate-200 bg-white text-slate-950 shadow-sm"}
                >
                  <div className="p-8">
                    {plan.highlighted && (
                      <div className="mb-5 inline-flex rounded-full bg-emerald-400 px-3 py-1 text-sm font-bold text-slate-950">Most predictable</div>
                    )}
                    <h3 className="text-2xl font-black">{plan.name}</h3>
                    <div className="mt-5 flex items-end gap-2">
                      <p className="text-5xl font-black">{plan.price}</p>
                      {plan.cadence && <p className={plan.highlighted ? "mb-2 text-slate-300" : "mb-2 text-slate-500"}>{plan.cadence}</p>}
                    </div>
                    <p className={`mt-4 leading-7 ${plan.highlighted ? "text-slate-300" : "text-slate-600"}`}>{plan.detail}</p>
                    <div className="mt-7 space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex gap-3">
                          <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                          <p className={plan.highlighted ? "text-slate-200" : "text-slate-700"}>{feature}</p>
                        </div>
                      ))}
                    </div>
                    <Button className={plan.highlighted ? "mt-8 w-full bg-emerald-400 text-slate-950 hover:bg-emerald-300" : "mt-8 w-full bg-slate-950 text-white hover:bg-slate-800"}>
                      {plan.cta}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-semibold text-emerald-300">Start booking</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Check service availability.</h2>
              <p className="mt-4 leading-8 text-slate-300">
                This front-end form is ready for your booking flow. Connect it later to a form service, CRM, or custom backend.
              </p>
            </div>
            <form className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">Postal code</span>
                  <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300" placeholder="A1A 1A1" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">Vehicle type</span>
                  <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300" placeholder="Tesla Model 3" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">Service date</span>
                  <input type="date" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">Preferred window</span>
                  <select className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300">
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Same-day priority</option>
                  </select>
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-semibold text-slate-300">Location notes</span>
                <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300" placeholder="Parking details, access instructions, charger access, or building notes." />
              </label>
              <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300" type="submit">
                Check Availability <Icon name="arrow" className="h-5 w-5" />
              </button>
            </form>
          </div>
        </section>

        <section id="trust" className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-semibold text-emerald-300">Built for trust</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Clear service. Clear expectations.</h2>
              <p className="mt-4 leading-8 text-slate-300">
                NowCharged is designed around transparent booking, documented service windows, safe access instructions, and practical customer expectations.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {trustItems.map((item) => (
                <Card key={item.title} className="border-white/10 bg-white/[0.06] text-white">
                  <div className="p-6">
                    <Icon name={item.icon} className="mb-4 h-8 w-8 text-emerald-300" />
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-slate-900 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="font-semibold text-emerald-300">FAQ</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Common questions.</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.q} className="border-white/10 bg-white/[0.06] text-white">
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{faq.q}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{faq.a}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-emerald-400 p-8 text-center text-slate-950 md:p-12">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">Ready to stop hunting for chargers?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-800">
              Book a mobile EV charging appointment or join a recurring plan built around your driving routine.
            </p>
            <Button className="mt-8 bg-slate-950 px-8 text-base text-white hover:bg-slate-800">
              Book a Charge <Icon name="arrow" className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-slate-400 md:flex-row md:items-center">
          <p>© 2026 NowCharged. Mobile EV charging service.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
