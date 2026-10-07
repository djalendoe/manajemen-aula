module {
  /// Identifier for a hall (aula).
  public type HallId = Nat;

  /// Identifier for a booking (pemesanan).
  public type BookingId = Nat;

  /// Wall-clock timestamp in nanoseconds since the Unix epoch.
  public type Timestamp = Nat;

  /// Calendar date encoded as YYYYMMDD (e.g. 20261007).
  public type DateKey = Nat;

  /// Time of day encoded as minutes since midnight (0..1439).
  public type MinuteOfDay = Nat;
};
