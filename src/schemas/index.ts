import { z } from "zod";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z.string(),
  name: z.string(),
  slug: z.string(),
  gender: z.enum(["MALE", "FEMALE", "TRANS", "OTHER"]),
  lookingFor: z.enum(["MALE", "FEMALE", "TRANS", "OTHER"]),
  password: z.string(),
  confirm_password: z.string(),
});
