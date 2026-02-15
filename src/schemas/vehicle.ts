import { z } from "zod";

export const vehicleSchema = z.object({
  name: z.string().min(1, "Nama kendaraan wajib diisi"),
  type: z.enum(["car", "motorcycle"]),
  brand: z.string().min(1, "Merek wajib diisi"),
  model: z.string().min(1, "Model wajib diisi"),
  year: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  price_per_day: z.number().int().positive("Harga harus lebih dari 0"),
  description: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
  images: z.array(z.string().url()).default([]),
  is_available: z.boolean().default(true),
  features: z.array(z.string()).default([]),
  transmission: z.enum(["manual", "automatic"]),
  seats: z.number().int().positive().nullable().optional(),
  engine_cc: z.number().int().positive().nullable().optional(),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
