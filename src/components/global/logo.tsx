import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LogoProps {
  labelShown?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
  version?: string;
}

const Logo = ({
  labelShown = true,
  size = "md",
  href = "/",
  version = "v1.0.0",
}: LogoProps) => {
  return (
    <Link href={href} className="flex items-center gap-1">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <ShoppingBag className="size-4" />
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        {labelShown && <span className="font-semibold">Stockify</span>}

        <span className="text-start">{version}</span>
      </div>
    </Link>
  );
};

export default Logo;
