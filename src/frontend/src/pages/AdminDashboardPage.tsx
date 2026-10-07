import { BookingStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllBookings, useDashboardSummary } from "@/hooks/useBookings";
import { formatCount, formatDateKeyShort, formatTimeRange } from "@/lib/format";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  ClipboardList,
  Clock3,
  type LucideIcon,
} from "lucide-react";

interface SummaryCard {
  key: string;
  label: string;
  value: bigint | undefined;
  icon: LucideIcon;
  tone: string;
  to: string;
  hint: string;
}

function SummaryCardView({ card }: { card: SummaryCard }) {
  const Icon = card.icon;
  return (
    <Card
      className="rounded-lg border-border shadow-subtle transition-smooth hover:shadow-elevated"
      data-ocid={`dashboard.${card.key}_card`}
    >
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {card.label}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold tracking-tight">
            {card.value === undefined ? "—" : formatCount(card.value)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{card.hint}</p>
        </div>
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${card.tone}`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </CardContent>
    </Card>
  );
}

function SummarySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => `summary-skeleton-${i}`).map(
        (id) => (
          <Card key={id} className="rounded-lg border-border shadow-subtle">
            <CardContent className="flex items-start justify-between gap-4 p-5">
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-11 w-11 rounded-lg" />
            </CardContent>
          </Card>
        ),
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: bookings, isLoading: bookingsLoading } = useAllBookings();

  const cards: SummaryCard[] = [
    {
      key: "halls",
      label: "Total Aula",
      value: summary?.totalHalls,
      icon: Building2,
      tone: "bg-primary/12 text-primary",
      to: "/admin/aula",
      hint: "Ruangan terdaftar dalam sistem",
    },
    {
      key: "pending",
      label: "Menunggu Persetujuan",
      value: summary?.pendingBookings,
      icon: Clock3,
      tone: "bg-warning/15 text-warning",
      to: "/admin/pemesanan",
      hint: "Pengajuan yang perlu ditinjau",
    },
    {
      key: "approved",
      label: "Disetujui",
      value: summary?.approvedBookings,
      icon: CalendarCheck2,
      tone: "bg-success/12 text-success",
      to: "/admin/pemesanan",
      hint: "Pemesanan yang telah disetujui",
    },
  ];

  const recent = (bookings ?? [])
    .slice()
    .sort((a, b) => Number(b.createdAt - a.createdAt))
    .slice(0, 6);

  return (
    <div className="space-y-8" data-ocid="dashboard.page">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Dasbor Admin
        </h1>
        <p className="text-sm text-muted-foreground">
          Ringkasan pengelolaan aula dan pemesanan dalam satu tampilan.
        </p>
      </header>

      <section aria-label="Ringkasan" data-ocid="dashboard.summary_section">
        {summaryLoading ? (
          <SummarySkeleton />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <SummaryCardView key={card.key} card={card} />
            ))}
          </div>
        )}
      </section>

      <section
        aria-label="Pemesanan terbaru"
        data-ocid="dashboard.recent_section"
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight">
              Pemesanan Terbaru
            </h2>
            <p className="text-sm text-muted-foreground">
              Enam pengajuan terakhir yang masuk ke sistem.
            </p>
          </div>
          <Button
            asChild
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            data-ocid="dashboard.view_all_bookings_button"
          >
            <Link to="/admin/pemesanan">
              Lihat semua
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <Card className="rounded-lg border-border shadow-subtle">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              Aktivitas Pemesanan
            </CardTitle>
            <CardDescription>
              Status terkini setiap pengajuan pemesanan aula.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {bookingsLoading ? (
              <div
                className="space-y-3 p-5"
                data-ocid="dashboard.loading_state"
              >
                {Array.from(
                  { length: 4 },
                  (_, i) => `recent-skeleton-${i}`,
                ).map((id) => (
                  <div key={id} className="flex items-center gap-4">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="ml-auto h-6 w-24 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recent.length === 0 ? (
              <div
                className="flex flex-col items-center gap-2 px-5 py-10 text-center"
                data-ocid="dashboard.recent_empty_state"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <ClipboardList className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="font-medium">Belum ada pemesanan</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Pengajuan pemesanan dari pengguna akan tampil di sini begitu
                  masuk.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {recent.map((booking, index) => (
                  <li
                    key={booking.id.toString()}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5"
                    data-ocid={`dashboard.recent_item.${index + 1}`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        {booking.activityName}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {booking.hallName} · {formatDateKeyShort(booking.date)}{" "}
                        ·{" "}
                        {formatTimeRange(
                          booking.startMinute,
                          booking.endMinute,
                        )}
                      </p>
                    </div>
                    <BookingStatusBadge status={booking.status} />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
