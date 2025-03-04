import React from "react";

import RoleUpdatePage from "@/components/pages/role/role-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <RoleUpdatePage id={id} />;
};

export default page;
