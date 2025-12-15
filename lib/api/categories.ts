// lib/api/events.ts
import { ICategory } from "@/types";
import { http } from "./http";
import { IPaginatedResponse } from "@/types/response";

export async function getCategories(): Promise<IPaginatedResponse<ICategory>> {
  const response = await http.get("/categories", {
    params: {
      "select[0]": "description",
      "select[1]": "name",
      "select[2]": "slug",
      sort: "-created_at",
    },
  });
  return response.data;
}
