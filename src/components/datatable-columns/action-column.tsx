import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import DeleteBtn from "../datatable-components/delete-btn";
import Link from "next/link";
// import DeleteBtn from "../Actions/DeleteBtn";
// import EditBtn from "../Actions/EditBtn";
type ActionColumnProps = {
  row: any;
  title: string;
  editEndpoint: string;
  deleteEndpoint: string;
  id: string | undefined;
};
export default function ActionColumn({
  row,
  title,
  editEndpoint,
  deleteEndpoint,
  id,
}: ActionColumnProps) {
  const isActive = row.isActive;
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="flex cursor-pointer items-center gap-2"
          >
            <Trash className="h-4 w-4 text-rose-400" />
            <span className="text-rose-400">Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={editEndpoint}
              className="flex cursor-pointer items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteBtn
        open={open}
        setOpen={setOpen}
        id={id as string}
        deletePath={deleteEndpoint}
      />
    </>
  );
}
