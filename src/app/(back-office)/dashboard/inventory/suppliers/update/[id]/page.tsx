import React from "react";

import SupplierUpdatePage from "@/components/pages/supplier/supplier-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <SupplierUpdatePage id={id} />;
};

export default page;
