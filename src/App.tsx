import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { routeTree } from "./routeTree.gen";

function App() {
  const router = createRouter({ routeTree });

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;
