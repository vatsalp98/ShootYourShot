"use server";

import type { z } from "zod";
import { sendVerificationToken } from "~/lib/mail";
import { generateVerificationToken } from "~/lib/tokens";
import { generatePassword } from "~/lib/utils";
import { registerSchema } from "~/schemas";
import { db } from "~/server/db";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid input fields.",
    };
  }

  const { email, name, password, slug, gender, lookingFor, confirm_password } =
    validatedFields.data;

  if (password != confirm_password) {
    return {
      error: "Passwords do not match.",
    };
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return {
      error: "Email already in use!",
    };
  }

  const userSlug = await db.user.findUnique({
    where: {
      slug,
    },
  });

  if (userSlug) {
    return {
      error: "Slug already in use!",
    };
  }

  const { salt, hash } = generatePassword(password);

  await db.user.create({
    data: {
      email,
      name,
      gender,
      slug,
      lookingFor,
      password: hash,
      salt: salt,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationToken(verificationToken.email, verificationToken.token);

  return {
    success: "Confirmation email sent!",
  };
};
