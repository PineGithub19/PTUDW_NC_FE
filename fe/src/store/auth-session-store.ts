import { create } from "zustand";
import supabase from "@/query/supabaseClient";
import type { Session } from "@supabase/supabase-js";

interface SessionAuthState {
  session: Session | null;
  user: Session["user"] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SessionAuthActions {
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
}

export const useSessionAuthStore = create<
  SessionAuthState & SessionAuthActions
>((set) => ({
  session: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session,
      isLoading: false,
    }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({
      session: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
