import React from "react";

import BrandUpdatePage from "@/components/pages/brands/brand-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <BrandUpdatePage id={id} />;
};

export default page;
