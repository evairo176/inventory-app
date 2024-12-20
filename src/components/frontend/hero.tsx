"use client";
import React from "react";
import Carousel from "nuka-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type HeroProps = {
  banners: {
    title: string;
    imageUrl: string;
    link: string;
  }[];
  adverts: {
    title: string;
    imageUrl: string;
    link: string;
  }[];
};

const Hero = ({ banners, adverts }: HeroProps) => {
  const config = {
    nextButtonClassName: "rounded-full",
    nextButtonText: <ChevronRight />,
    pagingDotsClassName: "me-2 w-4 h-4",
    prevButtonClassName: "rounded-full",
    prevButtonText: <ChevronLeft />,
  };
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8">
        <Carousel
          defaultControlsConfig={config}
          autoplay
          className="overflow-hidden"
          wrapAround
        >
          {banners.map((banner, i) => {
            return (
              <Link
                key={i}
                href={banner.link}
                className="block h-[180px] md:h-[450px]"
              >
                <Image
                  width={712}
                  height={384}
                  src={banner.imageUrl}
                  className="h-full w-full rounded-md object-cover"
                  alt={banner.title}
                />
              </Link>
            );
          })}
        </Carousel>
      </div>
      <div className="col-span-12 md:col-span-4">
        <div className="grid grid-cols-2 gap-4">
          {adverts.map((advert, i) => {
            return (
              <Link
                key={i}
                href={advert.link}
                className="block h-[180px] md:h-[215px]"
              >
                <Image
                  width={712}
                  height={384}
                  src={advert.imageUrl}
                  className="h-full w-full rounded-md object-cover"
                  alt={advert.title}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
