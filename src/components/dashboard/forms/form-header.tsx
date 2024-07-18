"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BackButton from "../back-button";

interface FormHeaderProps {
  module: string;
  title?: string;

  menu: string;
  submenu: string;
}

const FormHeader = ({ module, title, menu, submenu }: FormHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <BackButton menu={menu} submenu={submenu} />
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        {module}
      </h1>
      <Badge variant="outline" className="ml-auto sm:ml-0">
        {title}
      </Badge>
    </div>
  );
};

export default FormHeader;
