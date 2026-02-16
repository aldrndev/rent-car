import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email tidak valid" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export const registerSchema = z.object({
  email: z.email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .max(128, { message: "Password maksimal 128 karakter" }),
  full_name: z.string().min(1, { message: "Nama lengkap wajib diisi" }),
  phone: z
    .string()
    .min(10, { message: "Nomor telepon minimal 10 digit" })
    .regex(/^[0-9+]+$/, { message: "Nomor telepon tidak valid" })
    .optional()
    .or(z.literal("")),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
