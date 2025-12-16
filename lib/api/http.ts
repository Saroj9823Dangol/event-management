// src/lib/api/http.ts
import axios, { AxiosError } from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://ucncee.apptechnologies.co/api/v1";

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: false,
});

// ✅ SERVER-SIDE HEADERS (fixes 403 on Vercel)
if (typeof window === "undefined") {
  http.defaults.headers.common["User-Agent"] =
    "UCNCEE/1.0 (+https://event-management-omega-virid.vercel.app)";
  http.defaults.headers.common["Origin"] =
    "https://event-management-omega-virid.vercel.app";
  http.defaults.headers.common["Referer"] =
    "https://event-management-omega-virid.vercel.app/";
}

// Request interceptor
http.interceptors.request.use(
  (config) => {
    // Client-side auth (localStorage)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
      }
    }

    return Promise.reject(error);
  }
);
