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
  confirm: z.boolean({
    message: "You need to accept the terms and conditions",
  }),
});

export const promptSchema = z.object({
  question: z.string(),
  category: z.string(),
  answer: z.string(),
});

export const interestSchema = z.object({
  interest: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
