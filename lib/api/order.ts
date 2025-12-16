import { http } from "@/lib/api/http";

export const createOrder = (data: any) => {
  return http.post("/admin/orders", data);
};

export const checkPromoCode = (data: {
  promo_code: string;
  event_id: string;
}) => {
  return http.post("/admin/promo-codes/validity-check", data);
};
