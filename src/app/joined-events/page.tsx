
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  FiCalendar,
  FiMapPin,
  FiArrowUpRight,
  FiHeart,
  FiUsers,
} from "react-icons/fi";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type JoinedEvent = {
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

const JoinedEventsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //Fetch events joined by the logged-in user
  useEffect(() => {
    if (isPending || !userEmail) return;

    let isActive = true;

    const fetchJoinedEvents = async () => {
        const token = await getTokenFromClient();
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${encodeURIComponent(userEmail)}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            }
          }
        );

        const responseText = await res.text();
        let data;

        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error("Invalid server response. Check your backend.");
        }

        if (!res.ok) {
          throw new Error(data.message || "Failed to load joined events.");
        }

        if (isActive) {
          // Sort events by date, earliest first
          const sortedEvents = (data as JoinedEvent[]).sort(
            (a, b) =>
              new Date(a.eventDate).getTime() -
              new Date(b.eventDate).getTime()
          );

          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error("Joined events error:", error);

        if (isActive) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Could not load joined events."
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchJoinedEvents();

    return () => {
      isActive = false;
    };
  }, [userEmail, isPending]);

  //Format event date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Loading session
  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  //Login required
  if (!userEmail) {
    return (
      <section className="container mx-auto flex min-h-[65vh] items-center justify-center px-4">
        <Card className="w-full max-w-md rounded-3xl border-slate-200 bg-white text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CardContent className="p-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950">
              <FiUsers className="text-3xl text-emerald-600" />
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Login Required
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Sign in to see the events you have joined and keep track of your
              volunteering activities.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-flex rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Login to Continue
            </Link>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 sm:py-14 dark:bg-slate-950">
      <div className="container mx-auto px-4">

        {/*Page heading */}
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-slate-900 px-6 py-9 sm:px-10 sm:py-12">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <FiHeart />
                Your Volunteer Journey
              </div>

              <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Events You&apos;ve{" "}
                <span className="text-emerald-400">Joined.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Every small action creates a bigger impact. Keep track of the
                events you&apos;re part of and continue making a difference.
              </p>

              <p className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <FiUsers className="text-emerald-400" />
                {userEmail}
              </p>
            </div>

            <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-center">
              <span className="text-3xl font-extrabold text-emerald-400">
                {events.length}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Joined Events
              </span>
            </div>
          </div>
        </div>

        {/*Section title */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
              Your Activities
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
              My Joined Events
            </h2>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sorted by event date
          </p>
        </div>

        {/*Loading state */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-97.5 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          /*Empty state */
          <Card className="rounded-3xl border-dashed border-slate-300 bg-white text-center shadow-none dark:border-slate-700 dark:bg-slate-900">
            <CardContent className="px-6 py-16">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 dark:bg-emerald-950">
                <FiCalendar className="text-4xl text-emerald-600" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Your Journey Starts Here
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                You haven&apos;t joined any events yet. Explore upcoming
                opportunities, meet people, and become part of something
                meaningful.
              </p>

              <Link
                href="/events"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Explore Events
                <FiArrowUpRight size={17} />
              </Link>
            </CardContent>
          </Card>
        ) : (
          /*Joined event cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <Card
                key={event._id}
                className="group gap-0 overflow-hidden rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Event image */}
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
                    <div className="flex h-full items-center justify-center">
                      <FiHeart className="text-4xl text-emerald-500" />
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                    {event.type}
                  </div>

                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                    <FiHeart size={16} />
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      Joined Event #{index + 1}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      Joined
                    </span>
                  </div>

                  <h3 className="line-clamp-1 text-lg font-extrabold text-slate-900 dark:text-white">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-3">
                    <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <FiCalendar className="shrink-0 text-emerald-600" />
                      {formatDate(event.eventDate)}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <FiMapPin className="shrink-0 text-emerald-600" />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>
                  </div>

                  <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-400">
                    {event.description}
                  </p>

                  <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <Link
                      href={`/events/${event._id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                    >
                      View Event Details
                      <FiArrowUpRight size={17} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JoinedEventsPage;
