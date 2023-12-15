import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const foldersRouter = createTRPCRouter({
  createFolder: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        workspaceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, workspaceId } = input;

      return await ctx.db.folder.create({
        data: {
          name,
          workspaceId,
          userId: ctx.session.user.id,
        },
      });
    }),
  retreiveFolders: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { workspaceId } = input;

      if (!workspaceId) throw { data: "Workspace Id is required" };

      return await ctx.db.folder.findMany({
        where: {
          workspaceId,
          userId: ctx.session.user.id,
        },
      });
    }),
});
