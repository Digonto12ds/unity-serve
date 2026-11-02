
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiSave,
  FiX,
} from "react-icons/fi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Event = {
  _id: string;
  title: string;
  type: string;
  eventDate: string;
  location: string;
  image: string;
  description: string;
  creatorEmail: string;
};

type EventForm = {
  title: string;
  type: string;
  eventDate: string;
  location: string;
  image: string;
  description: string;
};

const initialForm: EventForm = {
  title: "",
  type: "",
  eventDate: "",
  location: "",
  image: "",
  description: "",
};

const ManageEventPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const userEmail = user?.email;

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editForm, setEditForm] = useState<EventForm>(initialForm);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

 
  useEffect(() => {
    if (isPending || !userEmail) return;

    let isActive = true;

    const fetchMyEvents = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/my-events/${encodeURIComponent(userEmail)}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch your events.");
        }

        const data: Event[] = await res.json();

        if (isActive) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Fetch events error:", error);
        if (isActive) {
          toast.error("Could not load your events.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchMyEvents();

    return () => {
      isActive = false;
    };
  }, [userEmail, isPending]);

  // edit dialog 
  const handleEdit = (event: Event) => {
    setEditingEvent(event);

    setEditForm({
      title: event.title,
      type: event.type,
      eventDate: event.eventDate.slice(0, 10),
      location: event.location,
      image: event.image,
      description: event.description,
    });
  };

  // Update event
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingEvent || !userEmail) return;

    setIsUpdating(true);

    try {
      const res = await fetch(
        `http://localhost:8000/my-events/${editingEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editForm,
            creatorEmail: userEmail,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update event.");
      }

    
      setEvents((previousEvents) =>
        previousEvents.map((event) =>
          event._id === editingEvent._id
            ? { ...event, ...editForm }
            : event
        )
      );

      setEditingEvent(null);
      setEditForm(initialForm);
      toast.success("Event updated successfully!");
    } catch (error) {
      console.error("Update event error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setIsUpdating(false);
    }
  };

 const handleDelete = async (id: string) => {
  if (!userEmail) {
    toast.error("Please login first.");
    return;
  }

  setDeletingId(id);

  try {
    const res = await fetch(
      `http://localhost:8000/my-events/${id}?email=${encodeURIComponent(userEmail)}`,
      {
        method: "DELETE",
      }
    );

    const responseText = await res.text();

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error(
        "Server returned an invalid response. Please check your backend API."
      );
    }

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete event.");
    }

    setEvents((previousEvents) =>
      previousEvents.filter((event) => event._id !== id)
    );

    toast.success("Event deleted successfully!");
  } catch (error) {
    console.error("Delete event error:", error);

    toast.error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  } finally {
    setDeletingId(null);
  }
};
  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }


  if (!userEmail) {
    return (
      <section className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl dark:bg-emerald-950">
            <FiUsers className="text-emerald-600" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Login Required
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Please log in to view and manage the events you have created.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12 dark:bg-slate-950">
      <div className="container mx-auto px-4">

        {/* Page heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Organizer Dashboard
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Manage Your{" "}
              <span className="text-emerald-600">Events</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Keep track of your activities, update event information, and
              manage the difference you are making in your community.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            + Create New Event
          </Link>
        </div>

        {/* Event count */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-5 py-4 dark:border-emerald-900 dark:bg-emerald-950/30">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Your Contributions
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Events organized by you
            </p>
          </div>

          <div className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-emerald-600 px-3 text-xl font-extrabold text-white">
            {events.length}
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[390px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl dark:bg-emerald-950">
              <FiCalendar className="text-emerald-600" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              No Events Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              You havent created any events yet. Start your journey by
              organizing an event and bringing people together.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          /* Event cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20"
              >
                {/* Event image */}
                <div className="relative h-52 overflow-hidden bg-slate-200 dark:bg-slate-800">
                  {event.image && (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                    {event.type}
                  </div>
                </div>

                {/* Event information */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-lg font-bold text-slate-900 dark:text-white">
                    {event.title}
                  </h2>

                  <div className="mt-4 space-y-3">
                    <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <FiCalendar className="shrink-0 text-emerald-600" />
                      {new Date(event.eventDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <FiMapPin className="shrink-0 text-emerald-600" />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>

                    <p className="line-clamp-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-400">
                      {event.description}
                    </p>
                  </div>

                  {/*Three action buttons */}
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                    {/* View button */}
                    <Link
                      href={`/events/${event._id}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 py-2.5 text-xs font-bold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-emerald-950"
                    >
                      <FiEye size={15} />
                      View
                    </Link>

                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={() => handleEdit(event)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-2 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700"
                    >
                      <FiEdit2 size={14} />
                      Edit
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDelete(event._id)}
                      disabled={deletingId === event._id}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-2 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950"
                    >
                      {deletingId === event._id ? (
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                      ) : (
                        <FiTrash2 size={14} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/*Edit Event Dialog */}
      <Dialog
        open={!!editingEvent}
        onOpenChange={(open) => {
          if (!open && !isUpdating) {
            setEditingEvent(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto border-slate-200 bg-white sm:max-w-xl dark:border-slate-800 dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
              Edit Your Event
            </DialogTitle>

            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Update your event details below. Your changes will be saved
              immediately after submission.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Event title */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Event Title
              </label>
              <input
                required
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                placeholder="Enter event title"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Event type and date */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Event Type
                </label>
                <select
                  required
                  value={editForm.type}
                  onChange={(e) =>
                    setEditForm({ ...editForm, type: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Select type</option>
                  <option value="Donation">Donation</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Community Support">Community Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Event Date
                </label>
                <input
                  required
                  type="date"
                  value={editForm.eventDate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, eventDate: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Location
              </label>
              <input
                required
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
                placeholder="Enter event location"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Image URL
              </label>
              <input
                required
                type="url"
                value={editForm.image}
                onChange={(e) =>
                  setEditForm({ ...editForm, image: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                placeholder="Describe your event..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <DialogFooter className="gap-2 pt-2">
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => setEditingEvent(null)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <FiX size={16} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUpdating}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ManageEventPage;
