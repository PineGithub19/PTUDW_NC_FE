import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionAuthState {
  isAuthenticated: boolean;
  isCheckingSession: boolean;
}

interface SessionAuthActions {
  setAuthenticated: (value: boolean) => void;
  checkSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useSessionAuthStore = create<
  SessionAuthState & SessionAuthActions
>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isCheckingSession: true,

      setAuthenticated: (value) =>
        set({ isAuthenticated: value, isCheckingSession: false }),

      checkSession: async () => {
        try {
          /**
           * Call a protected endpoint
           * If cookie is valid → 200
           * If not → 401
           */
          await fetch("/api/auth/me", {
            credentials: "include",
          });

          set({ isAuthenticated: true });
        } catch {
          set({ isAuthenticated: false });
        } finally {
          set({ isCheckingSession: false });
        }
      },

      logout: async () => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });
        } finally {
          set({
            isAuthenticated: false,
            isCheckingSession: false,
          });
        }
      },
    }),
    {
      name: "session-auth-storage",

      // Only persist auth boolean, not transient flags
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
