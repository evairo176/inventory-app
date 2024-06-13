"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";
import { getAllSupplierSchema } from "@/config/form-schema";
import SortableColumn from "@/components/datatable-columns/sortable-column";
import DateColumn from "@/components/datatable-columns/date-column";
import ActionColumn from "@/components/datatable-columns/action-column";
import ImageColumn from "@/components/datatable-columns/image-column";
import StatusColumn from "@/components/datatable-columns/status-column";
export const columns: ColumnDef<z.infer<typeof getAllSupplierSchema>>[] = [
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
    header: "Supplier Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Company Name" />
    ),
  },
  {
    accessorKey: "vatNumber",
    header: ({ column }) => (
      <SortableColumn column={column} title="Vat Number" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
  },
  {
    accessorKey: "country",
    header: ({ column }) => <SortableColumn column={column} title="Country" />,
  },
  {
    accessorKey: "state",
    header: ({ column }) => <SortableColumn column={column} title="State" />,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <SortableColumn column={column} title="City" />,
  },
  {
    accessorKey: "postalCode",
    header: ({ column }) => (
      <SortableColumn column={column} title="Postal Code" />
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
      const supplier = row.original;
      return (
        <ActionColumn
          row={row}
          title="supplier"
          editEndpoint={`suppliers/update/${supplier.id}`}
          deleteEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/supplier`}
          id={supplier.id}
          queryKey="suppliers"
        />
      );
    },
  },
];
