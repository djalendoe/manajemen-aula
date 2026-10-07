import { d as createLucideIcon, e as Building2, j as jsxRuntimeExports, a as Button, f as Link, C as ClipboardList } from "./index-sQ-lDx8N.js";
import { S as Skeleton, B as BookingStatusBadge } from "./skeleton-BV3TSusV.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-B6QbTDSP.js";
import { c as useDashboardSummary, u as useAllBookings } from "./useBookings-EOpY9-Wm.js";
import { f as formatDateKeyShort, a as formatTimeRange, b as formatCount } from "./format-BzmDTGRL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8", key: "bce9hv" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m16 20 2 2 4-4", key: "13tcca" }]
];
const CalendarCheck2 = createLucideIcon("calendar-check-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }]
];
const Clock3 = createLucideIcon("clock-3", __iconNode);
function SummaryCardView({ card }) {
  const Icon = card.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "rounded-lg border-border shadow-subtle transition-smooth hover:shadow-elevated",
      "data-ocid": `dashboard.${card.key}_card`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-start justify-between gap-4 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: card.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl font-semibold tracking-tight", children: card.value === void 0 ? "—" : formatCount(card.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: card.hint })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${card.tone}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5", "aria-hidden": "true" })
          }
        )
      ] })
    }
  );
}
function SummarySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 3 }, (_, i) => `summary-skeleton-${i}`).map(
    (id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-lg border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-start justify-between gap-4 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-11 rounded-lg" })
    ] }) }, id)
  ) });
}
function AdminDashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: bookings, isLoading: bookingsLoading } = useAllBookings();
  const cards = [
    {
      key: "halls",
      label: "Total Aula",
      value: summary == null ? void 0 : summary.totalHalls,
      icon: Building2,
      tone: "bg-primary/12 text-primary",
      to: "/admin/aula",
      hint: "Ruangan terdaftar dalam sistem"
    },
    {
      key: "pending",
      label: "Menunggu Persetujuan",
      value: summary == null ? void 0 : summary.pendingBookings,
      icon: Clock3,
      tone: "bg-warning/15 text-warning",
      to: "/admin/pemesanan",
      hint: "Pengajuan yang perlu ditinjau"
    },
    {
      key: "approved",
      label: "Disetujui",
      value: summary == null ? void 0 : summary.approvedBookings,
      icon: CalendarCheck2,
      tone: "bg-success/12 text-success",
      to: "/admin/pemesanan",
      hint: "Pemesanan yang telah disetujui"
    }
  ];
  const recent = (bookings ?? []).slice().sort((a, b) => Number(b.createdAt - a.createdAt)).slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold tracking-tight", children: "Dasbor Admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Ringkasan pengelolaan aula dan pemesanan dalam satu tampilan." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "Ringkasan", "data-ocid": "dashboard.summary_section", children: summaryLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SummarySkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: cards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCardView, { card }, card.key)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "aria-label": "Pemesanan terbaru",
        "data-ocid": "dashboard.recent_section",
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold tracking-tight", children: "Pemesanan Terbaru" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enam pengajuan terakhir yang masuk ke sistem." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                type: "button",
                variant: "outline",
                size: "sm",
                className: "gap-2",
                "data-ocid": "dashboard.view_all_bookings_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/pemesanan", children: [
                  "Lihat semua",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-lg border-border shadow-subtle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ClipboardList,
                  {
                    className: "h-4 w-4 text-muted-foreground",
                    "aria-hidden": "true"
                  }
                ),
                "Aktivitas Pemesanan"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Status terkini setiap pengajuan pemesanan aula." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: bookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-3 p-5",
                "data-ocid": "dashboard.loading_state",
                children: Array.from(
                  { length: 4 },
                  (_, i) => `recent-skeleton-${i}`
                ).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "ml-auto h-6 w-24 rounded-full" })
                ] }, id))
              }
            ) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center gap-2 px-5 py-10 text-center",
                "data-ocid": "dashboard.recent_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-5 w-5", "aria-hidden": "true" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Belum ada pemesanan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: "Pengajuan pemesanan dari pengguna akan tampil di sini begitu masuk." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: recent.map((booking, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5",
                "data-ocid": `dashboard.recent_item.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: booking.activityName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-sm text-muted-foreground", children: [
                      booking.hallName,
                      " · ",
                      formatDateKeyShort(booking.date),
                      " ",
                      "·",
                      " ",
                      formatTimeRange(
                        booking.startMinute,
                        booking.endMinute
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.status })
                ]
              },
              booking.id.toString()
            )) }) })
          ] })
        ]
      }
    )
  ] });
}
export {
  AdminDashboardPage as default
};
