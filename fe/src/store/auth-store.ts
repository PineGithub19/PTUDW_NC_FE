// import apiClient from "@/query/api-client";
// import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

interface AuthStore {
  setAuth: (token: string, refreshToken: string, expiresAt: number) => void;
  isTokenExpired: () => boolean;
  logout: () => void;
  refreshUserToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      expiresAt: null,

      setAuth: (token, refreshToken, expiresIn) =>
        set({
          token,
          refreshToken,
          expiresAt: Date.now() + expiresIn * 1000,
        }),

      isTokenExpired: () => {
        const expiresAt = get().expiresAt;
        if (!expiresAt) return true;

        // Consider token expired if within 1 minute of expiry
        const now = Date.now();
        const expireThreshold = expiresAt - 60_000;

        return now >= expireThreshold;
      },

      logout: () => set({ token: null, refreshToken: null, expiresAt: null }),

      refreshUserToken: async () => {
        const { refreshToken } = get();

        if (!refreshToken) {
          get().logout();
          return;
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
