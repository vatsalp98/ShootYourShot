import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const interestRouter = createTRPCRouter({
  createInterest: privateProcedure
    .input(
      z.object({
        interest: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          interests: input.interest,
        },
      });

      return user;
    }),
});
