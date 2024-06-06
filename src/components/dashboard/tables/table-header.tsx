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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  CloudUpload,
  File,
  FileDown,
  FileUp,
  ListFilter,
  Plus,
  PlusCircle,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { ImportModal } from "./import-modal";
import { formatFileSize } from "@/utils/format-file-size";
import * as XLSX from "xlsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreateBulkCategory } from "@/action/category-action";
import { ExcelCategoryProps } from "../../../../types/types";

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
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState("");
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const createBulkCategory = useCreateBulkCategory(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/bulk`,
  );
  const statusOption = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];
  const dateOption = [
    { label: "Last Month", value: "lastMonth" },
    { label: "This Month", value: "thisMonth" },
  ];

  function previewData() {
    setPreview(!preview);
    if (excelFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(excelFile);
    }
  }

  function saveData() {
    if (excelFile) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json: ExcelCategoryProps[] =
            XLSX.utils.sheet_to_json(workSheet);
          //Save to the DB
          try {
            console.log(json);
            const result = await createBulkCategory(json);

            console.log({ result });
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
      };
      reader.readAsBinaryString(excelFile);
    }
  }
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
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <FileDown className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Import
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Excel Upload</DialogTitle>
                <DialogDescription>
                  you can bring all your data from excel, Please download sample
                  file first to make sure you have data columns required
                </DialogDescription>
              </DialogHeader>
              {preview && jsonData ? (
                <ScrollArea className="h-72 w-full ">
                  <pre className="mt-2 w-full overflow-y-auto rounded-md bg-slate-950 p-4">
                    <code className="text-white">{jsonData}</code>
                  </pre>
                </ScrollArea>
              ) : (
                <div className="grid gap-4 py-4">
                  <Button asChild variant={"outline"}>
                    <Link href={"/categories.xlsx"} download>
                      Download Sample categories Data
                    </Link>
                  </Button>

                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="dropzone-file"
                      className="dark:hover:bg-bray-800 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <CloudUpload className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />

                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Only excel file (.xlsx)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        accept=".xlsx,.xls"
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          setExcelFile(
                            e.target.files ? e.target.files[0] : null,
                          )
                        }
                      />
                    </label>
                  </div>
                  {excelFile && (
                    <div className="flex items-center justify-between rounded-md bg-slate-100 px-6 py-3 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="flex w-14 items-center justify-center rounded bg-slate-300 p-4">
                          <FileDown className="h-4 w-4 " />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {excelFile.name}
                          </p>
                          <span className="text-xs">
                            {formatFileSize(excelFile.size)}
                          </span>
                        </div>
                      </div>
                      <button type="button" onClick={() => setExcelFile(null)}>
                        <X className="h-4 w-4 text-slate-600" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <DialogFooter>
                {preview ? (
                  <Button
                    onClick={previewData}
                    variant={"outline"}
                    type="button"
                  >
                    Stop Preview
                  </Button>
                ) : (
                  <Button
                    disabled={loading}
                    onClick={previewData}
                    variant={"outline"}
                    type="button"
                  >
                    Preview
                  </Button>
                )}
                <Button disabled={loading} onClick={saveData} type="button">
                  {loading ? "Loading..." : "Save Data"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
