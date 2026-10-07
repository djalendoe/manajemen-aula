import { coreMockState, resetCoreMockState } from "@/test/coreMock";
import {
  makeDaySchedule,
  makeFakeActor,
  makeHallWithStatus,
} from "@/test/harness";
import { SchedulePage } from "@/test/pages";
import { renderPage } from "@/test/render";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", async () => {
  const { coreMock } = await import("@/test/coreMock");
  return coreMock;
});

const HALLS = [
  makeHallWithStatus({ id: 1n, name: "Aula Serbaguna", building: "Gedung A" }),
];

describe("SchedulePage", () => {
  beforeEach(() => {
    resetCoreMockState();
  });

  it("prompts for a hall before showing any schedule", async () => {
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
    });

    renderPage(SchedulePage, { path: "/jadwal" });

    expect(
      await screen.findByTestId("schedule.empty_state"),
    ).toBeInTheDocument();
    expect(screen.getByText("Pilih aula terlebih dahulu")).toBeInTheDocument();
  });

  it("shows occupied and free slots with activity name and status", async () => {
    const getDaySchedule = vi.fn(async () => makeDaySchedule());
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
      getDaySchedule,
    });

    const user = userEvent.setup();
    renderPage(SchedulePage, { path: "/jadwal" });

    await screen.findByTestId("schedule.page");
    await user.click(screen.getByTestId("schedule.hall_select"));
    await user.click(
      await screen.findByRole("option", { name: /Aula Serbaguna/ }),
    );

    const list = await screen.findByTestId("schedule.list");
    const slots = within(list).getAllByRole("listitem");
    expect(slots).toHaveLength(2);

    // Occupied slot: activity name + approved status, no personal data.
    expect(within(list).getByText("Seminar Teknologi")).toBeInTheDocument();
    expect(within(list).getByText("Disetujui")).toBeInTheDocument();

    // Free slot: explicit "Kosong" marker.
    expect(within(list).getByText("Kosong")).toBeInTheDocument();
    expect(within(list).getByText("Belum ada pemesanan")).toBeInTheDocument();

    // Summary counters.
    expect(screen.getByText("1 kosong")).toBeInTheDocument();
    expect(screen.getByText("1 terisi")).toBeInTheDocument();

    expect(getDaySchedule).toHaveBeenCalledWith(1n, expect.any(BigInt));
  });
});
