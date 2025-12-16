"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, authApi } from "@/lib/api/auth";
import { LoginModal } from "./login-modal";
import { RegisterModal } from "./register-modal";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.getMe();
      // Adjust based on actual API response structure for /me
      // Usually it returns the user object directly or { data: user }
      // The user said: "check .../api/v1/me for getting my information"
      // Assuming response.data is User or { data: User }
      // I'll assume response.data is the User object for now, or check generic response type.
      // If it follows the pattern `data: { ... }`, I might need to access `response.data.data` or just `response.data`.
      // Based on `getEventDetail` in `events.ts`, it accesses `response.data.data[0]`.
      // `getHomeFeaturedEvents` touches `response.data` which is `IPaginatedResponse`.
      // Usually `/me` returns a single object.
      // I'll log it just in case, but assume `response.data` is the user.
      // Or `response.data.data` if wrapper exists.
      // Let's assume standard Laravel/API resource: `data` key.
      // API returns { status: 200, message: "...", data: { user: ... } } or similar for /me
      // If /me returns the same structure as login:
      const userData =
        (response.data as any).data?.user ||
        (response.data as any).data ||
        response.data;
      setUser(userData);
    } catch (error) {
      console.error("Auth check failed", error);
      localStorage.removeItem("access_token"); // Invalid token
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User, token: string) => {
    localStorage.setItem("access_token", token);
    setUser(userData);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    // Optional: Call API logout
    authApi.logout().catch(console.error);
    toast.success("Logged out successfully");
  };

  const openLoginModal = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };
  const openRegisterModal = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        openLoginModal,
        openRegisterModal,
      }}
    >
      {children}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onRegisterClick={openRegisterModal}
        onLoginSuccess={login}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onLoginClick={openLoginModal}
        onRegisterSuccess={login}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
