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
// import permissionForm from "@/components/Dashboard/Forms/permissionForm";
// import { permissionFormProps } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";
import SortableColumn from "@/components/datatable-columns/sortable-column";
import DateColumn from "@/components/datatable-columns/date-column";
import ActionColumn from "@/components/datatable-columns/action-column";
import ImageColumn from "@/components/datatable-columns/image-column";
import StatusColumn from "@/components/datatable-columns/status-column";
import { getAllPermissionsSchema } from "@/config/form-schema";

export const columns: ColumnDef<z.infer<typeof getAllPermissionsSchema>>[] = [
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
    accessorKey: "module",
    header: ({ column }) => <SortableColumn column={column} title="Module" />,
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Display Name" />
    ),
  },
  {
    accessorKey: "permissionName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Permission Name" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <SortableColumn column={column} title="Description" />
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
      const permission = row.original;
      return (
        <ActionColumn
          row={row}
          title="permission"
          editEndpoint={`permissions/update/${permission.id}`}
          deleteEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/permission`}
          id={permission.id}
          queryKey="permissions"
        />
      );
    },
  },
];
