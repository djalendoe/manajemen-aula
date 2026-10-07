import type { HallInput } from "@/backend";
import { coreMockState, resetCoreMockState } from "@/test/coreMock";
import { makeFakeActor, makeHallWithStatus } from "@/test/harness";
import { AdminHallsPage } from "@/test/pages";
import { renderPage } from "@/test/render";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", async () => {
  const { coreMock } = await import("@/test/coreMock");
  return coreMock;
});

describe("AdminHallsPage", () => {
  beforeEach(() => {
    resetCoreMockState();
  });

  it("lists existing halls with capacity and facilities", async () => {
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => [
        makeHallWithStatus({
          id: 1n,
          name: "Aula Serbaguna",
          capacity: 200n,
          facilities: ["AC", "Proyektor"],
        }),
      ]),
    });

    renderPage(AdminHallsPage, { path: "/admin/aula" });

    expect(await screen.findByTestId("admin_halls.list")).toBeInTheDocument();
    expect(screen.getByText("Aula Serbaguna")).toBeInTheDocument();
    expect(screen.getByText(/200 orang/)).toBeInTheDocument();
    expect(screen.getByText("Proyektor")).toBeInTheDocument();
  });

  it("adds a new hall through the form and calls the backend", async () => {
    const createHall = vi.fn(
      async (_input: HallInput) => makeHallWithStatus().hall,
    );
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => []),
      createHall,
    });

    const user = userEvent.setup();
    renderPage(AdminHallsPage, { path: "/admin/aula" });

    await screen.findByTestId("admin_halls.empty_state");
    await user.click(screen.getByTestId("admin_halls.add_button"));

    await user.type(screen.getByTestId("admin_halls.name_input"), "Aula Baru");
    await user.type(screen.getByTestId("admin_halls.capacity_input"), "150");
    await user.type(
      screen.getByTestId("admin_halls.building_input"),
      "Gedung D",
    );
    await user.type(
      screen.getByTestId("admin_halls.location_input"),
      "Lantai 4",
    );
    await user.click(screen.getByTestId("admin_halls.facility.ac"));

    await user.click(screen.getByTestId("admin_halls.form_submit_button"));

    await waitFor(() => expect(createHall).toHaveBeenCalledTimes(1));
    const input = createHall.mock.calls[0][0];
    expect(input.name).toBe("Aula Baru");
    expect(input.capacity).toBe(150n);
    expect(input.building).toBe("Gedung D");
    expect(input.location).toBe("Lantai 4");
    expect(input.facilities).toContain("AC");
  });

  it("blocks submission and shows validation errors for missing required fields", async () => {
    const createHall = vi.fn();
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => []),
      createHall,
    });

    const user = userEvent.setup();
    renderPage(AdminHallsPage, { path: "/admin/aula" });

    await screen.findByTestId("admin_halls.empty_state");
    await user.click(screen.getByTestId("admin_halls.add_button"));
    await user.click(screen.getByTestId("admin_halls.form_submit_button"));

    expect(
      await screen.findByText("Nama aula wajib diisi."),
    ).toBeInTheDocument();
    expect(screen.getByText("Gedung wajib diisi.")).toBeInTheDocument();
    expect(screen.getByText("Lokasi wajib diisi.")).toBeInTheDocument();
    expect(
      screen.getByText("Kapasitas harus berupa angka lebih dari 0."),
    ).toBeInTheDocument();
    expect(createHall).not.toHaveBeenCalled();
  });
});
