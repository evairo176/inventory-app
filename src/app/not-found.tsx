import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-3 py-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Page Not Found
      </h1>
      <h2 className="scroll-m-20 text-balance border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        The page your looking for does not exist
      </h2>
      <p className="text-center">
        You must have typed in a wrong address or the page was removed, in the
        meantime try again or{" "}
        <Link className="text-blue-600" href={"/"}>
          return to the home page
        </Link>
      </p>
      <Image
        className="w-96"
        src={"/404-icon.jpg"}
        alt="not found"
        width={740}
        height={740}
      />
    </div>
  );
};

export default NotFound;
