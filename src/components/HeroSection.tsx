
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Users,
  CalendarCheck,
  HandHeart,
} from "lucide-react";

const stats = [
  {
    value: "1,450+",
    label: "Active Volunteers",
    color: "text-teal-600",
    icon: Users,
  },
  {
    value: "180+",
    label: "Events Completed",
    color: "text-emerald-500",
    icon: CalendarCheck,
  },
  {
    value: "24,000+",
    label: "Lives Impacted",
    color: "text-indigo-500",
    icon: Heart,
  },
  {
    value: "100%",
    label: "Community Driven",
    color: "text-orange-500",
    icon: HandHeart,
  },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-100 via-teal-50 to-slate-50">
      {/* Main Container */}
      <div className="container mx-auto px-4">
        <div className="flex min-h-[650px] flex-col items-center justify-center py-20 text-center sm:py-24 lg:min-h-[745px]">

          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/50 px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm">
            <Sparkles size={16} />
            Community-Driven Social Development Platform
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-4xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Together We Can Make
            <span className="block bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              A Difference.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Join hands with your community to create meaningful change.
            Discover local initiatives, organize social events, and
            make a positive impact on the lives around you.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-teal-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-700"
            >
              Explore Events
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:text-teal-700"
            >
              <Heart size={17} />
              Create an Event
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <Icon
                    size={21}
                    className={`mx-auto mb-2 ${stat.color}`}
                  />

                  <h3
                    className={`text-2xl font-extrabold sm:text-3xl ${stat.color}`}
                  >
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
