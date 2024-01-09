import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

const Wrapper = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-2 md:px-20", className)}
    >
      {children}
    </div>
  );
};

export default Wrapper;
