import React from "react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-400 text-3xl font-black text-slate-950">
          ✓
        </div>

        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          Thanks we received your request.
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300 md:text-xl">
          A NowCharged representative will review your callback request and get back to you shortly.
        </p>

        <p className="mt-4 text-sm text-slate-400">
           We will contact you to confirm availability, timing, and next steps.
        </p>

        <a
          href="/"
          className="mt-8 inline-flex rounded-full bg-emerald-400 px-7 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
        >
          Back to NowCharged
        </a>
      </div>
    </main>
  );
}
