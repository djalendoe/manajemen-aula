/**
 * Re-export the app's page components under stable named exports so tests can
 * import them without reaching into default exports. These are the production
 * components; nothing here is a test double.
 */
export { default as CatalogPage } from "@/pages/CatalogPage";
export { default as HallDetailPage } from "@/pages/HallDetailPage";
export { default as SchedulePage } from "@/pages/SchedulePage";
export { default as BookingFormPage } from "@/pages/BookingFormPage";
export { default as MyBookingsPage } from "@/pages/MyBookingsPage";
export { default as LoginPage } from "@/pages/LoginPage";
export { default as AdminDashboardPage } from "@/pages/AdminDashboardPage";
export { default as AdminBookingsPage } from "@/pages/AdminBookingsPage";
export { default as AdminHallsPage } from "@/pages/AdminHallsPage";
