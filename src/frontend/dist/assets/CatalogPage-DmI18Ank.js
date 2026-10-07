import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Button, f as Link, F as FACILITY_OPTIONS, X, e as Building2, c as cn } from "./index-sQ-lDx8N.js";
import { S as Skeleton, H as HallAvailabilityBadge } from "./skeleton-BV3TSusV.js";
import { C as Card } from "./card-B6QbTDSP.js";
import { I as Input } from "./input-yowfS0Rr.js";
import { L as Label } from "./label-Bc9ofaOv.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-LO67ftk1.js";
import { u as useHalls } from "./useHalls-CqUzUz3_.js";
import { b as formatCount } from "./format-BzmDTGRL.js";
import { C as CalendarPlus } from "./calendar-plus-DD7e3toa.js";
import { M as MapPin, U as Users } from "./users-CKbytPXo.js";
import "./check-Ciux9whH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const CAPACITY_OPTIONS = [
  { value: "0", label: "Semua kapasitas" },
  { value: "20", label: "Min. 20 orang" },
  { value: "50", label: "Min. 50 orang" },
  { value: "100", label: "Min. 100 orang" },
  { value: "200", label: "Min. 200 orang" },
  { value: "500", label: "Min. 500 orang" }
];
const ALL_FACILITIES = "semua";
function HallCard({ entry, index }) {
  const { hall, status } = entry;
  const mainFacilities = hall.facilities.slice(0, 3);
  const extraFacilities = hall.facilities.length - mainFacilities.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "group flex flex-col overflow-hidden rounded-lg border border-border shadow-subtle transition-smooth hover:-translate-y-0.5 hover:shadow-elevated",
      "data-ocid": `catalog.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/aula/$hallId",
          params: { hallId: hall.id.toString() },
          className: "flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "data-ocid": `catalog.card_link.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] w-full overflow-hidden bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: hall.photoUrl || "/assets/images/placeholder.svg",
                  alt: `Foto ${hall.name}`,
                  loading: "lazy",
                  className: "h-full w-full object-cover transition-smooth group-hover:scale-[1.03]"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                HallAvailabilityBadge,
                {
                  status,
                  className: "bg-card/95 backdrop-blur-sm"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-base font-semibold text-foreground", children: hall.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                    hall.building,
                    hall.location ? ` · ${hall.location}` : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-sm font-medium text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Users,
                  {
                    className: "h-4 w-4 shrink-0 text-primary",
                    "aria-hidden": "true"
                  }
                ),
                "Kapasitas ",
                formatCount(hall.capacity),
                " orang"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-wrap gap-1.5", children: [
                mainFacilities.length > 0 ? mainFacilities.map((facility) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground",
                    children: facility
                  },
                  facility
                )) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Fasilitas belum dicatat" }),
                extraFacilities > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground", children: [
                  "+",
                  extraFacilities,
                  " lainnya"
                ] })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function CatalogSkeleton() {
  const ids = Array.from({ length: 6 }, (_, i) => `catalog-skeleton-${i}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3",
      "data-ocid": "catalog.loading_state",
      children: ids.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "overflow-hidden rounded-lg border border-border shadow-subtle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[16/10] w-full rounded-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" })
              ] })
            ] })
          ]
        },
        id
      ))
    }
  );
}
function CatalogPage() {
  const [search, setSearch] = reactExports.useState("");
  const [minCapacity, setMinCapacity] = reactExports.useState("0");
  const [facility, setFacility] = reactExports.useState(ALL_FACILITIES);
  const filter = reactExports.useMemo(
    () => ({
      search: search.trim() || void 0,
      minCapacity: minCapacity === "0" ? void 0 : BigInt(minCapacity),
      facilities: facility === ALL_FACILITIES ? [] : [facility]
    }),
    [search, minCapacity, facility]
  );
  const { data: halls, isLoading, isError, refetch } = useHalls(filter);
  const hasActiveFilter = search.trim() !== "" || minCapacity !== "0" || facility !== ALL_FACILITIES;
  function resetFilters() {
    setSearch("");
    setMinCapacity("0");
    setFacility(ALL_FACILITIES);
  }
  const results = halls ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", "data-ocid": "catalog.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl", children: "Katalog Aula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-2xl text-sm text-muted-foreground", children: "Jelajahi seluruh aula dan ruangan yang tersedia, lalu pilih yang paling sesuai untuk kegiatan Anda." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          type: "button",
          className: "gap-2",
          "data-ocid": "catalog.primary_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pemesanan/baru", search: {}, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-4 w-4", "aria-hidden": "true" }),
            "Ajukan Pemesanan"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "rounded-lg border border-border bg-card p-4 shadow-subtle sm:p-5",
        "data-ocid": "catalog.filter.panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "catalog-search", children: "Cari aula" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Search,
                {
                  className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "catalog-search",
                  type: "search",
                  value: search,
                  onChange: (event) => setSearch(event.target.value),
                  placeholder: "Nama aula atau gedung…",
                  className: "pl-9",
                  "data-ocid": "catalog.search_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "catalog-capacity", children: "Kapasitas minimum" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: minCapacity, onValueChange: setMinCapacity, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "catalog-capacity",
                  "data-ocid": "catalog.capacity_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Semua kapasitas" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CAPACITY_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "catalog-facility", children: "Fasilitas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: facility, onValueChange: setFacility, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "catalog-facility",
                  "data-ocid": "catalog.facility_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Semua fasilitas" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ALL_FACILITIES, children: "Semua fasilitas" }),
                FACILITY_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: resetFilters,
              disabled: !hasActiveFilter,
              className: "gap-2",
              "data-ocid": "catalog.reset_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4", "aria-hidden": "true" }),
                "Reset"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-muted-foreground",
          "data-ocid": "catalog.result_count",
          children: isLoading ? "Memuat aula…" : `${formatCount(results.length)} aula ditemukan`
        }
      ),
      hasActiveFilter && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
        "Filter aktif"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CatalogSkeleton, {}) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "flex flex-col items-center gap-3 rounded-lg border border-destructive/25 bg-destructive/5 p-10 text-center",
        "data-ocid": "catalog.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Gagal memuat katalog aula" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-sm text-muted-foreground", children: "Terjadi kendala saat mengambil data aula. Silakan coba lagi." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => void refetch(),
              "data-ocid": "catalog.retry_button",
              children: "Coba lagi"
            }
          )
        ]
      }
    ) : results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-card p-12 text-center",
        "data-ocid": "catalog.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-6 w-6", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: hasActiveFilter ? "Tidak ada aula yang cocok" : "Belum ada aula" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-sm text-muted-foreground", children: hasActiveFilter ? "Coba ubah kata kunci, kapasitas minimum, atau fasilitas yang dipilih." : "Katalog aula masih kosong. Silakan periksa kembali nanti." }),
          hasActiveFilter && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: resetFilters,
              "data-ocid": "catalog.empty_reset_button",
              children: "Reset filter"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3",
          "animate-fade-in"
        ),
        "data-ocid": "catalog.list",
        children: results.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          HallCard,
          {
            entry,
            index
          },
          entry.hall.id.toString()
        ))
      }
    )
  ] });
}
export {
  CatalogPage as default
};
