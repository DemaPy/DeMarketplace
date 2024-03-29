"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCartIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";

type Props = {};

const Cart = (props: Props) => {
  const { items } = useCart();
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fee = 1;
  const cartTotal = items.reduce((total, { product }) => {
    return total + product.price;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCartIcon
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isMounted && items.length}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-4 sm:max-w-lg">
        <SheetHeader className="space-y-2">
          <SheetTitle>Cart {isMounted && items.length}</SheetTitle>
        </SheetHeader>
        {isMounted && items.length > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map((item) => (
                  <CartItem key={item.product.id} product={item.product} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4">
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Link
                    href={"/cart"}
                    className={buttonVariants({ className: "w-full" })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetClose>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                fill
                src={"/hippo-empty-cart.png"}
                alt="Empty cart image"
              />
            </div>
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href={"/products"}
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
