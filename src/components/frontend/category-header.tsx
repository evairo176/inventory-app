"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { BabyIcon } from "lucide-react";
import Logo from "../global/logo";
type SubCategoryProps = {
  title: string;
  slug: string;
};
type CategoryProps = {
  title: string;
  slug: string;
  subCategory: SubCategoryProps[];
};
const mainCategory: {
  title: string;
  slug: string;
  category: CategoryProps[];
}[] = [
  {
    title: "Computer and Accessories",
    slug: "computer-and-accessories",
    category: [
      {
        title: "Laptops",
        slug: "laptops",
        subCategory: [
          {
            title: "Macbook",
            slug: "macbook",
          },
        ],
      },
      {
        title: "Desktop and Monitor",
        slug: "desktop-and-monitor",
        subCategory: [
          {
            title: "Monitor",
            slug: "monitor",
          },
        ],
      },
    ],
  },
  {
    title: "Phone and Tablet",
    slug: "phone-and-tablet",
    category: [
      {
        title: "Laptops",
        slug: "laptops",
        subCategory: [
          {
            title: "Macbook",
            slug: "macbook",
          },
        ],
      },
      {
        title: "Desktop and Monitor",
        slug: "desktop-and-monitor",
        subCategory: [
          {
            title: "Monitor",
            slug: "monitor",
          },
        ],
      },
    ],
  },
  {
    title: "Electronics",
    slug: "electronics",
    category: [
      {
        title: "Laptops",
        slug: "laptops",
        subCategory: [
          {
            title: "Macbook",
            slug: "macbook",
          },
        ],
      },
      {
        title: "Desktop and Monitor",
        slug: "desktop-and-monitor",
        subCategory: [
          {
            title: "Monitor",
            slug: "monitor",
          },
        ],
      },
    ],
  },
  {
    title: "Fashion",
    slug: "fashion",
    category: [
      {
        title: "Laptops",
        slug: "laptops",
        subCategory: [
          {
            title: "Macbook",
            slug: "macbook",
          },
        ],
      },
      {
        title: "Desktop and Monitor",
        slug: "desktop-and-monitor",
        subCategory: [
          {
            title: "Monitor",
            slug: "monitor",
          },
        ],
      },
    ],
  },
  {
    title: "Home and Kitchen",
    slug: "home-and-kitchen",
    category: [
      {
        title: "Laptops",
        slug: "laptops",
        subCategory: [
          {
            title: "Macbook",
            slug: "macbook",
          },
        ],
      },
      {
        title: "Desktop and Monitor",
        slug: "desktop-and-monitor",
        subCategory: [
          {
            title: "Monitor",
            slug: "monitor",
          },
        ],
      },
    ],
  },
];

export function CategoryHeader() {
  return (
    <div className="hidden md:container sm:block ">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent className="relative">
              <ul className="grid w-[400px] grid-cols-2 gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
                {mainCategory.map((Mcategory) => {
                  return (
                    <li
                      key={Mcategory.title}
                      title={Mcategory.title}
                      // href={Mcategory.slug}
                    >
                      <Link
                        className="text-sm font-bold hover:text-blue-600"
                        href={Mcategory.slug}
                      >
                        {Mcategory.title}
                      </Link>
                      {Mcategory?.category.map((CCategory) => {
                        return (
                          <div className="pl-1" key={CCategory.slug}>
                            <Link
                              className="text-xs font-bold hover:text-blue-600"
                              href={CCategory.slug}
                            >
                              {CCategory.title}
                            </Link>
                            {CCategory?.subCategory?.map((SCategory) => {
                              return (
                                <div className="pl-1" key={SCategory.slug}>
                                  <Link
                                    className="text-xs text-muted-foreground hover:text-blue-600"
                                    href={SCategory.slug}
                                  >
                                    {" "}
                                    {SCategory.title}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </li>
                  );
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>  */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
