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

import { MoreHorizontal, Trash } from "lucide-react";
import DeleteBtn from "../datatable-components/delete-btn";
// import DeleteBtn from "../Actions/DeleteBtn";
// import EditBtn from "../Actions/EditBtn";
type ActionColumnProps = {
  row: any;
  title: string;
  editEndpoint: string;
  id: string | undefined;
};
export default function ActionColumn({
  row,
  title,
  editEndpoint,
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
            className="flex items-center gap-2"
          >
            <Trash className="h-4 w-4 text-rose-400" />
            <span className="text-rose-400">Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <EditBtn title={title} editEndpoint={editEndpoint} /> */}
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteBtn open={open} setOpen={setOpen} id={id as string} />
    </>
  );
}
