import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const promptRouter = createTRPCRouter({
  createPrompt: privateProcedure
    .input(
      z.object({
        question: z.string(),
        category: z.string(),
        answer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const prompt = await ctx.db.prompt.create({
        data: {
          question: input.question,
          answer: input.answer,
          category: input.category,
          userId: ctx.user.id,
        },
      });

      return prompt;
    }),
});
