import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarInset } from "../components/ui/sidebar";
import { AppSideBar } from "../components/layout/AppSideBar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  useEffect(() => {
    router.navigate({ to: "/stocks" });
  }, [router]);
  return (
    <div className="flex min-h-screen min-w-screen">
      <AppSideBar />
      <SidebarInset className="bg-white">
        <div className="flex flex-1 flex-col p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  );
}
