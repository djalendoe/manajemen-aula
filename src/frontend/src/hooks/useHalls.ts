import type { HallFilter, HallId, HallInput, HallUpdate } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** Catalog listing with search, minimum capacity, and facility filters. */
export function useHalls(filter: HallFilter) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: [
      "halls",
      filter.search ?? "",
      filter.minCapacity?.toString() ?? "",
      [...filter.facilities].sort().join(","),
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listHalls(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

/** Full detail for a single hall, including upcoming bookings. */
export function useHall(id: HallId | null) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["hall", id?.toString() ?? ""],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getHall(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

/** Create a new hall (admin only). */
export function useCreateHall() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: HallInput) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.createHall(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["halls"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

/** Update an existing hall (admin only). */
export function useUpdateHall() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: HallId; input: HallUpdate }) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.updateHall(id, input);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["halls"] });
      void queryClient.invalidateQueries({
        queryKey: ["hall", variables.id.toString()],
      });
    },
  });
}

/** Deactivate a hall so it no longer accepts bookings (admin only). */
export function useDeactivateHall() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: HallId) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.deactivateHall(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["halls"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}
