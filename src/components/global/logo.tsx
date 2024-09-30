import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LogoProps {
  labelShown?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}

const Logo = ({ labelShown = true, size = "md", href = "/" }: LogoProps) => {
  return (
    <Link href={href} className="flex items-center gap-2">
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-50",
          size === "lg" && "h-12 w-12",
          size === "sm" && "h-7 w-7",
        )}
      >
        <ShoppingBag
          className={cn(
            "h-4 w-4",
            size === "lg" && "h-8 w-8",
            size === "sm" && "h-4 w-4",
          )}
        />
      </div>
      {labelShown && <h2 className="text-xl font-semibold">Stokify</h2>}
    </Link>
  );
};

export default Logo;
