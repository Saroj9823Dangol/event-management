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

export const getUserOrders = (params?: {
  page?: number;
  per_page?: number;
  sorts?: string;
}) => {
  return http.get("/user/orders", { params });
};

export const getOrderById = (id: string) => {
  return http.get(`/user/orders`, {
    params: {
      order_id: id,
    },
  });
};
