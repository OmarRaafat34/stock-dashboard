import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarInset } from "../components/ui/sidebar";
import { AppSideBar } from "../components/AppSideBar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  useEffect(() => {
    router.navigate({ to: "/portfolio" });
  }, [router]);
  return (
    <div className="flex min-h-screen min-w-screen">
      <AppSideBar />
      <SidebarInset className="bg-black">
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  );
}
