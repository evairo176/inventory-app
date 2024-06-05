"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronsUpDown,
  File,
  FileDown,
  FileUp,
  ListFilter,
  Plus,
  PlusCircle,
  Search,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type TableHeaderProps = {
  title: string;
  href: string;
  linkTitle: string;
};

const TableHeader = ({ title, href, linkTitle }: TableHeaderProps) => {
  const [status, setStatus] = useState<any>({
    label: null,
    value: null,
  });
  const [date, setDate] = useState<any>({
    label: null,
    value: null,
  });
  const statusOption = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];
  const dateOption = [
    { label: "Last Month", value: "lastMonth" },
    { label: "This Month", value: "thisMonth" },
  ];
  return (
    <React.Fragment>
      <div className="mb-3 flex items-center justify-between border-b border-gray-200 py-3 dark:border-gray-600">
        <h2 className="mt-10 scroll-m-20  text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          {title}
        </h2>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <FileUp className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <FileDown className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Import
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href={href}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {linkTitle}
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full appearance-none bg-background pl-8 shadow-none "
          />
        </div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !date.value && "text-muted-foreground",
                )}
              >
                {date.value
                  ? dateOption.find((stat) => stat.value === date.value)?.label
                  : "Select date"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command>
                <CommandInput placeholder="Search date..." />
                <CommandEmpty>No date found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {dateOption.map((stat) => (
                      <CommandItem
                        value={stat.label}
                        key={stat.value}
                        onSelect={() => {
                          setDate({ value: stat.value });
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            stat.value === date.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {stat.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !status.value && "text-muted-foreground",
                )}
              >
                {status.value
                  ? statusOption.find((stat) => stat.value === status.value)
                      ?.label
                  : "Select status"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command>
                <CommandInput placeholder="Search status..." />
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {statusOption.map((stat) => (
                      <CommandItem
                        value={stat.label}
                        key={stat.value}
                        onSelect={() => {
                          setStatus({ value: stat.value });
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            stat.value === status.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {stat.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TableHeader;
