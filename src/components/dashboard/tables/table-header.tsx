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
import { ExcelCategoryProps } from "../../../../types/types";
import { toast } from "@/components/ui/use-toast";
import { useCreateBulk } from "@/action/global-action";
import exportDataToExcel from "@/lib/export-data-to-excel";

type TableHeaderProps = {
  title: string;
  href: string;
  linkTitle: string;
  queryKey: string;
  createBulkPath: string;
  data: any;
};

const TableHeader = ({
  title,
  href,
  linkTitle,
  queryKey,
  createBulkPath,
  data,
}: TableHeaderProps) => {
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
  const [open, setOpen] = useState(false);
  const createBulkCategory = useCreateBulk(createBulkPath, queryKey);
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
            let dataBULK = {
              [queryKey]: json,
            };

            const result = await createBulkCategory.mutateAsync(dataBULK);

            const sumResultSuccess = result.data.filter(
              (row: any) => row.status_upload !== "Error",
            ).length;
            toast({
              title: `Import ${sumResultSuccess} data excel successfully`,
            });
            setExcelFile(null);
            setJsonData("");
            setPreview(false);
            setOpen(false);
          } catch (error) {
            console.log(error);
            toast({
              title: "Failed to import",
              variant: "destructive",
            });
          } finally {
            setLoading(false);
          }
        }
      };
      reader.readAsBinaryString(excelFile);
    }
  }

  function handleExportData() {
    console.log("data exported");
    const today = new Date();
    const filename = `Exported ${queryKey}-${today.toDateString()}`;
    // console.log(filename);
    exportDataToExcel(data, filename);
  }
  return (
    <React.Fragment>
      <div className="mb-3 flex flex-wrap items-center justify-between border-b border-gray-200 py-3 dark:border-gray-600">
        <h2 className="mt-10 scroll-m-20  text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          {title}
        </h2>

        <div className="flex  items-center space-x-4">
          <Button
            onClick={handleExportData}
            size="sm"
            variant="outline"
            className="h-8 gap-1"
          >
            <FileUp className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
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
                    <Link href={`/example-${queryKey}-import.xlsx`} download>
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
    </React.Fragment>
  );
};

export default TableHeader;
