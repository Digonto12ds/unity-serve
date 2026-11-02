import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";

import { Card, CardContent } from "@/components/ui/card";

interface Event {
  _id: string;
  title: string;
  type: string;
  eventDate: string;
  location: string;
  image: string;
  description: string;
  creatorEmail: string;
}

const currentTime = Date.now();
const RecentEvents = async () => {
  let events: Event[] = [];

  try {
    const res = await fetch("http://localhost:8000/upcoming_events", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    const data: Event[] = await res.json();

    events = data
      .filter((event) => new Date(event.eventDate).getTime() >= currentTime)
      .sort(
        (a, b) =>
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
      )
      .slice(0, 6);
  } catch (error) {
    console.error("Recent events error:", error);
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    });
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-20 dark:bg-slate-950 sm:px-6 lg:px-8">
      {/*Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-80 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="container relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              Make an Impact
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Recent Upcoming{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Events
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              Find meaningful opportunities, connect with your community, and be
              part of something bigger.
            </p>
          </div>

          {/* View All Button */}
          <Link
            href="/events"
            className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-600 px-5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white dark:text-emerald-400 dark:hover:text-white"
          >
            View All Events
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/*Event Cards */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <Card
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
              >
                {/* Event Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-slate-950/10" />

                  {/* Category Badge */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-lg backdrop-blur-md">
                      {event.type}
                    </span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-emerald-500 px-3 py-2 text-white shadow-lg">
                    <FiCalendar size={15} />
                    <span className="text-xs font-bold">
                      {formatDate(event.eventDate)}
                    </span>
                  </div>

                  {/* Card Number */}
                  <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/30 bg-slate-950/40 text-xs font-bold text-white backdrop-blur-md">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Event Title */}
                  <h3 className="line-clamp-2 min-h-14 text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    {event.title}
                  </h3>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <FiMapPin className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {event.description}
                  </p>

                  {/* Card Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <FiUsers className="text-emerald-600 dark:text-emerald-400" />
                      Be a Volunteer
                    </div>

                    <Link
                      href={`/events/${event._id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      Explore
                      <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <FiCalendar size={25} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              No Upcoming Events
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              New community events will appear here. Check back soon!
            </p>

            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Explore All Events
              <FiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentEvents;
