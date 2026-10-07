import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Result "mo:core/Result";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/bookings";
import Common "../types/common";
import HallLib "../lib/halls";
import BookingLib "../lib/bookings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  halls : Map.Map<Common.HallId, HallLib.HallInternal>,
  bookings : Map.Map<Common.BookingId, BookingLib.BookingInternal>,
  nextBookingId : { var value : Nat },
) {
  public query func listHallBookings(hallId : Types.HallId, from : Types.DateKey, to : Types.DateKey) : async [Types.Booking] {
    BookingLib.listHallBookings(bookings, hallId, from, to);
  };

  public query func getDaySchedule(hallId : Types.HallId, date : Types.DateKey) : async ?Types.DaySchedule {
    switch (halls.get(hallId)) {
      case null { null };
      case (?_) { BookingLib.getDaySchedule(bookings, hallId, date) };
    };
  };

  public shared ({ caller }) func createBooking(input : Types.BookingInput) : async Result.Result<Types.Booking, Types.BookingError> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    BookingLib.createBooking(bookings, halls, nextBookingId, caller, input);
  };

  public query ({ caller }) func listMyBookings() : async [Types.Booking] {
    BookingLib.listMyBookings(bookings, caller);
  };

  public shared ({ caller }) func cancelBooking(bookingId : Types.BookingId) : async Result.Result<(), Types.BookingError> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    BookingLib.cancelBooking(bookings, caller, bookingId);
  };

  public query ({ caller }) func listAllBookings() : async [Types.Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    BookingLib.listAllBookings(bookings);
  };

  public shared ({ caller }) func approveBooking(bookingId : Types.BookingId) : async Result.Result<Types.Booking, Types.AdminError> {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    BookingLib.approveBooking(bookings, bookingId);
  };

  public shared ({ caller }) func rejectBooking(bookingId : Types.BookingId, reason : Text) : async Result.Result<Types.Booking, Types.AdminError> {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    BookingLib.rejectBooking(bookings, bookingId, reason);
  };

  public query ({ caller }) func getDashboardSummary() : async Types.DashboardSummary {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    BookingLib.dashboardSummary(bookings, HallLib.count(halls));
  };
};
