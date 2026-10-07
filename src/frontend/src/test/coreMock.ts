import type { FakeActor, IdentityState } from "@/test/harness";
import { makeFakeActor, makeIdentityState } from "@/test/harness";
import { vi } from "vitest";

/**
 * Mutable state backing the `@caffeineai/core-infrastructure` module mock.
 * Test files install the mock with `vi.mock` and then mutate `coreMockState`
 * before rendering so each test controls the actor and identity it sees.
 */
export const coreMockState: {
  actor: FakeActor;
  identity: IdentityState;
  login: ReturnType<typeof vi.fn>;
  clear: ReturnType<typeof vi.fn>;
} = {
  actor: makeFakeActor(),
  identity: makeIdentityState(),
  login: vi.fn(),
  clear: vi.fn(),
};

export function resetCoreMockState(): void {
  coreMockState.actor = makeFakeActor();
  coreMockState.identity = makeIdentityState();
  coreMockState.login = vi.fn();
  coreMockState.clear = vi.fn();
}

export const coreMock = {
  useActor: () => ({ actor: coreMockState.actor, isFetching: false }),
  useInternetIdentity: () => ({
    ...coreMockState.identity,
    login: coreMockState.login,
    clear: coreMockState.clear,
    loginStatus: coreMockState.identity.isAuthenticated ? "success" : "idle",
    isLoginIdle: !coreMockState.identity.isAuthenticated,
    isLoginSuccess: coreMockState.identity.isAuthenticated,
    isLoginError: false,
    isSessionExpired: false,
  }),
  InternetIdentityProvider: ({ children }: { children: React.ReactNode }) =>
    children,
};
