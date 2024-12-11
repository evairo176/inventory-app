"use client";

// import { useGetPermission } from "@/action/permission-action";
import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const PermissionPage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/permission`,
    "permissions",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="grid grid-cols-1 space-y-3">
      {data && (
        <TableHeader
          data={data?.data}
          title="Permissions"
          linkTitle="Add Permission"
          href="/dashboard/users/permissions/new"
          queryKey="permissions"
          createBulkPath={`${process.env.NEXT_PUBLIC_BACKEND_URL}/permission/bulk`}
        />
      )}
      {data && <DataTable data={data.data} columns={columns} />}
    </div>
  );
};

export default PermissionPage;
