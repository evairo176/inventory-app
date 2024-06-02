import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

type Props = {
  title: string;
  loadingTitle?: string;
  loading: boolean;
};

const SubmitButton = ({
  title,
  loadingTitle = "Saving please wait...",
  loading,
}: Props) => {
  return (
    <>
      {loading ? (
        <Button disabled type="submit" size="sm">
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          {loadingTitle}
        </Button>
      ) : (
        <Button type="submit" size="sm">
          {title}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
