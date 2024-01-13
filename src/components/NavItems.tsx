"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/useOutside";

const NavItems = () => {
  const [activeIdx, setIdx] = useState<null | number>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setIdx(null));

  useEffect(() => {
    const handleEscClick = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIdx(null);
      }
    };
    document.addEventListener("keydown", handleEscClick);

    return () => {
      document.removeEventListener("keydown", handleEscClick);
    };
  }, []);

  return (
    <div ref={navRef} className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIdx === i) {
            setIdx(null);
          } else {
            setIdx(i);
          }
        };

        const isOpen = i === activeIdx;

        return (
          <NavItem
            category={category}
            isAnyOpen={activeIdx !== null}
            key={i}
            isOpen={isOpen}
            onClick={handleOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
