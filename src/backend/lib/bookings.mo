import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Result "mo:core/Result";
import Time "mo:core/Time";
import Types "../types/bookings";
import HallTypes "../types/halls";
import HallLib "halls";
import Common "../types/common";

module {
  /// Internal booking record stored in the bookings map.
  public type BookingInternal = {
    id : Common.BookingId;
    hallId : Common.HallId;
    hallName : Text;
    user : Principal;
    date : Common.DateKey;
    startMinute : Common.MinuteOfDay;
    endMinute : Common.MinuteOfDay;
    activityName : Text;
    participantCount : Nat;
    notes : Text;
    status : Types.BookingStatus;
    rejectionReason : ?Text;
    createdAt : Common.Timestamp;
  };

  /// Convert an internal booking to its public view.
  public func toPublic(self : BookingInternal) : Types.Booking {
    {
      id = self.id;
      hallId = self.hallId;
      hallName = self.hallName;
      user = self.user;
      date = self.date;
      startMinute = self.startMinute;
      endMinute = self.endMinute;
      activityName = self.activityName;
      participantCount = self.participantCount;
      notes = self.notes;
      status = self.status;
      rejectionReason = self.rejectionReason;
      createdAt = self.createdAt;
    };
  };

  /// Convert an internal booking to a public schedule summary.
  public func toSummary(self : BookingInternal) : HallTypes.BookingSummary {
    {
      id = self.id;
      date = self.date;
      startMinute = self.startMinute;
      endMinute = self.endMinute;
      activityName = self.activityName;
      status = self.status;
    };
  };

  /// Whether a booking status blocks a hall slot.
  public func isBlocking(status : Types.BookingStatus) : Bool {
    switch (status) {
      case (#menunggu) { true };
      case (#disetujui) { true };
      case (#ditolak) { false };
      case (#dibatalkan) { false };
    };
  };

  /// Whether a booking status is approved.
  public func isApproved(status : Types.BookingStatus) : Bool {
    switch (status) {
      case (#disetujui) { true };
      case _ { false };
    };
  };

  /// Whether a booking status is pending.
  public func isPending(status : Types.BookingStatus) : Bool {
    switch (status) {
      case (#menunggu) { true };
      case _ { false };
    };
  };

  /// Whether two time ranges on the same date overlap.
  public func overlaps(
    aStart : Common.MinuteOfDay,
    aEnd : Common.MinuteOfDay,
    bStart : Common.MinuteOfDay,
    bEnd : Common.MinuteOfDay,
  ) : Bool {
    aStart < bEnd and bStart < aEnd;
  };

  /// List upcoming blocking booking summaries for a hall from a date onward.
  public func upcomingSummaries(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
    hallId : Common.HallId,
    fromDate : Common.DateKey,
  ) : [HallTypes.BookingSummary] {
    bookings.values()
      .filter(func(b) = b.hallId == hallId and b.date >= fromDate and isBlocking(b.status))
      .map(func(b) = toSummary(b))
      .toArray()
      .sort(func(a, b) {
        if (a.date < b.date) { #less }
        else if (a.date > b.date) { #greater }
        else { Nat.compare(a.startMinute, b.startMinute) };
      });
  };

  /// List bookings for a hall within an inclusive date range.
  public func listHallBookings(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
    hallId : Common.HallId,
    from : Common.DateKey,
    to : Common.DateKey,
  ) : [Types.Booking] {
    bookings.values()
      .filter(func(b) = b.hallId == hallId and b.date >= from and b.date <= to)
      .map(func(b) = toPublic(b))
      .toArray();
  };

  /// Build the day schedule for a hall: occupied slots plus free gaps.
  public func getDaySchedule(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
    hallId : Common.HallId,
    date : Common.DateKey,
  ) : ?Types.DaySchedule {
    let dayBookings = bookings.values()
      .filter(func(b) = b.hallId == hallId and b.date == date and isBlocking(b.status))
      .toArray()
      .sort(func(a, b) = Nat.compare(a.startMinute, b.startMinute));

    let slots = buildSlots(dayBookings);
    ?{ hallId; date; slots };
  };

  /// Build the slot list from sorted blocking bookings.
  func buildSlots(dayBookings : [BookingInternal]) : [Types.TimeSlot] {
    let slots = List.empty<Types.TimeSlot>();
    var cursor = 0;
    for (booking in dayBookings.values()) {
      if (booking.startMinute > cursor) {
        slots.add({
          startMinute = cursor;
          endMinute = booking.startMinute;
          occupied = false;
          activityName = null;
          status = null;
        });
      };
      slots.add({
        startMinute = booking.startMinute;
        endMinute = booking.endMinute;
        occupied = true;
        activityName = ?booking.activityName;
        status = ?booking.status;
      });
      if (booking.endMinute > cursor) {
        cursor := booking.endMinute;
      };
    };
    if (cursor < 1440) {
      slots.add({
        startMinute = cursor;
        endMinute = 1440;
        occupied = false;
        activityName = null;
        status = null;
      });
    };
    slots.toArray();
  };

  /// Whether a hall is occupied right now (approved booking covering the current time).
  public func isOccupiedNow(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
    hallId : Common.HallId,
    now : Common.Timestamp,
  ) : Bool {
    let date = dateKeyOf(now);
    let minute = minuteOfDayOf(now);
    bookings.values().any(
      func(b) {
        b.hallId == hallId
          and b.date == date
          and isApproved(b.status)
          and b.startMinute <= minute
          and minute < b.endMinute;
      }
    );
  };

  /// Convert a nanosecond timestamp to a YYYYMMDD date key (UTC).
  public func dateKeyOf(timestamp : Common.Timestamp) : Common.DateKey {
    let seconds = timestamp / 1_000_000_000;
    let days = seconds / 86_400;
    let (year, month, day) = civilFromDays(days);
    year * 10000 + month * 100 + day;
  };

  /// Convert a nanosecond timestamp to minutes since midnight (UTC).
  public func minuteOfDayOf(timestamp : Common.Timestamp) : Common.MinuteOfDay {
    let seconds = timestamp / 1_000_000_000;
    (seconds % 86_400) / 60;
  };

  /// Days since the Unix epoch to a civil (year, month, day) date.
  func civilFromDays(days : Nat) : (Nat, Nat, Nat) {
    let z = days.toInt() + 719_468;
    let era = z / 146_097;
    let doe = z - era * 146_097;
    let yoe = (doe - doe / 1460 + doe / 36_524 - doe / 146_096) / 365;
    let y = yoe + era * 400;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = doy - (153 * mp + 2) / 5 + 1;
    let m = if (mp < 10) { mp + 3 } else { mp - 9 };
    let year = if (m <= 2) { y + 1 } else { y };
    (year.toNat(), m.toNat(), d.toNat());
  };

  /// Create a booking after validating the hall, time range, and conflicts.
  public func createBooking(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
    halls : Map.Map<Common.HallId, HallLib.HallInternal>,
    nextId : { var value : Nat },
    user : Principal,
    input : Types.BookingInput,
  ) : Result.Result<Types.Booking, Types.BookingError> {
    let hall = switch (halls.get(input.hallId)) {
      case (?h) { h };
      case null { return #err(#hallNotFound(input.hallId)) };
    };
    if (not hall.active) {
      return #err(#hallInactive(input.hallId));
    };
    if (input.date < 20200101 or input.date > 99991231) {
      return #err(#invalidDate);
    };
    if (input.startMinute >= input.endMinute or input.endMinute > 1440) {
      return #err(#invalidTimeRange);
    };
    let conflict = bookings.values().any(
      func(b) {
        b.hallId == input.hallId
          and b.date == input.date
          and isApproved(b.status)
          and overlaps(b.startMinute, b.endMinute, input.startMinute, input.endMinute);
      }
    );
    if (conflict) {
      return #err(#conflict);
    };
    let id = nextId.value;
    nextId.value := id + 1;
    let booking : BookingInternal = {
      id;
      hallId = input.hallId;
      hallName = hall.name;
      user;
      date = input.date;
      startMinute = input.startMinute;
      endMinute = input.endMinute;
      activityName = input.activityName;
      participantCount = input.participantCount;
      notes = input.notes;
      status = #menunggu;
      rejectionReason = null;
      createdAt = Time.now().toNat();
    };
    bookings.add(id, booking);
    #ok(toPublic(booking));
  };

  /// List all bookings owned by a user.
  public func listMyBookings(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
    user : Principal,
  ) : [Types.Booking] {
    bookings.values()
      .filter(func(b) = b.user == user)
      .map(func(b) = toPublic(b))
      .toArray();
  };

  /// Cancel a booking owned by the caller when it is pending or approved.
  public func cancelBooking(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
    user : Principal,
    bookingId : Common.BookingId,
  ) : Result.Result<(), Types.BookingError> {
    switch (bookings.get(bookingId)) {
      case (?booking) {
        if (booking.user != user) {
          return #err(#notOwner);
        };
        if (not (isPending(booking.status) or isApproved(booking.status))) {
          return #err(#invalidStatus);
        };
        bookings.add(bookingId, { booking with status = #dibatalkan });
        #ok(());
      };
      case null { #err(#bookingNotFound(bookingId)) };
    };
  };

  /// List every booking in the system (admin only).
  public func listAllBookings(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
  ) : [Types.Booking] {
    bookings.values().map(func(b) = toPublic(b)).toArray();
  };

  /// Approve a pending booking (admin only).
  public func approveBooking(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
    bookingId : Common.BookingId,
  ) : Result.Result<Types.Booking, Types.AdminError> {
    switch (bookings.get(bookingId)) {
      case (?booking) {
        if (not isPending(booking.status)) {
          return #err(#invalidStatus);
        };
        let updated = { booking with status = #disetujui; rejectionReason = null };
        bookings.add(bookingId, updated);
        #ok(toPublic(updated));
      };
      case null { #err(#bookingNotFound(bookingId)) };
    };
  };

  /// Reject a pending booking with a reason (admin only).
  public func rejectBooking(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
    bookingId : Common.BookingId,
    reason : Text,
  ) : Result.Result<Types.Booking, Types.AdminError> {
    switch (bookings.get(bookingId)) {
      case (?booking) {
        if (not isPending(booking.status)) {
          return #err(#invalidStatus);
        };
        let updated = { booking with status = #ditolak; rejectionReason = ?reason };
        bookings.add(bookingId, updated);
        #ok(toPublic(updated));
      };
      case null { #err(#bookingNotFound(bookingId)) };
    };
  };

  /// Count bookings by status for the admin dashboard.
  public func dashboardSummary(
    bookings : Map.Map<Common.BookingId, BookingInternal>,
    totalHalls : Nat,
  ) : Types.DashboardSummary {
    var pending = 0;
    var approved = 0;
    for (booking in bookings.values()) {
      if (isPending(booking.status)) { pending += 1 };
      if (isApproved(booking.status)) { approved += 1 };
    };
    { totalHalls; pendingBookings = pending; approvedBookings = approved };
  };
};
