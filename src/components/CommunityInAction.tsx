
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiMapPin,
  FiHeart,
  FiUsers,
} from "react-icons/fi";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

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

const CommunityInAction = async () => {
  let pastEvents: Event[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upcoming_events`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch past events");
    }

    const data: Event[] = await res.json();
    pastEvents = data
      .filter(
        (event) =>
          new Date(event.eventDate).getTime() < currentTime
      )
      .sort(
        (a, b) =>
          new Date(b.eventDate).getTime() -
          new Date(a.eventDate).getTime()
      )
      .slice(0, 3);
  } catch (error) {
    console.error("Community events error:", error);
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    });

  const featuredEvent = pastEvents[0];
  const otherEvents = pastEvents.slice(1);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 dark:bg-slate-950 sm:px-6 lg:px-8">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-96 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="container relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400">
              <FiHeart size={14} />
              Real Stories. Real Impact.
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Community in{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Action
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Every small act of kindness creates a bigger impact.
              Take a look at the moments when our community came together
              to make a difference.
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            Explore Events
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Past Events */}
        {featuredEvent ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

            {/* Featured Event */}
            <Card className="group relative min-h-107.5 overflow-hidden rounded-3xl border-0 bg-slate-900 p-0 shadow-xl lg:col-span-3">

              <Image
                src={featuredEvent.image}
                alt={featuredEvent.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />

              {/* Featured Badge */}
              <div className="absolute left-6 top-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                  <FiHeart size={14} />
                  Community Highlight
                </span>
              </div>

              {/* Past Event Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-9">

                <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  {featuredEvent.type}
                </span>

                <h3 className="max-w-xl text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                  {featuredEvent.title}
                </h3>

                <p className="mt-4 line-clamp-2 max-w-xl text-sm leading-6 text-slate-200">
                  {featuredEvent.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-200">

                  <span className="flex items-center gap-2">
                    <FiCalendar className="text-emerald-400" />
                    {formatDate(featuredEvent.eventDate)}
                  </span>

                  <span className="flex items-center gap-2">
                    <FiMapPin className="text-emerald-400" />
                    {featuredEvent.location}
                  </span>
                </div>

                <Link
                  href={`/events/${featuredEvent._id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 transition hover:text-emerald-300"
                >
                  View Event
                  <FiArrowUpRight />
                </Link>
              </div>
            </Card>

            {/* Other Past Events */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {otherEvents.map((event) => (
                <Card
                  key={event._id}
                  className="group flex min-h-50 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:flex-row"
                >
                  {/* Small Event Image */}
                  <div className="relative min-h-48 w-full shrink-0 overflow-hidden sm:min-h-full sm:w-2/5">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 250px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 to-transparent" />
                  </div>

                  <CardContent className="flex flex-1 flex-col justify-center p-5">

                    <span className="mb-3 w-fit rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      {event.type}
                    </span>

                    <h3 className="line-clamp-2 text-base font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                      {event.title}
                    </h3>

                    <div className="mt-3 space-y-2 text-xs text-slate-500 dark:text-slate-400">

                      <p className="flex items-center gap-2">
                        <FiCalendar className="shrink-0 text-emerald-600" />
                        {formatDate(event.eventDate)}
                      </p>

                      <p className="flex items-center gap-2">
                        <FiMapPin className="shrink-0 text-emerald-600" />
                        <span className="truncate">{event.location}</span>
                      </p>
                    </div>

                    <Link
                      href={`/events/${event._id}`}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
                    >
                      View Story
                      <FiArrowUpRight />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <FiUsers size={28} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              Our Story Is Just Beginning!
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Past community events will appear here. Together,
              we can create stories worth sharing.
            </p>

            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Discover Events
              <FiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityInAction;
