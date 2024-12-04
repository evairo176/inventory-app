import React from "react";

import CustomerUpdatePage from "@/components/pages/customers/customer-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <CustomerUpdatePage id={id} />;
};

export default page;
