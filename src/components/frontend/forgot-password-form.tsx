"use client";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const ForgotPasswordForm = (props: Props) => {
  return (
    <div className="px-5 py-5  ">
      <div className="py-4 ">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 sm:mx-auto sm:w-full sm:max-w-sm">
          Forgot your password
        </h2>
        <p className="text-xs sm:mx-auto sm:w-full sm:max-w-sm">
          No worries, We will send you reset intructions
        </p>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-slate-300" />
                </div>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-8 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Remember your password ?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Go Back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
