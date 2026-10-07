import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Types "../types/halls";
import Common "../types/common";

module {
  /// Internal hall record stored in the catalog.
  public type HallInternal = {
    id : Common.HallId;
    name : Text;
    description : Text;
    photoUrl : Text;
    capacity : Nat;
    building : Text;
    location : Text;
    facilities : [Text];
    active : Bool;
  };

  /// Convert an internal hall to its public view.
  public func toPublic(self : HallInternal) : Types.Hall {
    {
      id = self.id;
      name = self.name;
      description = self.description;
      photoUrl = self.photoUrl;
      capacity = self.capacity;
      building = self.building;
      location = self.location;
      facilities = self.facilities;
      active = self.active;
    };
  };

  /// Build a new internal hall from admin input.
  public func newHall(id : Common.HallId, input : Types.HallInput) : HallInternal {
    {
      id;
      name = input.name;
      description = input.description;
      photoUrl = input.photoUrl;
      capacity = input.capacity;
      building = input.building;
      location = input.location;
      facilities = input.facilities;
      active = true;
    };
  };

  /// Apply an admin update to an existing hall.
  public func applyUpdate(self : HallInternal, input : Types.HallUpdate) : HallInternal {
    {
      id = self.id;
      name = input.name;
      description = input.description;
      photoUrl = input.photoUrl;
      capacity = input.capacity;
      building = input.building;
      location = input.location;
      facilities = input.facilities;
      active = input.active;
    };
  };

  /// Whether a hall matches the catalog filter.
  public func matches(self : HallInternal, filter : Types.HallFilter) : Bool {
    let nameMatches = switch (filter.search) {
      case (?term) {
        let needle = term.toLower();
        self.name.toLower().contains(#text needle) or self.building.toLower().contains(#text needle);
      };
      case null { true };
    };
    let capacityMatches = switch (filter.minCapacity) {
      case (?min) { self.capacity >= min };
      case null { true };
    };
    let facilitiesMatch = filter.facilities.all(
      func(required) { self.facilities.any(func(have) = have == required) }
    );
    nameMatches and capacityMatches and facilitiesMatch;
  };

  /// List halls matching the filter, each with its availability status.
  public func listHalls(
    halls : Map.Map<Common.HallId, HallInternal>,
    isOccupied : (Common.HallId) -> Bool,
    filter : Types.HallFilter,
  ) : [Types.HallWithStatus] {
    let matched = halls.values().filter(func(hall) = matches(hall, filter));
    matched.map(
      func(hall) {
        {
          hall = toPublic(hall);
          status = if (isOccupied(hall.id)) { #occupied } else { #available };
        };
      }
    ).toArray();
  };

  /// Get a hall detail view with its upcoming booking summaries.
  public func getHall(
    halls : Map.Map<Common.HallId, HallInternal>,
    upcoming : (Common.HallId) -> [Types.BookingSummary],
    id : Common.HallId,
  ) : ?Types.HallDetail {
    switch (halls.get(id)) {
      case (?hall) {
        ?{
          hall = toPublic(hall);
          upcomingBookings = upcoming(id);
        };
      };
      case null { null };
    };
  };

  /// Insert a new hall and return its public view.
  public func createHall(
    halls : Map.Map<Common.HallId, HallInternal>,
    nextId : { var value : Nat },
    input : Types.HallInput,
  ) : Types.Hall {
    let id = nextId.value;
    nextId.value := id + 1;
    let hall = newHall(id, input);
    halls.add(id, hall);
    toPublic(hall);
  };

  /// Update an existing hall; returns null when it does not exist.
  public func updateHall(
    halls : Map.Map<Common.HallId, HallInternal>,
    id : Common.HallId,
    input : Types.HallUpdate,
  ) : ?Types.Hall {
    switch (halls.get(id)) {
      case (?hall) {
        let updated = applyUpdate(hall, input);
        halls.add(id, updated);
        ?toPublic(updated);
      };
      case null { null };
    };
  };

  /// Deactivate a hall; returns false when it does not exist.
  public func deactivateHall(
    halls : Map.Map<Common.HallId, HallInternal>,
    id : Common.HallId,
  ) : Bool {
    switch (halls.get(id)) {
      case (?hall) {
        halls.add(id, { hall with active = false });
        true;
      };
      case null { false };
    };
  };

  /// Count all halls in the catalog.
  public func count(halls : Map.Map<Common.HallId, HallInternal>) : Nat {
    halls.size();
  };
};
