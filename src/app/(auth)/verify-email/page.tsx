import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";
import React from "react";

type Props = {
  searchParams: {
    token: string | string[] | undefined;
    to: string | undefined;
  };
};

const page = ({ searchParams }: Props) => {
  const token = searchParams.token;
  const email = searchParams.to;

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src={"/hippo-email-sent.png"} fill alt="verify email" />
            </div>
            <h3 className="font-semibold text-2xl">Check your email</h3>
            {email ? (
              <p className="text-muted-foreground text-center">
                We have sent a verification email to{" "}
                <span className="font-semibold">{email}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We have sent a verification email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
