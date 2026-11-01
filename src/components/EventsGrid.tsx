
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  Search,
  PlusCircle,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export type EventItem = {
  _id: string;
  title: string;
  type: string;
  eventDate: string;
  location: string;
  image: string;
  description?: string;
};

type EventsGridProps = {
  events: EventItem[];
};

const categories = [
  "All",
  "Donation",
  "Environmental",
  "Education",
  "Healthcare",
  "Community Support",
  "Other",
];

function getLocalDate() {
  const date = new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatEventDate(dateString: string) {
  const date = new Date(`${dateString.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventsGrid({ events }: EventsGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Only show events scheduled for today or a future date.
  const upcomingEvents = useMemo(() => {
    const today = getLocalDate();

    return events.filter((event) => {
      if (!event.eventDate) return false;

      return event.eventDate.slice(0, 10) >= today;
    });
  }, [events]);

  // Apply category and search filters.
  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter((event) => {
      const matchesCategory =
        activeCategory === "All" ||
        event.type.toLowerCase() === activeCategory.toLowerCase();

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        event.title.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search) ||
        event.type.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [upcomingEvents, activeCategory, searchTerm]);

  return (
    <section className="min-h-screen bg-slate-50 py-10 transition-colors dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-7 flex flex-col justify-between gap-5 border-b border-slate-200 pb-7 dark:border-slate-800 sm:flex-row sm:items-end">

          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <Users size={13} />
              Future Community Drives
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Upcoming Events
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Discover volunteer initiatives scheduled for upcoming dates.
              Past events are automatically excluded so you can focus on
              active drives that need support.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-700"
          >
            <PlusCircle size={16} />
            Create Event
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  activeCategory === category
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events or areas..."
              className="h-10 rounded-xl border-slate-200 bg-white pl-9 focus-visible:border-emerald-500 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>

        {/* Event Count */}
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {filteredEvents.length}
          </span>{" "}
          upcoming {filteredEvents.length === 1 ? "event" : "events"}
        </p>

        {/* Event Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900"
              >
                {/* Event Image */}
                <div className="relative h-52 overflow-hidden bg-slate-200 dark:bg-slate-800">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <Users size={40} />
                    </div>
                  )}

                  {/* Event Type Badge */}
                  <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-white/95 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur">
                    {event.type}
                  </span>

                  {/* Event Date */}
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-slate-950/80 px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
                    <CalendarDays size={12} />
                    {formatEventDate(event.eventDate)}
                  </span>
                </div>

                {/* Event Information */}
                <div className="p-4">
                  <h2 className="mb-2 truncate text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    {event.title}
                  </h2>

                  <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin
                      size={14}
                      className="shrink-0 text-emerald-600 dark:text-emerald-400"
                    />
                    <span className="truncate">{event.location}</span>
                  </div>

                  {event.description && (
                    <p className="mb-4 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {event.description}
                    </p>
                  )}

                  <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
                    <Link
                      href={`/events/${event._id}`}
                      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      View Event
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center dark:border-slate-700 dark:bg-slate-900">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CalendarDays size={25} />
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              No upcoming events found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Try another category or search term, or create a new community
              event to get started.
            </p>

            <Link
              href="/create-event"
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <PlusCircle size={16} />
              Create an Event
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
