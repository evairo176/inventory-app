"use client";

// import { useGetBrand } from "@/action/brand-action";
import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import CustomDatatable from "../../dashboard/tables/custom-datatable";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const UserPage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
    "users",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="grid grid-cols-1 space-y-3">
      <TableHeader
        data={data.data}
        title="Users"
        linkTitle="Add User"
        href="/dashboard/users/new"
        queryKey="users"
        createBulkPath={`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/bulk`}
      />
      <DataTable data={data.data} columns={columns} />
    </div>
  );
};

export default UserPage;
