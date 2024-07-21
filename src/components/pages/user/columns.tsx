"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";
import { getAllUsersSchema } from "@/config/form-schema";
import SortableColumn from "@/components/datatable-columns/sortable-column";
import DateColumn from "@/components/datatable-columns/date-column";
import ActionColumn from "@/components/datatable-columns/action-column";
import ImageColumn from "@/components/datatable-columns/image-column";
import StatusColumn from "@/components/datatable-columns/status-column";
import InviteUserColumn from "@/components/datatable-columns/invite-user-column";
export const columns: ColumnDef<z.infer<typeof getAllUsersSchema>>[] = [
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
    header: "User Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <SortableColumn column={column} title="Phone" />,
  },
  {
    accessorKey: "role.displayName",
    header: ({ column }) => <SortableColumn column={column} title="Role" />,
  },
  {
    id: "select",
    header: "Invite",
    cell: ({ row }) => {
      const user = row.original;
      return <InviteUserColumn user={user} />;
    },
    enableSorting: false,
    enableHiding: false,
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
      const user = row.original;
      return (
        <ActionColumn
          row={row}
          title="user"
          editEndpoint={`users/update/${user.id}`}
          deleteEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`}
          id={user.id}
          queryKey="users"
        />
      );
    },
  },
];
