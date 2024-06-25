import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  imageUrl: string;
  setImageUrl: (data: string) => void;
  endPoint: any;
};

const ImageInput = ({ title, imageUrl, setImageUrl, endPoint }: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardContent>
        <h2 className="mb-3 mt-4  text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {title}
        </h2>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="h-32 w-full rounded-md object-cover"
            // className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={imageUrl ? imageUrl : "/placeholder.svg"}
            width="300"
          />
          <UploadButton
            endpoint={endPoint}
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);

              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              console.error({
                title: `ERROR! ${error.message}`,
                variant: "destructive",
              });
            }}
          />
          {/* <button
          type="button"
          className="flex  w-full items-center justify-center rounded-md border border-dashed px-3 py-2"
        >
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </button> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageInput;
