import { j as jsxRuntimeExports, c as cn, r as reactExports, B as BookingStatus, a as Button, C as ClipboardList, b as BOOKING_STATUS_LABELS, L as LoaderCircle, X, u as ue } from "./index-sQ-lDx8N.js";
import { B as BookingStatusBadge, S as Skeleton } from "./skeleton-BV3TSusV.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-B6QbTDSP.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-Cry4MRH-.js";
import { L as Label } from "./label-Bc9ofaOv.js";
import { T as Textarea } from "./textarea-pZmFStuI.js";
import { u as useAllBookings, a as useApproveBooking, b as useRejectBooking } from "./useBookings-EOpY9-Wm.js";
import { f as formatDateKeyShort, a as formatTimeRange, b as formatCount } from "./format-BzmDTGRL.js";
import { C as Check } from "./check-Ciux9whH.js";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const FILTERS = [
  { value: "semua", label: "Semua" },
  { value: BookingStatus.menunggu, label: "Menunggu" },
  { value: BookingStatus.disetujui, label: "Disetujui" },
  { value: BookingStatus.ditolak, label: "Ditolak" },
  { value: BookingStatus.dibatalkan, label: "Dibatalkan" }
];
function shortPrincipal(principal) {
  const text = principal.toText();
  return text.length > 12 ? `${text.slice(0, 5)}…${text.slice(-4)}` : text;
}
function TableSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 p-5", "data-ocid": "admin_bookings.loading_state", children: Array.from({ length: 5 }, (_, i) => `booking-skeleton-${i}`).map(
    (id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "ml-auto h-8 w-32" })
    ] }, id)
  ) });
}
function AdminBookingsPage() {
  const { data: bookings, isLoading } = useAllBookings();
  const approve = useApproveBooking();
  const reject = useRejectBooking();
  const [filter, setFilter] = reactExports.useState("semua");
  const [rejectTarget, setRejectTarget] = reactExports.useState(null);
  const [reason, setReason] = reactExports.useState("");
  const [reasonError, setReasonError] = reactExports.useState(false);
  const rows = reactExports.useMemo(() => {
    const list = (bookings ?? []).slice();
    list.sort((a, b) => Number(b.createdAt - a.createdAt));
    if (filter === "semua") return list;
    return list.filter((booking) => booking.status === filter);
  }, [bookings, filter]);
  const pendingCount = (bookings ?? []).filter(
    (booking) => booking.status === BookingStatus.menunggu
  ).length;
  function handleApprove(booking) {
    approve.mutate(booking.id, {
      onSuccess: () => ue.success("Pemesanan disetujui."),
      onError: () => ue.error("Gagal menyetujui pemesanan.")
    });
  }
  function openReject(booking) {
    setRejectTarget(booking);
    setReason("");
    setReasonError(false);
  }
  function closeReject() {
    setRejectTarget(null);
    setReason("");
    setReasonError(false);
  }
  function submitReject() {
    if (!rejectTarget) return;
    const trimmed = reason.trim();
    if (!trimmed) {
      setReasonError(true);
      return;
    }
    const target = rejectTarget;
    reject.mutate(
      { bookingId: target.id, reason: trimmed },
      {
        onSuccess: () => {
          ue.success("Pemesanan ditolak.");
          closeReject();
        },
        onError: () => ue.error("Gagal menolak pemesanan.")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin_bookings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold tracking-tight", children: "Kelola Pemesanan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tinjau seluruh pengajuan pemesanan aula, lalu setujui atau tolak dengan alasan yang jelas." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-wrap items-center gap-2",
        "aria-label": "Filter status pemesanan",
        "data-ocid": "admin_bookings.filter.tab",
        children: FILTERS.map((item) => {
          const active = filter === item.value;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              variant: active ? "default" : "outline",
              onClick: () => setFilter(item.value),
              "aria-pressed": active,
              "data-ocid": `admin_bookings.filter.${item.value}`,
              className: "rounded-full",
              children: [
                item.label,
                item.value === "menunggu" && pendingCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "ml-1.5 rounded-full px-1.5 text-xs font-semibold",
                      active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-warning/15 text-warning"
                    ),
                    children: pendingCount
                  }
                ) : null
              ]
            },
            item.value
          );
        })
      }
    ),
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
          "Daftar Pengajuan"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
          rows.length,
          " pemesanan ditampilkan",
          filter !== "semua" ? ` dengan status ${BOOKING_STATUS_LABELS[filter].toLowerCase()}` : "",
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, {}) : rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-2 px-5 py-12 text-center",
          "data-ocid": "admin_bookings.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-5 w-5", "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Tidak ada pemesanan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: "Belum ada pengajuan yang cocok dengan filter ini." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "admin_bookings.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[180px]", children: "Aula" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[120px]", children: "Tanggal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[130px]", children: "Waktu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[160px]", children: "Kegiatan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Peserta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[120px]", children: "Pemohon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[120px]", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[170px] text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: rows.map((booking, index) => {
          var _a;
          const isPending = booking.status === BookingStatus.menunggu;
          const approving = approve.isPending && ((_a = approve.variables) == null ? void 0 : _a.toString()) === booking.id.toString();
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              "data-ocid": `admin_bookings.row.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: booking.hallName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: formatDateKeyShort(booking.date) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap text-muted-foreground", children: formatTimeRange(
                  booking.startMinute,
                  booking.endMinute
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: booking.activityName }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums", children: formatCount(booking.participantCount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-muted-foreground", children: shortPrincipal(booking.user) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "outline",
                      className: "gap-1.5 border-success/30 text-success hover:bg-success/10 hover:text-success",
                      disabled: approving,
                      onClick: () => handleApprove(booking),
                      "data-ocid": `admin_bookings.approve_button.${index + 1}`,
                      children: [
                        approving ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          LoaderCircle,
                          {
                            className: "h-4 w-4 animate-spin",
                            "aria-hidden": "true"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Check,
                          {
                            className: "h-4 w-4",
                            "aria-hidden": "true"
                          }
                        ),
                        "Setujui"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "outline",
                      className: "gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive",
                      onClick: () => openReject(booking),
                      "data-ocid": `admin_bookings.reject_button.${index + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4", "aria-hidden": "true" }),
                        "Tolak"
                      ]
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-right text-xs text-muted-foreground", children: booking.status === BookingStatus.ditolak && booking.rejectionReason ? `Alasan: ${booking.rejectionReason}` : "Tidak ada aksi" }) })
              ]
            },
            booking.id.toString()
          );
        }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: rejectTarget !== null,
        onOpenChange: (open) => {
          if (!open) closeReject();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin_bookings.reject_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Tolak Pemesanan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "Berikan alasan penolakan untuk",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: rejectTarget == null ? void 0 : rejectTarget.activityName }),
              " ",
              "di ",
              rejectTarget == null ? void 0 : rejectTarget.hallName,
              ". Alasan ini akan terlihat oleh pemohon."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reject-reason", children: "Alasan penolakan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "reject-reason",
                value: reason,
                onChange: (event) => {
                  setReason(event.target.value);
                  if (reasonError) setReasonError(false);
                },
                placeholder: "Contoh: Aula sudah digunakan untuk kegiatan lain pada waktu tersebut.",
                rows: 4,
                "aria-invalid": reasonError,
                "aria-describedby": reasonError ? "reject-reason-error" : void 0,
                "data-ocid": "admin_bookings.reject_reason_textarea"
              }
            ),
            reasonError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                id: "reject-reason-error",
                className: "text-sm text-destructive",
                "data-ocid": "admin_bookings.reject_reason_error",
                children: "Alasan penolakan wajib diisi."
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: closeReject,
                disabled: reject.isPending,
                "data-ocid": "admin_bookings.reject_cancel_button",
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "destructive",
                onClick: submitReject,
                disabled: reject.isPending || reason.trim().length === 0,
                "data-ocid": "admin_bookings.reject_confirm_button",
                children: [
                  reject.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    LoaderCircle,
                    {
                      className: "mr-1.5 h-4 w-4 animate-spin",
                      "aria-hidden": "true"
                    }
                  ) : null,
                  "Tolak Pemesanan"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminBookingsPage as default
};
