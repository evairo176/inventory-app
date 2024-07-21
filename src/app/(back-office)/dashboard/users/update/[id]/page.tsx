import React from "react";

import UserUpdatePage from "@/components/pages/user/user-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <UserUpdatePage id={id} />;
};

export default page;
