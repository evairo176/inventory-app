"use client";
import React, { useEffect, useState } from "react";
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
import { IPermission, IRole } from "../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import { createRolesSchema } from "@/config/form-schema";

type Props = {
  editingId?: string;
  initialRole?: IRole | undefined;
  permissions?: IPermission[] | undefined;
};

const RoleForm = ({ editingId, initialRole, permissions }: Props) => {
  const [permissionIds, setPermissionIds] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const addRole = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/role`,
    "roles",
  );
  const updateRole = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/role`,
    editingId as string,
    "roles",
  );
  const status = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];

  useEffect(() => {
    if (initialRole && initialRole.permissions) {
      const defaultValueIds = initialRole.permissions.map(
        (rp: any) => rp.permissionId,
      );
      setPermissionIds(defaultValueIds);
    }
  }, [initialRole]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof createRolesSchema>>({
    resolver: zodResolver(createRolesSchema),
    defaultValues: {
      displayName: initialRole?.displayName,
      roleName: initialRole?.roleName,
      description: initialRole?.description,
      status: initialRole?.status,
      // imageUrl: imageUrl,
    },
  });

  async function onSubmit(data: z.infer<typeof createRolesSchema>) {
    setIsLoading(true);
    data.permissionIds = permissionIds;
    let responsePromise: Promise<any>;
    if (editingId) {
      responsePromise = updateRole.mutateAsync(data);
    } else {
      responsePromise = addRole.mutateAsync(data);
    }

    toast.promise(responsePromise, {
      loading: "Loading...",
      success: (data: any) => {
        form.reset();
        router.push("/dashboard/users/roles");
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

  // Handler for checkbox change
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setPermissionIds((prevState) => {
      if (checked) {
        // Add the item to the checked array if checked
        return [...prevState, id];
      } else {
        // Remove the item from the checked array if unchecked
        return prevState.filter((item) => item !== id);
      }
    });
  };

  console.log({
    initialRole: initialRole?.permissions?.map((row: any) => row.permission),
  });
  const moduleSet = new Set(permissions?.map((row) => row.module));
  const modules = Array.from(moduleSet).reverse();

  const permissionFilter = modules.map((module) => ({
    module,
    permissions: permissions?.filter((row) => row.module === module),
  }));

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormHeader
            menu="users"
            submenu="roles"
            module="Role"
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
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Title..." {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="roleName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role Name</FormLabel>
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
                    <div className="grid gap-3">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Module</TableHead>
                            <TableHead>Privileges</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {permissionFilter.map(
                            (permission: any, key: number) => (
                              <TableRow key={key}>
                                <TableCell className="font-medium">
                                  {permission.module?.toUpperCase()}
                                </TableCell>
                                <TableCell>
                                  <div className="grid grid-cols-1 gap-4  md:grid-cols-3 lg:grid-cols-4">
                                    {permission.permissions?.map(
                                      (row: any, key: number) => {
                                        return (
                                          <div
                                            key={key}
                                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                          >
                                            <Checkbox
                                              id={row.id}
                                              value={row.id}
                                              checked={permissionIds.includes(
                                                row.id,
                                              )}
                                              onCheckedChange={(event) =>
                                                handleCheckboxChange(
                                                  row.id,
                                                  event as boolean,
                                                )
                                              }
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                              <label
                                                htmlFor={row.id}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                              >
                                                {row.displayName}
                                              </label>
                                            </div>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
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

export default RoleForm;
