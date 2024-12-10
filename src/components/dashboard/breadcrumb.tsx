"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  BreadcrumbList,
  Breadcrumb as BB,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

type Props = {};

const Breadcrumb = (props: Props) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment);

  return (
    <div className="breadcrumb">
      <BB>
        <BreadcrumbList>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const href = "/" + segments.slice(0, index + 1).join("/");

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem className={isLast ? "" : "hidden md:block"}>
                  {!isLast ? (
                    <BreadcrumbLink href={href}>
                      {decodeURIComponent(segment).replace(/-/g, " ")}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>
                      {decodeURIComponent(segment).replace(/-/g, " ")}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </BB>
    </div>
  );
};

export default Breadcrumb;
