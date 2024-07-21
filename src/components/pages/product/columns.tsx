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
// import ProductForm from "@/components/Dashboard/Forms/ProductForm";
// import { ProductFormProps } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";
import { getAllProductSchema } from "@/config/form-schema";
import SortableColumn from "@/components/datatable-columns/sortable-column";
import DateColumn from "@/components/datatable-columns/date-column";
import ActionColumn from "@/components/datatable-columns/action-column";
import ImageColumn from "@/components/datatable-columns/image-column";
import StatusColumn from "@/components/datatable-columns/status-column";
export const columns: ColumnDef<z.infer<typeof getAllProductSchema>>[] = [
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
    accessorKey: "productThumbnail",
    header: "Product Thumbnail",
    cell: ({ row }) => (
      <ImageColumn index row={row} accessorKey="productThumbnail" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableColumn column={column} title="Name Product" />
    ),
  },
  {
    accessorKey: "category.title",
    header: ({ column }) => <SortableColumn column={column} title="Category" />,
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
      const product = row.original;
      return (
        <ActionColumn
          row={row}
          title="Product"
          editEndpoint={`categories/update/${product.id}`}
          deleteEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/product`}
          id={product.id}
          queryKey="products"
        />
      );
    },
  },
];
