import React from "react";

import RoleForm from "@/components/dashboard/forms/role-form";
import RoleNewPage from "@/components/pages/role/role-new-page";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <RoleNewPage />
    </div>
  );
};

export default page;
