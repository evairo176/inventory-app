import PointOfSale from "@/components/pos/point-of-sale";
import React from "react";

type Props = {};

const page = async ({}: Props) => {
  return (
    <div>
      <PointOfSale />
    </div>
  );
};

export default page;
