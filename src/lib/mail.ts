import { env } from "~/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: `2FA Sign-In Code: ${token}`,
    html: `<p>Your 2FA login code is: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${env.NEXT_PUBLIC_SERVER_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendVerificationToken = async (email: string, token: string) => {
  const confirmLink = `${env.NEXT_PUBLIC_SERVER_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `Please click <a href="${confirmLink}">Here</a> to confirm your email.`,
  });
};
