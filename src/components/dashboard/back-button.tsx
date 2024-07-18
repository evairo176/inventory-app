import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

type BackButtonProps = {
  menu: string;
  submenu: string;
};

const BackButton = ({ menu, submenu }: BackButtonProps) => {
  return (
    <Link href={`/dashboard/${menu}/${submenu}`}>
      <Button type="button" variant="outline" size="icon" className="h-7 w-7">
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>
    </Link>
  );
};

export default BackButton;
