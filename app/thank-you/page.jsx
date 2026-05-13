"use client";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-20" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');`}</style>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(52,211,153,0.16),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(56,189,248,0.09),transparent_45%)] pointer-events-none" />

      <div className="relative mx-auto max-w-2xl text-center">

        {/* Logo */}
        <a href="/" className="inline-flex items-center gap-3 mb-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xl font-extrabold tracking-tight leading-none" style={{ fontFamily: "'Manrope', sans-serif" }}>NowCharged</p>
            <p className="text-xs text-slate-400 mt-1">EV Charging Valet · Toronto & GTA</p>
          </div>
        </a>

        {/* Big checkmark */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-5xl font-black tracking-tight md:text-6xl" style={{ fontFamily: "'Manrope', sans-serif" }}>
          We've got it from here.
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          Your request is in. We'll give you a call shortly to confirm your location, walk through pricing, and answer any questions — before anything is booked.
        </p>

        {/* What happens next */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8 text-left">
          <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider mb-5">What happens next</p>
          <div className="space-y-4">
            {[
              { num: "1", text: "We review your request and confirm we cover your postal code" },
              { num: "2", text: "We call you back to walk through pricing and timing" },
              { num: "3", text: "Once you approve, we lock in your booking" },
            ].map(step => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/15 text-sm font-bold text-emerald-300 shrink-0">
                  {step.num}
                </div>
                <p className="text-slate-300 leading-7 pt-1">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-400">
          Need to reach us in the meantime? Email{" "}
          <a href="mailto:info@nowcharged.com" className="text-emerald-300 hover:text-emerald-200 underline underline-offset-4">
            info@nowcharged.com
          </a>
        </p>

        <a
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base text-white hover:bg-white/10 transition-colors"
        >
          ← Back to homepage
        </a>
      </div>
    </div>
  );
}
