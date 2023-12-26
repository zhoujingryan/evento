import H1 from "@/components/h1";
import EventsList from "@/components/events-list";
import { capitalize } from "@/lib/utilis";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { z } from "zod";

type Props = {
  params: {
    city: string;
  };
};

type EventsPageProps = Props & {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title:
      params.city.toLowerCase() === "all"
        ? "All Events"
        : `Events in ${capitalize(params.city)}`,
  };
}

const pageNumberSchema = z.coerce
  .number()
  .int()
  .positive()
  .optional()
  .default(1);
const pageSizeNumberSchema = z.coerce
  .number()
  .int()
  .positive()
  .optional()
  .default(6);

export default function EventsPage({ params, searchParams }: EventsPageProps) {
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  const parsedPageSize = pageSizeNumberSchema.safeParse(searchParams.pageSize);
  if (!parsedPage.success || !parsedPageSize.success) {
    throw new Error("Invalid page number");
  }
  const page = parsedPage.data;
  const pageSize = parsedPageSize.data;

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {params.city === "all"
          ? "All Events"
          : `Events in ${capitalize(params.city)}`}
      </H1>
      <Suspense
        key={`${params.city} ${page} ${pageSize}`}
        fallback={<Loading />}
      >
        <EventsList city={params.city} page={page} pageSize={pageSize} />
      </Suspense>
    </main>
  );
}
