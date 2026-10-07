import Map "mo:core/Map";
import Nat "mo:core/Nat";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  type HallInternal = {
    id : Nat;
    name : Text;
    description : Text;
    photoUrl : Text;
    capacity : Nat;
    building : Text;
    location : Text;
    facilities : [Text];
    active : Bool;
  };

  type BookingInternal = {
    id : Nat;
    hallId : Nat;
    hallName : Text;
    user : Principal;
    date : Nat;
    startMinute : Nat;
    endMinute : Nat;
    activityName : Text;
    participantCount : Nat;
    notes : Text;
    status : { #menunggu; #disetujui; #ditolak; #dibatalkan };
    rejectionReason : ?Text;
    createdAt : Nat;
  };

  type OldActor = {};

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    halls : Map.Map<Nat, HallInternal>;
    bookings : Map.Map<Nat, BookingInternal>;
    nextHallId : { var value : Nat };
    nextBookingId : { var value : Nat };
  };

  func seedHalls() : Map.Map<Nat, HallInternal> {
    let halls = Map.empty<Nat, HallInternal>();
    halls.add(0, {
      id = 0;
      name = "Aula Merdeka";
      description = "Aula utama berkapasitas besar untuk seminar, wisuda, dan acara resmi kampus.";
      photoUrl = "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200";
      capacity = 500;
      building = "Gedung A";
      location = "Lantai 1, Sayap Timur";
      facilities = ["Proyektor", "Tata Suara", "AC", "Panggung", "WiFi"];
      active = true;
    });
    halls.add(1, {
      id = 1;
      name = "Aula Nusantara";
      description = "Ruang serbaguna untuk pelatihan, workshop, dan pertemuan komunitas.";
      photoUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200";
      capacity = 200;
      building = "Gedung B";
      location = "Lantai 2, Sayap Barat";
      facilities = ["Proyektor", "AC", "WiFi", "Meja Lipat"];
      active = true;
    });
    halls.add(2, {
      id = 2;
      name = "Ruang Garuda";
      description = "Ruang rapat premium untuk pertemuan terbatas dan diskusi panel.";
      photoUrl = "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1200";
      capacity = 60;
      building = "Gedung C";
      location = "Lantai 3, Ruang 301";
      facilities = ["TV Layar Besar", "AC", "WiFi", "Papan Tulis"];
      active = true;
    });
    halls.add(3, {
      id = 3;
      name = "Aula Cendrawasih";
      description = "Aula multifungsi untuk pameran, bazar, dan kegiatan mahasiswa.";
      photoUrl = "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200";
      capacity = 350;
      building = "Gedung D";
      location = "Lantai Dasar";
      facilities = ["Tata Suara", "AC", "WiFi", "Area Pameran"];
      active = true;
    });
    halls;
  };

  public func migration(_ : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      halls = seedHalls();
      bookings = Map.empty();
      nextHallId = { var value = 4 };
      nextBookingId = { var value = 0 };
    };
  };
};
