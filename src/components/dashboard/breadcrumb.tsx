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
import { useSidebar } from "../ui/sidebar";
import { truncateText } from "@/utils/truncate-text";

type Props = {};

const Breadcrumb = (props: Props) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment);
  const { isMobile } = useSidebar();

  const lastSegment = segments[segments.length - 1];
  const href = "/" + segments.slice(0, segments.length).join("/");

  return (
    <div className="breadcrumb">
      <BreadcrumbList>
        {isMobile ? (
          <BreadcrumbItem>
            <BreadcrumbLink href={href}>
              {truncateText(
                decodeURIComponent(lastSegment).replace(/-/g, " "),
                10,
              )}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const href = "/" + segments.slice(0, index + 1).join("/");

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem className={isLast ? "" : "hidden md:block"}>
                  {!isLast ? (
                    <BreadcrumbLink href={"#"}>
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
          })
        )}
      </BreadcrumbList>
    </div>
  );
};

export default Breadcrumb;
