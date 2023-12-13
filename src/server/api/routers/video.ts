import { z } from "zod";
import ytdl from "ytdl-core";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const videoRouter = createTRPCRouter({
  getInfo: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      if (!ytdl.validateURL(input.url)) {
        throw new Error("URL youtube tidak valid!");
      }

      const videoInfo: ytdl.videoInfo = await ytdl.getInfo(input.url);

      return {
        videoInfo,
      };
    }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
