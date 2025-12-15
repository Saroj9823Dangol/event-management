// lib/api/events.ts
import { IEvent } from "@/types";
import { http } from "./http";
import { IPaginatedResponse } from "@/types/response";
import logger from "../logger/logger";
import moment from "moment";

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
      includes: "category",
      include_nearest_lineup: 1,
      include_price_range: 1,
      limit: 6,
      sortByStartDate: "asc",
    },
  });
  return response.data;
}

export async function getLiveEvents(): Promise<IPaginatedResponse<IEvent>> {
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
