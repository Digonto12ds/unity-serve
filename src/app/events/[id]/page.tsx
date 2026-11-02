import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  HeartHandshake,
  Mail,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import JoinEventButton from "@/components/JoinEventButton";

type EventData = {
  _id: string;
  title: string;
  type: string;
  eventDate: string;
  location: string;
  image: string;
  description: string;
  creatorEmail: string;
  joinedBy?: string[];
};

const DetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/upcoming_event/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const event: EventData | null = await res.json();

  if (!event) {
    notFound();
  }

  // Format event date
  const eventDate = new Date(event.eventDate);

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  // Format event time
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  });

  // Get organizer name from email
  const organizerName = event.creatorEmail.split("@")[0];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Back to Events */}
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={16} />
          Back to Upcoming Events
        </Link>

        {/* Main Event Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          {/* Event Banner */}
          <div className="relative h-64 w-full sm:h-80 lg:h-96">
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />

            {/* Dark Image Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

            {/* Event Category */}
            <div className="absolute left-5 top-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-emerald-700 shadow-md">
                <HeartHandshake size={14} />
                {event.type}
              </span>
            </div>

            {/* Event Title and Information */}
            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8">
              <h1 className="max-w-3xl text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                {event.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-slate-200">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-400" />
                  {event.location}
                </span>

                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} className="text-emerald-400" />
                  {formattedDate}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Clock size={16} className="text-emerald-400" />
                  {formattedTime}
                </span>
              </div>
            </div>
          </div>

          {/* Event Details Content */}
          <div className="p-5 sm:p-8">
            {/* Join Event Section */}
            <div className="flex flex-col gap-4 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                  <Users size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Join Our Community
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Sign up to join hands for this drive.
                  </p>
                </div>
              </div>

              <JoinEventButton
                eventId={event._id}
                eventDate={event.eventDate} // 🟢 NEW
                joinedBy={event.joinedBy || []}
              />
            </div>

            {/* About and Sidebar */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* About Section */}
              <section className="lg:col-span-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  About This Social Initiative
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {event.description}
                </p>

                <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

                {/* Volunteer Guidelines */}
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Volunteer Guidelines
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    Please arrive on time at the designated location.
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    Follow the event organizer&apos;s instructions.
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    Bring a positive attitude and help make a difference.
                  </li>
                </ul>
              </section>

              {/* Sidebar */}
              <aside className="space-y-5">
                {/* Organizer Information */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Initiative Organizer
                  </h3>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                      <Users size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                        {organizerName}
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 break-all text-xs text-slate-500 dark:text-slate-400">
                        <Mail size={12} className="shrink-0" />
                        {event.creatorEmail}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
                    <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <ShieldCheck
                        size={15}
                        className="text-emerald-600 dark:text-emerald-400"
                      />
                      Community Event Organizer
                    </p>
                  </div>
                </div>

                {/* Event Information */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Event Information
                  </h3>

                  <div className="mt-5 space-y-5">
                    {/* Date */}
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                        <CalendarDays size={17} />
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Event Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
                          {formattedDate}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                        <Clock size={17} />
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Event Time
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
                          {formattedTime}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                        <MapPin size={17} />
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Location
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Together, we can make a difference.{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            Be part of the change!
          </span>
        </p>
      </div>
    </main>
  );
};

export default DetailPage;
