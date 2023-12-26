import "server-only";

import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import prisma from "./db";
import { capitalize } from "./utilis";

export const getEvents = unstable_cache(
  async (city: string, page = 1, pageSize = 6) => {
    const events = await prisma.eventoEvent.findMany({
      where: {
        city: city === "all" ? undefined : capitalize(city),
      },
      orderBy: {
        date: "asc",
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    const totalCount = await prisma.eventoEvent.count({
      where: {
        city: city === "all" ? undefined : capitalize(city),
      },
    });
    return {
      totalCount,
      events,
    };
  }
);

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug,
    },
  });
  if (!event) {
    return notFound();
  }
  return event;
});
