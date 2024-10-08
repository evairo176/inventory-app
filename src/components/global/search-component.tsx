"use client";

import * as React from "react";
import {
  BadgeDollarSign,
  Calculator,
  Calendar,
  Car,
  CreditCard,
  Laptop,
  Pencil,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import { useGet, useGetEnable } from "@/action/global-action";
import { IProduct } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addProductToOrderLine } from "@/redux/slices/point-of-sale";

type SearchComponentProps = {};

export function SearchComponent({}: SearchComponentProps) {
  const [open, setOpen] = React.useState(false);
  const orderLineItems = useAppSelector((state) => state?.pos?.products);
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product`,
    `pos-products`,
  );
  const listIdOrderLineItems = orderLineItems?.map((row) => row.id);
  const dataProduct =
    data?.data?.length > 0
      ? data?.data?.filter(
          (row: IProduct) => !listIdOrderLineItems.includes(row.id),
        )
      : [];
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function handleAdd(item: {
    id: string;
    name: string;
    productPrice: number;
    productThumbnail: string;
  }) {
    const newOrderLineItem = {
      id: item.id,
      name: item.name,
      price: item.productPrice,
      qty: 1,
      productThumbnail: item.productThumbnail,
    };
    dispatch(addProductToOrderLine(newOrderLineItem));
  }

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div>
        <Skeleton className="h-8 w-36" />
      </div>
    );

  return (
    <div>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-36 lg:w-36",
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          {dataProduct.length > 0 ? (
            dataProduct?.map((row: IProduct, key: number) => {
              return (
                <CommandItem onSelect={() => handleAdd(row)} key={key}>
                  <Image
                    src={row.productThumbnail ?? "/placeholder.svg"}
                    alt={row.name}
                    height={100}
                    width={100}
                    className="mr-2 h-4 w-4 object-cover"
                  />
                  <span className="line-clamp-1">{row.name}</span>
                </CommandItem>
              );
            })
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
