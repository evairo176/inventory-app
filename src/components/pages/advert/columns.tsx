"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";
import { getAllAdvertSchema } from "@/config/form-schema";
import SortableColumn from "@/components/datatable-columns/sortable-column";
import DateColumn from "@/components/datatable-columns/date-column";
import ActionColumn from "@/components/datatable-columns/action-column";
import ImageColumn from "@/components/datatable-columns/image-column";
import StatusBooleanColumn from "@/components/datatable-columns/status-boolean-column";
export const columns: ColumnDef<z.infer<typeof getAllAdvertSchema>>[] = [
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
    accessorKey: "imageUrl",
    header: "Advert Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBooleanColumn row={row} accessorKey="status" />,
  },
  {
    accessorKey: "size",
    header: ({ column }) => <SortableColumn column={column} title="Size" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <SortableColumn column={column} title="Type" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const advert = row.original;
      return (
        <ActionColumn
          row={row}
          title="Advert"
          editEndpoint={`advert/update/${advert.id}`}
          deleteEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/advert`}
          id={advert.id}
          queryKey="advert"
        />
      );
    },
  },
];
