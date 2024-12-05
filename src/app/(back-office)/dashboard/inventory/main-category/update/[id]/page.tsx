import React from "react";

import MainCategoryUpdatePage from "@/components/pages/main-category/main-category-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <MainCategoryUpdatePage id={id} />;
};

export default page;
