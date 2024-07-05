import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getUserBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          slug: input.slug,
        },
        include: {
          prompts: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found in db",
        });
      }

      return user;
    }),
});
