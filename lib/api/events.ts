// lib/api/events?.ts
import { IEvent } from "@/types";
import { http } from "./http";
import { IPaginatedResponse } from "@/types/response";
import logger from "../logger/logger";
import moment from "moment";

export async function getHomefeaturedEvents(): Promise<
  IPaginatedResponse<IEvent>
> {
  const response = await http.get("/events", {
    params: {
      select: ["description", "name", "slug", "currency", "category_id"],
      sort: "-created_at",
      includes: "category",
      include_nearest_lineup: 1,
      is_featured: 1,
      include_price_range: 1,
    },
  });
  return response.data;
}

export async function getHomeTrendingEvents(): Promise<
  IPaginatedResponse<IEvent>
> {
  const response = await http.get("/events", {
    params: {
      select: ["description", "name", "slug", "currency", "category_id"],
      sort: "-created_at",
      includes: "category",
      include_nearest_lineup: 1,
      is_trending: 1,
    },
  });
  return response.data;
}

export async function getUpcomingEvents(): Promise<IPaginatedResponse<IEvent>> {
  const response = await http.get("/events", {
    params: {
      select: ["description", "name", "slug", "currency", "category_id"],
      includes: "category",
      include_nearest_lineup: 1,
      include_price_range: 1,
      limit: 6,
      sortByStartDate: "asc",
    },
  });
  return response.data;
}

export async function getHomeLiveEvents(): Promise<IPaginatedResponse<IEvent>> {
  const response = await http.get("/events", {
    params: {
      select: ["name", "slug"],
      includes: "category",
      include_nearest_lineup: 1,
      include_price_range: 1,
      limit: 6,
      sortByStartDate: "asc",
      where: [
        `event_lineups.start_date:<=:${moment().format("YYYY-MM-DD")}`,
        `event_lineups.end_date:>=:${moment().format("YYYY-MM-DD")}`,
      ],
      include_ticket_count: 1,
    },
  });
  return response.data;
}

export async function getLiveEvents(): Promise<IPaginatedResponse<IEvent>> {
  const response = await http.get("/events", {
    params: {
      select: ["name", "slug", "custom_fields"],
      includes: "category",
      include_nearest_lineup: 1,
      include_price_range: 1,
      limit: 6,
      sortByStartDate: "asc",
      where: [
        `event_lineups.start_date:<=:${moment().format("YYYY-MM-DD")}`,
        `event_lineups.end_date:>=:${moment().format("YYYY-MM-DD")}`,
      ],
      include_ticket_count: 1,
    },
  });
  return response.data;
}

export async function getTopSellingEvents(): Promise<
  IPaginatedResponse<IEvent>
> {
  const response = await http.get("/events", {
    params: {
      select: ["description", "name", "slug", "currency", "category_id"],
      sort: "-tickets_count",
      includes: "category",
      include_nearest_lineup: 1,
      include_price_range: 1,
      top_selling: 1,
      limit: 4,
      include_ticket_count: 1,
    },
  });
  return response.data;
}

export async function getPastEvents(): Promise<IPaginatedResponse<IEvent>> {
  const response = await http.get("/events", {
    params: {
      select: [
        "name",
        "slug",
        "custom_fields",
        "thumbnail",
        "description",
        "featured_banner",
        "category_id",
      ],
      includes: "category",
      // Filter for past events: end_date < today
      where: [`event_lineups.end_date:<:${moment().format("YYYY-MM-DD")}`],
      // Sort by most recent past event
      sort: "-event_lineups.end_date",
      limit: 5,
    },
  });
  return response.data;
}

export async function getEventDetail(slug: string): Promise<IEvent> {
  const response = await http.get(`/events`, {
    params: {
      slug,
      includes:
        "category,organizer,performers,lineups.performers,policies,lineups.ticketTypes,lineups.addressable",
      include_nearest_lineup: 1,
      include_price_range: 1,
    },
  });
  return response.data.data[0];
}

export async function getRelatedEvents({
  categoryId,
}: {
  categoryId: string;
}): Promise<IPaginatedResponse<IEvent>> {
  const response = await http.get("/events", {
    params: {
      select: ["name", "slug", "currency"],
      includes: "category",
      include_nearest_lineup: 1,
      include_price_range: 1,
      limit: 6,
      sortByStartDate: "asc",
      include_ticket_count: 1,
      category: categoryId,
    },
  });
  return response.data;
}

export async function getFilteredEvents(
  searchParams: { [key: string]: string | undefined } = {}
): Promise<IPaginatedResponse<IEvent>> {
  const {
    search,
    location,
    sort,
    minPrice,
    maxPrice,
    start,
    end,
    category,
    page = 1,
    per_page = 20,
  } = searchParams;

  const where: string[] = [];
  const params: any = {
    select: [
      "description",
      "name",
      "slug",
      "currency",
      "category_id",
      "lineups.addressable",
      "start_date",
      "end_date",
      "thumbnail", // Ensure thumbnail is selected
    ],
    includes: "category",
    include_nearest_lineup: 1,
    include_price_range: 1,
    page,
    per_page,
  };

  // Search
  if (search) {
    params.search = search;
  }

  // Location (assuming backend supports search or we filter by address)
  // If backend has specific location param, use it. usage of 'where' with addressable might be complex without knowing schema.
  // For now, let's append location to search if search is empty, or rely on global search.
  // Or if 'near' is supported. Let's assume 'search' covers location for now as per EventsHero logic using "search" and "location"
  // but pushing both to URL.
  if (location) {
    params.locationSearch = location;
  }

  // Sort
  if (sort === "Price: Low to High") {
    params.sortByTicketPrice = "asc";
  } else if (sort === "Price: High to Low") {
    params.sortByTicketPrice = "desc";
  } else if (sort === "Date: Soonest") {
    params.sortByStartDate = "asc";
  } else {
    // Default or Relevance
    params.sortByStartDate = "desc";
  }

  // Price Range
  if (minPrice) {
    where.push(`ticketTypes.price:>=:${minPrice}`);
  }
  if (maxPrice) {
    where.push(`ticketTypes.price:<=:${maxPrice}`);
  }

  // Date Range
  if (start) {
    // events starting on or after start date
    const formattedStart = moment(new Date(start)).format("YYYY-MM-DD");
    where.push(`event_lineups.start_date:>=:${formattedStart}`);
  }
  if (end) {
    // events starting on or before end date (to find events in the range)
    const formattedEnd = moment(new Date(end)).format("YYYY-MM-DD");
    where.push(`event_lineups.start_date:<=:${formattedEnd}`);
  }

  // Category
  if (category && category !== "All" && category !== "all") {
    params.category = category;
  }

  if (where.length > 0) {
    params.where = where;
  }

  logger.log("params in event page", params);

  const response = await http.get("/events", {
    params: { ...params },
  });
  return response.data;
}
