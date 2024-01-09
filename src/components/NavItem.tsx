import React, { useRef } from "react";
import { Button } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useOnClickOutside } from "@/hooks/useOutside";

type Category = (typeof PRODUCT_CATEGORIES)[number];

type Props = {
  isOpen: boolean;
  isAnyOpen: boolean;
  onClick: () => void;
  category: Category;
};

const NavItem = ({ category, isAnyOpen, isOpen, onClick }: Props) => {


  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          onClick={onClick}
          variant={isOpen ? "secondary" : "ghost"}
          className="gap-2"
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>
      {isOpen && (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />

          <div className="relative bg-white">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-8 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <Image
                          className="object-cover object-center"
                          fill
                          alt={item.name}
                          src={item.imageSrc}
                        />
                      </div>
                      <Link
                        href={item.href}
                        className="mt-6 block font-medium text-indigo-900"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1">Shop now</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;
