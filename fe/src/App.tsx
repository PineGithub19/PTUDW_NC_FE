import { RouterProvider } from "react-router-dom";
import routers from "./routers/routers";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/utils";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
