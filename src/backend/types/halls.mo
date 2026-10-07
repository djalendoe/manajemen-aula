import Common "common";

module {
  public type HallId = Common.HallId;

  /// A hall (aula) as exposed to the public catalog.
  public type Hall = {
    id : HallId;
    name : Text;
    description : Text;
    photoUrl : Text;
    capacity : Nat;
    building : Text;
    location : Text;
    facilities : [Text];
    active : Bool;
  };

  /// Input for creating a hall (admin only).
  public type HallInput = {
    name : Text;
    description : Text;
    photoUrl : Text;
    capacity : Nat;
    building : Text;
    location : Text;
    facilities : [Text];
  };

  /// Input for updating a hall (admin only).
  public type HallUpdate = {
    name : Text;
    description : Text;
    photoUrl : Text;
    capacity : Nat;
    building : Text;
    location : Text;
    facilities : [Text];
    active : Bool;
  };

  /// Filter for the hall catalog search.
  public type HallFilter = {
    search : ?Text;
    minCapacity : ?Nat;
    facilities : [Text];
  };

  /// Whether a hall is free or occupied right now.
  public type HallAvailability = {
    #available;
    #occupied;
  };

  /// A hall plus its current availability status.
  public type HallWithStatus = {
    hall : Hall;
    status : HallAvailability;
  };

  /// A hall detail view with its upcoming bookings.
  public type HallDetail = {
    hall : Hall;
    upcomingBookings : [BookingSummary];
  };

  /// A booking summary shown on a hall's schedule (no sensitive personal data).
  public type BookingSummary = {
    id : Common.BookingId;
    date : Common.DateKey;
    startMinute : Common.MinuteOfDay;
    endMinute : Common.MinuteOfDay;
    activityName : Text;
    status : BookingStatus;
  };

  /// Status of a booking (pemesanan).
  public type BookingStatus = {
    #menunggu;
    #disetujui;
    #ditolak;
    #dibatalkan;
  };
};
