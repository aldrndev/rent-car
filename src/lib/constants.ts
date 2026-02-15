/** Application-wide constants */

export const APP_NAME = "RentaGo";
export const APP_DESCRIPTION =
  "Sewa mobil & motor mudah, cepat, dan terpercaya";

export const VEHICLE_TYPES = ["car", "motorcycle"] as const;
export type VehicleType = (typeof VEHICLE_TYPES)[number];

export const TRANSMISSION_TYPES = ["manual", "automatic"] as const;
export type TransmissionType = (typeof TRANSMISSION_TYPES)[number];

export const BOOKING_STATUSES = [
  "pending",
  "awaiting_payment",
  "paid",
  "confirmed",
  "active",
  "completed",
  "cancelled",
] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const PAYMENT_STATUSES = [
  "pending",
  "settlement",
  "expire",
  "cancel",
  "deny",
  "refund",
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const USER_ROLES = ["customer", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const LOCALES = ["id", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "id";
