
import {
  Users,
  CalendarCheck,
  ShieldCheck,
  Compass,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Community-Led Initiatives",
    description:
      "Create local volunteering opportunities, organize donation drives, and bring your community together to make a real difference.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: CalendarCheck,
    title: "Easy Event Participation",
    description:
      "Discover meaningful local events and join community initiatives with just a few clicks. Making a difference has never been easier.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: ShieldCheck,
    title: "Organizer Control",
    description:
      "Manage your events, update important information, and keep track of participants with simple organizer tools.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Compass,
    title: "Discover Upcoming Events",
    description:
      "Find future community initiatives near you and stay connected with opportunities that need your support.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="bg-[#f5f8f9] px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 text-center">

          <span className="inline-block text-xs font-extrabold tracking-[2px] text-emerald-600">
            PLATFORM FEATURES
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#10212b] sm:text-4xl">
            Built for{" "}
            <span className="text-emerald-600">
              Grassroots Action
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Everything you need to connect with passionate people,
            discover local initiatives, and create meaningful change
            in your community.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                {/* Icon */}
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={23} strokeWidth={2.2} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#10212b] transition-colors group-hover:text-emerald-600">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
