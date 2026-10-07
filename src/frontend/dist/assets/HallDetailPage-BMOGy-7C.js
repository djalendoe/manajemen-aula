import { d as createLucideIcon, m as useParams, H as HallAvailability, j as jsxRuntimeExports, a as Button, f as Link, e as Building2, S as Separator } from "./index-sQ-lDx8N.js";
import { S as Skeleton, H as HallAvailabilityBadge, C as Clock, B as BookingStatusBadge } from "./skeleton-BV3TSusV.js";
import { C as Card } from "./card-B6QbTDSP.js";
import { e as useDaySchedule } from "./useBookings-EOpY9-Wm.js";
import { d as useHall } from "./useHalls-CqUzUz3_.js";
import { t as todayDateKey, b as formatCount, e as formatDateKeyLong, a as formatTimeRange } from "./format-BzmDTGRL.js";
import { M as MapPin, U as Users } from "./users-CKbytPXo.js";
import { C as Check } from "./check-Ciux9whH.js";
import { C as CalendarPlus } from "./calendar-plus-DD7e3toa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8", key: "3spt84" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m17 22 5-5", key: "1k6ppv" }],
  ["path", { d: "m17 17 5 5", key: "p7ous7" }]
];
const CalendarX2 = createLucideIcon("calendar-x-2", __iconNode);
function UpcomingBookingRow({
  booking,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "li",
    {
      className: "flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:justify-between",
      "data-ocid": `hall.booking_item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium text-foreground", children: booking.activityName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarX2, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
              formatDateKeyLong(booking.date)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
              formatTimeRange(booking.startMinute, booking.endMinute)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingStatusBadge,
          {
            status: booking.status,
            className: "self-start sm:self-auto"
          }
        )
      ]
    }
  );
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", "data-ocid": "hall.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[21/9] w-full rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-2/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 w-full rounded-lg" })
    ] })
  ] });
}
function HallDetailContent({
  detail,
  availability
}) {
  const { hall, upcomingBookings } = detail;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 animate-fade-in", "data-ocid": "hall.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        asChild: true,
        type: "button",
        variant: "ghost",
        size: "sm",
        className: "-ml-2 gap-2 text-muted-foreground",
        "data-ocid": "hall.back_button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4", "aria-hidden": "true" }),
          "Kembali ke Katalog"
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg border border-border shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: hall.photoUrl || "/assets/images/placeholder.svg",
          alt: `Foto ${hall.name}`,
          className: "aspect-[21/9] w-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-5 sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold tracking-tight text-background sm:text-3xl", children: hall.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HallAvailabilityBadge, { status: availability })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 flex items-center gap-1.5 text-sm text-background/85", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 shrink-0", "aria-hidden": "true" }),
          hall.building,
          hall.location ? ` · ${hall.location}` : ""
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-lg border border-border bg-card p-5 shadow-subtle sm:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Tentang Aula" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground", children: hall.description || "Deskripsi aula belum tersedia." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: "Fasilitas" }),
          hall.facilities.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2", children: hall.facilities.map((facility) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-center gap-2 text-sm text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/12 text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", "aria-hidden": "true" }) }),
                facility
              ]
            },
            facility
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Fasilitas aula ini belum dicatat." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-lg border border-border bg-card p-5 shadow-subtle sm:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Jadwal Pemakaian Mendatang" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
              formatCount(upcomingBookings.length),
              " kegiatan"
            ] })
          ] }),
          upcomingBookings.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 divide-y divide-border", children: upcomingBookings.map((booking, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            UpcomingBookingRow,
            {
              booking,
              index
            },
            booking.id.toString()
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-4 flex flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 p-8 text-center",
              "data-ocid": "hall.schedule_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CalendarX2,
                  {
                    className: "h-6 w-6 text-muted-foreground",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Belum ada jadwal mendatang" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: "Aula ini masih kosong untuk waktu ke depan. Anda dapat menjadi yang pertama mengajukan pemesanan." })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-lg border border-border bg-card p-5 shadow-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: "Ringkasan Aula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-4 flex flex-col gap-3.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dt", { className: "flex items-center gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4", "aria-hidden": "true" }),
              "Kapasitas"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "font-medium text-foreground", children: [
              formatCount(hall.capacity),
              " orang"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dt", { className: "flex items-center gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4", "aria-hidden": "true" }),
              "Gedung"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-right font-medium text-foreground", children: hall.building || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dt", { className: "flex items-center gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4", "aria-hidden": "true" }),
              "Lokasi"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-right font-medium text-foreground", children: hall.location || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Status hari ini" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HallAvailabilityBadge, { status: availability }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            type: "button",
            className: "w-full gap-2",
            "data-ocid": "hall.book_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/pemesanan/baru",
                search: { hallId: hall.id.toString() },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-4 w-4", "aria-hidden": "true" }),
                  "Ajukan Pemesanan"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-center text-xs text-muted-foreground", children: "Pemesanan akan ditinjau oleh admin sebelum disetujui." })
      ] }) })
    ] })
  ] });
}
function HallDetailPage() {
  const { hallId } = useParams({ from: "/aula/$hallId" });
  const parsedId = (() => {
    try {
      return BigInt(hallId);
    } catch {
      return null;
    }
  })();
  const { data: detail, isLoading, isError, refetch } = useHall(parsedId);
  const { data: todaySchedule } = useDaySchedule(parsedId, todayDateKey());
  const availability = (todaySchedule == null ? void 0 : todaySchedule.slots.some((slot) => slot.occupied)) ?? false ? HallAvailability.occupied : HallAvailability.available;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "flex flex-col items-center gap-3 rounded-lg border border-destructive/25 bg-destructive/5 p-10 text-center",
        "data-ocid": "hall.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-semibold text-foreground", children: "Gagal memuat detail aula" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-sm text-muted-foreground", children: "Terjadi kendala saat mengambil data aula. Silakan coba lagi." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => void refetch(),
                "data-ocid": "hall.retry_button",
                children: "Coba lagi"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, type: "button", variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Kembali ke Katalog" }) })
          ] })
        ]
      }
    );
  }
  if (!detail) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-card p-12 text-center",
        "data-ocid": "hall.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-6 w-6", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-semibold text-foreground", children: "Aula tidak ditemukan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-sm text-muted-foreground", children: "Aula yang Anda cari tidak tersedia atau telah dinonaktifkan." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, type: "button", "data-ocid": "hall.back_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Kembali ke Katalog Aula" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(HallDetailContent, { detail, availability });
}
export {
  HallDetailPage as default
};
