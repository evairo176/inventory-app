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
import { Skeleton } from "../ui/skeleton";
import { useGet } from "@/action/global-action";
interface PopulateMainCategory {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
}

interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  status: string;
  mainCategoryId: string;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export function CategoryHeader() {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/populate-main-category`,
    "home-populate-main-category",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Skeleton className="h-full w-full rounded-md" />;

  const mainCategory: PopulateMainCategory[] = data?.data;
  return (
    <div className="hidden md:container sm:block">
      <NavigationMenu>
        <NavigationMenuList>
          {mainCategory?.map((Mcategory) => {
            return (
              <NavigationMenuItem key={Mcategory.id}>
                <NavigationMenuTrigger>{Mcategory.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] grid-cols-2 gap-3 p-4 md:w-[80vw] md:grid-cols-5">
                    {Mcategory?.categories.map((CCategory) => {
                      return (
                        <li key={CCategory.title} title={CCategory.title}>
                          <Link
                            className="text-sm font-bold hover:text-blue-600"
                            href={CCategory.slug}
                          >
                            {CCategory.title}
                          </Link>
                          {CCategory?.subCategories.map((SCategory) => {
                            return (
                              <div className="pl-1" key={SCategory.slug}>
                                <Link
                                  className="text-xs font-bold text-muted-foreground hover:text-blue-600"
                                  href={SCategory.slug}
                                >
                                  {SCategory.title}
                                </Link>
                              </div>
                            );
                          })}
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}

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
