import React from "react";

import CategoryForm from "@/components/dashboard/forms/category-form";
import CategoryUpdatePage from "@/components/pages/categories/category-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <CategoryUpdatePage id={id} />;
};

export default page;
