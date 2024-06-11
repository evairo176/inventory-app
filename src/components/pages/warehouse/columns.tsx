"use client";

import { Checkbox } from "@/components/ui/checkbox";

// import ActionColumn from "@/components/DataTableColumns/ActionColumn";
// import warehouseForm from "@/components/Dashboard/Forms/warehouseForm";
// import { warehouseFormProps } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";
import { getAllWarehouseSchema } from "@/config/form-schema";
import SortableColumn from "@/components/datatable-columns/sortable-column";
import DateColumn from "@/components/datatable-columns/date-column";
import ActionColumn from "@/components/datatable-columns/action-column";
import ImageColumn from "@/components/datatable-columns/image-column";
import StatusColumn from "@/components/datatable-columns/status-column";
export const columns: ColumnDef<z.infer<typeof getAllWarehouseSchema>>[] = [
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
    header: "Warehouse Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <SortableColumn column={column} title="City" />,
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
      const warehouse = row.original;
      return (
        <ActionColumn
          row={row}
          title="warehouse"
          editEndpoint={`warehouse/update/${warehouse.id}`}
          deleteEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse`}
          id={warehouse.id}
          queryKey="warehouses"
        />
      );
    },
  },
];
