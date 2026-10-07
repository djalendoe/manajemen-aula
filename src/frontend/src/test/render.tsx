import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type RouteComponent,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { type RenderResult, render } from "@testing-library/react";
import type { ComponentType, ReactNode } from "react";

/**
 * Render a page component inside the providers the app supplies at runtime
 * (React Query + TanStack Router) using an in-memory router. The page is
 * mounted at `path` so `useParams`/`useSearch` resolve as they do in the app.
 */
export function renderPage(
  Page: ComponentType,
  options: { path?: string; initialEntry?: string } = {},
): RenderResult {
  const path = options.path ?? "/";
  const initialEntry = options.initialEntry ?? path;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

  const rootRoute = createRootRoute();
  const pageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: Page as RouteComponent,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([pageRoute]),
    history: createMemoryHistory({ initialEntries: [initialEntry] }),
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

/** Render arbitrary children inside the app's providers (no router). */
export function renderWithProviders(children: ReactNode): RenderResult {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  );
}
