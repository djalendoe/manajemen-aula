import {
  type BookingSummary,
  HallAvailability,
  type HallDetail,
} from "@/backend";
import {
  BookingStatusBadge,
  HallAvailabilityBadge,
} from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useDaySchedule } from "@/hooks/useBookings";
import { useHall } from "@/hooks/useHalls";
import {
  formatCount,
  formatDateKeyLong,
  formatTimeRange,
  todayDateKey,
} from "@/lib/format";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  CalendarPlus,
  CalendarX2,
  Check,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

function UpcomingBookingRow({
  booking,
  index,
}: {
  booking: BookingSummary;
  index: number;
}) {
  return (
    <li
      className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:justify-between"
      data-ocid={`hall.booking_item.${index + 1}`}
    >
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">
          {booking.activityName}
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarX2 className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDateKeyLong(booking.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {formatTimeRange(booking.startMinute, booking.endMinute)}
          </span>
        </p>
      </div>
      <BookingStatusBadge
        status={booking.status}
        className="self-start sm:self-auto"
      />
    </li>
  );
}

function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-6" data-ocid="hall.loading_state">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="aspect-[21/9] w-full rounded-lg" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-56 w-full rounded-lg" />
      </div>
    </div>
  );
}

function HallDetailContent({
  detail,
  availability,
}: {
  detail: HallDetail;
  availability: HallAvailability;
}) {
  const { hall, upcomingBookings } = detail;

  return (
    <div className="flex flex-col gap-6 animate-fade-in" data-ocid="hall.page">
      <div>
        <Button
          asChild
          type="button"
          variant="ghost"
          size="sm"
          className="-ml-2 gap-2 text-muted-foreground"
          data-ocid="hall.back_button"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke Katalog
          </Link>
        </Button>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-border shadow-subtle">
        <img
          src={hall.photoUrl || "/assets/images/placeholder.svg"}
          alt={`Foto ${hall.name}`}
          className="aspect-[21/9] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-background sm:text-3xl">
              {hall.name}
            </h1>
            <HallAvailabilityBadge status={availability} />
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-background/85">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {hall.building}
            {hall.location ? ` · ${hall.location}` : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="flex flex-col gap-6">
          <Card className="rounded-lg border border-border bg-card p-5 shadow-subtle sm:p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Tentang Aula
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {hall.description || "Deskripsi aula belum tersedia."}
            </p>

            <Separator className="my-5" />

            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Fasilitas
            </h3>
            {hall.facilities.length > 0 ? (
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {hall.facilities.map((facility) => (
                  <li
                    key={facility}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/12 text-success">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {facility}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Fasilitas aula ini belum dicatat.
              </p>
            )}
          </Card>

          <Card className="rounded-lg border border-border bg-card p-5 shadow-subtle sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Jadwal Pemakaian Mendatang
              </h2>
              <span className="text-xs font-medium text-muted-foreground">
                {formatCount(upcomingBookings.length)} kegiatan
              </span>
            </div>
            {upcomingBookings.length > 0 ? (
              <ul className="mt-2 divide-y divide-border">
                {upcomingBookings.map((booking, index) => (
                  <UpcomingBookingRow
                    key={booking.id.toString()}
                    booking={booking}
                    index={index}
                  />
                ))}
              </ul>
            ) : (
              <div
                className="mt-4 flex flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 p-8 text-center"
                data-ocid="hall.schedule_empty_state"
              >
                <CalendarX2
                  className="h-6 w-6 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-foreground">
                  Belum ada jadwal mendatang
                </p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Aula ini masih kosong untuk waktu ke depan. Anda dapat menjadi
                  yang pertama mengajukan pemesanan.
                </p>
              </div>
            )}
          </Card>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="rounded-lg border border-border bg-card p-5 shadow-subtle">
            <h2 className="font-display text-base font-semibold text-foreground">
              Ringkasan Aula
            </h2>
            <dl className="mt-4 flex flex-col gap-3.5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  Kapasitas
                </dt>
                <dd className="font-medium text-foreground">
                  {formatCount(hall.capacity)} orang
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  Gedung
                </dt>
                <dd className="text-right font-medium text-foreground">
                  {hall.building || "—"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Lokasi
                </dt>
                <dd className="text-right font-medium text-foreground">
                  {hall.location || "—"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Status hari ini</dt>
                <dd>
                  <HallAvailabilityBadge status={availability} />
                </dd>
              </div>
            </dl>

            <Separator className="my-5" />

            <Button
              asChild
              type="button"
              className="w-full gap-2"
              data-ocid="hall.book_button"
            >
              <Link
                to="/pemesanan/baru"
                search={{ hallId: hall.id.toString() }}
              >
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                Ajukan Pemesanan
              </Link>
            </Button>
            <p className="mt-2.5 text-center text-xs text-muted-foreground">
              Pemesanan akan ditinjau oleh admin sebelum disetujui.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default function HallDetailPage() {
  const { hallId } = useParams({ from: "/aula/$hallId" });
  const parsedId = (() => {
    try {
      return BigInt(hallId);
    } catch {
      return null;
    }
  })();

  const { data: detail, isLoading, isError, refetch } = useHall(parsedId);
  const { data: todaySchedule } = useDaySchedule(parsedId, todayDateKey());

  const availability =
    (todaySchedule?.slots.some((slot) => slot.occupied) ?? false)
      ? HallAvailability.occupied
      : HallAvailability.available;

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError) {
    return (
      <Card
        className="flex flex-col items-center gap-3 rounded-lg border border-destructive/25 bg-destructive/5 p-10 text-center"
        data-ocid="hall.error_state"
      >
        <h1 className="font-display text-lg font-semibold text-foreground">
          Gagal memuat detail aula
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Terjadi kendala saat mengambil data aula. Silakan coba lagi.
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => void refetch()}
            data-ocid="hall.retry_button"
          >
            Coba lagi
          </Button>
          <Button asChild type="button" variant="ghost">
            <Link to="/">Kembali ke Katalog</Link>
          </Button>
        </div>
      </Card>
    );
  }

  if (!detail) {
    return (
      <Card
        className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-card p-12 text-center"
        data-ocid="hall.empty_state"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Building2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="font-display text-lg font-semibold text-foreground">
          Aula tidak ditemukan
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Aula yang Anda cari tidak tersedia atau telah dinonaktifkan.
        </p>
        <Button asChild type="button" data-ocid="hall.back_button">
          <Link to="/">Kembali ke Katalog Aula</Link>
        </Button>
      </Card>
    );
  }

  return <HallDetailContent detail={detail} availability={availability} />;
}
