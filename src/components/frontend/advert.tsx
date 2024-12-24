"use client";
import React, { Fragment } from "react";
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

const Advert = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/advert`,
    "home-advert",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <Fragment>
        {[1, 2, 3, 4]?.map((row) => {
          return (
            <Skeleton
              className="h-[180px] w-full rounded-md md:h-[215px]"
              key={row}
            />
          );
        })}
      </Fragment>
    );

  const adverts = data?.data;
  return (
    <Fragment>
      {adverts.map((advert: any, i: any) => {
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
    </Fragment>
  );
};

export default Advert;
