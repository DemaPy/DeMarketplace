"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const VerifyEmail = ({ token }: { token: string }) => {
  const { data, isLoading, isError } = trpc.verifyEmail.useQuery({ token });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-400" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-muted-foreground text-sm text-center">
          This token is not valid. Please, try again.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
        <h3 className="font-semibold text-xl">Verifying email...</h3>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" fill alt="Email sent" />
        </div>

        <h3 className="font-semibold text-2xl">You are all set!</h3>

        <Link
          href={"/sign-in"}
          className={buttonVariants({ variant: "ghost", className: "mt-4" })}
        ></Link>
      </div>
    );
  }
};

export default VerifyEmail;
