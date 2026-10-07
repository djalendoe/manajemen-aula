import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/halls";
import Common "../types/common";
import HallLib "../lib/halls";
import BookingLib "../lib/bookings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  halls : Map.Map<Common.HallId, HallLib.HallInternal>,
  bookings : Map.Map<Common.BookingId, BookingLib.BookingInternal>,
  nextHallId : { var value : Nat },
) {
  public query func listHalls(filter : Types.HallFilter) : async [Types.HallWithStatus] {
    let now = Time.now().toNat();
    HallLib.listHalls(
      halls,
      func(hallId) = BookingLib.isOccupiedNow(bookings, hallId, now),
      filter,
    );
  };

  public query func getHall(id : Types.HallId) : async ?Types.HallDetail {
    let today = BookingLib.dateKeyOf(Time.now().toNat());
    HallLib.getHall(
      halls,
      func(hallId) = BookingLib.upcomingSummaries(bookings, hallId, today),
      id,
    );
  };

  public shared ({ caller }) func createHall(input : Types.HallInput) : async Types.Hall {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    HallLib.createHall(halls, nextHallId, input);
  };

  public shared ({ caller }) func updateHall(id : Types.HallId, input : Types.HallUpdate) : async ?Types.Hall {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    HallLib.updateHall(halls, id, input);
  };

  public shared ({ caller }) func deactivateHall(id : Types.HallId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    HallLib.deactivateHall(halls, id);
  };
};
