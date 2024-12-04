"use client";
import { useGet } from "@/action/global-action";
import { ICustomer } from "@/types/types";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Label } from "../ui/label";

type FilterProps = {
  selectCustomer: string;
  setSelectCustomer: (value: string) => void;
};

const Filter = ({ selectCustomer, setSelectCustomer }: FilterProps) => {
  const [open, setOpen] = React.useState(false);
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer`,
    "customers",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="mt-3">
        <Skeleton className="h-10 w-[200px]" />
      </div>
    );
  const customers = data?.data?.map((row: ICustomer) => {
    return {
      label: row.user.name,
      value: row.id,
    };
  });

  return (
    <div className="mt-3 flex items-center justify-between">
      <div></div>
      <div>
        <div className="flex items-center">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectCustomer
                  ? customers.find(
                      (customer: any) => customer.value === selectCustomer,
                    )?.label
                  : "Select customer..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No customers found.</CommandEmpty>
                  <CommandGroup>
                    {customers.map((customer: any) => (
                      <CommandItem
                        key={customer.value}
                        value={customer.value}
                        onSelect={(currentValue) => {
                          setSelectCustomer(
                            currentValue === selectCustomer ? "" : currentValue,
                          );
                          console.log({ currentValue });
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectCustomer === customer.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {customer.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="ml-2"
                  size={"icon"}
                  variant={"outline"}
                  asChild
                >
                  <Link href={`/dashboard/sales/customers/new`}>
                    <Plus className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add new customer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Filter;
