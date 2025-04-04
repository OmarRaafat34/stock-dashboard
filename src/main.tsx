import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

const rootElement = document.getElementById("root");
const queryClient = new QueryClient();

if (rootElement) {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <App />
        <Toaster />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
