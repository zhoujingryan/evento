import React from "react";
import EventCard from "./event-card";
import { getEvents } from "@/lib/server-utils";
import PaginationControls from "./pagination-controls";

type EventsListProps = {
  city: string;
  page: number;
  pageSize: number;
};

export default async function EventsList({
  city,
  page,
  pageSize,
}: EventsListProps) {
  const { totalCount, events } = await getEvents(city, page, pageSize);
  const previousPath =
    page > 1 ? `/events/${city}?page=${page - 1}&pageSize=${pageSize}` : null;
  const nextPath =
    totalCount > pageSize * page
      ? `/events/${city}?page=${page + 1}&pageSize=${pageSize}`
      : null;

  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
