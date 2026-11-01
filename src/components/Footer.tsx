import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Sparkles,
  Globe,
} from "lucide-react";
import { TbHeartHandshake } from "react-icons/tb";

const platformLinks = [
  {
    name: "Upcoming Events",
    href: "/events",
    icon: CalendarDays,
  },
  {
    name: "Create an Event",
    href: "/create-event",
    icon: Sparkles,
  },
  {
    name: "Manage My Events",
    href: "/my-events",
  },
  {
    name: "My Joined Events",
    href: "/joined-events",
  },
];

const activeCauses = [
  "Winter Clothes & Blanket Relief",
  "City Clean-up & Waste Segregation",
  "Urban Tree Plantation Drives",
  "Underprivileged Meal Sharing",
  "Free Medical & Health Camps",
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-[#fbfdfd] text-slate-600 transition-colors duration-300 dark:border-slate-800 dark:bg-[#09141d] dark:text-slate-400">
      {/* Footer Main Content */}
      <div className="container mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Brand Information */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <Image
                src="/Navbar.png"
                alt="UnityServe Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />

              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Unity<span className="text-emerald-600">Serve</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              A community-driven event management platform empowering everyday
              citizens to create, join, and track impactful social development
              drives.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <MapPin size={15} className="shrink-0 text-emerald-600" />
              <span>Dhaka, Bangladesh · Nationwide Impact</span>
            </div>
          </div>

          {/* Column 2: Explore Platform */}
          <div>
            <h3 className="mb-5 text-sm font-extrabold tracking-wide text-slate-900 dark:text-white">
              EXPLORE PLATFORM
            </h3>

            <ul className="space-y-3">
              {platformLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      {Icon && (
                        <Icon
                          size={14}
                          className="shrink-0 text-teal-600 dark:text-teal-400"
                        />
                      )}

                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Active Causes */}
          <div>
            <h3 className="mb-5 text-sm font-extrabold tracking-wide text-slate-900 dark:text-white">
              ACTIVE CAUSES
            </h3>

            <ul className="space-y-3">
              {activeCauses.map((cause, index) => (
                <li key={cause} className="flex items-start gap-2 text-sm">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      index % 3 === 0
                        ? "bg-teal-500"
                        : index % 3 === 1
                          ? "bg-emerald-500"
                          : "bg-indigo-500"
                    }`}
                  />

                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Community Spirit */}
          <div>
            <h3 className="mb-5 text-sm font-extrabold tracking-wide text-slate-900 dark:text-white">
              COMMUNITY SPIRIT
            </h3>

            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
              Every small action counts. Connect with local volunteers, turn
              compassion into direct community aid, and be the change your city
              needs.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-400">
              <Globe size={14} />
              100% Volunteer Driven
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="my-8 border-t border-slate-200 dark:border-slate-800" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-slate-500 sm:flex-row sm:text-left dark:text-slate-400">
          <p>
            © {currentYear} UnityServe. Built with care for community service
            and social development.development.
          </p>

          <p className="inline-flex items-center gap-2">
            <TbHeartHandshake size={15} className="text-emerald-600" />
            Together, We Make a Difference
          </p>
        </div>
      </div>
    </footer>
  );
}
