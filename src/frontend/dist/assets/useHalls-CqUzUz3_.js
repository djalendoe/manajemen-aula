import { _ as useBackend, $ as useQuery, a0 as useQueryClient } from "./index-sQ-lDx8N.js";
import { u as useMutation } from "./format-BzmDTGRL.js";
function useHalls(filter) {
  var _a;
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: [
      "halls",
      filter.search ?? "",
      ((_a = filter.minCapacity) == null ? void 0 : _a.toString()) ?? "",
      [...filter.facilities].sort().join(",")
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listHalls(filter);
    },
    enabled: !!actor && !isFetching
  });
}
function useHall(id) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["hall", (id == null ? void 0 : id.toString()) ?? ""],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getHall(id);
    },
    enabled: !!actor && !isFetching && id !== null
  });
}
function useCreateHall() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.createHall(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["halls"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
function useUpdateHall() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.updateHall(id, input);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["halls"] });
      void queryClient.invalidateQueries({
        queryKey: ["hall", variables.id.toString()]
      });
    }
  });
}
function useDeactivateHall() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.deactivateHall(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["halls"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
export {
  useCreateHall as a,
  useUpdateHall as b,
  useDeactivateHall as c,
  useHall as d,
  useHalls as u
};
