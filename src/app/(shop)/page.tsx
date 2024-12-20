import Hero from "@/components/frontend/hero";
import { ThemeModeToggle } from "@/components/global/theme-mode-toggle";
import Image from "next/image";

export default function Home() {
  const banners = [
    {
      title: "Chrismast event",
      link: "#",
      imageUrl: "/hero 1.webp",
    },
    {
      title: "Chrismast event 2",
      link: "#",
      imageUrl: "/hero 2.webp",
    },
    {
      title: "Chrismast event 3",
      link: "#",
      imageUrl: "/hero 3.webp",
    },
  ];

  const adverts = [
    {
      title: "Advert",
      link: "#",
      imageUrl: "/iklan 1.webp",
    },
    {
      title: "Advert 2",
      link: "#",
      imageUrl: "/iklan 2.webp",
    },
    {
      title: "Advert 3",
      link: "#",
      imageUrl: "/iklan 3.webp",
    },
    {
      title: "Advert 4",
      link: "#",
      imageUrl: "/iklan 4.webp",
    },
  ];
  return (
    <main className="my-8 md:container">
      <Hero banners={banners} adverts={adverts} />
    </main>
  );
}
