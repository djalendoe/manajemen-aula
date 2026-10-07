import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCallerRole } from "@/hooks/useBackend";
import { USER_ROLE_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  Fingerprint,
  LogIn,
  LogOut,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

function RoleBadge({ role }: { role: keyof typeof USER_ROLE_LABELS }) {
  const isAdmin = role === "admin";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        isAdmin
          ? "border-primary/25 bg-primary/12 text-primary"
          : "border-border bg-muted text-muted-foreground",
      )}
      data-ocid="login.role_badge"
    >
      {isAdmin ? (
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {USER_ROLE_LABELS[role]}
    </span>
  );
}

export default function LoginPage() {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    login,
    clear,
  } = useInternetIdentity();
  const { data: role, isLoading: roleLoading } = useCallerRole();

  const principal = identity?.getPrincipal().toText() ?? null;

  return (
    <div
      className="mx-auto flex max-w-2xl flex-col gap-6 py-8"
      data-ocid="login.page"
    >
      <header className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elevated">
          <Sparkles className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Masuk ke AulaKu
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Gunakan Internet Identity untuk mengakses pemesanan aula dan melihat
          status pengajuan Anda.
        </p>
      </header>

      <Card className="shadow-subtle">
        <CardContent className="flex flex-col gap-5 pt-6">
          {isInitializing ? (
            <div
              className="flex flex-col items-center gap-2 py-8 text-center"
              data-ocid="login.loading_state"
            >
              <span className="text-sm text-muted-foreground">
                Memeriksa sesi…
              </span>
            </div>
          ) : isAuthenticated ? (
            <div
              className="flex flex-col gap-5"
              data-ocid="login.signed_in_state"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success/12 text-success">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="flex flex-col">
                  <p className="font-display text-base font-semibold">
                    Anda sudah masuk
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sesi aktif dengan Internet Identity.
                  </p>
                </div>
              </div>

              <Separator />

              <dl className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Peran
                  </dt>
                  <dd>
                    {roleLoading ? (
                      <span className="text-sm text-muted-foreground">
                        Memuat peran…
                      </span>
                    ) : role ? (
                      <RoleBadge role={role} />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Tidak diketahui
                      </span>
                    )}
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Principal
                  </dt>
                  <dd>
                    <code
                      className="block break-all rounded-lg bg-muted px-3 py-2 font-mono text-xs text-foreground"
                      data-ocid="login.principal_text"
                    >
                      {principal ?? "Tidak tersedia"}
                    </code>
                  </dd>
                </div>
              </dl>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  type="button"
                  className="gap-2"
                  data-ocid="login.my_bookings_button"
                >
                  <Link to="/pemesanan-saya">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    Pemesanan Saya
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => clear()}
                  className="gap-2"
                  data-ocid="login.logout_button"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Keluar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3 rounded-lg bg-muted/60 p-4">
                <Fingerprint
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="text-sm text-muted-foreground">
                  Internet Identity adalah cara masuk yang aman tanpa kata
                  sandi. Identitas Anda hanya digunakan untuk mengelola
                  pemesanan aula.
                </p>
              </div>
              <Button
                type="button"
                onClick={() => login()}
                disabled={isLoggingIn}
                className="gap-2"
                data-ocid="login.submit_button"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                {isLoggingIn
                  ? "Menghubungkan…"
                  : "Masuk dengan Internet Identity"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        Dengan masuk, Anda menyetujui penggunaan identitas untuk keperluan
        pemesanan aula di sistem ini.
      </p>
    </div>
  );
}
