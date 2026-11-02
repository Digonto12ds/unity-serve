
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { HeartHandshake, LogOut } from "lucide-react";

interface JoinEventButtonProps {
  eventId: string;
  joinedBy?: string[];
}

const JoinEventButton = ({
  eventId,
  joinedBy = [],
}: JoinEventButtonProps) => {
  const { data: session, isPending } = authClient.useSession();

  const [hasJoined, setHasJoined] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const email = session?.user?.email;

  const isJoined = hasJoined ?? (email ? joinedBy.includes(email) : false);

  const handleJoinEvent = async () => {
    if (!email) {
      toast.error("Please login to join this event.");
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
        }
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
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleJoinEvent}
      disabled={isLoading || isPending}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-60 ${
        isJoined
          ? "bg-rose-600 shadow-rose-600/15 hover:bg-rose-700"
          : "bg-emerald-600 shadow-emerald-600/15 hover:bg-emerald-700"
      }`}
    >
      {isJoined ? (
        <LogOut size={17} />
      ) : (
        <HeartHandshake size={17} />
      )}

      {isPending
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
