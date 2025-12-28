import { IPromotionBanner } from "@/types";
import { IPaginatedResponse } from "@/types/response";
import { http } from "./http";

export async function getPromotionBanners(): Promise<
  IPaginatedResponse<IPromotionBanner>
> {
  const response = await http.get("/promotion-banner", {
    params: {
      sort: "-created_at",
      includes: "event",
    },
  });
  return response.data;
}
