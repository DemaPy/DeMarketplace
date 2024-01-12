import { AuthForm } from "../lib/validators/account-credentials";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createUser: publicProcedure
    .input(AuthForm)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const payload = await getPayloadClient();
      // check if user exist
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) {
        throw new TRPCError({ code: "CONFLICT" })
      }

      await payload.create({
        collection: "users",
        data: {
            email,
            password,
            role: "user"
        }
      })


      return {success: true, sentToEmail: email}
    }),
});
