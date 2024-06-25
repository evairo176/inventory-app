import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  imageUrls: any;
  setImageUrls: (data: any) => void;
  endPoint: any;
};

const MultipleImageInput = ({
  title,
  imageUrls,
  setImageUrls,
  endPoint,
}: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardContent>
        <h2 className="mb-3 mt-4  text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {title}
        </h2>
        <div className="grid gap-2">
          <Image
            alt={
              imageUrls && imageUrls?.length > 0
                ? `Product Thumbnail Image -  1`
                : "Image Product"
            }
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={imageUrls && imageUrls?.length > 0 && imageUrls[0]}
            width="300"
          />
          <div className="grid grid-cols-3 gap-2">
            {imageUrls &&
              imageUrls?.map((item: string, key: number) => {
                return (
                  <Image
                    key={key}
                    alt={"Product Image" + "-" + key}
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src={item}
                    width="84"
                  />
                );
              })}
          </div>
          <UploadButton
            endpoint={endPoint}
            onClientUploadComplete={(res: any) => {
              // Do something with the response
              console.log("Files: ", res);

              setImageUrls(res.map((row: any) => row.url));
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              console.error({
                title: `ERROR! ${error.message}`,
                variant: "destructive",
              });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MultipleImageInput;
