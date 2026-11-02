"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

interface JoinEventButtonProps {
  eventId: string;
  eventDate: string;
  joinedBy?: string[];
}

const JoinEventButton = ({
  eventId,
  eventDate,
  joinedBy = [],
}: JoinEventButtonProps) => {
  const { data: session, isPending } = authClient.useSession();

  const [hasJoined, setHasJoined] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const email = session?.user?.email;
  const isEventExpired =
    new Date(eventDate).getTime() < new Date("2026-11-03T00:00:00").getTime();

  const isJoined = hasJoined ?? (email ? joinedBy.includes(email) : false);

  const handleJoinEvent = async () => {
    if (!email) {
      toast.error("Please login to join this event.");
      redirect("/login");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/${isJoined ? "leave-event" : "join-event"}/${eventId}`,
        {
          method: isJoined ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }
      setHasJoined(!isJoined);

      if (isJoined) {
        toast.success("You left this event successfully.");
      } else {
        toast.success("You joined this event successfully.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleJoinEvent}
      disabled={isLoading || isPending || isEventExpired} // 🟢 CHANGED
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-60 ${
        isEventExpired
          ? "bg-slate-500 shadow-none" // 🟢 NEW
          : isJoined
            ? "bg-rose-600 shadow-rose-600/15 hover:bg-rose-700"
            : "bg-emerald-600 shadow-emerald-600/15 hover:bg-emerald-700"
      }`}
    >
      {isEventExpired
        ? "Event Ended" // 🟢 NEW
        : isPending
          ? "Checking..."
          : isLoading
            ? isJoined
              ? "Leaving..."
              : "Joining..."
            : isJoined
              ? "Leave Event"
              : "Join Event"}
    </button>
  );
};

export default JoinEventButton;
