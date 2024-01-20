"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlider = ({ urls }: { urls: string[] }) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setIndex] = useState<number>(0);
  const [slideConfig, setConfig] = useState({
    isBegining: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setIndex(activeIndex);
      setConfig({
        isBegining: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  const aciveStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inactive = "hidden text-gray-400";
  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(aciveStyles, "right-3 transition", {
            [inactive]: slideConfig.isEnd,
            "hover:bg-primary text-primary opacity-100": !slideConfig.isEnd,
          })}
          aria-label="next-image"
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(aciveStyles, "left-3 transition", {
            [inactive]: slideConfig.isBegining,
            "hover:bg-primary text-primary opacity-100":
              !slideConfig.isBegining,
          })}
          aria-label="prev-image"
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />
        </button>
      </div>

      <Swiper
        pagination={{
          renderBullet: (_, className) =>
            `<span class="rounded-full transition ${className}"></span>`,
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        className="h-full w-full"
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              fill
              src={url}
              alt="Product image"
              loading="eager"
              className="-z-10 w-full h-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
