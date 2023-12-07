import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const workspaceRouter = createTRPCRouter({
  createWorkspace: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      return await ctx.db.workspace.create({
        data: {
          name,
          userId: ctx.session.user.id,
        },
      });
    }),
});
