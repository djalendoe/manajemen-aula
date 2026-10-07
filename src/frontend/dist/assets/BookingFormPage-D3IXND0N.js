import { d as createLucideIcon, i as useInternetIdentity, k as useSearch, r as reactExports, j as jsxRuntimeExports, l as LogIn, a as Button, f as Link } from "./index-sQ-lDx8N.js";
import { e as CircleCheck, C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-B6QbTDSP.js";
import { I as Input } from "./input-yowfS0Rr.js";
import { L as Label } from "./label-Bc9ofaOv.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-LO67ftk1.js";
import { T as Textarea } from "./textarea-pZmFStuI.js";
import { d as useCreateBooking } from "./useBookings-EOpY9-Wm.js";
import { u as useHalls } from "./useHalls-CqUzUz3_.js";
import { d as dateKeyToInputValue, t as todayDateKey, i as inputValueToDateKey, c as inputValueToMinuteOfDay, e as formatDateKeyLong, a as formatTimeRange } from "./format-BzmDTGRL.js";
import { C as CircleAlert } from "./circle-alert-C5xDfQQN.js";
import { C as CalendarPlus } from "./calendar-plus-DD7e3toa.js";
import "./check-Ciux9whH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function bookingErrorMessage(error) {
  switch (error.__kind__) {
    case "conflict":
      return "Jadwal bentrok: aula ini sudah dipesan dan disetujui pada rentang waktu tersebut. Silakan pilih jam atau aula lain.";
    case "invalidTimeRange":
      return "Jam selesai harus lebih besar daripada jam mulai.";
    case "invalidDate":
      return "Tanggal yang dipilih tidak valid. Pilih tanggal hari ini atau setelahnya.";
    case "hallNotFound":
      return "Aula yang dipilih tidak ditemukan. Muat ulang halaman dan coba lagi.";
    case "hallInactive":
      return "Aula ini sedang tidak aktif dan tidak menerima pemesanan baru.";
    case "notAuthorized":
      return "Anda harus masuk terlebih dahulu untuk mengajukan pemesanan.";
    case "notOwner":
      return "Anda tidak memiliki akses untuk pemesanan ini.";
    case "invalidStatus":
      return "Status pemesanan tidak mengizinkan tindakan ini.";
    case "bookingNotFound":
      return "Pemesanan tidak ditemukan.";
    default:
      return "Pengajuan pemesanan gagal. Silakan periksa data dan coba lagi.";
  }
}
function BookingFormPage() {
  var _a;
  const { isAuthenticated, isInitializing, login } = useInternetIdentity();
  const search = useSearch({ strict: false });
  const { data: halls, isLoading: hallsLoading } = useHalls({
    facilities: []
  });
  const createBooking = useCreateBooking();
  const [hallId, setHallId] = reactExports.useState(() => {
    if (!search.hallId) return null;
    try {
      return BigInt(search.hallId);
    } catch {
      return null;
    }
  });
  const [dateValue, setDateValue] = reactExports.useState(
    () => search.date ? search.date : dateKeyToInputValue(todayDateKey())
  );
  const [startValue, setStartValue] = reactExports.useState("08:00");
  const [endValue, setEndValue] = reactExports.useState("10:00");
  const [activityName, setActivityName] = reactExports.useState("");
  const [participantValue, setParticipantValue] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [formError, setFormError] = reactExports.useState(null);
  const [successMessage, setSuccessMessage] = reactExports.useState(null);
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex min-h-[50vh] items-center justify-center",
        "data-ocid": "booking.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Memuat sesi…" })
      }
    );
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "booking.auth_required_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-6 w-6", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold", children: "Masuk untuk mengajukan pemesanan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Anda perlu masuk dengan Internet Identity sebelum dapat mengajukan pemesanan aula." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: () => login(),
                className: "gap-2",
                "data-ocid": "booking.login_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4", "aria-hidden": "true" }),
                  "Masuk"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                type: "button",
                variant: "outline",
                "data-ocid": "booking.back_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jadwal", children: "Lihat Jadwal" })
              }
            )
          ] })
        ]
      }
    );
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    if (hallId === null) {
      setFormError("Pilih aula yang ingin dipesan.");
      return;
    }
    const date = inputValueToDateKey(dateValue);
    if (date === null) {
      setFormError("Pilih tanggal pemesanan yang valid.");
      return;
    }
    const startMinute2 = inputValueToMinuteOfDay(startValue);
    const endMinute2 = inputValueToMinuteOfDay(endValue);
    if (startMinute2 === null || endMinute2 === null) {
      setFormError("Isi jam mulai dan jam selesai.");
      return;
    }
    if (endMinute2 <= startMinute2) {
      setFormError("Jam selesai harus lebih besar daripada jam mulai.");
      return;
    }
    const trimmedName = activityName.trim();
    if (trimmedName.length === 0) {
      setFormError("Nama kegiatan wajib diisi.");
      return;
    }
    const participants = Number.parseInt(participantValue, 10);
    if (!Number.isFinite(participants) || participants <= 0) {
      setFormError("Jumlah peserta harus berupa angka lebih dari nol.");
      return;
    }
    const input = {
      hallId,
      date,
      startMinute: startMinute2,
      endMinute: endMinute2,
      activityName: trimmedName,
      participantCount: BigInt(participants),
      notes: notes.trim()
    };
    createBooking.mutate(input, {
      onSuccess: (result) => {
        if (result.__kind__ === "ok") {
          setSuccessMessage(
            `Pengajuan "${trimmedName}" berhasil dikirim dan berstatus menunggu persetujuan.`
          );
          setActivityName("");
          setParticipantValue("");
          setNotes("");
        } else {
          setFormError(bookingErrorMessage(result.err));
        }
      },
      onError: () => {
        setFormError(
          "Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi."
        );
      }
    });
  };
  const selectedHall = (_a = halls == null ? void 0 : halls.find((entry) => entry.hall.id === hallId)) == null ? void 0 : _a.hall;
  const dateKey = inputValueToDateKey(dateValue);
  const startMinute = inputValueToMinuteOfDay(startValue);
  const endMinute = inputValueToMinuteOfDay(endValue);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto flex max-w-3xl flex-col gap-6",
      "data-ocid": "booking.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold tracking-tight sm:text-3xl", children: "Ajukan Pemesanan Aula" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-sm text-muted-foreground", children: "Lengkapi detail kegiatan. Pengajuan akan berstatus menunggu hingga disetujui oleh admin." })
        ] }),
        successMessage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 rounded-lg border border-success/25 bg-success/10 p-4",
            "data-ocid": "booking.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheck,
                {
                  className: "mt-0.5 h-5 w-5 shrink-0 text-success",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: successMessage }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/pemesanan-saya",
                    className: "text-sm font-medium text-primary underline-offset-4 hover:underline",
                    "data-ocid": "booking.my_bookings_link",
                    children: "Lihat pemesanan saya"
                  }
                )
              ] })
            ]
          }
        ) : null,
        formError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 rounded-lg border border-destructive/25 bg-destructive/10 p-4",
            "data-ocid": "booking.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleAlert,
                {
                  className: "mt-0.5 h-5 w-5 shrink-0 text-destructive",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: formError })
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Detail Pemesanan" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "booking-hall", children: "Aula" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: hallId === null ? "" : hallId.toString(),
                  onValueChange: (value) => setHallId(BigInt(value)),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "booking-hall",
                        className: "w-full",
                        "data-ocid": "booking.hall_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih aula" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: halls == null ? void 0 : halls.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                    )) })
                  ]
                }
              ),
              hallsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Memuat daftar aula…" }) : null,
              selectedHall ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Kapasitas ",
                selectedHall.capacity.toString(),
                " orang ·",
                " ",
                selectedHall.location
              ] }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "booking-date", children: "Tanggal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "booking-date",
                  type: "date",
                  value: dateValue,
                  onChange: (event) => setDateValue(event.target.value),
                  "data-ocid": "booking.date_input"
                }
              ),
              dateKey !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDateKeyLong(dateKey) }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "booking-start", children: "Jam Mulai" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "booking-start",
                    type: "time",
                    value: startValue,
                    onChange: (event) => setStartValue(event.target.value),
                    "data-ocid": "booking.start_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "booking-end", children: "Jam Selesai" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "booking-end",
                    type: "time",
                    value: endValue,
                    onChange: (event) => setEndValue(event.target.value),
                    "data-ocid": "booking.end_input"
                  }
                )
              ] })
            ] }),
            startMinute !== null && endMinute !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "-mt-2 text-xs text-muted-foreground", children: [
              "Rentang waktu: ",
              formatTimeRange(startMinute, endMinute)
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "booking-activity", children: "Nama Kegiatan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "booking-activity",
                  value: activityName,
                  onChange: (event) => setActivityName(event.target.value),
                  placeholder: "Contoh: Rapat Koordinasi Divisi",
                  "data-ocid": "booking.activity_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "booking-participants", children: "Jumlah Peserta" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "booking-participants",
                  type: "number",
                  min: 1,
                  inputMode: "numeric",
                  value: participantValue,
                  onChange: (event) => setParticipantValue(event.target.value),
                  placeholder: "Contoh: 40",
                  "data-ocid": "booking.participants_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "booking-notes", children: "Catatan (opsional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "booking-notes",
                  value: notes,
                  onChange: (event) => setNotes(event.target.value),
                  placeholder: "Kebutuhan tambahan, susunan acara, atau informasi lain.",
                  rows: 3,
                  "data-ocid": "booking.notes_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  type: "button",
                  variant: "outline",
                  "data-ocid": "booking.cancel_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jadwal", children: "Batal" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  disabled: createBooking.isPending,
                  className: "gap-2",
                  "data-ocid": "booking.submit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4", "aria-hidden": "true" }),
                    createBooking.isPending ? "Mengirim…" : "Kirim Pengajuan"
                  ]
                }
              )
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
          "Pengajuan yang bentrok dengan pemesanan disetujui akan ditolak otomatis oleh sistem."
        ] })
      ]
    }
  );
}
export {
  BookingFormPage as default
};
