"use client";

// import { useGetUnit } from "@/action/unit-action";
import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import CustomDatatable from "../../dashboard/tables/custom-datatable";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const UnitPage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/unit`,
    "units",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="space-y-3">
      <TableHeader
        data={data.data}
        title="Units"
        linkTitle="Add Unit"
        href="/dashboard/inventory/units/new"
        queryKey="units"
        createBulkPath={`${process.env.NEXT_PUBLIC_BACKEND_URL}/unit/bulk`}
      />
      <DataTable data={data.data} columns={columns} />
    </div>
  );
};

export default UnitPage;
