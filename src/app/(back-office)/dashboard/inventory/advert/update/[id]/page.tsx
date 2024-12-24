import React from "react";

import AdvertUpdatePage from "@/components/pages/advert/advert-update-page";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <AdvertUpdatePage id={id} />;
};

export default page;
