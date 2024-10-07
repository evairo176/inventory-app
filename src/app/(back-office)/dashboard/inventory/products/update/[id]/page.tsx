import React from "react";

import ProductUpdatePage from "@/components/pages/product/product-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <ProductUpdatePage id={id} />;
};

export default page;
