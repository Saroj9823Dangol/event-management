// lib/api/events.ts
import { IEvent } from "@/types";
import { http } from "./http";
import { IPaginatedResponse } from "@/types/response";

export async function getHomeFeaturedEvents(): Promise<
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
      sort: "start_date", // Ascending date for upcoming
      includes: "category",
      include_nearest_lineup: 1,
      include_price_range: 1,
      // Assuming backend filters for future dates by default or we might need 'start_date_from': new Date()
      // For now, relying on sort.
      limit: 6,
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
    },
  });
  return response.data;
}
