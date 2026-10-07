import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCallerRole } from "@/hooks/useBackend";
import { USER_ROLE_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { type ReactNode, useState } from "react";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Katalog Aula", icon: Building2 },
  { to: "/jadwal", label: "Jadwal", icon: CalendarDays },
  { to: "/pemesanan-saya", label: "Pemesanan Saya", icon: ClipboardList },
  { to: "/dasbor", label: "Dasbor", icon: LayoutDashboard, adminOnly: true },
  {
    to: "/admin/pemesanan",
    label: "Kelola Pemesanan",
    icon: ShieldCheck,
    adminOnly: true,
  },
  {
    to: "/admin/aula",
    label: "Kelola Aula",
    icon: Building2,
    adminOnly: true,
  },
];

function BrandMark() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      data-ocid="nav.brand_link"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-subtle">
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-sidebar-foreground">
        AulaKu
      </span>
    </Link>
  );
}

function NavLinks({
  isAdmin,
  onNavigate,
}: {
  isAdmin: boolean;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  return (
    <nav className="flex flex-col gap-1" aria-label="Navigasi utama">
      {items.map((item) => {
        const active =
          item.to === "/"
            ? pathname === "/"
            : pathname === item.to || pathname.startsWith(`${item.to}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            data-ocid={`nav.${item.to === "/" ? "catalog" : item.to.replace(/^\//, "").replace(/\//g, "-")}_link`}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-subtle"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function AccountControl() {
  const { isAuthenticated, isInitializing, isLoggingIn, login, clear } =
    useInternetIdentity();
  const { data: role } = useCallerRole();

  if (!isAuthenticated) {
    return (
      <Button
        type="button"
        size="sm"
        onClick={() => login()}
        disabled={isInitializing || isLoggingIn}
        data-ocid="nav.login_button"
        className="gap-2"
      >
        <LogIn className="h-4 w-4" aria-hidden="true" />
        {isInitializing ? "Memuat…" : "Masuk"}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
        {role ? USER_ROLE_LABELS[role] : "Pengguna"}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => clear()}
        data-ocid="nav.logout_button"
        className="gap-2"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        Keluar
      </Button>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: isAdmin } = useCallerRole();
  const admin = isAdmin === "admin";

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center px-5">
          <BrandMark />
        </div>
        <Separator className="bg-sidebar-border" />
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <NavLinks isAdmin={admin} />
        </div>
        <div className="border-t border-sidebar-border px-5 py-4">
          <p className="text-xs leading-relaxed text-sidebar-foreground/60">
            Sistem pemesanan aula terpadu untuk banyak ruangan dalam satu
            gedung.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card px-4 shadow-subtle sm:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Buka menu navigasi"
                data-ocid="nav.mobile_menu_button"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 border-sidebar-border bg-sidebar p-0"
            >
              <div className="flex h-16 items-center px-5">
                <BrandMark />
              </div>
              <Separator className="bg-sidebar-border" />
              <div className="px-3 py-4">
                <NavLinks
                  isAdmin={admin}
                  onNavigate={() => setMobileOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>

          <div className="lg:hidden">
            <BrandMark />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <AccountControl />
          </div>
        </header>

        <main className="flex-1 bg-background px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl animate-fade-in">
            {children}
          </div>
        </main>

        <footer className="border-t border-border bg-card px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} AulaKu — Manajemen Aula Terpadu</p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="transition-smooth hover:text-foreground"
            >
              Built with love using caffeine.ai
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
