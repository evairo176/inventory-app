"use client";

import { useGetCategory } from "@/action/category-action";
import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import CustomDatatable from "../../dashboard/tables/custom-datatable";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const CategoryPage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
    "categories",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="space-y-3">
      <TableHeader
        title="Categories"
        linkTitle="Add Category"
        href="/dashboard/inventory/categories/new"
        queryKey="categories"
      />
      <DataTable
        filterKeys={["title", "status"]}
        data={data.data}
        columns={columns}
      />
    </div>
  );
};

export default CategoryPage;
