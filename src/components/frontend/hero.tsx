"use client";
import React from "react";
import Carousel from "nuka-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Banner from "./banner";
import Advert from "./advert";

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
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8">
        <Banner />
      </div>
      <div className="col-span-12 md:col-span-4">
        <div className="grid grid-cols-2 gap-4">
          <Advert />
        </div>
      </div>
    </div>
  );
};

export default Hero;
