import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      hello
    </div>
  );
}
