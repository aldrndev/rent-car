import { z } from "zod";

export const bookingSchema = z.object({
  vehicle_id: z.string().uuid(),
  start_date: z.string().min(1, "Tanggal mulai wajib diisi"),
  end_date: z.string().min(1, "Tanggal selesai wajib diisi"),
  pickup_location: z.string().optional(),
  delivery_location: z.string().optional(),
  notes: z.string().optional(),
  promo_code: z.string().optional(),
});

export const guestBookingSchema = bookingSchema.extend({
  guest_name: z.string().min(1, "Nama wajib diisi"),
  guest_phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .regex(/^[0-9+]+$/, "Nomor telepon tidak valid"),
  guest_email: z.string().email("Email tidak valid"),
});

export const trackBookingSchema = z.object({
  order_id: z
    .string()
    .min(1, "ID pesanan wajib diisi")
    .regex(/^ORD-[A-Z0-9]{6}$/, "Format ID pesanan: ORD-XXXXXX"),
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .regex(/^[0-9+]+$/, "Nomor telepon tidak valid"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type GuestBookingFormData = z.infer<typeof guestBookingSchema>;
export type TrackBookingFormData = z.infer<typeof trackBookingSchema>;
