import { RouterProvider } from "react-router-dom";
import routers from "./routers/routers";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { useSessionAuthStore } from "./store/auth-session-store";
import { useEffect } from "react";
import supabase from "./query/supabaseClient";

function App() {
  const setSession = useSessionAuthStore((s) => s.setSession);

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setSession]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
