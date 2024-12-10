"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";
import { getAllCategorySchema } from "@/config/form-schema";
import SortableColumn from "@/components/datatable-columns/sortable-column";
import DateColumn from "@/components/datatable-columns/date-column";
import ActionColumn from "@/components/datatable-columns/action-column";
export const columns: ColumnDef<z.infer<typeof getAllCategorySchema>>[] = [
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
    accessorKey: "category.title",
    header: ({ column }) => <SortableColumn column={column} title="Category" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <ActionColumn
          row={row}
          title="Sub Category"
          editEndpoint={`sub-category/update/${category.id}`}
          deleteEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/sub-category`}
          id={category.id}
          queryKey="sub-category"
        />
      );
    },
  },
];
