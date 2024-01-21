import { getPayloadClient } from "../get-payload";
import { authRouter } from "./auth";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { QueryValidator } from "../lib/validators/QueryValidator";
import { payment } from "./payment";

export const appRouter = router({
  payment: payment,
  auth: authRouter,
  users: publicProcedure.query(() => {
    return "hello";
  }),
  getProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, cursor } = input;

      const { sort, limit, ...options } = query;

      const payload = await getPayloadClient();

      const parsedQOptions: Record<string, { equals: string }> = {};

      Object.entries(options).forEach(([key, value]) => {
        parsedQOptions[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: products,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQOptions,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        products,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const { token } = input;

      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token: token,
      });

      if (!isVerified) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return { success: true };
    }),
});
