
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Users,
  CalendarCheck,
  HandHeart,
  ArrowUpRight,
  Globe2,
} from "lucide-react";

const stats = [
  {
    value: "1,450+",
    label: "Active Volunteers",
    icon: Users,
  },
  {
    value: "180+",
    label: "Events Completed",
    icon: CalendarCheck,
  },
  {
    value: "24,000+",
    label: "Lives Impacted",
    icon: Heart,
  },
  {
    value: "100%",
    label: "Community Driven",
    icon: HandHeart,
  },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-emerald-300/20 blur-[100px] dark:bg-emerald-500/10" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-teal-300/20 blur-[100px] dark:bg-teal-500/10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Hero Layout */}
        <div className="grid min-h-162.5 items-center gap-14 py-20 lg:grid-cols-2 lg:gap-10 lg:py-24">
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold tracking-wide text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Sparkles size={15} />
              TOGETHER WE MAKE A DIFFERENCE
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-5xl leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
              Small Actions.
              <span className="mt-2 block bg-linear-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-500">
                Big Impact.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              Great things happen when people come together. Discover
              meaningful volunteer opportunities, organize community events,
              and become the reason someones life gets better.
            </p>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/events"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-7 py-4 font-bold text-white shadow-xl shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700"
              >
                Explore Events
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/create-event"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-emerald-500 dark:hover:text-emerald-400"
              >
                <Heart size={18} />
                Start an Initiative
              </Link>
            </div>

            {/* Community trust indicator */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-emerald-700 dark:border-slate-950 dark:bg-emerald-900">
                  <Users size={17} />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-amber-700 dark:border-slate-950 dark:bg-amber-900">
                  <Heart size={17} />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-teal-100 text-teal-700 dark:border-slate-950 dark:bg-teal-900">
                  <HandHeart size={17} />
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  A community that cares
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Join people making real change.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative mx-auto w-full max-w-135">
            {/* Main visual card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-linear-to-br from-emerald-100 via-teal-50 to-white p-5 shadow-2xl shadow-emerald-900/10 sm:p-8 dark:border-emerald-900/50 dark:from-emerald-950 dark:via-slate-900 dark:to-slate-900">
              {/* Decorative circles */}
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-emerald-400/30" />
              <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-emerald-400/30" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-2xl" />

              <div className="relative z-10">
                {/* Visual header */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                      Our Mission
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                      Make Good Happen.
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                    <Globe2 size={25} />
                  </div>
                </div>

                {/* Illustration area */}
                <div className="relative my-8 flex min-h-70 items-center justify-center overflow-hidden rounded-3xl bg-emerald-600 p-6 sm:min-h-80">
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-800" />

                  <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full border border-white/15" />
                  <div className="absolute -right-16 -bottom-20 h-64 w-64 rounded-full border border-white/15" />

                  <div className="relative z-10 text-center">
                    <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-[2.5rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md sm:h-44 sm:w-44">
                      <HandHeart
                        size={90}
                        strokeWidth={1.2}
                        className="text-white sm:h-28 sm:w-28"
                      />
                    </div>

                    <h3 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
                      Together, We Rise.
                    </h3>
                    <p className="mt-2 text-sm text-emerald-100">
                      One community. Endless possibilities.
                    </p>
                  </div>

                  <Sparkles
                    className="absolute left-8 top-8 text-emerald-100/80"
                    size={25}
                  />
                  <Heart
                    className="absolute bottom-8 right-8 text-white/70"
                    size={27}
                  />
                </div>

                {/* Bottom information */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Be part of something bigger.
                    </p>
                  </div>

                  <Link
                    href="/events"
                    aria-label="Discover events"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:rotate-45 hover:bg-emerald-700"
                  >
                    <ArrowUpRight size={21} />
                  </Link>
                </div>
              </div>
            </div>

            {/* 🟢 CHANGED: Floating card moved inside the visual area */}
            <div className="relative z-20 mt-4 flex flex-wrap items-center justify-between gap-3 sm:absolute sm:bottom-5 sm:left-5 sm:right-5 sm:mt-0">
              {/* Lives Impacted */}
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl sm:p-4 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  <Heart size={22} />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                    24K+
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Lives Impacted
                  </p>
                </div>
              </div>

              {/* Making a Difference */}
              <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-3 shadow-xl sm:px-4 dark:border-emerald-900 dark:bg-slate-900">
                <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Making a Difference
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics section */}
        <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-slate-200 py-10 sm:gap-5 lg:grid-cols-4 dark:border-slate-800">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group flex items-center gap-3 rounded-2xl p-3 transition-all duration-300 hover:bg-white hover:shadow-md sm:p-4 dark:hover:bg-slate-900"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950 dark:text-emerald-400">
                  <Icon size={21} />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;