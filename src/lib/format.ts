/**
 * Format a number as Indonesian Rupiah.
 *
 * @param amount - The number to format
 * @returns Formatted currency string (e.g., "Rp 100.000")
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number with dot separators (e.g. 350.000).
 *
 * @param amount - The number to format
 * @returns Formatted number string
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("id-ID").format(amount);
}
