"use client";

// import { useGetRole } from "@/action/role-action";
import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import CustomDatatable from "../../dashboard/tables/custom-datatable";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const RolePage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/role`,
    "roles",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="grid grid-cols-1 space-y-3">
      {data && (
        <TableHeader
          data={data?.data}
          title="Roles"
          linkTitle="Add Role"
          href="/dashboard/users/roles/new"
          queryKey="roles"
          createBulkPath={`${process.env.NEXT_PUBLIC_BACKEND_URL}/role/bulk`}
        />
      )}
      {data && <DataTable data={data.data} columns={columns} />}
    </div>
  );
};

export default RolePage;
