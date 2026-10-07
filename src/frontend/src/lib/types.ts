import {
  type Booking,
  BookingStatus,
  type DashboardSummary,
  type DateKey,
  type DaySchedule,
  type Hall,
  type HallAvailability,
  type HallDetail,
  type HallFilter,
  type HallId,
  type HallInput,
  type HallUpdate,
  type HallWithStatus,
  type MinuteOfDay,
  type TimeSlot,
  type UserRole,
} from "@/backend";

export { BookingStatus };

export type {
  Booking,
  DashboardSummary,
  DateKey,
  DaySchedule,
  Hall,
  HallAvailability,
  HallDetail,
  HallFilter,
  HallId,
  HallInput,
  HallUpdate,
  HallWithStatus,
  MinuteOfDay,
  TimeSlot,
  UserRole,
};

/** A single facility option offered in catalog filters and hall forms. */
export interface FacilityOption {
  value: string;
  label: string;
}

/** Canonical facility vocabulary shared by catalog filters and admin forms. */
export const FACILITY_OPTIONS: FacilityOption[] = [
  { value: "AC", label: "AC" },
  { value: "Proyektor", label: "Proyektor" },
  { value: "Tata Suara", label: "Tata Suara" },
  { value: "Panggung", label: "Panggung" },
  { value: "WiFi", label: "WiFi" },
  { value: "Papan Tulis", label: "Papan Tulis" },
  { value: "TV Layar Besar", label: "TV Layar Besar" },
  { value: "Meja Lipat", label: "Meja Lipat" },
  { value: "Area Pameran", label: "Area Pameran" },
  { value: "Toilet", label: "Toilet" },
  { value: "Parkir", label: "Parkir" },
  { value: "Lift", label: "Lift" },
  { value: "Kantin", label: "Kantin" },
];

/** Human-readable Indonesian labels for booking statuses. */
export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  menunggu: "Menunggu",
  disetujui: "Disetujui",
  ditolak: "Ditolak",
  dibatalkan: "Dibatalkan",
};

/** Human-readable Indonesian labels for hall availability. */
export const HALL_AVAILABILITY_LABELS: Record<HallAvailability, string> = {
  available: "Tersedia",
  occupied: "Sedang Dipakai",
};

/** Human-readable Indonesian labels for user roles. */
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  user: "Pengguna",
  guest: "Tamu",
};

/** Booking statuses a user is still allowed to cancel. */
export const CANCELLABLE_STATUSES: BookingStatus[] = [
  BookingStatus.menunggu,
  BookingStatus.disetujui,
];
