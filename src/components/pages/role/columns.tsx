"use client";

import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import ActionColumn from "@/components/DataTableColumns/ActionColumn";
// import unitForm from "@/components/Dashboard/Forms/unitForm";
// import { unitFormProps } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";
import { getAllUnitSchema } from "@/config/form-schema";
import SortableColumn from "@/components/datatable-columns/sortable-column";
import DateColumn from "@/components/datatable-columns/date-column";
import ActionColumn from "@/components/datatable-columns/action-column";
import ImageColumn from "@/components/datatable-columns/image-column";
import StatusColumn from "@/components/datatable-columns/status-column";
export const columns: ColumnDef<z.infer<typeof getAllUnitSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "abbreviation",
    header: ({ column }) => (
      <SortableColumn column={column} title="Abbreviation" />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusColumn row={row} accessorKey="status" />,
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const unit = row.original;
      return (
        <ActionColumn
          row={row}
          title="unit"
          editEndpoint={`units/update/${unit.id}`}
          deleteEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/unit`}
          id={unit.id}
          queryKey="units"
        />
      );
    },
  },
];
