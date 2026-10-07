import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, p as CalendarDays, a as Button, f as Link, L as LoaderCircle, c as cn } from "./index-sQ-lDx8N.js";
import { S as Skeleton, C as Clock, B as BookingStatusBadge } from "./skeleton-BV3TSusV.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle, e as CircleCheck } from "./card-B6QbTDSP.js";
import { I as Input } from "./input-yowfS0Rr.js";
import { L as Label } from "./label-Bc9ofaOv.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-LO67ftk1.js";
import { e as useDaySchedule } from "./useBookings-EOpY9-Wm.js";
import { u as useHalls } from "./useHalls-CqUzUz3_.js";
import { t as todayDateKey, d as dateKeyToInputValue, i as inputValueToDateKey, e as formatDateKeyLong, a as formatTimeRange } from "./format-BzmDTGRL.js";
import { C as CalendarPlus } from "./calendar-plus-DD7e3toa.js";
import "./check-Ciux9whH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M11 20H2", key: "nlcfvz" }],
  [
    "path",
    {
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
      key: "au4z13"
    }
  ],
  ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14", key: "74r1mk" }],
  ["path", { d: "M14 12h.01", key: "1jfl7z" }],
  ["path", { d: "M22 20h-3", key: "vhrsz" }]
];
const DoorOpen = createLucideIcon("door-open", __iconNode);
const ALL_HALLS = "all";
function SlotRow({ slot, index }) {
  const occupied = slot.occupied;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "li",
    {
      className: cn(
        "flex flex-col gap-3 rounded-lg border p-4 transition-smooth sm:flex-row sm:items-center sm:justify-between",
        occupied ? "border-warning/30 bg-warning/8" : "border-success/25 bg-success/8"
      ),
      "data-ocid": `schedule.slot.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                occupied ? "bg-warning/15 text-warning" : "bg-success/15 text-success"
              ),
              children: occupied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-semibold tabular-nums", children: formatTimeRange(slot.startMinute, slot.endMinute) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-muted-foreground", children: occupied ? slot.activityName ?? "Kegiatan terjadwal" : "Belum ada pemesanan" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 items-center gap-2", children: occupied && slot.status ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: slot.status }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/12 px-2.5 py-0.5 text-xs font-medium text-success", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
          "Kosong"
        ] }) })
      ]
    }
  );
}
function ScheduleSkeleton() {
  const ids = Array.from({ length: 5 }, (_, i) => `slot-skeleton-${i}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "schedule.loading_state", children: ids.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[74px] w-full rounded-lg" }, id)) });
}
function SchedulePage() {
  const [hallId, setHallId] = reactExports.useState(null);
  const [dateKey, setDateKey] = reactExports.useState(() => todayDateKey());
  const { data: halls, isLoading: hallsLoading } = useHalls({
    facilities: []
  });
  const { data: schedule, isLoading: scheduleLoading } = useDaySchedule(
    hallId,
    dateKey
  );
  const selectedHall = reactExports.useMemo(
    () => {
      var _a;
      return ((_a = halls == null ? void 0 : halls.find((entry) => entry.hall.id === hallId)) == null ? void 0 : _a.hall) ?? null;
    },
    [halls, hallId]
  );
  const dateInputValue = dateKeyToInputValue(dateKey);
  const occupiedCount = (schedule == null ? void 0 : schedule.slots.filter((s) => s.occupied).length) ?? 0;
  const freeCount = ((schedule == null ? void 0 : schedule.slots.length) ?? 0) - occupiedCount;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", "data-ocid": "schedule.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold tracking-tight sm:text-3xl", children: "Jadwal Aula" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-sm text-muted-foreground", children: "Pilih aula dan tanggal untuk melihat slot waktu yang sudah terisi dan yang masih kosong. Jadwal hanya menampilkan nama kegiatan dan status pemesanan." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-4 pt-6 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "schedule-hall", children: "Aula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: hallId === null ? ALL_HALLS : hallId.toString(),
            onValueChange: (value) => setHallId(value === ALL_HALLS ? null : BigInt(value)),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "schedule-hall",
                  className: "w-full",
                  "data-ocid": "schedule.hall_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih aula" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ALL_HALLS, children: "Pilih aula…" }),
                halls == null ? void 0 : halls.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SelectItem,
                  {
                    value: entry.hall.id.toString(),
                    children: [
                      entry.hall.name,
                      " — ",
                      entry.hall.building
                    ]
                  },
                  entry.hall.id.toString()
                ))
              ] })
            ]
          }
        ),
        hallsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Memuat daftar aula…" }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "schedule-date", children: "Tanggal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "schedule-date",
            type: "date",
            value: dateInputValue,
            onChange: (event) => {
              const next = inputValueToDateKey(event.target.value);
              if (next !== null) setDateKey(next);
            },
            "data-ocid": "schedule.date_input"
          }
        )
      ] })
    ] }) }),
    hallId === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-dashed shadow-none",
        "data-ocid": "schedule.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-3 py-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DoorOpen, { className: "h-6 w-6", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Pilih aula terlebih dahulu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-sm text-muted-foreground", children: "Jadwal harian ditampilkan per aula. Pilih salah satu aula di atas untuk melihat slot waktunya." })
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CalendarDays,
              {
                className: "h-5 w-5 text-primary",
                "aria-hidden": "true"
              }
            ),
            (selectedHall == null ? void 0 : selectedHall.name) ?? "Jadwal aula"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: formatDateKeyLong(dateKey) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/12 px-3 py-1 font-medium text-success", children: [
            freeCount,
            " kosong"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/15 px-3 py-1 font-medium text-warning", children: [
            occupiedCount,
            " terisi"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        scheduleLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleSkeleton, {}) : !schedule || schedule.slots.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-10 text-center",
            "data-ocid": "schedule.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-6 w-6", "aria-hidden": "true" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold", children: "Belum ada slot jadwal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-sm text-muted-foreground", children: "Tidak ada slot waktu untuk aula ini pada tanggal tersebut." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-3", "data-ocid": "schedule.list", children: schedule.slots.map((slot, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlotRow,
          {
            slot,
            index
          },
          `${slot.startMinute.toString()}-${slot.endMinute.toString()}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Ingin memakai aula ini? Ajukan pemesanan pada tanggal dan jam yang masih kosong." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              type: "button",
              className: "gap-2",
              "data-ocid": "schedule.book_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/pemesanan/baru",
                  search: {
                    hallId: hallId == null ? void 0 : hallId.toString(),
                    date: dateKeyToInputValue(dateKey)
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-4 w-4", "aria-hidden": "true" }),
                    "Ajukan Pemesanan"
                  ]
                }
              )
            }
          )
        ] })
      ] })
    ] }),
    scheduleLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("output", { className: "sr-only", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin", "aria-hidden": "true" }),
      "Memuat jadwal…"
    ] }) : null
  ] });
}
export {
  SchedulePage as default
};
