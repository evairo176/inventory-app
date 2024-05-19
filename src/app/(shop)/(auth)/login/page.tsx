import LoginForm from "@/components/frontend/login-form";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <section className="px-4">
      <div className="md:container">
        <div className="mx-auto my-3 grid max-w-4xl grid-cols-1 rounded-md border  shadow-2xl lg:grid-cols-2">
          <LoginForm />
          <div className="hidden h-full bg-blue-600 text-center lg:block">
            <p>Connect with every application</p>
            <p className="text-xs text-gray-300">
              Everything you need is costumizable on the dashboard
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
