import React from "react";

import UnitUpdatePage from "@/components/pages/unit/unit-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <UnitUpdatePage id={id} />;
};

export default page;
