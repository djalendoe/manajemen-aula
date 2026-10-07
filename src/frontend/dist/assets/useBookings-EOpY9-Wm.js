import { _ as useBackend, $ as useQuery, a0 as useQueryClient } from "./index-sQ-lDx8N.js";
import { u as useMutation } from "./format-BzmDTGRL.js";
function useMyBookings() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyBookings();
    },
    enabled: !!actor && !isFetching
  });
}
function useAllBookings() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllBookings();
    },
    enabled: !!actor && !isFetching
  });
}
function useDaySchedule(hallId, date) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["daySchedule", (hallId == null ? void 0 : hallId.toString()) ?? "", (date == null ? void 0 : date.toString()) ?? ""],
    queryFn: async () => {
      if (!actor || hallId === null || date === null) return null;
      return actor.getDaySchedule(hallId, date);
    },
    enabled: !!actor && !isFetching && hallId !== null && date !== null
  });
}
function useDashboardSummary() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDashboardSummary();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateBooking() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.createBooking(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["hallBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["daySchedule"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
function useCancelBooking() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.cancelBooking(bookingId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["hallBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["daySchedule"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
function useApproveBooking() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.approveBooking(bookingId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["hallBookings"] });
      void queryClient.invalidateQueries({ queryKey: ["daySchedule"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
function useRejectBooking() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      bookingId,
      reason
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
    }
  });
}
export {
  useApproveBooking as a,
  useRejectBooking as b,
  useDashboardSummary as c,
  useCreateBooking as d,
  useDaySchedule as e,
  useMyBookings as f,
  useCancelBooking as g,
  useAllBookings as u
};
