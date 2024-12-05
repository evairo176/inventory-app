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
import { Check, ChevronsUpDown, Upload } from "lucide-react";
import FormHeader from "./form-header";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { createCategorySchema } from "@/config/form-schema";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import ImageInput from "@/components/global/form-inputs/image-input";
import { ICategory, IMainCategory } from "../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import { toast } from "sonner";
import SelectInput from "@/components/global/form-inputs/select-input";

type Props = {
  editingId?: string;
  initialCategory?: ICategory | undefined;
  mainCategory?: IMainCategory[] | undefined;
};

const CategoryForm = ({ editingId, initialCategory, mainCategory }: Props) => {
  const router = useRouter();
  const initialImage = initialCategory?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const addCategory = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
    "category",
  );
  const updateCategory = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
    editingId as string,
    "category",
  );

  const status = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];
  // 1. Define your form.
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      title: initialCategory?.title,
      description: initialCategory?.description,
      status: initialCategory?.status,
      mainCategoryId: initialCategory?.mainCategoryId,
      imageUrl: imageUrl,
    },
  });

  const mainCategoryOptions = mainCategory
    ? mainCategory?.map((row: IMainCategory) => {
        return {
          label: row.title,
          value: row.id,
        };
      })
    : [];

  async function onSubmit(data: z.infer<typeof createCategorySchema>) {
    setIsLoading(true);
    data.imageUrl = imageUrl;
    let responsePromise: Promise<any>;
    if (editingId) {
      responsePromise = updateCategory.mutateAsync(data);
    } else {
      responsePromise = addCategory.mutateAsync(data);
    }

    toast.promise(responsePromise, {
      loading: "Loading...",
      success: (data: any) => {
        form.reset();
        router.push("/dashboard/inventory/category");
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

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormHeader
            menu="inventory"
            submenu="category"
            module="Category"
            title={editingId ? "Update" : "Create new"}
          />
          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6 ">
                    <div className="grid gap-3">
                      <SelectInput
                        add
                        tooltipText="Add Main Category"
                        form={form}
                        nameInput="mainCategoryId"
                        title="Main Category"
                        options={mainCategoryOptions}
                        href="/dashboard/inventory/main-category/new"
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
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
                              category.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <ImageInput
                title="Category Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endPoint={"categoryImage"}
              />

              <SubmitButton
                loading={isLoading}
                title={editingId ? "Submit Update" : "Save Category"}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
