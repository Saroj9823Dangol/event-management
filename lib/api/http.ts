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
  // timeout: 10000, // optional: fail fast on slow APIs
  withCredentials: false, // set true if you use cookies
});

// Request interceptor: attach token, etc.
http.interceptors.request.use(
  (config) => {
    // Example token from localStorage; swap for cookies/NextAuth/etc.
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

// Response interceptor: normalize and log errors
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    // Example: global handling for 401/403/500
    const status = error.response?.status;

    if (status === 401) {
      // e.g. redirect to login, clear storage, etc.
      // window.location.href = "/login"; // if desired
    }

    // Optionally map to a standard error shape for UI
    // console.error(error);

    return Promise.reject(error);
  }
);
