import { d as createLucideIcon, i as useInternetIdentity, n as useCallerRole, j as jsxRuntimeExports, o as Sparkles, S as Separator, a as Button, f as Link, p as CalendarDays, q as LogOut, l as LogIn, U as USER_ROLE_LABELS, s as ShieldCheck, c as cn } from "./index-sQ-lDx8N.js";
import { C as Card, d as CardContent, e as CircleCheck } from "./card-B6QbTDSP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
];
const Fingerprint = createLucideIcon("fingerprint", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
];
const UserRound = createLucideIcon("user-round", __iconNode);
function RoleBadge({ role }) {
  const isAdmin = role === "admin";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        isAdmin ? "border-primary/25 bg-primary/12 text-primary" : "border-border bg-muted text-muted-foreground"
      ),
      "data-ocid": "login.role_badge",
      children: [
        isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
        USER_ROLE_LABELS[role]
      ]
    }
  );
}
function LoginPage() {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    login,
    clear
  } = useInternetIdentity();
  const { data: role, isLoading: roleLoading } = useCallerRole();
  const principal = (identity == null ? void 0 : identity.getPrincipal().toText()) ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto flex max-w-2xl flex-col gap-6 py-8",
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col items-center gap-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-7 w-7", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold tracking-tight sm:text-3xl", children: "Masuk ke AulaKu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-sm text-muted-foreground", children: "Gunakan Internet Identity untuk mengakses pemesanan aula dan melihat status pengajuan Anda." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex flex-col gap-5 pt-6", children: isInitializing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-col items-center gap-2 py-8 text-center",
            "data-ocid": "login.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Memeriksa sesi…" })
          }
        ) : isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col gap-5",
            "data-ocid": "login.signed_in_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-success/12 text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6", "aria-hidden": "true" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold", children: "Anda sudah masuk" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sesi aktif dengan Internet Identity." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Peran" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: roleLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Memuat peran…" }) : role ? /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Tidak diketahui" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Principal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "code",
                    {
                      className: "block break-all rounded-lg bg-muted px-3 py-2 font-mono text-xs text-foreground",
                      "data-ocid": "login.principal_text",
                      children: principal ?? "Tidak tersedia"
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    type: "button",
                    className: "gap-2",
                    "data-ocid": "login.my_bookings_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pemesanan-saya", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4", "aria-hidden": "true" }),
                      "Pemesanan Saya"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => clear(),
                    className: "gap-2",
                    "data-ocid": "login.logout_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4", "aria-hidden": "true" }),
                      "Keluar"
                    ]
                  }
                )
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg bg-muted/60 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Fingerprint,
              {
                className: "mt-0.5 h-5 w-5 shrink-0 text-primary",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Internet Identity adalah cara masuk yang aman tanpa kata sandi. Identitas Anda hanya digunakan untuk mengelola pemesanan aula." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: () => login(),
              disabled: isLoggingIn,
              className: "gap-2",
              "data-ocid": "login.submit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4", "aria-hidden": "true" }),
                isLoggingIn ? "Menghubungkan…" : "Masuk dengan Internet Identity"
              ]
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Dengan masuk, Anda menyetujui penggunaan identitas untuk keperluan pemesanan aula di sistem ini." })
      ]
    }
  );
}
export {
  LoginPage as default
};
