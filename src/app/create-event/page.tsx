"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  Type,
  CirclePlus,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify/unstyled";

const imagePresets = [
  {
    name: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d",
  },
  {
    name: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
  },
  {
    name: "Cleanup",
    url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
  },
  {
    name: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b",
  },
];

export default function CreateEventPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userEmail") || "";
    }

    return "";
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const creatorEmail = localStorage.getItem("userEmail");

    if (!creatorEmail) {
      setMessage("Please log in to create an event.");
      return;
    }

    const form = {
      title: formData.get("title"),
      type: eventType,
      eventDate: eventDate,
      location: formData.get("location"),
      image: imageUrl,
      description: formData.get("description"),
      creatorEmail: creatorEmail,
    };

    setIsSubmitting(true);

    const res = await fetch("http://localhost:8000/add-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log(data);

    setIsSubmitting(false);

    if (res.ok) {
      setMessage("Event created successfully!");
      toast.success("Event created successfully!");

      setTimeout(() => {
        router.push("/events");
      }, 1500);
    } else {
      setMessage(data.message || "Failed to create event.");
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-8 transition-colors duration-300 dark:bg-[#09141d] sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        {/* Back Link */}
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
        >
          <ArrowLeft size={16} />
          Back to Upcoming Events
        </Link>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-8 md:p-10">
          {/* Heading */}
          <div className="mb-7">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-400">
              <Sparkles size={14} />
              Social Service Drive
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Create a Community Event
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Organize a local relief effort, environmental cleanup, or
              community support drive.
            </p>
          </div>

          {/* Event Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Event Title */}
            <div className="space-y-2">
              <label
                htmlFor="eventTitle"
                className="text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                Event Title <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Type
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <Input
                  id="eventTitle"
                  name="title"
                  type="text"
                  required
                  placeholder="e.g. Winter Clothes Distribution - Mirpur 10, Dhaka"
                  className="h-12 rounded-xl bg-slate-50 pl-10 dark:bg-slate-800"
                />
              </div>
            </div>

            {/* Event Type and Date */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Event Type */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Event Type <span className="text-red-500">*</span>
                </label>

                <Select
                  value={eventType}
                  onValueChange={(value) => setEventType(value ?? "")}
                >
                  <SelectTrigger className="h-12 w-full rounded-xl bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-slate-400" />
                      <SelectValue placeholder="Select event type" />
                    </div>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Donation">Donation</SelectItem>
                    <SelectItem value="Environmental">Environmental</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Community Support">
                      Community Support
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Event Date */}
              <div className="space-y-2">
                <label
                  htmlFor="eventDate"
                  className="text-sm font-bold text-slate-800 dark:text-slate-200"
                >
                  Event Date <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    onFocus={(e) => {
                      const currentDate = new Date();

                      const today = [
                        currentDate.getFullYear(),
                        String(currentDate.getMonth() + 1).padStart(2, "0"),
                        String(currentDate.getDate()).padStart(2, "0"),
                      ].join("-");

                      e.currentTarget.min = today;
                    }}
                    required
                    className="h-12 rounded-xl bg-slate-50 pl-10 dark:bg-slate-800"
                  />
                </div>

                <p className="text-xs text-slate-400">
                  Dates must be today or later.
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                Location / Venue <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <Input
                  id="location"
                  name="location"
                  type="text"
                  required
                  placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                  className="h-12 rounded-xl bg-slate-50 pl-10 dark:bg-slate-800"
                />
              </div>
            </div>

            {/* Thumbnail Image URL */}
            <div className="space-y-2">
              <label
                htmlFor="imageUrl"
                className="text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                Thumbnail Image URL <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <ImageIcon
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <Input
                  id="imageUrl"
                  name="image"
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="h-12 rounded-xl bg-slate-50 pl-10 dark:bg-slate-800"
                />
              </div>

              {/* Quick Image Presets */}
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
                <span className="text-slate-400">Quick photo presets:</span>

                {imagePresets.map((preset, index) => (
                  <span
                    key={preset.name}
                    className="inline-flex items-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className="font-medium text-teal-600 transition hover:text-teal-800 hover:underline dark:text-teal-400"
                    >
                      {preset.name}
                    </button>

                    {index !== imagePresets.length - 1 && (
                      <span className="text-slate-300 dark:text-slate-600">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                Event Description <span className="text-red-500">*</span>
              </label>

              <Textarea
                id="description"
                name="description"
                required
                rows={5}
                placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                className="min-h-32 resize-y rounded-xl bg-slate-50 px-4 py-3 leading-6 dark:bg-slate-800"
              />
            </div>

            {/* Organizer Information */}
            <div className="flex flex-col justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-xs sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-800">
              <span className="text-slate-500 dark:text-slate-400">
                Organizer Email attached:
              </span>

              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {userEmail || "Login to attach your email"}
              </span>
            </div>

            {/* Submit Message */}
            {message && (
              <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                {message}
              </p>
            )}

            {/* Publish Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !eventType}
              className="h-12 w-full rounded-xl bg-teal-600 text-sm font-bold text-white shadow-md shadow-teal-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CirclePlus size={17} />
              {isSubmitting ? "Publishing..." : "Publish Event"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
