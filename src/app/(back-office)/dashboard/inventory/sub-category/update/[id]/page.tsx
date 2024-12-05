import React from "react";

import SubCategoryUpdatePage from "@/components/pages/sub-category/sub-category-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <SubCategoryUpdatePage id={id} />;
};

export default page;
