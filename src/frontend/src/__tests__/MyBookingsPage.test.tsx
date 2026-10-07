import { BookingStatus } from "@/backend";
import { coreMockState, resetCoreMockState } from "@/test/coreMock";
import { makeBooking, makeFakeActor, makeIdentityState } from "@/test/harness";
import { MyBookingsPage } from "@/test/pages";
import { renderPage } from "@/test/render";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", async () => {
  const { coreMock } = await import("@/test/coreMock");
  return coreMock;
});

function signedIn() {
  coreMockState.identity = makeIdentityState({
    isAuthenticated: true,
    identity: { getPrincipal: () => ({ toText: () => "aaaaa-bbbbb" }) },
  });
}

describe("MyBookingsPage", () => {
  beforeEach(() => {
    resetCoreMockState();
  });

  it("requires sign-in to view bookings", async () => {
    renderPage(MyBookingsPage, { path: "/pemesanan-saya" });

    expect(
      await screen.findByTestId("bookings.auth_required_state"),
    ).toBeInTheDocument();
  });

  it("lists the caller's bookings with their statuses", async () => {
    signedIn();
    coreMockState.actor = makeFakeActor({
      listMyBookings: vi.fn(async () => [
        makeBooking({
          id: 1n,
          activityName: "Rapat Koordinasi",
          status: BookingStatus.menunggu,
        }),
        makeBooking({
          id: 2n,
          activityName: "Seminar Teknologi",
          status: BookingStatus.disetujui,
        }),
        makeBooking({
          id: 3n,
          activityName: "Lokakarya",
          status: BookingStatus.ditolak,
          rejectionReason: "Aula sedang direnovasi.",
        }),
      ]),
    });

    renderPage(MyBookingsPage, { path: "/pemesanan-saya" });

    const list = await screen.findByTestId("bookings.list");
    expect(within(list).getAllByTestId(/^bookings\.item\./)).toHaveLength(3);
    expect(screen.getByText("Rapat Koordinasi")).toBeInTheDocument();
    expect(screen.getByText("Seminar Teknologi")).toBeInTheDocument();
    expect(screen.getByText("Lokakarya")).toBeInTheDocument();

    expect(screen.getByText("Menunggu")).toBeInTheDocument();
    expect(screen.getByText("Disetujui")).toBeInTheDocument();
    expect(screen.getByText("Ditolak")).toBeInTheDocument();
    expect(screen.getByText("Aula sedang direnovasi.")).toBeInTheDocument();
  });

  it("cancels a pending booking and calls the backend with its id", async () => {
    signedIn();
    const cancelBooking = vi.fn(async () => ({
      __kind__: "ok" as const,
      ok: null,
    }));
    coreMockState.actor = makeFakeActor({
      listMyBookings: vi.fn(async () => [
        makeBooking({ id: 5n, status: BookingStatus.menunggu }),
      ]),
      cancelBooking,
    });

    const user = userEvent.setup();
    renderPage(MyBookingsPage, { path: "/pemesanan-saya" });

    await screen.findByTestId("bookings.list");
    await user.click(screen.getByTestId("bookings.cancel_button.1"));

    await waitFor(() => expect(cancelBooking).toHaveBeenCalledWith(5n));
  });

  it("does not offer cancellation for a rejected booking", async () => {
    signedIn();
    coreMockState.actor = makeFakeActor({
      listMyBookings: vi.fn(async () => [
        makeBooking({ id: 9n, status: BookingStatus.ditolak }),
      ]),
    });

    renderPage(MyBookingsPage, { path: "/pemesanan-saya" });

    await screen.findByTestId("bookings.list");
    expect(
      screen.queryByTestId("bookings.cancel_button.1"),
    ).not.toBeInTheDocument();
  });
});
