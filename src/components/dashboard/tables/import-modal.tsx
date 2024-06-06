import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { CloudUpload } from "lucide-react";
import Link from "next/link";

export function ImportModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excel Upload</DialogTitle>
          <DialogDescription>
            you can bring all your data from excel, Please download sample file
            first to make sure you have data columns required
          </DialogDescription>
        </DialogHeader>
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
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
              />
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Upload the categories</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
