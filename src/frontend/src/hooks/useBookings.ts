import type { BookingId, BookingInput, DateKey, HallId } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** Bookings belonging to the signed-in user. */
export function useMyBookings() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

/** All bookings across every hall (admin only). */
export function useAllBookings() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

/** Bookings for one hall within an inclusive date range. */
export function useHallBookings(
  hallId: HallId | null,
  from: DateKey | null,
  to: DateKey | null,
) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: [
      "hallBookings",
      hallId?.toString() ?? "",
      from?.toString() ?? "",
      to?.toString() ?? "",
    ],
    queryFn: async () => {
      if (!actor || hallId === null || from === null || to === null) return [];
      return actor.listHallBookings(hallId, from, to);
    },
    enabled:
      !!actor && !isFetching && hallId !== null && from !== null && to !== null,
  });
}

/** Occupied and free time slots for a hall on a single day. */
export function useDaySchedule(hallId: HallId | null, date: DateKey | null) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["daySchedule", hallId?.toString() ?? "", date?.toString() ?? ""],
    queryFn: async () => {
      if (!actor || hallId === null || date === null) return null;
      return actor.getDaySchedule(hallId, date);
    },
    enabled: !!actor && !isFetching && hallId !== null && date !== null,
  });
}

/** Admin dashboard counters: halls, pending bookings, approved bookings. */
export function useDashboardSummary() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDashboardSummary();
    },
    enabled: !!actor && !isFetching,
  });
}

/** Submit a new booking request. */
export function useCreateBooking() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: BookingInput) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.createBooking(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["hallBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["daySchedule"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

/** Cancel one of the caller's own bookings. */
export function useCancelBooking() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId: BookingId) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.cancelBooking(bookingId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["hallBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["daySchedule"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

/** Approve a pending booking (admin only). */
export function useApproveBooking() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId: BookingId) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.approveBooking(bookingId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["hallBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["daySchedule"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

/** Reject a pending booking with a reason (admin only). */
export function useRejectBooking() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      bookingId,
      reason,
    }: {
      bookingId: BookingId;
      reason: string;
    }) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.rejectBooking(bookingId, reason);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["hallBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["daySchedule"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}
