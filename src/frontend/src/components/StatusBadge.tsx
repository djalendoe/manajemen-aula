import type { BookingStatus, HallAvailability } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { BOOKING_STATUS_LABELS, HALL_AVAILABILITY_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Ban, CheckCircle2, CircleDot, Clock, XCircle } from "lucide-react";

type StatusTone = "success" | "warning" | "destructive" | "muted" | "info";

const TONE_CLASSES: Record<StatusTone, string> = {
  success: "border-success/25 bg-success/12 text-success hover:bg-success/12",
  warning: "border-warning/30 bg-warning/15 text-warning hover:bg-warning/15",
  destructive:
    "border-destructive/25 bg-destructive/12 text-destructive hover:bg-destructive/12",
  muted: "border-border bg-muted text-muted-foreground hover:bg-muted",
  info: "border-info/25 bg-info/12 text-info hover:bg-info/12",
};

const BOOKING_TONES: Record<BookingStatus, StatusTone> = {
  menunggu: "warning",
  disetujui: "success",
  ditolak: "destructive",
  dibatalkan: "muted",
};

const BOOKING_ICONS: Record<BookingStatus, typeof Clock> = {
  menunggu: Clock,
  disetujui: CheckCircle2,
  ditolak: XCircle,
  dibatalkan: Ban,
};

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

/** Status pill for a booking: menunggu / disetujui / ditolak / dibatalkan. */
export function BookingStatusBadge({
  status,
  className,
}: BookingStatusBadgeProps) {
  const Icon = BOOKING_ICONS[status];
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-full px-2.5 py-0.5 font-medium",
        TONE_CLASSES[BOOKING_TONES[status]],
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {BOOKING_STATUS_LABELS[status]}
    </Badge>
  );
}

interface HallAvailabilityBadgeProps {
  status: HallAvailability;
  className?: string;
}

/** Status pill for hall availability today: tersedia / sedang dipakai. */
export function HallAvailabilityBadge({
  status,
  className,
}: HallAvailabilityBadgeProps) {
  const available = status === "available";
  const Icon = available ? CheckCircle2 : CircleDot;
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-full px-2.5 py-0.5 font-medium",
        TONE_CLASSES[available ? "success" : "warning"],
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {HALL_AVAILABILITY_LABELS[status]}
    </Badge>
  );
}

interface ActiveBadgeProps {
  active: boolean;
  className?: string;
}

/** Status pill for a hall's active/inactive flag in the admin panel. */
export function ActiveBadge({ active, className }: ActiveBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-full px-2.5 py-0.5 font-medium",
        TONE_CLASSES[active ? "success" : "muted"],
        className,
      )}
    >
      {active ? "Aktif" : "Nonaktif"}
    </Badge>
  );
}
