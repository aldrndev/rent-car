import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export const registerSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(128, "Password maksimal 128 karakter"),
  full_name: z.string().min(1, "Nama lengkap wajib diisi"),
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .regex(/^[0-9+]+$/, "Nomor telepon tidak valid")
    .optional()
    .or(z.literal("")),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
