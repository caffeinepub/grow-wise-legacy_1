import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";

// ── Root Route ──────────────────────────────────────────────────────────────
const rootRoute = createRootRoute();

// ── Child Routes ────────────────────────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <>
      <HomePage />
      <Toaster position="bottom-right" richColors />
    </>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

// ── Router ──────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
