import { BookingStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  useAllBookings,
  useApproveBooking,
  useRejectBooking,
} from "@/hooks/useBookings";
import { formatCount, formatDateKeyShort, formatTimeRange } from "@/lib/format";
import {
  BOOKING_STATUS_LABELS,
  type Booking,
  BookingStatus,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, ClipboardList, Loader2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type StatusFilter = "semua" | BookingStatus;

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: BookingStatus.menunggu, label: "Menunggu" },
  { value: BookingStatus.disetujui, label: "Disetujui" },
  { value: BookingStatus.ditolak, label: "Ditolak" },
  { value: BookingStatus.dibatalkan, label: "Dibatalkan" },
];

function shortPrincipal(principal: Booking["user"]): string {
  const text = principal.toText();
  return text.length > 12 ? `${text.slice(0, 5)}…${text.slice(-4)}` : text;
}

function TableSkeleton() {
  return (
    <div className="space-y-3 p-5" data-ocid="admin_bookings.loading_state">
      {Array.from({ length: 5 }, (_, i) => `booking-skeleton-${i}`).map(
        (id) => (
          <div key={id} className="flex items-center gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="ml-auto h-8 w-32" />
          </div>
        ),
      )}
    </div>
  );
}

export default function AdminBookingsPage() {
  const { data: bookings, isLoading } = useAllBookings();
  const approve = useApproveBooking();
  const reject = useRejectBooking();

  const [filter, setFilter] = useState<StatusFilter>("semua");
  const [rejectTarget, setRejectTarget] = useState<Booking | null>(null);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState(false);

  const rows = useMemo(() => {
    const list = (bookings ?? []).slice();
    list.sort((a, b) => Number(b.createdAt - a.createdAt));
    if (filter === "semua") return list;
    return list.filter((booking) => booking.status === filter);
  }, [bookings, filter]);

  const pendingCount = (bookings ?? []).filter(
    (booking) => booking.status === BookingStatus.menunggu,
  ).length;

  function handleApprove(booking: Booking) {
    approve.mutate(booking.id, {
      onSuccess: () => toast.success("Pemesanan disetujui."),
      onError: () => toast.error("Gagal menyetujui pemesanan."),
    });
  }

  function openReject(booking: Booking) {
    setRejectTarget(booking);
    setReason("");
    setReasonError(false);
  }

  function closeReject() {
    setRejectTarget(null);
    setReason("");
    setReasonError(false);
  }

  function submitReject() {
    if (!rejectTarget) return;
    const trimmed = reason.trim();
    if (!trimmed) {
      setReasonError(true);
      return;
    }
    const target = rejectTarget;
    reject.mutate(
      { bookingId: target.id, reason: trimmed },
      {
        onSuccess: () => {
          toast.success("Pemesanan ditolak.");
          closeReject();
        },
        onError: () => toast.error("Gagal menolak pemesanan."),
      },
    );
  }

  return (
    <div className="space-y-6" data-ocid="admin_bookings.page">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Kelola Pemesanan
        </h1>
        <p className="text-sm text-muted-foreground">
          Tinjau seluruh pengajuan pemesanan aula, lalu setujui atau tolak
          dengan alasan yang jelas.
        </p>
      </header>

      <div
        className="flex flex-wrap items-center gap-2"
        aria-label="Filter status pemesanan"
        data-ocid="admin_bookings.filter.tab"
      >
        {FILTERS.map((item) => {
          const active = filter === item.value;
          return (
            <Button
              key={item.value}
              type="button"
              size="sm"
              variant={active ? "default" : "outline"}
              onClick={() => setFilter(item.value)}
              aria-pressed={active}
              data-ocid={`admin_bookings.filter.${item.value}`}
              className="rounded-full"
            >
              {item.label}
              {item.value === "menunggu" && pendingCount > 0 ? (
                <span
                  className={cn(
                    "ml-1.5 rounded-full px-1.5 text-xs font-semibold",
                    active
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-warning/15 text-warning",
                  )}
                >
                  {pendingCount}
                </span>
              ) : null}
            </Button>
          );
        })}
      </div>

      <Card className="rounded-lg border-border shadow-subtle">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardList
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            Daftar Pengajuan
          </CardTitle>
          <CardDescription>
            {rows.length} pemesanan ditampilkan
            {filter !== "semua"
              ? ` dengan status ${BOOKING_STATUS_LABELS[filter].toLowerCase()}`
              : ""}
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <TableSkeleton />
          ) : rows.length === 0 ? (
            <div
              className="flex flex-col items-center gap-2 px-5 py-12 text-center"
              data-ocid="admin_bookings.empty_state"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-medium">Tidak ada pemesanan</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Belum ada pengajuan yang cocok dengan filter ini.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin_bookings.table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]">Aula</TableHead>
                    <TableHead className="min-w-[120px]">Tanggal</TableHead>
                    <TableHead className="min-w-[130px]">Waktu</TableHead>
                    <TableHead className="min-w-[160px]">Kegiatan</TableHead>
                    <TableHead className="text-right">Peserta</TableHead>
                    <TableHead className="min-w-[120px]">Pemohon</TableHead>
                    <TableHead className="min-w-[120px]">Status</TableHead>
                    <TableHead className="min-w-[170px] text-right">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((booking, index) => {
                    const isPending = booking.status === BookingStatus.menunggu;
                    const approving =
                      approve.isPending &&
                      approve.variables?.toString() === booking.id.toString();
                    return (
                      <TableRow
                        key={booking.id.toString()}
                        data-ocid={`admin_bookings.row.${index + 1}`}
                      >
                        <TableCell className="font-medium">
                          {booking.hallName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDateKeyShort(booking.date)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {formatTimeRange(
                            booking.startMinute,
                            booking.endMinute,
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="line-clamp-1">
                            {booking.activityName}
                          </span>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCount(booking.participantCount)}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {shortPrincipal(booking.user)}
                        </TableCell>
                        <TableCell>
                          <BookingStatusBadge status={booking.status} />
                        </TableCell>
                        <TableCell>
                          {isPending ? (
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="gap-1.5 border-success/30 text-success hover:bg-success/10 hover:text-success"
                                disabled={approving}
                                onClick={() => handleApprove(booking)}
                                data-ocid={`admin_bookings.approve_button.${index + 1}`}
                              >
                                {approving ? (
                                  <Loader2
                                    className="h-4 w-4 animate-spin"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Check
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                )}
                                Setujui
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => openReject(booking)}
                                data-ocid={`admin_bookings.reject_button.${index + 1}`}
                              >
                                <X className="h-4 w-4" aria-hidden="true" />
                                Tolak
                              </Button>
                            </div>
                          ) : (
                            <p className="text-right text-xs text-muted-foreground">
                              {booking.status === BookingStatus.ditolak &&
                              booking.rejectionReason
                                ? `Alasan: ${booking.rejectionReason}`
                                : "Tidak ada aksi"}
                            </p>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={rejectTarget !== null}
        onOpenChange={(open) => {
          if (!open) closeReject();
        }}
      >
        <DialogContent data-ocid="admin_bookings.reject_dialog">
          <DialogHeader>
            <DialogTitle>Tolak Pemesanan</DialogTitle>
            <DialogDescription>
              Berikan alasan penolakan untuk{" "}
              <span className="font-medium text-foreground">
                {rejectTarget?.activityName}
              </span>{" "}
              di {rejectTarget?.hallName}. Alasan ini akan terlihat oleh
              pemohon.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="reject-reason">Alasan penolakan</Label>
            <Textarea
              id="reject-reason"
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
                if (reasonError) setReasonError(false);
              }}
              placeholder="Contoh: Aula sudah digunakan untuk kegiatan lain pada waktu tersebut."
              rows={4}
              aria-invalid={reasonError}
              aria-describedby={reasonError ? "reject-reason-error" : undefined}
              data-ocid="admin_bookings.reject_reason_textarea"
            />
            {reasonError ? (
              <p
                id="reject-reason-error"
                className="text-sm text-destructive"
                data-ocid="admin_bookings.reject_reason_error"
              >
                Alasan penolakan wajib diisi.
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeReject}
              disabled={reject.isPending}
              data-ocid="admin_bookings.reject_cancel_button"
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={submitReject}
              disabled={reject.isPending || reason.trim().length === 0}
              data-ocid="admin_bookings.reject_confirm_button"
            >
              {reject.isPending ? (
                <Loader2
                  className="mr-1.5 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : null}
              Tolak Pemesanan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
