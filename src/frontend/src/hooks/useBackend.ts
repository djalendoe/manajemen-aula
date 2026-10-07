import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

/**
 * Shared backend actor access. Every data hook in the app builds on this so
 * the actor is created once at hook top level and reused across queries.
 */
export function useBackend() {
  return useActor(createActor);
}

/**
 * The caller's role, resolved from the backend. Guests are anonymous callers.
 * Used to gate admin navigation and admin-only routes.
 */
export function useCallerRole() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

/** Whether the caller currently holds the admin role. */
export function useIsAdmin() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
