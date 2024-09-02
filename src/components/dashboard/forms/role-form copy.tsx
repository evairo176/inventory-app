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
import { IRole } from "../../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import { createRolesSchema } from "@/config/form-schema";
import { permissions } from "@/config/permissions";

type Props = {
  editingId?: string;
  initialRole?: IRole | undefined;
};

const RoleForm = ({ editingId, initialRole }: Props) => {
  const router = useRouter();
  // const initialImage = initialRole?.imageUrl || "/placeholder.svg";
  // const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
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
  // 1. Define your form.
  const form = useForm<z.infer<typeof createRolesSchema>>({
    resolver: zodResolver(createRolesSchema),
    defaultValues: {
      displayName: initialRole?.displayName,
      roleName: initialRole?.roleName,
      description: initialRole?.description,
      // imageUrl: imageUrl,
    },
  });

  async function onSubmit(data: z.infer<typeof createRolesSchema>) {
    setIsLoading(true);
    try {
      console.log({ data });
      // data.imageUrl = imageUrl;
      // let response: any;
      // if (editingId) {
      //   response = await updateRole.mutateAsync(data);
      // } else {
      //   response = await addRole.mutateAsync(data);
      // }

      // toast({
      //   title: `${response.message}`,
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // });

      // form.reset();

      // router.push("/dashboard/inventory/roles");
    } catch (error: any) {
      console.error("There was an error creating the data!", error);
      toast.error(`${error?.message}`);
    } finally {
      setIsLoading(false);
    }
  }

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
          <div className="mt-3 grid grid-cols-1 gap-4 lg:gap-8">
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
                        {permissions.map((permission, key) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium">
                              {permission.model}
                            </TableCell>
                            <TableCell>
                              <div className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
                                {permission.permissions?.map((row, key) => {
                                  return (
                                    <FormField
                                      key={key}
                                      control={form.control}
                                      name={row.name as any}
                                      render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value}
                                              onCheckedChange={field.onChange}
                                            />
                                          </FormControl>
                                          <div className="space-y-1 leading-none">
                                            <FormLabel>{row.display}</FormLabel>
                                          </div>
                                        </FormItem>
                                      )}
                                    />
                                  );
                                })}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="mt-4">
                  <SubmitButton
                    loading={isLoading}
                    title={editingId ? "Submit Update" : "Save Role"}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RoleForm;
