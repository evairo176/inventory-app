"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Check, ChevronsUpDown, Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import FormHeader from "./form-header";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import { IPermission } from "../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import { createPermissionsSchema } from "@/config/form-schema";
import SelectInput from "@/components/global/form-inputs/select-input";
import { sidebarLinks } from "@/config/sidebar";

type Props = {
  editingId?: string;
  initialPermission?: IPermission | undefined;
};

const PermissionForm = ({ editingId, initialPermission }: Props) => {
  const router = useRouter();
  // const initialImage = initialPermission?.imageUrl || "/placeholder.svg";
  // const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const addPermission = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/permission`,
    "permissions",
  );
  const updatePermission = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/permission`,
    editingId as string,
    "permissions",
  );
  const status = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];
  // 1. Define your form.
  const form = useForm<z.infer<typeof createPermissionsSchema>>({
    resolver: zodResolver(createPermissionsSchema),
    defaultValues: {
      displayName: initialPermission?.displayName,
      permissionName: initialPermission?.permissionName,
      description: initialPermission?.description,
      status: initialPermission?.status,
      // imageUrl: imageUrl,
    },
  });

  async function onSubmit(data: z.infer<typeof createPermissionsSchema>) {
    setIsLoading(true);
    let responsePromise: Promise<any>;
    if (editingId) {
      responsePromise = updatePermission.mutateAsync(data);
    } else {
      responsePromise = addPermission.mutateAsync(data);
    }

    toast.promise(responsePromise, {
      loading: "Loading...",
      success: (data: any) => {
        form.reset();
        router.push("/dashboard/users/permissions");
        setIsLoading(false);
        return `${data?.message}`;
      },
      error: (data: any) => {
        setIsLoading(false);
        return `${data?.message}`;
      },
    });
  }

  const moduleOption = sidebarLinks.flatMap((link) => {
    if (link.dropdown && link.dropdownMenu) {
      return link.dropdownMenu.map((dropdownItem) => ({
        label: dropdownItem.title,
        value: dropdownItem.title?.toLocaleLowerCase(),
      }));
    } else {
      return { label: link.title, value: link.title?.toLocaleLowerCase() };
    }
  });

  const displayNameOption = [
    {
      label: "View",
      value: "View",
    },
    {
      label: "Add",
      value: "Add",
    },
    {
      label: "Update",
      value: "Update",
    },
    {
      label: "Delete",
      value: "Delete",
    },
  ];

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormHeader
            menu="users"
            submenu="permissions"
            module="Permission"
            title={editingId ? "Update" : "Create new"}
          />
          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6 ">
                    <div className="grid gap-3">
                      <SelectInput
                        tooltipText="Add Module"
                        form={form}
                        nameInput="module"
                        title="Module"
                        options={moduleOption}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <SelectInput
                        tooltipText="Add Display Name"
                        form={form}
                        nameInput="displayName"
                        title="Display Name"
                        options={displayNameOption}
                      />
                      <FormField
                        control={form.control}
                        name="permissionName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Permission Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Title..." {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                id="description"
                                className="min-h-32"
                                {...field}
                              />
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
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Status</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value
                                      ? status.find(
                                          (stat) => stat.value === field.value,
                                        )?.label
                                      : "Select status"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className=" p-0">
                                <Command>
                                  <CommandInput placeholder="Search status..." />
                                  <CommandEmpty>No status found.</CommandEmpty>
                                  <CommandGroup>
                                    <CommandList>
                                      {status.map((stat) => (
                                        <CommandItem
                                          value={stat.label}
                                          key={stat.value}
                                          onSelect={() => {
                                            form.setValue("status", stat.value);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              stat.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {stat.label}
                                        </CommandItem>
                                      ))}
                                    </CommandList>
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              This is the status that will be used in display
                              Unit.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <SubmitButton
                loading={isLoading}
                title={editingId ? "Submit Update" : "Save Role"}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PermissionForm;
