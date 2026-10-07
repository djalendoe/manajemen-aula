import { BookingStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCancelBooking, useMyBookings } from "@/hooks/useBookings";
import {
  formatCount,
  formatDateKeyLong,
  formatTimeRange,
  formatTimestamp,
} from "@/lib/format";
import { BOOKING_STATUS_LABELS, CANCELLABLE_STATUSES } from "@/lib/types";
import type { Booking } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CalendarPlus,
  ClipboardList,
  Clock,
  LogIn,
  MapPin,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

function BookingCard({
  booking,
  index,
  onCancel,
  cancelling,
}: {
  booking: Booking;
  index: number;
  onCancel: (booking: Booking) => void;
  cancelling: boolean;
}) {
  const cancellable = CANCELLABLE_STATUSES.includes(booking.status);
  return (
    <Card className="shadow-subtle" data-ocid={`bookings.item.${index + 1}`}>
      <CardContent className="flex flex-col gap-4 pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="truncate font-display text-base font-semibold">
              {booking.activityName}
            </h3>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{booking.hallName}</span>
            </p>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Tanggal
            </dt>
            <dd className="font-medium">{formatDateKeyLong(booking.date)}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Waktu
            </dt>
            <dd className="flex items-center gap-1.5 font-mono font-medium tabular-nums">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {formatTimeRange(booking.startMinute, booking.endMinute)}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Peserta
            </dt>
            <dd className="flex items-center gap-1.5 font-medium">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              {formatCount(booking.participantCount)} orang
            </dd>
          </div>
        </dl>

        {booking.notes ? (
          <p className="rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
            {booking.notes}
          </p>
        ) : null}

        {booking.status === "ditolak" && booking.rejectionReason ? (
          <div
            className="flex items-start gap-2 rounded-lg border border-destructive/25 bg-destructive/10 p-3"
            data-ocid={`bookings.rejection.${index + 1}`}
          >
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-destructive"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-destructive">
                Alasan penolakan
              </p>
              <p className="text-sm text-foreground">
                {booking.rejectionReason}
              </p>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Diajukan {formatTimestamp(booking.createdAt)}
          </p>
          {cancellable ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onCancel(booking)}
              disabled={cancelling}
              className="gap-2 text-destructive hover:text-destructive"
              data-ocid={`bookings.cancel_button.${index + 1}`}
            >
              <XCircle className="h-4 w-4" aria-hidden="true" />
              {cancelling ? "Membatalkan…" : "Batalkan"}
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function BookingsSkeleton() {
  const ids = Array.from({ length: 3 }, (_, i) => `booking-skeleton-${i}`);
  return (
    <div className="flex flex-col gap-4" data-ocid="bookings.loading_state">
      {ids.map((id) => (
        <Skeleton key={id} className="h-48 w-full rounded-xl" />
      ))}
    </div>
  );
}

export default function MyBookingsPage() {
  const { isAuthenticated, isInitializing, login } = useInternetIdentity();
  const { data: bookings, isLoading } = useMyBookings();
  const cancelBooking = useCancelBooking();
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  if (isInitializing) {
    return (
      <div
        className="flex min-h-[50vh] items-center justify-center"
        data-ocid="bookings.loading_state"
      >
        <span className="text-sm text-muted-foreground">Memuat sesi…</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center"
        data-ocid="bookings.auth_required_state"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary">
          <LogIn className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="font-display text-2xl font-semibold">
          Masuk untuk melihat pemesanan
        </h1>
        <p className="text-sm text-muted-foreground">
          Daftar pemesanan Anda tersedia setelah masuk dengan Internet Identity.
        </p>
        <Button
          type="button"
          onClick={() => login()}
          className="gap-2"
          data-ocid="bookings.login_button"
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Masuk
        </Button>
      </div>
    );
  }

  const handleCancel = (booking: Booking) => {
    setCancelError(null);
    setPendingId(booking.id.toString());
    cancelBooking.mutate(booking.id, {
      onSuccess: (result) => {
        setPendingId(null);
        if (result.__kind__ === "err") {
          setCancelError(
            "Pemesanan tidak dapat dibatalkan. Mungkin statusnya sudah berubah.",
          );
        }
      },
      onError: () => {
        setPendingId(null);
        setCancelError(
          "Terjadi kesalahan saat membatalkan pemesanan. Silakan coba lagi.",
        );
      },
    });
  };

  const list = bookings ?? [];

  return (
    <div className="flex flex-col gap-6" data-ocid="bookings.page">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Pemesanan Saya
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Pantau status pengajuan Anda dan batalkan pemesanan yang masih
            menunggu atau sudah disetujui.
          </p>
        </div>
        <Button
          asChild
          type="button"
          className="gap-2"
          data-ocid="bookings.new_button"
        >
          <Link to="/pemesanan/baru">
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
            Ajukan Pemesanan
          </Link>
        </Button>
      </header>

      {cancelError ? (
        <div
          className="flex items-start gap-3 rounded-lg border border-destructive/25 bg-destructive/10 p-4"
          data-ocid="bookings.error_state"
        >
          <AlertCircle
            className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-foreground">{cancelError}</p>
        </div>
      ) : null}

      {isLoading ? (
        <BookingsSkeleton />
      ) : list.length === 0 ? (
        <Card
          className="border-dashed shadow-none"
          data-ocid="bookings.empty_state"
        >
          <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ClipboardList className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="font-display text-lg font-semibold">
              Belum ada pemesanan
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Anda belum mengajukan pemesanan aula. Mulai dengan memilih aula
              dan jadwal yang tersedia.
            </p>
            <Button
              asChild
              type="button"
              className="mt-1 gap-2"
              data-ocid="bookings.empty_action_button"
            >
              <Link to="/pemesanan/baru">
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                Ajukan Pemesanan
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4" data-ocid="bookings.list">
          {list.map((booking, index) => (
            <BookingCard
              key={booking.id.toString()}
              booking={booking}
              index={index}
              onCancel={handleCancel}
              cancelling={pendingId === booking.id.toString()}
            />
          ))}
        </div>
      )}

      {list.length > 0 ? (
        <p className="text-xs text-muted-foreground">
          Menampilkan {formatCount(list.length)} pemesanan. Status{" "}
          {BOOKING_STATUS_LABELS.menunggu.toLowerCase()} dan{" "}
          {BOOKING_STATUS_LABELS.disetujui.toLowerCase()} masih dapat
          dibatalkan.
        </p>
      ) : null}
    </div>
  );
}
