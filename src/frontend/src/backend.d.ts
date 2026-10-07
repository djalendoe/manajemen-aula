import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type AdminError = {
    __kind__: "invalidStatus";
    invalidStatus: null;
} | {
    __kind__: "notAuthorized";
    notAuthorized: null;
} | {
    __kind__: "bookingNotFound";
    bookingNotFound: BookingId;
};
export interface Booking {
    id: BookingId;
    status: BookingStatus;
    activityName: string;
    date: DateKey;
    createdAt: Timestamp;
    user: Principal;
    rejectionReason?: string;
    hallName: string;
    endMinute: MinuteOfDay;
    notes: string;
    participantCount: bigint;
    hallId: HallId;
    startMinute: MinuteOfDay;
}
export type BookingError = {
    __kind__: "invalidStatus";
    invalidStatus: null;
} | {
    __kind__: "hallNotFound";
    hallNotFound: HallId;
} | {
    __kind__: "conflict";
    conflict: null;
} | {
    __kind__: "notAuthorized";
    notAuthorized: null;
} | {
    __kind__: "invalidDate";
    invalidDate: null;
} | {
    __kind__: "notOwner";
    notOwner: null;
} | {
    __kind__: "invalidTimeRange";
    invalidTimeRange: null;
} | {
    __kind__: "hallInactive";
    hallInactive: HallId;
} | {
    __kind__: "bookingNotFound";
    bookingNotFound: BookingId;
};
export type BookingId = bigint;
export interface BookingInput {
    activityName: string;
    date: DateKey;
    endMinute: MinuteOfDay;
    notes: string;
    participantCount: bigint;
    hallId: HallId;
    startMinute: MinuteOfDay;
}
export interface BookingSummary {
    id: BookingId;
    status: BookingStatus;
    activityName: string;
    date: DateKey;
    endMinute: MinuteOfDay;
    startMinute: MinuteOfDay;
}
export interface Cell {
    value: Value;
    name: string;
}
export interface DashboardSummary {
    pendingBookings: bigint;
    approvedBookings: bigint;
    totalHalls: bigint;
}
export type DateKey = bigint;
export interface DaySchedule {
    date: DateKey;
    slots: Array<TimeSlot>;
    hallId: HallId;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface Hall {
    id: HallId;
    active: boolean;
    name: string;
    building: string;
    description: string;
    photoUrl: string;
    facilities: Array<string>;
    capacity: bigint;
    location: string;
}
export interface HallDetail {
    upcomingBookings: Array<BookingSummary>;
    hall: Hall;
}
export interface HallFilter {
    search?: string;
    facilities: Array<string>;
    minCapacity?: bigint;
}
export type HallId = bigint;
export interface HallInput {
    name: string;
    building: string;
    description: string;
    photoUrl: string;
    facilities: Array<string>;
    capacity: bigint;
    location: string;
}
export interface HallUpdate {
    active: boolean;
    name: string;
    building: string;
    description: string;
    photoUrl: string;
    facilities: Array<string>;
    capacity: bigint;
    location: string;
}
export interface HallWithStatus {
    status: HallAvailability;
    hall: Hall;
}
export type MinuteOfDay = bigint;
export type Result = {
    __kind__: "ok";
    ok: Booking;
} | {
    __kind__: "err";
    err: AdminError;
};
export type Result_1 = {
    __kind__: "ok";
    ok: Booking;
} | {
    __kind__: "err";
    err: BookingError;
};
export type Result_2 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: BookingError;
};
export type Result_3 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface Result__1 {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export interface TimeSlot {
    status?: BookingStatus;
    activityName?: string;
    occupied: boolean;
    endMinute: MinuteOfDay;
    startMinute: MinuteOfDay;
}
export type Timestamp = bigint;
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export enum BookingStatus {
    disetujui = "disetujui",
    ditolak = "ditolak",
    menunggu = "menunggu",
    dibatalkan = "dibatalkan"
}
export enum HallAvailability {
    occupied = "occupied",
    available = "available"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    approveBooking(bookingId: BookingId): Promise<Result>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelBooking(bookingId: BookingId): Promise<Result_2>;
    createBooking(input: BookingInput): Promise<Result_1>;
    createHall(input: HallInput): Promise<Hall>;
    deactivateHall(id: HallId): Promise<boolean>;
    execute(qJson: string): Promise<Result__1>;
    getApiDoc(): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardSummary(): Promise<DashboardSummary>;
    getDaySchedule(hallId: HallId, date: DateKey): Promise<DaySchedule | null>;
    getHall(id: HallId): Promise<HallDetail | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllBookings(): Promise<Array<Booking>>;
    listHallBookings(hallId: HallId, from: DateKey, to: DateKey): Promise<Array<Booking>>;
    listHalls(filter: HallFilter): Promise<Array<HallWithStatus>>;
    listMyBookings(): Promise<Array<Booking>>;
    rejectBooking(bookingId: BookingId, reason: string): Promise<Result>;
    schema(): Promise<string>;
    updateHall(id: HallId, input: HallUpdate): Promise<Hall | null>;
}
