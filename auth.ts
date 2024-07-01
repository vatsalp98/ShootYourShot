import authConfig from "auth.config";
import NextAuth from "next-auth";
import { db } from "~/server/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Gender } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await db.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique(
          {
            where: {
              userId: existingUser.id,
            },
          },
        );

        if (!twoFactorConfirmation) return false;

        // Delete 2fa Confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.name && session.user) {
        session.user.avatar = token.avatar as string;
        session.user.gender = token.gender as Gender;
        session.user.lookingFor = token.lookingFor as Gender;
        session.user.name = token.name;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.slug = token.slug as string;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!existingUser) return token;

      token.gender = existingUser.gender;
      token.avatar = existingUser.avatar;
      token.name = existingUser.name;
      token.lookingFor = existingUser.lookingFor;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.slug = existingUser.slug;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
