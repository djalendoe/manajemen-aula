import { BookingStatusBadge } from "@/components/StatusBadge";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useDaySchedule } from "@/hooks/useBookings";
import { useHalls } from "@/hooks/useHalls";
import {
  dateKeyToInputValue,
  formatDateKeyLong,
  formatTimeRange,
  inputValueToDateKey,
  todayDateKey,
} from "@/lib/format";
import type { DateKey, HallId, TimeSlot } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  Clock,
  DoorOpen,
  Loader2,
} from "lucide-react";
import { useMemo, useState } from "react";

const ALL_HALLS = "all";

function SlotRow({ slot, index }: { slot: TimeSlot; index: number }) {
  const occupied = slot.occupied;
  return (
    <li
      className={cn(
        "flex flex-col gap-3 rounded-lg border p-4 transition-smooth sm:flex-row sm:items-center sm:justify-between",
        occupied
          ? "border-warning/30 bg-warning/8"
          : "border-success/25 bg-success/8",
      )}
      data-ocid={`schedule.slot.${index + 1}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            occupied
              ? "bg-warning/15 text-warning"
              : "bg-success/15 text-success",
          )}
        >
          {occupied ? (
            <Clock className="h-5 w-5" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          )}
        </span>
        <div className="min-w-0">
          <p className="font-mono text-sm font-semibold tabular-nums">
            {formatTimeRange(slot.startMinute, slot.endMinute)}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {occupied
              ? (slot.activityName ?? "Kegiatan terjadwal")
              : "Belum ada pemesanan"}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {occupied && slot.status ? (
          <BookingStatusBadge status={slot.status} />
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/12 px-2.5 py-0.5 text-xs font-medium text-success">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Kosong
          </span>
        )}
      </div>
    </li>
  );
}

function ScheduleSkeleton() {
  const ids = Array.from({ length: 5 }, (_, i) => `slot-skeleton-${i}`);
  return (
    <div className="flex flex-col gap-3" data-ocid="schedule.loading_state">
      {ids.map((id) => (
        <Skeleton key={id} className="h-[74px] w-full rounded-lg" />
      ))}
    </div>
  );
}

export default function SchedulePage() {
  const [hallId, setHallId] = useState<HallId | null>(null);
  const [dateKey, setDateKey] = useState<DateKey>(() => todayDateKey());

  const { data: halls, isLoading: hallsLoading } = useHalls({
    facilities: [],
  });
  const { data: schedule, isLoading: scheduleLoading } = useDaySchedule(
    hallId,
    dateKey,
  );

  const selectedHall = useMemo(
    () => halls?.find((entry) => entry.hall.id === hallId)?.hall ?? null,
    [halls, hallId],
  );

  const dateInputValue = dateKeyToInputValue(dateKey);
  const occupiedCount = schedule?.slots.filter((s) => s.occupied).length ?? 0;
  const freeCount = (schedule?.slots.length ?? 0) - occupiedCount;

  return (
    <div className="flex flex-col gap-6" data-ocid="schedule.page">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Jadwal Aula
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Pilih aula dan tanggal untuk melihat slot waktu yang sudah terisi dan
          yang masih kosong. Jadwal hanya menampilkan nama kegiatan dan status
          pemesanan.
        </p>
      </header>

      <Card className="shadow-subtle">
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="schedule-hall">Aula</Label>
            <Select
              value={hallId === null ? ALL_HALLS : hallId.toString()}
              onValueChange={(value) =>
                setHallId(value === ALL_HALLS ? null : BigInt(value))
              }
            >
              <SelectTrigger
                id="schedule-hall"
                className="w-full"
                data-ocid="schedule.hall_select"
              >
                <SelectValue placeholder="Pilih aula" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_HALLS}>Pilih aula…</SelectItem>
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
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="schedule-date">Tanggal</Label>
            <Input
              id="schedule-date"
              type="date"
              value={dateInputValue}
              onChange={(event) => {
                const next = inputValueToDateKey(event.target.value);
                if (next !== null) setDateKey(next);
              }}
              data-ocid="schedule.date_input"
            />
          </div>
        </CardContent>
      </Card>

      {hallId === null ? (
        <Card
          className="border-dashed shadow-none"
          data-ocid="schedule.empty_state"
        >
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <DoorOpen className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="font-display text-lg font-semibold">
              Pilih aula terlebih dahulu
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Jadwal harian ditampilkan per aula. Pilih salah satu aula di atas
              untuk melihat slot waktunya.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-subtle">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarDays
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
                {selectedHall?.name ?? "Jadwal aula"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {formatDateKeyLong(dateKey)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/12 px-3 py-1 font-medium text-success">
                {freeCount} kosong
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/15 px-3 py-1 font-medium text-warning">
                {occupiedCount} terisi
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {scheduleLoading ? (
              <ScheduleSkeleton />
            ) : !schedule || schedule.slots.length === 0 ? (
              <div
                className="flex flex-col items-center gap-3 py-10 text-center"
                data-ocid="schedule.empty_state"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <CalendarDays className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-display text-base font-semibold">
                  Belum ada slot jadwal
                </h3>
                <p className="max-w-md text-sm text-muted-foreground">
                  Tidak ada slot waktu untuk aula ini pada tanggal tersebut.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3" data-ocid="schedule.list">
                {schedule.slots.map((slot, index) => (
                  <SlotRow
                    key={`${slot.startMinute.toString()}-${slot.endMinute.toString()}`}
                    slot={slot}
                    index={index}
                  />
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Ingin memakai aula ini? Ajukan pemesanan pada tanggal dan jam
                yang masih kosong.
              </p>
              <Button
                asChild
                type="button"
                className="gap-2"
                data-ocid="schedule.book_button"
              >
                <Link
                  to="/pemesanan/baru"
                  search={{
                    hallId: hallId?.toString(),
                    date: dateKeyToInputValue(dateKey),
                  }}
                >
                  <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                  Ajukan Pemesanan
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {scheduleLoading ? (
        <output className="sr-only">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Memuat jadwal…
        </output>
      ) : null}
    </div>
  );
}
