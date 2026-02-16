import { z } from "zod";

export const vehicleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["car", "motorcycle"]),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  price_per_day: z.coerce.number().min(0, "Price must be positive"),
  description: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
  is_available: z.boolean().default(true),
  transmission: z.enum(["manual", "automatic"]),
  seats: z.coerce.number().optional(),
  engine_cc: z.coerce.number().optional(),
  features: z.array(z.string()).default([]),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
