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
// import roleForm from "@/components/Dashboard/Forms/roleForm";
// import { roleFormProps } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";
import SortableColumn from "@/components/datatable-columns/sortable-column";
import DateColumn from "@/components/datatable-columns/date-column";
import ActionColumn from "@/components/datatable-columns/action-column";
import ImageColumn from "@/components/datatable-columns/image-column";
import StatusColumn from "@/components/datatable-columns/status-column";
import { getAllRolesSchema } from "@/config/form-schema";

export const columns: ColumnDef<z.infer<typeof getAllRolesSchema>>[] = [
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
    accessorKey: "displayName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Display Name" />
    ),
  },
  {
    accessorKey: "roleName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Role Name" />
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
      const role = row.original;
      return (
        <ActionColumn
          row={row}
          title="role"
          editEndpoint={`roles/update/${role.id}`}
          deleteEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/role`}
          id={role.id}
          queryKey="roles"
        />
      );
    },
  },
];
