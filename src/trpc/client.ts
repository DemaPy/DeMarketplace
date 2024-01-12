import { createTRPCReact } from "@trpc/react-query";
import { appRouter } from "./app";

export const trpc = createTRPCReact<typeof appRouter>({});
