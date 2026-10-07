import Common "common";

module {
  public type HallId = Common.HallId;
  public type BookingId = Common.BookingId;
  public type DateKey = Common.DateKey;
  public type MinuteOfDay = Common.MinuteOfDay;
  public type Timestamp = Common.Timestamp;

  /// Status of a booking (pemesanan).
  public type BookingStatus = {
    #menunggu;
    #disetujui;
    #ditolak;
    #dibatalkan;
  };

  /// A booking as exposed to its owner and to admins.
  public type Booking = {
    id : BookingId;
    hallId : HallId;
    hallName : Text;
    user : Principal;
    date : DateKey;
    startMinute : MinuteOfDay;
    endMinute : MinuteOfDay;
    activityName : Text;
    participantCount : Nat;
    notes : Text;
    status : BookingStatus;
    rejectionReason : ?Text;
    createdAt : Timestamp;
  };

  /// Input for submitting a booking.
  public type BookingInput = {
    hallId : HallId;
    date : DateKey;
    startMinute : MinuteOfDay;
    endMinute : MinuteOfDay;
    activityName : Text;
    participantCount : Nat;
    notes : Text;
  };

  /// A single time slot on a hall's day schedule.
  public type TimeSlot = {
    startMinute : MinuteOfDay;
    endMinute : MinuteOfDay;
    occupied : Bool;
    activityName : ?Text;
    status : ?BookingStatus;
  };

  /// The day schedule for a hall: occupied and free slots.
  public type DaySchedule = {
    hallId : HallId;
    date : DateKey;
    slots : [TimeSlot];
  };

  /// Reasons a booking submission can fail.
  public type BookingError = {
    #hallNotFound : HallId;
    #hallInactive : HallId;
    #invalidTimeRange;
    #invalidDate;
    #conflict;
    #notAuthorized;
    #bookingNotFound : BookingId;
    #notOwner;
    #invalidStatus;
  };

  /// Reasons an admin decision can fail.
  public type AdminError = {
    #bookingNotFound : BookingId;
    #invalidStatus;
    #notAuthorized;
  };

  /// Reasons a hall mutation can fail.
  public type HallError = {
    #hallNotFound : HallId;
    #notAuthorized;
  };

  /// Summary counts for the admin dashboard.
  public type DashboardSummary = {
    totalHalls : Nat;
    pendingBookings : Nat;
    approvedBookings : Nat;
  };
};
