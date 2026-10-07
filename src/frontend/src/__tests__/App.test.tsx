import App from "@/App";
import { coreMockState, resetCoreMockState } from "@/test/coreMock";
import {
  makeFakeActor,
  makeHallWithStatus,
  makeIdentityState,
} from "@/test/harness";
import { renderWithProviders } from "@/test/render";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", async () => {
  const { coreMock } = await import("@/test/coreMock");
  return coreMock;
});

const HALLS = [
  makeHallWithStatus({ id: 1n, name: "Aula Serbaguna", building: "Gedung A" }),
];

describe("App shell", () => {
  beforeEach(() => {
    resetCoreMockState();
    window.history.pushState({}, "", "/");
  });

  it("opens the default route without a blank screen", async () => {
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
    });

    renderWithProviders(<App />);

    expect(await screen.findByTestId("catalog.page")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Katalog Aula" }),
    ).toBeInTheDocument();
  });

  it("denies the admin dashboard to an unauthenticated visitor", async () => {
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
      isCallerAdmin: vi.fn(async () => false),
    });

    window.history.pushState({}, "", "/dasbor");
    renderWithProviders(<App />);

    expect(
      await screen.findByTestId("admin.access_denied_state"),
    ).toBeInTheDocument();
    expect(screen.getByText("Akses ditolak")).toBeInTheDocument();
    expect(screen.queryByTestId("dashboard.page")).not.toBeInTheDocument();
  });

  it("denies the admin dashboard to a signed-in non-admin", async () => {
    coreMockState.identity = makeIdentityState({
      isAuthenticated: true,
      identity: { getPrincipal: () => ({ toText: () => "aaaaa-bbbbb" }) },
    });
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
      isCallerAdmin: vi.fn(async () => false),
    });

    window.history.pushState({}, "", "/dasbor");
    renderWithProviders(<App />);

    expect(
      await screen.findByTestId("admin.access_denied_state"),
    ).toBeInTheDocument();
  });

  it("admits an admin to the dashboard", async () => {
    coreMockState.identity = makeIdentityState({
      isAuthenticated: true,
      identity: { getPrincipal: () => ({ toText: () => "aaaaa-bbbbb" }) },
    });
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
      isCallerAdmin: vi.fn(async () => true),
      getCallerUserRole: vi.fn(async () => "admin" as const),
    });

    window.history.pushState({}, "", "/dasbor");
    renderWithProviders(<App />);

    expect(await screen.findByTestId("dashboard.page")).toBeInTheDocument();
    expect(screen.getByText("Dasbor Admin")).toBeInTheDocument();
  });
});
