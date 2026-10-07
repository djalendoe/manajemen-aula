import { d as createLucideIcon, j as jsxRuntimeExports, a1 as Slot, c as cn, a2 as cva, b as BOOKING_STATUS_LABELS, a3 as HALL_AVAILABILITY_LABELS } from "./index-sQ-lDx8N.js";
import { e as CircleCheck } from "./card-B6QbTDSP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]
];
const Ban = createLucideIcon("ban", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
];
const CircleDot = createLucideIcon("circle-dot", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const TONE_CLASSES = {
  success: "border-success/25 bg-success/12 text-success hover:bg-success/12",
  warning: "border-warning/30 bg-warning/15 text-warning hover:bg-warning/15",
  destructive: "border-destructive/25 bg-destructive/12 text-destructive hover:bg-destructive/12",
  muted: "border-border bg-muted text-muted-foreground hover:bg-muted",
  info: "border-info/25 bg-info/12 text-info hover:bg-info/12"
};
const BOOKING_TONES = {
  menunggu: "warning",
  disetujui: "success",
  ditolak: "destructive",
  dibatalkan: "muted"
};
const BOOKING_ICONS = {
  menunggu: Clock,
  disetujui: CircleCheck,
  ditolak: CircleX,
  dibatalkan: Ban
};
function BookingStatusBadge({
  status,
  className
}) {
  const Icon = BOOKING_ICONS[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: cn(
        "gap-1.5 rounded-full px-2.5 py-0.5 font-medium",
        TONE_CLASSES[BOOKING_TONES[status]],
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
        BOOKING_STATUS_LABELS[status]
      ]
    }
  );
}
function HallAvailabilityBadge({
  status,
  className
}) {
  const available = status === "available";
  const Icon = available ? CircleCheck : CircleDot;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: cn(
        "gap-1.5 rounded-full px-2.5 py-0.5 font-medium",
        TONE_CLASSES[available ? "success" : "warning"],
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
        HALL_AVAILABILITY_LABELS[status]
      ]
    }
  );
}
function ActiveBadge({ active, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: cn(
        "gap-1.5 rounded-full px-2.5 py-0.5 font-medium",
        TONE_CLASSES[active ? "success" : "muted"],
        className
      ),
      children: active ? "Aktif" : "Nonaktif"
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
export {
  ActiveBadge as A,
  BookingStatusBadge as B,
  Clock as C,
  HallAvailabilityBadge as H,
  Skeleton as S,
  CircleX as a
};
