import { ShoppingBag } from "lucide-react";
import React from "react";

interface LogoProps {
  labelShown?: boolean;
}

const Logo = ({ labelShown = true }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-50">
        <ShoppingBag className="h-6 w-6" />
      </div>
      {labelShown && <h2 className="text-xl font-semibold">Stokify</h2>}
    </div>
  );
};

export default Logo;
