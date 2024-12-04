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
import {
  createCustomersSchema,
  updateCustomerSchema,
} from "@/config/form-schema";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import ImageInput from "@/components/global/form-inputs/image-input";
import { IRole, ICustomer } from "../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import SelectInput from "@/components/global/form-inputs/select-input";
import PasswordTextInput from "@/components/global/form-inputs/password-text-input";

type Props = {
  editingId?: string;
  initialUser?: ICustomer | undefined;
  roles: IRole[];
};

const CustomerForm = ({ editingId, initialUser, roles }: Props) => {
  const router = useRouter();
  const initialImage = initialUser?.user?.imageUrl || "/placeholder.svg";
  const initialRole =
    initialUser?.user?.roleId ||
    "" ||
    roles?.find((row) => row.roleName === "customer")?.id;
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);

  const addUser = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer`,
    "customers",
  );
  const updateUser = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer`,
    editingId as string,
    "customers",
  );

  const schema = editingId ? updateCustomerSchema : createCustomersSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: initialUser?.user?.firstName,
      lastName: initialUser?.user?.lastName,
      status: initialUser?.user?.status,
      phone: initialUser?.user?.phone,
      email: initialUser?.user?.email,

      imageUrl: imageUrl,

      additionalInfo: initialUser?.additionalInfo,
      shippingAddress: initialUser?.shippingAddress,
      billingAddress: initialUser?.billingAddress,
    },
  });

  console.log({ initialUser });

  async function onSubmit(data: z.infer<typeof schema>) {
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
        router.push("/dashboard/sales/customers");
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
                        disabled={true}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Info</FormLabel>
                            <FormControl>
                              <Textarea className="min-h-32" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
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
          <div className="w-full">
            <Card>
              <CardContent>
                <div className="mt-4 grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="shippingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shipping Address</FormLabel>
                          <FormControl>
                            <Textarea className="min-h-32" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="billingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Billing Address</FormLabel>
                          <FormControl>
                            <Textarea className="min-h-32" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerForm;
