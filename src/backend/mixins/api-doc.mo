/// Static behavioral API documentation for the Aula (hall) management backend.
/// This mixin declares no state and reads no runtime data; it returns a fixed
/// Markdown document authored from the current backend source.
mixin () {
  public query func getApiDoc() : async Text {
    "# Aula Management Backend API\n\n" #
    "Backend for a multi-hall (multi-aula) venue booking system. It maintains a catalog of halls and a set of booking requests, with role-based access control for administrators and signed-in users.\n\n" #
    "## Authentication and identity\n\n" #
    "All mutating endpoints and most reads are guarded by the authorization system.\n\n" #
    "- **Anonymous callers** are treated as guests. They may call the public catalog reads (`listHalls`, `getHall`, `listHallBookings`, `getDaySchedule`) and the OQL query surface. Any guarded endpoint traps for them.\n" #
    "- **Signed-in callers** are registered on first sign-in. The first authenticated user to sign in automatically becomes `#admin`; subsequent users receive the `#user` role. Registration happens only when a caller signs in through the app's own frontend, so a principal that never did so is unregistered even if it belongs to the app owner.\n" #
    "- **Admin** callers may manage halls and decide on bookings.\n\n" #
    "The app's frontend pins an Internet Identity derivation origin, published at `/.well-known/ii-derivation-origin` when available. An agent already holding the user's Internet Identity authorization derives the correct per-app principal against that origin (for example `icp identity link web <name> --app <host>`). Such a delegation acts with the user's full authority in this app until it expires. A signed-in caller derived against a different origin is a different principal than the one the frontend registered, and will be treated as unregistered.\n\n" #
    "Guarded endpoints trap with `Unauthorized: Only admins can perform this action` or `Unauthorized: Only users can perform this action` when the caller lacks the required role. A direct API caller must sign in once (registering the principal) before any role-guarded call, including the guarded queries `listMyBookings`, `listAllBookings`, and `getDashboardSummary`.\n\n" #
    "## Units and encodings\n\n" #
    "- `HallId` and `BookingId` are `Nat` identifiers, assigned sequentially from 0.\n" #
    "- `Timestamp` is wall-clock nanoseconds since the Unix epoch (`Nat`).\n" #
    "- `DateKey` is a calendar date encoded as `YYYYMMDD` (e.g. `20261007`).\n" #
    "- `MinuteOfDay` is minutes since midnight, `0..1439`; a booking's `endMinute` may be `1440` to mean end-of-day.\n" #
    "- `facilities` is a list of free-text facility names.\n" #
    "- `BookingStatus` is one of `#menunggu` (pending), `#disetujui` (approved), `#ditolak` (rejected), `#dibatalkan` (cancelled).\n" #
    "- `rejectionReason` is `null` unless the booking was rejected.\n\n" #
    "## Public methods\n\n" #
    "### Catalog (public reads)\n\n" #
    "- `listHalls(filter : HallFilter) : [HallWithStatus]` — lists halls matching `search` (case-insensitive substring over name and building), `minCapacity`, and required `facilities` (all must be present). Each result carries a `status` of `#available` or `#occupied` computed from approved bookings covering the current UTC time.\n" #
    "- `getHall(id : HallId) : ?HallDetail` — returns the hall plus its upcoming blocking booking summaries (from today onward), or `null` if unknown.\n\n" #
    "### Schedule (public reads)\n\n" #
    "- `listHallBookings(hallId, from : DateKey, to : DateKey) : [Booking]` — all bookings for a hall within an inclusive date range. Returns full booking records, including the owner principal and notes.\n" #
    "- `getDaySchedule(hallId, date : DateKey) : ?DaySchedule` — occupied slots plus free gaps for a hall on a date. Returns `null` if the hall does not exist. Slots expose only activity name and status, not personal data.\n\n" #
    "### Booking (signed-in users)\n\n" #
    "- `createBooking(input : BookingInput) : Result<Booking, BookingError>` — submits a booking for the caller. Requires the `#user` role (traps otherwise). Fails with `#hallNotFound`, `#hallInactive`, `#invalidDate`, `#invalidTimeRange`, or `#conflict` when an approved booking overlaps the same hall, date, and time range.\n" #
    "- `listMyBookings() : [Booking]` — the caller's own bookings. Requires the `#user` role (traps otherwise).\n" #
    "- `cancelBooking(bookingId) : Result<(), BookingError>` — cancels the caller's own booking when it is pending or approved. Fails with `#bookingNotFound`, `#notOwner`, or `#invalidStatus`.\n\n" #
    "### Admin\n\n" #
    "- `createHall(input : HallInput) : Hall` — creates a hall (admin only).\n" #
    "- `updateHall(id, input : HallUpdate) : ?Hall` — updates a hall (admin only); `null` if unknown.\n" #
    "- `deactivateHall(id) : Bool` — marks a hall inactive (admin only); `false` if unknown.\n" #
    "- `listAllBookings() : [Booking]` — every booking (admin only).\n" #
    "- `approveBooking(bookingId) : Result<Booking, AdminError>` — approves a pending booking (admin only). Fails with `#bookingNotFound` or `#invalidStatus`.\n" #
    "- `rejectBooking(bookingId, reason : Text) : Result<Booking, AdminError>` — rejects a pending booking with a reason (admin only). Fails with `#bookingNotFound` or `#invalidStatus`.\n" #
    "- `getDashboardSummary() : DashboardSummary` — counts of halls, pending bookings, and approved bookings (admin only).\n\n" #
    "## Lifecycle and polling\n\n" #
    "- A new booking starts as `#menunggu`. An admin moves it to `#disetujui` or `#ditolak`; the owner may move a pending or approved booking to `#dibatalkan`.\n" #
    "- Only `#menunggu` and `#disetujui` bookings block a hall slot; `#ditolak` and `#dibatalkan` do not.\n" #
    "- There is no push notification. Poll `listMyBookings`, `listAllBookings`, or `getDashboardSummary` to observe status changes. `getDaySchedule` and `listHalls` reflect the current blocking state on each call.\n\n" #
    "## Mutation retry safety\n\n" #
    "- `createBooking` is **not idempotent**: each successful call allocates a new booking id. Retrying after a timeout may create a duplicate; check `listMyBookings` before retrying.\n" #
    "- `cancelBooking`, `approveBooking`, and `rejectBooking` are status-guarded: a repeat call on an already-transitioned booking returns `#invalidStatus` rather than applying the change twice.\n" #
    "- `createHall` is not idempotent (each call allocates a new id). `updateHall` and `deactivateHall` are idempotent for a given id.\n\n" #
    "## Errors and gotchas\n\n" #
    "- Authorization failures are traps (opaque rejects), not `Result` variants. Caller-actionable failures are returned as `Result` error variants.\n" #
    "- `createBooking` conflict detection considers only **approved** bookings, so two pending requests for the same slot can both be submitted; the admin decides which to approve.\n" #
    "- `DateKey` values outside `20200101..99991231` are rejected as `#invalidDate`.\n" #
    "- `endMinute` must be greater than `startMinute` and at most `1440`.\n" #
    "- `listHallBookings` returns full booking records including owner principals and notes; use `getDaySchedule` for a privacy-preserving view.\n" #
    "- The OQL query surface exposes a `hall` table (public) and a `booking` table (controller-or-scoped: the platform controller reads all rows, a signed-in caller reads only its own).\n";
  };
};
