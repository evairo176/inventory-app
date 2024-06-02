import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Button asChild>
        <Link href={"/dashboard/inventory/categories/new"}>New Category</Link>
      </Button>
      Category
    </div>
  );
};

export default page;
