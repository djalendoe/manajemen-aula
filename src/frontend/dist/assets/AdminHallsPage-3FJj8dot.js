import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Button, e as Building2, F as FACILITY_OPTIONS, c as cn, L as LoaderCircle, u as ue } from "./index-sQ-lDx8N.js";
import { A as ActiveBadge, S as Skeleton } from "./skeleton-BV3TSusV.js";
import { C as Card, d as CardContent } from "./card-B6QbTDSP.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-Cry4MRH-.js";
import { I as Input } from "./input-yowfS0Rr.js";
import { L as Label } from "./label-Bc9ofaOv.js";
import { T as Textarea } from "./textarea-pZmFStuI.js";
import { u as useHalls, a as useCreateHall, b as useUpdateHall, c as useDeactivateHall } from "./useHalls-CqUzUz3_.js";
import { b as formatCount } from "./format-BzmDTGRL.js";
import { U as Users, M as MapPin } from "./users-CKbytPXo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83", key: "1bzlo9" }],
  ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21", key: "1q0aeu" }],
  ["line", { x1: "18", x2: "21", y1: "12", y2: "15", key: "5mozeu" }],
  [
    "path",
    {
      d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
      key: "mmje98"
    }
  ],
  ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9", key: "43el77" }]
];
const ImageOff = createLucideIcon("image-off", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
];
const Power = createLucideIcon("power", __iconNode);
const EMPTY_FORM = {
  name: "",
  description: "",
  photoUrl: "",
  capacity: "",
  building: "",
  location: "",
  facilities: []
};
function toFormState(hall) {
  return {
    name: hall.name,
    description: hall.description,
    photoUrl: hall.photoUrl,
    capacity: hall.capacity.toString(),
    building: hall.building,
    location: hall.location,
    facilities: [...hall.facilities]
  };
}
function HallThumb({ hall }) {
  const [failed, setFailed] = reactExports.useState(false);
  if (!hall.photoUrl || failed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-24 w-32 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "h-6 w-6", "aria-hidden": "true" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: hall.photoUrl,
      alt: `Foto ${hall.name}`,
      loading: "lazy",
      onError: () => setFailed(true),
      className: "h-24 w-32 shrink-0 rounded-lg border border-border object-cover"
    }
  );
}
function HallsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "admin_halls.loading_state", children: Array.from({ length: 3 }, (_, i) => `hall-skeleton-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-lg border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex gap-4 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-32 rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40 rounded-full" })
    ] })
  ] }) }, id)) });
}
function AdminHallsPage() {
  const { data: halls, isLoading } = useHalls({ facilities: [] });
  const createHall = useCreateHall();
  const updateHall = useUpdateHall();
  const deactivateHall = useDeactivateHall();
  const [formOpen, setFormOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [deactivateTarget, setDeactivateTarget] = reactExports.useState(null);
  const saving = createHall.isPending || updateHall.isPending;
  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setFormOpen(true);
  }
  function openEdit(hall) {
    setEditing(hall);
    setForm(toFormState(hall));
    setErrors({});
    setFormOpen(true);
  }
  function closeForm() {
    setFormOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setErrors({});
  }
  function toggleFacility(value) {
    setForm((current) => ({
      ...current,
      facilities: current.facilities.includes(value) ? current.facilities.filter((item) => item !== value) : [...current.facilities, value]
    }));
  }
  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Nama aula wajib diisi.";
    if (!form.building.trim()) next.building = "Gedung wajib diisi.";
    if (!form.location.trim()) next.location = "Lokasi wajib diisi.";
    const capacity = Number(form.capacity);
    if (!form.capacity.trim() || !Number.isFinite(capacity) || capacity <= 0) {
      next.capacity = "Kapasitas harus berupa angka lebih dari 0.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return null;
    return {
      name: form.name.trim(),
      description: form.description.trim(),
      photoUrl: form.photoUrl.trim(),
      capacity: BigInt(Math.floor(capacity)),
      building: form.building.trim(),
      location: form.location.trim(),
      facilities: form.facilities
    };
  }
  function submitForm() {
    const input = validate();
    if (!input) return;
    if (editing) {
      updateHall.mutate(
        { id: editing.id, input: { ...input, active: editing.active } },
        {
          onSuccess: () => {
            ue.success("Aula berhasil diperbarui.");
            closeForm();
          },
          onError: () => ue.error("Gagal memperbarui aula.")
        }
      );
    } else {
      createHall.mutate(input, {
        onSuccess: () => {
          ue.success("Aula berhasil ditambahkan.");
          closeForm();
        },
        onError: () => ue.error("Gagal menambahkan aula.")
      });
    }
  }
  function confirmDeactivate() {
    if (!deactivateTarget) return;
    const target = deactivateTarget;
    deactivateHall.mutate(target.id, {
      onSuccess: () => {
        ue.success("Aula dinonaktifkan.");
        setDeactivateTarget(null);
      },
      onError: () => ue.error("Gagal menonaktifkan aula.")
    });
  }
  const list = halls ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin_halls.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold tracking-tight", children: "Kelola Aula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tambah, ubah, dan nonaktifkan aula beserta kapasitas dan fasilitasnya." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: openCreate,
          className: "gap-2",
          "data-ocid": "admin_halls.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }),
            "Tambah Aula"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(HallsSkeleton, {}) : list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-lg border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CardContent,
      {
        className: "flex flex-col items-center gap-3 px-5 py-14 text-center",
        "data-ocid": "admin_halls.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-6 w-6", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: "Belum ada aula terdaftar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: "Mulai dengan menambahkan aula pertama beserta kapasitas dan fasilitasnya." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: openCreate,
              className: "mt-1 gap-2",
              "data-ocid": "admin_halls.empty_add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" }),
                "Tambah Aula"
              ]
            }
          )
        ]
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "admin_halls.list", children: list.map(({ hall }, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "rounded-lg border-border shadow-subtle transition-smooth hover:shadow-elevated",
        "data-ocid": `admin_halls.item.${index + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-4 p-5 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HallThumb, { hall }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold tracking-tight", children: hall.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveBadge, { active: hall.active })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-sm text-muted-foreground", children: hall.description || "Belum ada deskripsi." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4", "aria-hidden": "true" }),
                formatCount(hall.capacity),
                " orang"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4", "aria-hidden": "true" }),
                hall.building,
                " · ",
                hall.location
              ] })
            ] }),
            hall.facilities.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap gap-1.5 pt-1", children: hall.facilities.map((facility) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: "rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground",
                children: facility
              },
              facility
            )) }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-start gap-2 sm:flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => openEdit(hall),
                className: "gap-1.5",
                "data-ocid": `admin_halls.edit_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4", "aria-hidden": "true" }),
                  "Ubah"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: !hall.active,
                onClick: () => setDeactivateTarget(hall),
                className: "gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive",
                "data-ocid": `admin_halls.deactivate_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "h-4 w-4", "aria-hidden": "true" }),
                  "Nonaktifkan"
                ]
              }
            )
          ] })
        ] })
      },
      hall.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: formOpen,
        onOpenChange: (open) => {
          if (!open) closeForm();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-h-[90vh] overflow-y-auto sm:max-w-2xl",
            "data-ocid": "admin_halls.form_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Ubah Aula" : "Tambah Aula" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Lengkapi informasi aula. Kolom bertanda bintang wajib diisi." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hall-name", children: "Nama aula *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "hall-name",
                      value: form.name,
                      onChange: (event) => setForm((current) => ({
                        ...current,
                        name: event.target.value
                      })),
                      placeholder: "Contoh: Aula Serbaguna",
                      "aria-invalid": Boolean(errors.name),
                      "data-ocid": "admin_halls.name_input"
                    }
                  ),
                  errors.name ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.name }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hall-description", children: "Deskripsi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "hall-description",
                      value: form.description,
                      onChange: (event) => setForm((current) => ({
                        ...current,
                        description: event.target.value
                      })),
                      placeholder: "Deskripsi singkat mengenai aula dan peruntukannya.",
                      rows: 3,
                      "data-ocid": "admin_halls.description_textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hall-photo", children: "URL foto" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "hall-photo",
                      type: "url",
                      value: form.photoUrl,
                      onChange: (event) => setForm((current) => ({
                        ...current,
                        photoUrl: event.target.value
                      })),
                      placeholder: "https://contoh.com/foto-aula.jpg",
                      "data-ocid": "admin_halls.photo_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hall-capacity", children: "Kapasitas (orang) *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "hall-capacity",
                      type: "number",
                      min: 1,
                      inputMode: "numeric",
                      value: form.capacity,
                      onChange: (event) => setForm((current) => ({
                        ...current,
                        capacity: event.target.value
                      })),
                      placeholder: "Contoh: 200",
                      "aria-invalid": Boolean(errors.capacity),
                      "data-ocid": "admin_halls.capacity_input"
                    }
                  ),
                  errors.capacity ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.capacity }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hall-building", children: "Gedung *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "hall-building",
                      value: form.building,
                      onChange: (event) => setForm((current) => ({
                        ...current,
                        building: event.target.value
                      })),
                      placeholder: "Contoh: Gedung A",
                      "aria-invalid": Boolean(errors.building),
                      "data-ocid": "admin_halls.building_input"
                    }
                  ),
                  errors.building ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.building }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hall-location", children: "Lokasi *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "hall-location",
                      value: form.location,
                      onChange: (event) => setForm((current) => ({
                        ...current,
                        location: event.target.value
                      })),
                      placeholder: "Contoh: Lantai 2, Sayap Timur",
                      "aria-invalid": Boolean(errors.location),
                      "data-ocid": "admin_halls.location_input"
                    }
                  ),
                  errors.location ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.location }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-2 sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-sm font-medium", children: "Fasilitas" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: FACILITY_OPTIONS.map((option) => {
                    const selected = form.facilities.includes(option.value);
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => toggleFacility(option.value),
                        "aria-pressed": selected,
                        "data-ocid": `admin_halls.facility.${option.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
                        className: cn(
                          "rounded-full border px-3 py-1.5 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          selected ? "border-primary bg-primary/12 text-primary" : "border-border bg-background text-muted-foreground hover:bg-muted"
                        ),
                        children: option.label
                      },
                      option.value
                    );
                  }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: closeForm,
                    disabled: saving,
                    "data-ocid": "admin_halls.form_cancel_button",
                    children: "Batal"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    onClick: submitForm,
                    disabled: saving,
                    "data-ocid": "admin_halls.form_submit_button",
                    children: [
                      saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LoaderCircle,
                        {
                          className: "mr-1.5 h-4 w-4 animate-spin",
                          "aria-hidden": "true"
                        }
                      ) : null,
                      editing ? "Simpan Perubahan" : "Tambah Aula"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: deactivateTarget !== null,
        onOpenChange: (open) => {
          if (!open) setDeactivateTarget(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin_halls.deactivate_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nonaktifkan Aula" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "Aula",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: deactivateTarget == null ? void 0 : deactivateTarget.name }),
              " ",
              "tidak akan menerima pemesanan baru. Data dan riwayat pemesanan tetap tersimpan."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setDeactivateTarget(null),
                disabled: deactivateHall.isPending,
                "data-ocid": "admin_halls.deactivate_cancel_button",
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "destructive",
                onClick: confirmDeactivate,
                disabled: deactivateHall.isPending,
                "data-ocid": "admin_halls.deactivate_confirm_button",
                children: [
                  deactivateHall.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    LoaderCircle,
                    {
                      className: "mr-1.5 h-4 w-4 animate-spin",
                      "aria-hidden": "true"
                    }
                  ) : null,
                  "Nonaktifkan"
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
  AdminHallsPage as default
};
