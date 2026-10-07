import { HallAvailability } from "@/backend";
import { coreMockState, resetCoreMockState } from "@/test/coreMock";
import { makeFakeActor, makeHallWithStatus } from "@/test/harness";
import { CatalogPage } from "@/test/pages";
import { renderPage } from "@/test/render";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", async () => {
  const { coreMock } = await import("@/test/coreMock");
  return coreMock;
});

const HALLS = [
  makeHallWithStatus(
    {
      id: 1n,
      name: "Aula Serbaguna",
      building: "Gedung A",
      location: "Lantai 1",
      capacity: 200n,
      facilities: ["AC", "Proyektor", "Tata Suara", "WiFi"],
      photoUrl: "https://example.test/aula-1.jpg",
    },
    HallAvailability.available,
  ),
  makeHallWithStatus(
    {
      id: 2n,
      name: "Ruang Rapat B",
      building: "Gedung B",
      location: "Lantai 2",
      capacity: 30n,
      facilities: ["AC", "Papan Tulis"],
      photoUrl: "https://example.test/aula-2.jpg",
    },
    HallAvailability.occupied,
  ),
  makeHallWithStatus(
    {
      id: 3n,
      name: "Auditorium Utama",
      building: "Gedung C",
      location: "Lantai 3",
      capacity: 500n,
      facilities: ["Panggung", "Tata Suara"],
      photoUrl: "https://example.test/aula-3.jpg",
    },
    HallAvailability.available,
  ),
];

describe("CatalogPage", () => {
  beforeEach(() => {
    resetCoreMockState();
  });

  it("renders at least three halls with photo, capacity, and facilities", async () => {
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
    });

    renderPage(CatalogPage);

    const list = await screen.findByTestId("catalog.list");
    const cards = within(list).getAllByRole("link");
    expect(cards).toHaveLength(3);

    expect(screen.getByText("Aula Serbaguna")).toBeInTheDocument();
    expect(screen.getByText("Ruang Rapat B")).toBeInTheDocument();
    expect(screen.getByText("Auditorium Utama")).toBeInTheDocument();

    expect(screen.getByText(/Kapasitas 200 orang/)).toBeInTheDocument();
    expect(screen.getByText(/Kapasitas 30 orang/)).toBeInTheDocument();

    // Photo alt text and at least one facility chip per card.
    expect(screen.getByAltText("Foto Aula Serbaguna")).toBeInTheDocument();
    expect(screen.getByText("Proyektor")).toBeInTheDocument();
    expect(screen.getByText("Papan Tulis")).toBeInTheDocument();
  });

  it("links each card to its hall detail route", async () => {
    coreMockState.actor = makeFakeActor({
      listHalls: vi.fn(async () => HALLS),
    });

    renderPage(CatalogPage);

    const list = await screen.findByTestId("catalog.list");
    const links = within(list).getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/aula/1");
    expect(links[1]).toHaveAttribute("href", "/aula/2");
    expect(links[2]).toHaveAttribute("href", "/aula/3");
  });

  it("passes the minimum-capacity filter to the backend and updates results", async () => {
    const listHalls = vi.fn(async (filter: { minCapacity?: bigint }) =>
      filter.minCapacity && filter.minCapacity >= 100n
        ? [HALLS[0], HALLS[2]]
        : HALLS,
    );
    coreMockState.actor = makeFakeActor({ listHalls });

    const user = userEvent.setup();
    renderPage(CatalogPage);

    await screen.findByTestId("catalog.list");
    expect(screen.getByText("Ruang Rapat B")).toBeInTheDocument();

    await user.click(screen.getByTestId("catalog.capacity_select"));
    await user.click(
      await screen.findByRole("option", { name: "Min. 100 orang" }),
    );

    await waitFor(() => {
      expect(listHalls).toHaveBeenCalledWith(
        expect.objectContaining({ minCapacity: 100n }),
      );
    });
    await waitFor(() => {
      expect(screen.queryByText("Ruang Rapat B")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Aula Serbaguna")).toBeInTheDocument();
    expect(screen.getByText("Auditorium Utama")).toBeInTheDocument();
  });

  it("shows an empty state when no hall matches the filter", async () => {
    const listHalls = vi.fn(async (filter: { minCapacity?: bigint }) =>
      filter.minCapacity ? [] : HALLS,
    );
    coreMockState.actor = makeFakeActor({ listHalls });

    const user = userEvent.setup();
    renderPage(CatalogPage);

    await screen.findByTestId("catalog.list");
    await user.click(screen.getByTestId("catalog.capacity_select"));
    await user.click(
      await screen.findByRole("option", { name: "Min. 500 orang" }),
    );

    expect(
      await screen.findByTestId("catalog.empty_state"),
    ).toBeInTheDocument();
    expect(screen.getByText("Tidak ada aula yang cocok")).toBeInTheDocument();
  });
});
