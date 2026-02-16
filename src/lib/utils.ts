import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes conditionally.
 * Combines `clsx` for conditional logic and `tailwind-merge` to resolve conflicts.
 *
 * @param inputs - Class names or conditional class objects.
 * @returns Merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as Indonesian Rupiah (IDR).
 *
 * @param amount - The numeric amount to format.
 * @returns Formatted currency string (e.g., "Rp 150.000").
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generates a human-readable order ID (e.g., ORD-ABC123XYZ).
 *
 * @returns Unique order ID string starting with "ORD-".
 */
export function generateOrderId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "ORD-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Formats a date string or Date object into a localized string.
 *
 * @param date - The date to format.
 * @param locale - The locale to use (default: "id-ID").
 * @returns Formatted date string (e.g., "1 Januari 2024").
 */
export function formatDate(date: Date | string, locale = "id-ID"): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
