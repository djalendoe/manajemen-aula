import { BookingStatus } from "@/backend";
import { coreMockState, resetCoreMockState } from "@/test/coreMock";
import { makeBooking, makeFakeActor } from "@/test/harness";
import { AdminBookingsPage } from "@/test/pages";
import { renderPage } from "@/test/render";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", async () => {
  const { coreMock } = await import("@/test/coreMock");
  return coreMock;
});

describe("AdminBookingsPage", () => {
  beforeEach(() => {
    resetCoreMockState();
  });

  it("lists all bookings and approves a pending one", async () => {
    const approveBooking = vi.fn(async () => ({
      __kind__: "ok" as const,
      ok: makeBooking({ status: BookingStatus.disetujui }),
    }));
    coreMockState.actor = makeFakeActor({
      listAllBookings: vi.fn(async () => [
        makeBooking({
          id: 3n,
          activityName: "Rapat Koordinasi",
          status: BookingStatus.menunggu,
        }),
      ]),
      approveBooking,
    });

    const user = userEvent.setup();
    renderPage(AdminBookingsPage, { path: "/admin/pemesanan" });

    expect(
      await screen.findByTestId("admin_bookings.table"),
    ).toBeInTheDocument();
    expect(screen.getByText("Rapat Koordinasi")).toBeInTheDocument();

    await user.click(screen.getByTestId("admin_bookings.approve_button.1"));

    await waitFor(() => expect(approveBooking).toHaveBeenCalledWith(3n));
  });

  it("rejects a pending booking with a reason", async () => {
    const rejectBooking = vi.fn(async () => ({
      __kind__: "ok" as const,
      ok: makeBooking({ status: BookingStatus.ditolak }),
    }));
    coreMockState.actor = makeFakeActor({
      listAllBookings: vi.fn(async () => [
        makeBooking({
          id: 4n,
          activityName: "Seminar",
          status: BookingStatus.menunggu,
        }),
      ]),
      rejectBooking,
    });

    const user = userEvent.setup();
    renderPage(AdminBookingsPage, { path: "/admin/pemesanan" });

    await screen.findByTestId("admin_bookings.table");
    await user.click(screen.getByTestId("admin_bookings.reject_button.1"));

    const dialog = await screen.findByTestId("admin_bookings.reject_dialog");
    await user.type(
      within(dialog).getByTestId("admin_bookings.reject_reason_textarea"),
      "Aula sedang direnovasi.",
    );
    await user.click(
      within(dialog).getByTestId("admin_bookings.reject_confirm_button"),
    );

    await waitFor(() =>
      expect(rejectBooking).toHaveBeenCalledWith(4n, "Aula sedang direnovasi."),
    );
  });

  it("requires a reason before confirming a rejection", async () => {
    const rejectBooking = vi.fn();
    coreMockState.actor = makeFakeActor({
      listAllBookings: vi.fn(async () => [
        makeBooking({ id: 4n, status: BookingStatus.menunggu }),
      ]),
      rejectBooking,
    });

    const user = userEvent.setup();
    renderPage(AdminBookingsPage, { path: "/admin/pemesanan" });

    await screen.findByTestId("admin_bookings.table");
    await user.click(screen.getByTestId("admin_bookings.reject_button.1"));

    const dialog = await screen.findByTestId("admin_bookings.reject_dialog");
    const confirm = within(dialog).getByTestId(
      "admin_bookings.reject_confirm_button",
    );
    expect(confirm).toBeDisabled();
    expect(rejectBooking).not.toHaveBeenCalled();
  });
});
