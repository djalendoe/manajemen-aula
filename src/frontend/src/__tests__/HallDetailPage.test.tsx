import { BookingStatus } from "@/backend";
import { coreMockState, resetCoreMockState } from "@/test/coreMock";
import {
  makeBooking,
  makeDaySchedule,
  makeFakeActor,
  makeHall,
} from "@/test/harness";
import { HallDetailPage } from "@/test/pages";
import { renderPage } from "@/test/render";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", async () => {
  const { coreMock } = await import("@/test/coreMock");
  return coreMock;
});

describe("HallDetailPage", () => {
  beforeEach(() => {
    resetCoreMockState();
  });

  it("shows the full description, facilities, capacity, and upcoming schedule", async () => {
    coreMockState.actor = makeFakeActor({
      getHall: vi.fn(async () => ({
        hall: makeHall({
          id: 1n,
          name: "Aula Serbaguna",
          description: "Aula besar serbaguna untuk berbagai kegiatan.",
          capacity: 200n,
          facilities: ["AC", "Proyektor", "Panggung"],
        }),
        upcomingBookings: [
          makeBooking({
            id: 11n,
            activityName: "Seminar Teknologi",
            status: BookingStatus.disetujui,
          }),
        ],
      })),
      getDaySchedule: vi.fn(async () => makeDaySchedule()),
    });

    renderPage(HallDetailPage, {
      path: "/aula/$hallId",
      initialEntry: "/aula/1",
    });

    expect(await screen.findByTestId("hall.page")).toBeInTheDocument();
    expect(
      screen.getByText("Aula besar serbaguna untuk berbagai kegiatan."),
    ).toBeInTheDocument();
    expect(screen.getByText("Proyektor")).toBeInTheDocument();
    expect(screen.getByText("Panggung")).toBeInTheDocument();
    expect(screen.getByText("200 orang")).toBeInTheDocument();
    expect(screen.getByText("Seminar Teknologi")).toBeInTheDocument();
    expect(screen.getByText("Disetujui")).toBeInTheDocument();
  });

  it("shows an empty schedule state when there are no upcoming bookings", async () => {
    coreMockState.actor = makeFakeActor({
      getHall: vi.fn(async () => ({
        hall: makeHall({ id: 1n }),
        upcomingBookings: [],
      })),
      getDaySchedule: vi.fn(async () => null),
    });

    renderPage(HallDetailPage, {
      path: "/aula/$hallId",
      initialEntry: "/aula/1",
    });

    expect(
      await screen.findByTestId("hall.schedule_empty_state"),
    ).toBeInTheDocument();
    expect(screen.getByText("Belum ada jadwal mendatang")).toBeInTheDocument();
  });

  it("shows a not-found state when the hall does not exist", async () => {
    coreMockState.actor = makeFakeActor({
      getHall: vi.fn(async () => null),
      getDaySchedule: vi.fn(async () => null),
    });

    renderPage(HallDetailPage, {
      path: "/aula/$hallId",
      initialEntry: "/aula/999",
    });

    expect(await screen.findByTestId("hall.empty_state")).toBeInTheDocument();
    expect(screen.getByText("Aula tidak ditemukan")).toBeInTheDocument();
  });
});
