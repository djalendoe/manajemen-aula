import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useIsAdmin } from "@/hooks/useBackend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Loader2, ShieldAlert } from "lucide-react";
import { type ComponentType, type ReactNode, Suspense, lazy } from "react";

/**
 * Page modules are authored by separate page tasks. Resolving them through
 * `import.meta.glob` keeps the shell compiling before those files exist and
 * picks them up automatically once they land — no edits to this file needed.
 */
const pageModules = import.meta.glob("./pages/*.tsx");

function pageLoader(name: string): ComponentType {
  const key = `./pages/${name}.tsx`;
  const loader = pageModules[key];
  if (!loader) {
    return function MissingPage() {
      return (
        <div
          className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center"
          data-ocid="page.empty_state"
        >
          <h1 className="font-display text-xl font-semibold">
            Halaman belum tersedia
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Bagian ini sedang disiapkan. Silakan kembali ke katalog aula.
          </p>
          <Button asChild type="button" data-ocid="page.back_button">
            <Link to="/">Kembali ke Katalog Aula</Link>
          </Button>
        </div>
      );
    };
  }
  return lazy(loader as () => Promise<{ default: ComponentType }>);
}

const CatalogPage = pageLoader("CatalogPage");
const HallDetailPage = pageLoader("HallDetailPage");
const SchedulePage = pageLoader("SchedulePage");
const MyBookingsPage = pageLoader("MyBookingsPage");
const BookingFormPage = pageLoader("BookingFormPage");
const AdminDashboardPage = pageLoader("AdminDashboardPage");
const AdminBookingsPage = pageLoader("AdminBookingsPage");
const AdminHallsPage = pageLoader("AdminHallsPage");
const LoginPage = pageLoader("LoginPage");

function PageFallback() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      data-ocid="page.loading_state"
    >
      <Loader2
        className="h-6 w-6 animate-spin text-muted-foreground"
        aria-hidden="true"
      />
      <span className="sr-only">Memuat halaman…</span>
    </div>
  );
}

function SuspensePage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function NotFoundPage() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center"
      data-ocid="page.empty_state"
    >
      <h1 className="font-display text-2xl font-semibold">
        Halaman tidak ditemukan
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Tautan yang Anda tuju tidak tersedia. Kembali ke katalog aula untuk
        melanjutkan.
      </p>
      <Button asChild type="button" data-ocid="page.back_button">
        <Link to="/">Kembali ke Katalog Aula</Link>
      </Button>
    </div>
  );
}

/** Gate for admin-only routes: requires sign-in and the admin role. */
function AdminGate({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading } = useIsAdmin();

  if (isInitializing || (isAuthenticated && isLoading)) {
    return <PageFallback />;
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div
        className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center"
        data-ocid="admin.access_denied_state"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/12 text-destructive">
          <ShieldAlert className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="font-display text-2xl font-semibold">Akses ditolak</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Halaman ini hanya dapat diakses oleh pengguna dengan peran admin.
          Masuk dengan akun admin untuk melanjutkan.
        </p>
        <Button asChild type="button" data-ocid="admin.back_button">
          <Link to="/">Kembali ke Katalog Aula</Link>
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <SuspensePage>
      <CatalogPage />
    </SuspensePage>
  ),
});

const hallDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/aula/$hallId",
  component: () => (
    <SuspensePage>
      <HallDetailPage />
    </SuspensePage>
  ),
});

const scheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jadwal",
  component: () => (
    <SuspensePage>
      <SchedulePage />
    </SuspensePage>
  ),
});

const myBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pemesanan-saya",
  component: () => (
    <SuspensePage>
      <MyBookingsPage />
    </SuspensePage>
  ),
});

const bookingFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pemesanan/baru",
  component: () => (
    <SuspensePage>
      <BookingFormPage />
    </SuspensePage>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/masuk",
  component: () => (
    <SuspensePage>
      <LoginPage />
    </SuspensePage>
  ),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dasbor",
  component: () => (
    <AdminGate>
      <SuspensePage>
        <AdminDashboardPage />
      </SuspensePage>
    </AdminGate>
  ),
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/pemesanan",
  component: () => (
    <AdminGate>
      <SuspensePage>
        <AdminBookingsPage />
      </SuspensePage>
    </AdminGate>
  ),
});

const adminHallsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/aula",
  component: () => (
    <AdminGate>
      <SuspensePage>
        <AdminHallsPage />
      </SuspensePage>
    </AdminGate>
  ),
});

const routeTree = rootRoute.addChildren([
  catalogRoute,
  hallDetailRoute,
  scheduleRoute,
  myBookingsRoute,
  bookingFormRoute,
  loginRoute,
  adminDashboardRoute,
  adminBookingsRoute,
  adminHallsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
