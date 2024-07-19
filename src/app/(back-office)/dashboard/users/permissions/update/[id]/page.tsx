import React from "react";

import PermissionUpdatePage from "@/components/pages/permission/permission-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <PermissionUpdatePage id={id} />;
};

export default page;
