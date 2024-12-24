"use client";
import React from "react";
import { useGet } from "@/action/global-action";
import Carousel from "nuka-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

type Props = {};
const config = {
  nextButtonClassName: "rounded-full",
  nextButtonText: <ChevronRight />,
  pagingDotsClassName: "me-2 w-4 h-4",
  prevButtonClassName: "rounded-full",
  prevButtonText: <ChevronLeft />,
};

const Banner = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/banner`,
    "home-banner",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return <Skeleton className="h-[180px] w-full rounded-md md:h-[450px]" />;

  const banners = data?.data;
  return (
    <Carousel
      defaultControlsConfig={config}
      autoplay
      className="overflow-hidden"
      wrapAround
    >
      {banners.map((banner: any, i: any) => {
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
  );
};

export default Banner;
