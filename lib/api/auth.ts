import { http } from "./http";
import { AxiosResponse } from "axios";

// Types
export interface LoginPayload {
  phone: string;
  otp: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  otp: string;
}

export interface OtpPayload {
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  // Add other fields as per API response
}

export interface AuthResponse {
  status: number;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export const authApi = {
  sendOtp: async (payload: OtpPayload) => {
    return http.post("/otp/send", payload);
  },

  login: async (payload: LoginPayload) => {
    return http.post<AuthResponse>("/login", payload);
  },

  register: async (payload: RegisterPayload) => {
    return http.post<AuthResponse>("/register", payload);
  },

  getMe: async () => {
    return http.get<User>("/me");
  },

  logout: async () => {
    // If there's an endpoint for logout, use it. Otherwise just client side.
    // Assuming client side for now based on requirement "check /me ... maintain auth state"
    // But if we need to invalidate token on server:
    // return http.post("/logout");
    return Promise.resolve();
  },
};
