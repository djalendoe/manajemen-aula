import type { BookingInput } from "@/backend";
import { coreMockState, resetCoreMockState } from "@/test/coreMock";
import {
  makeBooking,
  makeFakeActor,
  makeHallWithStatus,
  makeIdentityState,
} from "@/test/harness";
import { BookingFormPage } from "@/test/pages";
import { renderPage } from "@/test/render";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", async () => {
  const { coreMock } = await import("@/test/coreMock");
  return coreMock;
});

const HALLS = [
  makeHallWithStatus({ id: 1n, name: "Aula Serbaguna", building: "Gedung A" }),
];

function signedIn() {
  coreMockState.identity = makeIdentityState({
    isAuthenticated: true,
    identity: { getPrincipal: () => ({ toText: () => "aaaaa-bbbbb" }) },
  });
}

describe("BookingFormPage", () => {
  beforeEach(() => {
    resetCoreMockState();
  });

  it("requires sign-in before showing the booking form", async () => {
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
    });

    renderPage(BookingFormPage, { path: "/pemesanan/baru" });

    expect(
      await screen.findByTestId("booking.auth_required_state"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Masuk untuk mengajukan pemesanan"),
    ).toBeInTheDocument();
  });

  it("submits a booking and shows a pending success message", async () => {
    signedIn();
    const createBooking = vi.fn(async (_input: BookingInput) => ({
      __kind__: "ok" as const,
      ok: makeBooking({ id: 7n, activityName: "Rapat Koordinasi" }),
    }));
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
      createBooking,
    });

    const user = userEvent.setup();
    renderPage(BookingFormPage, { path: "/pemesanan/baru" });

    await screen.findByTestId("booking.page");

    await user.click(screen.getByTestId("booking.hall_select"));
    await user.click(
      await screen.findByRole("option", { name: /Aula Serbaguna/ }),
    );

    await user.type(
      screen.getByTestId("booking.activity_input"),
      "Rapat Koordinasi",
    );
    await user.type(screen.getByTestId("booking.participants_input"), "40");

    await user.click(screen.getByTestId("booking.submit_button"));

    expect(
      await screen.findByTestId("booking.success_state"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/berhasil dikirim dan berstatus menunggu/i),
    ).toBeInTheDocument();

    expect(createBooking).toHaveBeenCalledTimes(1);
    const input = createBooking.mock.calls[0][0];
    expect(input.hallId).toBe(1n);
    expect(input.activityName).toBe("Rapat Koordinasi");
    expect(input.participantCount).toBe(40n);
  });

  it("shows a clear conflict message when the backend rejects a clash", async () => {
    signedIn();
    const createBooking = vi.fn(async () => ({
      __kind__: "err" as const,
      err: { __kind__: "conflict" as const, conflict: null },
    }));
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
      createBooking,
    });

    const user = userEvent.setup();
    renderPage(BookingFormPage, { path: "/pemesanan/baru" });

    await screen.findByTestId("booking.page");
    await user.click(screen.getByTestId("booking.hall_select"));
    await user.click(
      await screen.findByRole("option", { name: /Aula Serbaguna/ }),
    );
    await user.type(screen.getByTestId("booking.activity_input"), "Seminar");
    await user.type(screen.getByTestId("booking.participants_input"), "10");
    await user.click(screen.getByTestId("booking.submit_button"));

    const error = await screen.findByTestId("booking.error_state");
    expect(error).toHaveTextContent(/bentrok/i);
    expect(error).toHaveTextContent(/sudah dipesan dan disetujui/i);
    expect(
      screen.queryByTestId("booking.success_state"),
    ).not.toBeInTheDocument();
  });

  it("validates that the end time is after the start time before calling the backend", async () => {
    signedIn();
    const createBooking = vi.fn();
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
      createBooking,
    });

    const user = userEvent.setup();
    renderPage(BookingFormPage, { path: "/pemesanan/baru" });

    await screen.findByTestId("booking.page");
    await user.click(screen.getByTestId("booking.hall_select"));
    await user.click(
      await screen.findByRole("option", { name: /Aula Serbaguna/ }),
    );
    await user.type(screen.getByTestId("booking.activity_input"), "Rapat");
    await user.type(screen.getByTestId("booking.participants_input"), "5");

    const start = screen.getByTestId("booking.start_input");
    const end = screen.getByTestId("booking.end_input");
    await user.clear(start);
    await user.type(start, "10:00");
    await user.clear(end);
    await user.type(end, "09:00");

    await user.click(screen.getByTestId("booking.submit_button"));

    expect(await screen.findByTestId("booking.error_state")).toHaveTextContent(
      /Jam selesai harus lebih besar/i,
    );
    await waitFor(() => expect(createBooking).not.toHaveBeenCalled());
  });
});
