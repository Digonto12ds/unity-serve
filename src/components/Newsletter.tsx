
import Link from "next/link";
import {
  ArrowUpRight,
  BellRing,
  Heart,
  Mail,
  Send,
  Sparkles,
  Users,
} from "lucide-react";

const Newsletter = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-20 transition-colors duration-300 sm:py-24 dark:bg-slate-950">

      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />

      <div className="container relative mx-auto max-w-6xl">

        {/* Main newsletter card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">

          {/* Decorative background */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-linear-to-bl from-emerald-500/10 to-transparent" />
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-emerald-500/10" />
          <div className="pointer-events-none absolute -right-10 -top-20 h-60 w-60 rounded-full border border-emerald-500/10" />

          <div className="relative grid items-center gap-12 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-16">

            {/* LEFT CONTENT */}
            <div>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <BellRing size={15} />
                Stay Inspired
              </div>

              {/* Heading */}
              <h2 className="max-w-xl text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
                Be the First to
                <span className="block bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                  Make an Impact.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-lg text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
                Good things are happening around you. Get inspiring stories,
                upcoming volunteer opportunities, and community updates
                delivered straight to your inbox.
              </p>

              {/* Email subscription UI */}
              <div className="mt-9">
                <label
                  htmlFor="newsletter-email"
                  className="mb-3 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  Your email address
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-300 bg-slate-50 px-4 transition-colors focus-within:border-emerald-500 dark:border-slate-700 dark:bg-slate-950">
                    <Mail size={19} className="shrink-0 text-emerald-600 dark:text-emerald-400" />

                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-14 w-full min-w-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  {/* UI only */}
                  <button
                    type="button"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700"
                  >
                    Join the Community
                    <ArrowUpRight size={19} />
                  </button>
                </div>

                <p className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Heart size={13} className="text-emerald-600 dark:text-emerald-400" />
                  Only meaningful updates. No spam, ever.
                </p>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative mx-auto flex min-h-82.5 w-full max-w-md items-center justify-center">

              {/* Decorative circles */}
              <div className="absolute h-64 w-64 rounded-full border border-emerald-500/20 sm:h-80 sm:w-80" />
              <div className="absolute h-48 w-48 rounded-full border border-emerald-500/20 sm:h-64 sm:w-64" />
              <div className="absolute h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />

              {/* Main illustration */}
              <div className="relative z-10 flex h-48 w-48 flex-col items-center justify-center rounded-[2.5rem] border border-emerald-500/20 bg-linear-to-br from-emerald-100 to-teal-50 shadow-2xl backdrop-blur-xl sm:h-56 sm:w-56 dark:from-emerald-500/20 dark:to-teal-500/5">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 sm:h-24 sm:w-24">
                  <Send size={43} strokeWidth={1.7} />
                </div>

                <p className="mt-5 text-sm font-extrabold tracking-wide text-slate-900 dark:text-white">
                  Spread the Good
                </p>
                <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
                  One message at a time
                </p>
              </div>

              {/* Floating community card */}
              <div className="absolute left-0 top-8 z-20 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:left-2 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Users size={21} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Community
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Starts with you
                  </p>
                </div>
              </div>

              {/* Floating inspiration card */}
              <div className="absolute bottom-8 right-0 z-20 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:right-2 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
                  <Sparkles size={21} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Be Inspired
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Create positive change
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="relative flex flex-col items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/80 px-7 py-5 text-center transition-colors duration-300 sm:flex-row sm:px-10 lg:px-16 dark:border-slate-800 dark:bg-slate-950/50">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Together, we can build a stronger and kinder community.
            </p>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Discover opportunities
              <ArrowUpRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
