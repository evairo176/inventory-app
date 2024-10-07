"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronsUpDown, EyeOff, Upload } from "lucide-react";
import FormHeader from "./form-header";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { updateUsersSchema } from "@/config/form-schema";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import ImageInput from "@/components/global/form-inputs/image-input";
import { IPermission, IRole, IUser } from "../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import SelectInput from "@/components/global/form-inputs/select-input";
import PasswordTextInput from "@/components/global/form-inputs/password-text-input";

type Props = {
  editingId?: string;
  initialUser?: IUser | undefined;
  roles: IRole[];
};

const UpdateUserForm = ({ editingId, initialUser, roles }: Props) => {
  const router = useRouter();
  const initialImage = initialUser?.imageUrl || "/placeholder.svg";
  const initialRole = initialUser?.roleId || "";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);

  const addUser = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
    "users",
  );
  const updateUser = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
    editingId as string,
    "users",
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof updateUsersSchema>>({
    resolver: zodResolver(updateUsersSchema),
    defaultValues: {
      firstName: initialUser?.firstName,
      lastName: initialUser?.lastName,
      status: initialUser?.status,
      phone: initialUser?.phone,
      email: initialUser?.email,
      imageUrl: imageUrl,
      roleId: initialRole,
    },
  });

  async function onSubmit(data: z.infer<typeof updateUsersSchema>) {
    setIsLoading(true);
    data.imageUrl = imageUrl;
    let responsePromise: Promise<any>;
    if (editingId) {
      responsePromise = updateUser.mutateAsync(data);
    } else {
      responsePromise = addUser.mutateAsync(data);
    }

    toast.promise(responsePromise, {
      loading: "Loading...",
      success: (data: any) => {
        form.reset();
        router.push("/dashboard/users");
        setIsLoading(false);
        return `${data?.message}`;
      },
      error: (data: any) => {
        const error = data?.message ? JSON.parse(data?.message) : "Blank";
        setIsLoading(false);
        return `${error?.message}`;
      },
    });
  }

  const status = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];
  const roleOptions = roles?.map((row) => {
    return { label: row.displayName, value: row.id };
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormHeader
            menu="users"
            submenu=""
            module="User"
            title={editingId ? "Update" : "Create new"}
          />
          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6 ">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First Name..." {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last Name..." {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Email Address..."
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Phone Number..."
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {!editingId && (
                        <PasswordTextInput form={form} name="password" />
                      )}

                      <SelectInput
                        add
                        tooltipText="Add Role"
                        href="/dashboard/users/roles/new"
                        form={form}
                        nameInput="roleId"
                        title="Role"
                        options={roleOptions}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8 ">
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6">
                    <div className="grid gap-3">
                      <SelectInput
                        form={form}
                        nameInput="status"
                        title="status"
                        options={status}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <ImageInput
                title="User Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endPoint={"userImage"}
              />

              <SubmitButton
                loading={isLoading}
                title={editingId ? "Submit Update" : "Save User"}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserForm;
