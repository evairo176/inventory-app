"use client";
import { Loader, Lock, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../global/form-inputs/text-input";
import PasswordInput from "../global/form-inputs/password-input";
import { toast } from "sonner";
import SubmitButtonV2 from "../global/form-inputs/submit-button-v2";
import { LoginProps } from "@/types/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};

const LoginForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginProps>();

  async function onSubmit(data: LoginProps) {
    setLoading(true);

    try {
      const authenticated = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (authenticated?.error) {
        const promise = () =>
          new Promise((resolve, reject) =>
            setTimeout(() => reject({ message: authenticated?.error }), 1000),
          );

        toast.promise(promise, {
          loading: "Please wait...",
          success: (data: any) => {
            return `${data.message}`;
          },
          error: (data: any) => {
            return `${authenticated?.error}`;
          },
        });

        setLoading(false);
        return;
      }

      // data.imageUrl = imageUrl;
      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ message: "Login Successfully" }), 1000),
        );

      toast.promise(promise, {
        loading: "Please wait...",
        success: (data: any) => {
          router.push("/dashboard");
          setLoading(false);
          return `${data.message}`;
        },
        error: "Error",
      });
    } catch (error: any) {
      console.error("There was an error creating the data!", error);
      toast.error(`${error?.message}`);
    }
  }

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

            <SubmitButtonV2
              title="Sign In"
              loading={loading}
              loadingTitle="Loading please wait.."
              loaderIcon={Loader}
              buttonIcon={LogIn}
            />
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
