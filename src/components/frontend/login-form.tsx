"use client";
import { createUnitSchema } from "@/config/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "../global/form-inputs/text-input";
import PasswordInput from "../global/form-inputs/password-input";
import { toast } from "sonner";

type Props = {};

const LoginForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data: any) {
    setIsLoading(true);
    try {
      // data.imageUrl = imageUrl;
    } catch (error: any) {
      console.error("There was an error creating the data!", error);
      toast.error(`${error?.message}`);
    } finally {
      setIsLoading(false);
    }
  }
  console.log({ errors });
  return (
    <div className="px-5 py-5 lg:px-14 lg:py-8 ">
      <div className="py-4 ">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 sm:mx-auto sm:w-full sm:max-w-sm">
          Sign in to your account
        </h2>
        <p className="text-xs sm:mx-auto sm:w-full sm:max-w-sm">
          Welcome back, fill in details to login
        </p>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              register={register}
              errors={errors}
              label="Email Address"
              name="email"
              icon={Mail}
            />

            <PasswordInput
              register={register}
              errors={errors}
              label="Password"
              name="password"
              icon={Lock}
              type="password"
              forgotPasswordLink="/forgot-password"
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a registered?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create a Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
