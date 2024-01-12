import { z } from "zod";

export const AuthForm = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export type Auth = z.infer<typeof AuthForm>;
