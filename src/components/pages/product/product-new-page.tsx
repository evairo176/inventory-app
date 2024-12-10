"use client";

import React from "react";
import { useGet } from "@/action/global-action";
import ProductForm from "@/components/dashboard/forms/product-form";

type Props = {};

const ProductNewPage = () => {
  const {
    data: dataCategory,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sub-category`,
    "sub-category",
  );

  const {
    data: dataBrand,
    error: errorBrand,
    isLoading: isLoadingBrand,
  } = useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brand`, "brands");

  const {
    data: dataSupplier,
    error: errorSupplier,
    isLoading: isLoadingSupplier,
  } = useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/supplier`, "suppliers");

  const {
    data: dataUnit,
    error: errorUnit,
    isLoading: isLoadingUnit,
  } = useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/unit`, "units");

  if (errorCategory || errorBrand || errorSupplier || errorUnit)
    return <div>failed to load</div>;
  if (isLoadingCategory || isLoadingBrand || isLoadingSupplier || isLoadingUnit)
    return <div>loading...</div>;

  return (
    <ProductForm
      categories={dataCategory?.data}
      brands={dataBrand?.data}
      suppliers={dataSupplier?.data}
      units={dataUnit?.data}
    />
  );
};

export default ProductNewPage;
