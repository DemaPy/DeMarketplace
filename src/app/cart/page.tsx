"use client";

import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/useCart";
import { cn, formatPrice } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type TCart = {};

const Page = ({}: TCart) => {
  const { items, removeItem } = useCart();

  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                isMounted && items.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div className="relative mb-4 h-40 w-40 text-muted-foreground">
                  <Image
                    src={"/hippo-empty-cart.png"}
                    fill
                    loading="eager"
                    alt="empty shopping cart"
                  />
                </div>
                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Nothing to show here yet.
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200":
                  isMounted && items.length > 0,
              })}
            >
              {isMounted &&
                items.map(({ product }) => {
                  const label = PRODUCT_CATEGORIES.find(
                    ({ value }) => value === product.category
                  )?.label;

                  const { image } = product.images[0];
                  return (
                    <li key={product.id} className="py-6 flex">
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24">
                          {typeof image !== "string" && image.url ? (
                            <Image
                              fill
                              src={image.url}
                              alt="product image"
                              className="h-full w-full rounded-md object-cover object-center sm:h-48 w:w-48"
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  className="font-medium text-gray-700"
                                  href={`/product/${product.id}`}
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">
                                Category: {label}
                              </p>
                            </div>

                            <p className="mt-2 text-sm font-medium text-gray-900">
                              {formatPrice(product.price)}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-2 max-w-20">
                            <div className="absolute r-0 t-0">
                              <Button
                                aria-label="remove product"
                                onClick={() => removeItem(product.id)}
                                variant={"ghost"}
                              >
                                <X className="w-4 h-4 pr-2" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                          <span>Eligible for instant delivery</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
