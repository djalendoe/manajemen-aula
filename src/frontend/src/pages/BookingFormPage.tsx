import type { BookingError, BookingInput } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBooking } from "@/hooks/useBookings";
import { useHalls } from "@/hooks/useHalls";
import {
  dateKeyToInputValue,
  formatDateKeyLong,
  formatTimeRange,
  inputValueToDateKey,
  inputValueToMinuteOfDay,
  todayDateKey,
} from "@/lib/format";
import type { DateKey, HallId } from "@/lib/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  CalendarPlus,
  CheckCircle2,
  LogIn,
  Send,
} from "lucide-react";
import { useState } from "react";

/** Map a backend booking error variant to a clear Indonesian message. */
function bookingErrorMessage(error: BookingError): string {
  switch (error.__kind__) {
    case "conflict":
      return "Jadwal bentrok: aula ini sudah dipesan dan disetujui pada rentang waktu tersebut. Silakan pilih jam atau aula lain.";
    case "invalidTimeRange":
      return "Jam selesai harus lebih besar daripada jam mulai.";
    case "invalidDate":
      return "Tanggal yang dipilih tidak valid. Pilih tanggal hari ini atau setelahnya.";
    case "hallNotFound":
      return "Aula yang dipilih tidak ditemukan. Muat ulang halaman dan coba lagi.";
    case "hallInactive":
      return "Aula ini sedang tidak aktif dan tidak menerima pemesanan baru.";
    case "notAuthorized":
      return "Anda harus masuk terlebih dahulu untuk mengajukan pemesanan.";
    case "notOwner":
      return "Anda tidak memiliki akses untuk pemesanan ini.";
    case "invalidStatus":
      return "Status pemesanan tidak mengizinkan tindakan ini.";
    case "bookingNotFound":
      return "Pemesanan tidak ditemukan.";
    default:
      return "Pengajuan pemesanan gagal. Silakan periksa data dan coba lagi.";
  }
}

export default function BookingFormPage() {
  const { isAuthenticated, isInitializing, login } = useInternetIdentity();
  const search = useSearch({ strict: false }) as {
    hallId?: string;
    date?: string;
  };
  const { data: halls, isLoading: hallsLoading } = useHalls({
    facilities: [],
  });
  const createBooking = useCreateBooking();

  const [hallId, setHallId] = useState<HallId | null>(() => {
    if (!search.hallId) return null;
    try {
      return BigInt(search.hallId);
    } catch {
      return null;
    }
  });
  const [dateValue, setDateValue] = useState(() =>
    search.date ? search.date : dateKeyToInputValue(todayDateKey()),
  );
  const [startValue, setStartValue] = useState("08:00");
  const [endValue, setEndValue] = useState("10:00");
  const [activityName, setActivityName] = useState("");
  const [participantValue, setParticipantValue] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (isInitializing) {
    return (
      <div
        className="flex min-h-[50vh] items-center justify-center"
        data-ocid="booking.loading_state"
      >
        <span className="text-sm text-muted-foreground">Memuat sesi…</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center"
        data-ocid="booking.auth_required_state"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary">
          <LogIn className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="font-display text-2xl font-semibold">
          Masuk untuk mengajukan pemesanan
        </h1>
        <p className="text-sm text-muted-foreground">
          Anda perlu masuk dengan Internet Identity sebelum dapat mengajukan
          pemesanan aula.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            onClick={() => login()}
            className="gap-2"
            data-ocid="booking.login_button"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Masuk
          </Button>
          <Button
            asChild
            type="button"
            variant="outline"
            data-ocid="booking.back_button"
          >
            <Link to="/jadwal">Lihat Jadwal</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (hallId === null) {
      setFormError("Pilih aula yang ingin dipesan.");
      return;
    }
    const date = inputValueToDateKey(dateValue);
    if (date === null) {
      setFormError("Pilih tanggal pemesanan yang valid.");
      return;
    }
    const startMinute = inputValueToMinuteOfDay(startValue);
    const endMinute = inputValueToMinuteOfDay(endValue);
    if (startMinute === null || endMinute === null) {
      setFormError("Isi jam mulai dan jam selesai.");
      return;
    }
    if (endMinute <= startMinute) {
      setFormError("Jam selesai harus lebih besar daripada jam mulai.");
      return;
    }
    const trimmedName = activityName.trim();
    if (trimmedName.length === 0) {
      setFormError("Nama kegiatan wajib diisi.");
      return;
    }
    const participants = Number.parseInt(participantValue, 10);
    if (!Number.isFinite(participants) || participants <= 0) {
      setFormError("Jumlah peserta harus berupa angka lebih dari nol.");
      return;
    }

    const input: BookingInput = {
      hallId,
      date,
      startMinute,
      endMinute,
      activityName: trimmedName,
      participantCount: BigInt(participants),
      notes: notes.trim(),
    };

    createBooking.mutate(input, {
      onSuccess: (result) => {
        if (result.__kind__ === "ok") {
          setSuccessMessage(
            `Pengajuan "${trimmedName}" berhasil dikirim dan berstatus menunggu persetujuan.`,
          );
          setActivityName("");
          setParticipantValue("");
          setNotes("");
        } else {
          setFormError(bookingErrorMessage(result.err));
        }
      },
      onError: () => {
        setFormError(
          "Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi.",
        );
      },
    });
  };

  const selectedHall = halls?.find((entry) => entry.hall.id === hallId)?.hall;
  const dateKey: DateKey | null = inputValueToDateKey(dateValue);
  const startMinute = inputValueToMinuteOfDay(startValue);
  const endMinute = inputValueToMinuteOfDay(endValue);

  return (
    <div
      className="mx-auto flex max-w-3xl flex-col gap-6"
      data-ocid="booking.page"
    >
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Ajukan Pemesanan Aula
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Lengkapi detail kegiatan. Pengajuan akan berstatus menunggu hingga
          disetujui oleh admin.
        </p>
      </header>

      {successMessage ? (
        <div
          className="flex items-start gap-3 rounded-lg border border-success/25 bg-success/10 p-4"
          data-ocid="booking.success_state"
        >
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-success"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-foreground">
              {successMessage}
            </p>
            <Link
              to="/pemesanan-saya"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              data-ocid="booking.my_bookings_link"
            >
              Lihat pemesanan saya
            </Link>
          </div>
        </div>
      ) : null}

      {formError ? (
        <div
          className="flex items-start gap-3 rounded-lg border border-destructive/25 bg-destructive/10 p-4"
          data-ocid="booking.error_state"
        >
          <AlertCircle
            className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-foreground">{formError}</p>
        </div>
      ) : null}

      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle className="text-lg">Detail Pemesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="booking-hall">Aula</Label>
              <Select
                value={hallId === null ? "" : hallId.toString()}
                onValueChange={(value) => setHallId(BigInt(value))}
              >
                <SelectTrigger
                  id="booking-hall"
                  className="w-full"
                  data-ocid="booking.hall_select"
                >
                  <SelectValue placeholder="Pilih aula" />
                </SelectTrigger>
                <SelectContent>
                  {halls?.map((entry) => (
                    <SelectItem
                      key={entry.hall.id.toString()}
                      value={entry.hall.id.toString()}
                    >
                      {entry.hall.name} — {entry.hall.building}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hallsLoading ? (
                <p className="text-xs text-muted-foreground">
                  Memuat daftar aula…
                </p>
              ) : null}
              {selectedHall ? (
                <p className="text-xs text-muted-foreground">
                  Kapasitas {selectedHall.capacity.toString()} orang ·{" "}
                  {selectedHall.location}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="booking-date">Tanggal</Label>
              <Input
                id="booking-date"
                type="date"
                value={dateValue}
                onChange={(event) => setDateValue(event.target.value)}
                data-ocid="booking.date_input"
              />
              {dateKey !== null ? (
                <p className="text-xs text-muted-foreground">
                  {formatDateKeyLong(dateKey)}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="booking-start">Jam Mulai</Label>
                <Input
                  id="booking-start"
                  type="time"
                  value={startValue}
                  onChange={(event) => setStartValue(event.target.value)}
                  data-ocid="booking.start_input"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="booking-end">Jam Selesai</Label>
                <Input
                  id="booking-end"
                  type="time"
                  value={endValue}
                  onChange={(event) => setEndValue(event.target.value)}
                  data-ocid="booking.end_input"
                />
              </div>
            </div>
            {startMinute !== null && endMinute !== null ? (
              <p className="-mt-2 text-xs text-muted-foreground">
                Rentang waktu: {formatTimeRange(startMinute, endMinute)}
              </p>
            ) : null}

            <div className="flex flex-col gap-2">
              <Label htmlFor="booking-activity">Nama Kegiatan</Label>
              <Input
                id="booking-activity"
                value={activityName}
                onChange={(event) => setActivityName(event.target.value)}
                placeholder="Contoh: Rapat Koordinasi Divisi"
                data-ocid="booking.activity_input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="booking-participants">Jumlah Peserta</Label>
              <Input
                id="booking-participants"
                type="number"
                min={1}
                inputMode="numeric"
                value={participantValue}
                onChange={(event) => setParticipantValue(event.target.value)}
                placeholder="Contoh: 40"
                data-ocid="booking.participants_input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="booking-notes">Catatan (opsional)</Label>
              <Textarea
                id="booking-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Kebutuhan tambahan, susunan acara, atau informasi lain."
                rows={3}
                data-ocid="booking.notes_textarea"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
              <Button
                asChild
                type="button"
                variant="outline"
                data-ocid="booking.cancel_button"
              >
                <Link to="/jadwal">Batal</Link>
              </Button>
              <Button
                type="submit"
                disabled={createBooking.isPending}
                className="gap-2"
                data-ocid="booking.submit_button"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {createBooking.isPending ? "Mengirim…" : "Kirim Pengajuan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
        Pengajuan yang bentrok dengan pemesanan disetujui akan ditolak otomatis
        oleh sistem.
      </p>
    </div>
  );
}
