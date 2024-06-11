import React from "react";

import WarehouseUpdatePage from "@/components/pages/warehouse/warehouse-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <WarehouseUpdatePage id={id} />;
};

export default page;
