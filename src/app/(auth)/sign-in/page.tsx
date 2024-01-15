"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth, AuthForm } from "@/lib/validators/account-credentials";
import { trpc } from "@/trpc/client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const params = useSearchParams();
  const router = useRouter();
  const isSeller = params.get("as") === "seller";
  const origin = params.get("origin");

  const asSeller = () => {
    router.push("?as=seller");
  };

  const asBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(AuthForm),
  });

  const { mutate: signIn, isLoading } = trpc.auth.loginUser.useMutation({
    onSuccess: () => {
      toast.success("Signed in succesfully.");

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
      }

      if (isSeller) {
        router.push(`/sell`);
        return;
      }

      router.push("/");
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password");
      }
    },
  });

  const onSubmit = ({ email, password }: Auth) => {
    signIn({ email, password });
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />

          <h1 className="text-2xl font-bold">Log in into account</h1>

          <Link
            href={"/sign-up"}
            className={buttonVariants({ variant: "link" })}
          >
            Don&apos;t have an account? Sign-up
          </Link>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-2 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  className={cn({
                    "focus-visible:ring-red-500": errors.email,
                  })}
                  placeholder="enter email"
                />
              </div>
              <div className="grid gap-2 py-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  {...register("password")}
                  id="password"
                  className={cn({
                    "focus-visible:ring-red-500": errors.password,
                  })}
                  placeholder="enter password"
                />
              </div>

              <Button>Sign in</Button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {!isSeller ? (
            <Button
              disabled={isLoading}
              variant={"secondary"}
              onClick={asSeller}
            >
              Continue as seller
            </Button>
          ) : (
            <Button
              variant={"secondary"}
              disabled={isLoading}
              onClick={asBuyer}
            >
              Continue as customer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
