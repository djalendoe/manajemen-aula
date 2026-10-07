import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import MapEntity "mo:caffeineai-oql/MapEntity";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import BoolValue "mo:caffeineai-oql/BoolValue";
import PrincipalValue "mo:caffeineai-oql/PrincipalValue";
import HallLib "lib/halls";
import BookingLib "lib/bookings";
import BookingTypes "types/bookings";
import HallsApi "mixins/halls-api";
import BookingsApi "mixins/bookings-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let halls : Map.Map<Nat, HallLib.HallInternal>;
  let bookings : Map.Map<Nat, BookingLib.BookingInternal>;
  let nextHallId : { var value : Nat };
  let nextBookingId : { var value : Nat };

  include HallsApi(accessControlState, halls, bookings, nextHallId);
  include BookingsApi(accessControlState, halls, bookings, nextBookingId);

  // Render a booking status as a stable text tag for querying.
  func statusTag(status : BookingTypes.BookingStatus) : Text {
    switch (status) {
      case (#menunggu) { "menunggu" };
      case (#disetujui) { "disetujui" };
      case (#ditolak) { "ditolak" };
      case (#dibatalkan) { "dibatalkan" };
    };
  };

  include Expose({
    entities = [
      halls.toEntityManual("hall", "Hall", "id")
        .sample({
          id = 0;
          name = "";
          description = "";
          photoUrl = "";
          capacity = 0;
          building = "";
          location = "";
          facilities = [];
          active = true;
        })
        .payload("id", func h = h.id)
        .payload("name", func h = h.name)
        .payload("description", func h = h.description)
        .payload("photoUrl", func h = h.photoUrl)
        .payload("capacity", func h = h.capacity)
        .payload("building", func h = h.building)
        .payload("location", func h = h.location)
        .payload("facilities", func h = h.facilities.values().join(", "))
        .payload("active", func h = h.active)
        .public_()
        .build(),
      bookings.toEntityManual("booking", "Booking", "id")
        .sample({
          id = 0;
          hallId = 0;
          hallName = "";
          user = Principal.fromText("aaaaa-aa");
          date = 0;
          startMinute = 0;
          endMinute = 0;
          activityName = "";
          participantCount = 0;
          notes = "";
          status = #menunggu;
          rejectionReason = null;
          createdAt = 0;
        })
        .payload("id", func b = b.id)
        .payload("hallId", func b = b.hallId)
        .payload("hallName", func b = b.hallName)
        .payload("user", func b = b.user)
        .payload("date", func b = b.date)
        .payload("startMinute", func b = b.startMinute)
        .payload("endMinute", func b = b.endMinute)
        .payload("activityName", func b = b.activityName)
        .payload("participantCount", func b = b.participantCount)
        .payload("notes", func b = b.notes)
        .payload("status", func b = statusTag(b.status))
        .payload("rejectionReason", func b = b.rejectionReason ?? "")
        .payload("createdAt", func b = b.createdAt)
        .ownedBy("user")
        .controllerOrScoped()
        .build(),
    ];
  });

  include ApiDocMixin();
};
