"use client";

import React from "react";
import CategoryForm from "@/components/dashboard/forms/category-form";
import { useGet } from "@/action/global-action";
import ProductForm from "@/components/dashboard/forms/product-form";

type Props = {};

const ProductNewPage = () => {
  const {
    data: dataCategory,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, "categories");

  const {
    data: dataBrand,
    error: errorBrand,
    isLoading: isLoadingBrand,
  } = useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brand`, "brands");

  if (errorCategory || errorBrand) return <div>failed to load</div>;
  if (isLoadingCategory || isLoadingBrand) return <div>loading...</div>;

  return (
    <ProductForm categories={dataCategory?.data} brands={dataBrand?.data} />
  );
};

export default ProductNewPage;
