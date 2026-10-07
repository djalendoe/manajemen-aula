import { i as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, l as LogIn, a as Button, f as Link, C as ClipboardList, b as BOOKING_STATUS_LABELS, t as CANCELLABLE_STATUSES } from "./index-sQ-lDx8N.js";
import { S as Skeleton, B as BookingStatusBadge, C as Clock, a as CircleX } from "./skeleton-BV3TSusV.js";
import { C as Card, d as CardContent } from "./card-B6QbTDSP.js";
import { f as useMyBookings, g as useCancelBooking } from "./useBookings-EOpY9-Wm.js";
import { b as formatCount, e as formatDateKeyLong, a as formatTimeRange, g as formatTimestamp } from "./format-BzmDTGRL.js";
import { C as CalendarPlus } from "./calendar-plus-DD7e3toa.js";
import { C as CircleAlert } from "./circle-alert-C5xDfQQN.js";
import { M as MapPin, U as Users } from "./users-CKbytPXo.js";
function BookingCard({
  booking,
  index,
  onCancel,
  cancelling
}) {
  const cancellable = CANCELLABLE_STATUSES.includes(booking.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle", "data-ocid": `bookings.item.${index + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-4 pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-base font-semibold", children: booking.activityName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: booking.hallName })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid gap-3 text-sm sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Tanggal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: formatDateKeyLong(booking.date) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Waktu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "flex items-center gap-1.5 font-mono font-medium tabular-nums", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
          formatTimeRange(booking.startMinute, booking.endMinute)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Peserta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "flex items-center gap-1.5 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
          formatCount(booking.participantCount),
          " orang"
        ] })
      ] })
    ] }),
    booking.notes ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground", children: booking.notes }) : null,
    booking.status === "ditolak" && booking.rejectionReason ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-2 rounded-lg border border-destructive/25 bg-destructive/10 p-3",
        "data-ocid": `bookings.rejection.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleAlert,
            {
              className: "mt-0.5 h-4 w-4 shrink-0 text-destructive",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-destructive", children: "Alasan penolakan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: booking.rejectionReason })
          ] })
        ]
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Diajukan ",
        formatTimestamp(booking.createdAt)
      ] }),
      cancellable ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => onCancel(booking),
          disabled: cancelling,
          className: "gap-2 text-destructive hover:text-destructive",
          "data-ocid": `bookings.cancel_button.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4", "aria-hidden": "true" }),
            cancelling ? "Membatalkan…" : "Batalkan"
          ]
        }
      ) : null
    ] })
  ] }) });
}
function BookingsSkeleton() {
  const ids = Array.from({ length: 3 }, (_, i) => `booking-skeleton-${i}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", "data-ocid": "bookings.loading_state", children: ids.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" }, id)) });
}
function MyBookingsPage() {
  const { isAuthenticated, isInitializing, login } = useInternetIdentity();
  const { data: bookings, isLoading } = useMyBookings();
  const cancelBooking = useCancelBooking();
  const [cancelError, setCancelError] = reactExports.useState(null);
  const [pendingId, setPendingId] = reactExports.useState(null);
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex min-h-[50vh] items-center justify-center",
        "data-ocid": "bookings.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Memuat sesi…" })
      }
    );
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "bookings.auth_required_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-6 w-6", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold", children: "Masuk untuk melihat pemesanan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Daftar pemesanan Anda tersedia setelah masuk dengan Internet Identity." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: () => login(),
              className: "gap-2",
              "data-ocid": "bookings.login_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4", "aria-hidden": "true" }),
                "Masuk"
              ]
            }
          )
        ]
      }
    );
  }
  const handleCancel = (booking) => {
    setCancelError(null);
    setPendingId(booking.id.toString());
    cancelBooking.mutate(booking.id, {
      onSuccess: (result) => {
        setPendingId(null);
        if (result.__kind__ === "err") {
          setCancelError(
            "Pemesanan tidak dapat dibatalkan. Mungkin statusnya sudah berubah."
          );
        }
      },
      onError: () => {
        setPendingId(null);
        setCancelError(
          "Terjadi kesalahan saat membatalkan pemesanan. Silakan coba lagi."
        );
      }
    });
  };
  const list = bookings ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", "data-ocid": "bookings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold tracking-tight sm:text-3xl", children: "Pemesanan Saya" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-sm text-muted-foreground", children: "Pantau status pengajuan Anda dan batalkan pemesanan yang masih menunggu atau sudah disetujui." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          type: "button",
          className: "gap-2",
          "data-ocid": "bookings.new_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pemesanan/baru", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-4 w-4", "aria-hidden": "true" }),
            "Ajukan Pemesanan"
          ] })
        }
      )
    ] }),
    cancelError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 rounded-lg border border-destructive/25 bg-destructive/10 p-4",
        "data-ocid": "bookings.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleAlert,
            {
              className: "mt-0.5 h-5 w-5 shrink-0 text-destructive",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: cancelError })
        ]
      }
    ) : null,
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookingsSkeleton, {}) : list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-dashed shadow-none",
        "data-ocid": "bookings.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-3 py-14 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-6 w-6", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Belum ada pemesanan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-sm text-muted-foreground", children: "Anda belum mengajukan pemesanan aula. Mulai dengan memilih aula dan jadwal yang tersedia." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              type: "button",
              className: "mt-1 gap-2",
              "data-ocid": "bookings.empty_action_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pemesanan/baru", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-4 w-4", "aria-hidden": "true" }),
                "Ajukan Pemesanan"
              ] })
            }
          )
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", "data-ocid": "bookings.list", children: list.map((booking, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingCard,
      {
        booking,
        index,
        onCancel: handleCancel,
        cancelling: pendingId === booking.id.toString()
      },
      booking.id.toString()
    )) }),
    list.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "Menampilkan ",
      formatCount(list.length),
      " pemesanan. Status",
      " ",
      BOOKING_STATUS_LABELS.menunggu.toLowerCase(),
      " dan",
      " ",
      BOOKING_STATUS_LABELS.disetujui.toLowerCase(),
      " masih dapat dibatalkan."
    ] }) : null
  ] });
}
export {
  MyBookingsPage as default
};
