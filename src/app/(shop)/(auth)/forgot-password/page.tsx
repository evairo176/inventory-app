import ForgotPasswordForm from "@/components/frontend/forgot-password-form";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <section className="px-4">
      <div className="md:container">
        <div className="mx-auto my-3 grid max-w-[430px] grid-cols-1 rounded-md border  shadow-2xl ">
          <ForgotPasswordForm />
        </div>
      </div>
    </section>
  );
};

export default page;
