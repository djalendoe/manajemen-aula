import type {
  Booking,
  BookingId,
  BookingInput,
  BookingStatus,
  DashboardSummary,
  DateKey,
  DaySchedule,
  Hall,
  HallDetail,
  HallFilter,
  HallId,
  HallInput,
  HallUpdate,
  HallWithStatus,
  UserRole,
} from "@/backend";
import {
  BookingStatus as BookingStatusEnum,
  HallAvailability,
} from "@/backend";
import type { Principal } from "@icp-sdk/core/principal";
import { vi } from "vitest";

/**
 * A typed, in-memory stand-in for the generated `Backend` actor. Every method
 * the app's hooks call is present so the frontend suite exercises real
 * component logic against a deterministic backend seam. This is a mock: it
 * proves nothing about the deployed canister.
 */
export interface FakeActor {
  listHalls: ReturnType<typeof vi.fn>;
  getHall: ReturnType<typeof vi.fn>;
  createHall: ReturnType<typeof vi.fn>;
  updateHall: ReturnType<typeof vi.fn>;
  deactivateHall: ReturnType<typeof vi.fn>;
  listMyBookings: ReturnType<typeof vi.fn>;
  listAllBookings: ReturnType<typeof vi.fn>;
  listHallBookings: ReturnType<typeof vi.fn>;
  getDaySchedule: ReturnType<typeof vi.fn>;
  getDashboardSummary: ReturnType<typeof vi.fn>;
  createBooking: ReturnType<typeof vi.fn>;
  cancelBooking: ReturnType<typeof vi.fn>;
  approveBooking: ReturnType<typeof vi.fn>;
  rejectBooking: ReturnType<typeof vi.fn>;
  getCallerUserRole: ReturnType<typeof vi.fn>;
  isCallerAdmin: ReturnType<typeof vi.fn>;
}

export function makeHall(overrides: Partial<Hall> = {}): Hall {
  return {
    id: 1n,
    active: true,
    name: "Aula Serbaguna",
    building: "Gedung A",
    description: "Aula besar untuk kegiatan umum.",
    photoUrl: "https://example.test/aula-1.jpg",
    facilities: ["AC", "Proyektor", "Tata Suara"],
    capacity: 200n,
    location: "Lantai 1",
    ...overrides,
  };
}

export function makeHallWithStatus(
  overrides: Partial<Hall> = {},
  status: HallWithStatus["status"] = HallAvailability.available,
): HallWithStatus {
  return { hall: makeHall(overrides), status };
}

export function makeBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    id: 1n,
    status: BookingStatusEnum.menunggu,
    activityName: "Rapat Koordinasi",
    date: 20261007n,
    createdAt: 1_700_000_000_000_000_000n,
    user: {
      toText: () => "aaaaa-bbbbb-ccccc-ddddd-eeeee-fff",
    } as unknown as Principal,
    hallName: "Aula Serbaguna",
    endMinute: 600n,
    notes: "",
    participantCount: 40n,
    hallId: 1n,
    startMinute: 480n,
    ...overrides,
  };
}

export function makeSummary(
  overrides: Partial<DashboardSummary> = {},
): DashboardSummary {
  return {
    totalHalls: 3n,
    pendingBookings: 2n,
    approvedBookings: 1n,
    ...overrides,
  };
}

export function makeDaySchedule(
  overrides: Partial<DaySchedule> = {},
): DaySchedule {
  return {
    date: 20261007n,
    hallId: 1n,
    slots: [
      { occupied: false, startMinute: 480n, endMinute: 600n },
      {
        occupied: true,
        startMinute: 600n,
        endMinute: 720n,
        activityName: "Seminar Teknologi",
        status: BookingStatusEnum.disetujui,
      },
    ],
    ...overrides,
  };
}

/** Build a fake actor with sensible defaults; override per test as needed. */
export function makeFakeActor(overrides: Partial<FakeActor> = {}): FakeActor {
  const actor: FakeActor = {
    listHalls: vi.fn(async (_filter: HallFilter) => [] as HallWithStatus[]),
    getHall: vi.fn(async (_id: HallId) => null as HallDetail | null),
    createHall: vi.fn(async (input: HallInput) =>
      makeHall({ ...input, id: 99n }),
    ),
    updateHall: vi.fn(async (_id: HallId, input: HallUpdate) =>
      makeHall({ ...input, id: _id }),
    ),
    deactivateHall: vi.fn(async (_id: HallId) => true),
    listMyBookings: vi.fn(async () => [] as Booking[]),
    listAllBookings: vi.fn(async () => [] as Booking[]),
    listHallBookings: vi.fn(
      async (_id: HallId, _from: DateKey, _to: DateKey) => [] as Booking[],
    ),
    getDaySchedule: vi.fn(
      async (_id: HallId, _date: DateKey) => null as DaySchedule | null,
    ),
    getDashboardSummary: vi.fn(async () => makeSummary()),
    createBooking: vi.fn(async (input: BookingInput) => ({
      __kind__: "ok" as const,
      ok: makeBooking({ ...input, id: 7n }),
    })),
    cancelBooking: vi.fn(async (_id: BookingId) => ({
      __kind__: "ok" as const,
      ok: null,
    })),
    approveBooking: vi.fn(async (_id: BookingId) => ({
      __kind__: "ok" as const,
      ok: makeBooking({ status: BookingStatusEnum.disetujui }),
    })),
    rejectBooking: vi.fn(async (_id: BookingId, _reason: string) => ({
      __kind__: "ok" as const,
      ok: makeBooking({ status: BookingStatusEnum.ditolak }),
    })),
    getCallerUserRole: vi.fn(async () => "guest" as UserRole),
    isCallerAdmin: vi.fn(async () => false),
  };
  return { ...actor, ...overrides };
}

export interface IdentityState {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  identity?: { getPrincipal: () => { toText: () => string } };
}

export function makeIdentityState(
  overrides: Partial<IdentityState> = {},
): IdentityState {
  return {
    isAuthenticated: false,
    isInitializing: false,
    isLoggingIn: false,
    ...overrides,
  };
}

export type { BookingStatus };
