"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FormHeaderProps {
  module: string;
  title?: string;

  goBack?: () => void;
}

const FormHeader = ({ module, title, goBack }: FormHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        onClick={goBack}
        variant="outline"
        size="icon"
        className="h-7 w-7"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>
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
