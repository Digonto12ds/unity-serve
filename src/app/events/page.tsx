import EventsGrid, { type EventItem } from "@/components/EventsGrid";

const UpcomingEventsPage = async () => {
  let events: EventItem[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming_events`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch upcoming events");
    }

    const data: EventItem[] = await res.json();

    events = data.map((event) => ({
      ...event,
      _id: String(event._id),
    }));
  } catch (error) {
    console.error("Upcoming events fetch error:", error);
  }

  return <EventsGrid events={events} />;
};

export default UpcomingEventsPage;