"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormHeader from "./form-header";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createSubCategorySchema } from "@/config/form-schema";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import { ICategory, ISubCategory } from "../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import { toast } from "sonner";
import SelectInput from "@/components/global/form-inputs/select-input";

type Props = {
  editingId?: string;
  initialCategory?: ISubCategory | undefined;
  category?: ICategory[] | undefined;
};

const SubCategoryForm = ({ editingId, initialCategory, category }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const addCategory = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sub-category`,
    "sub-category",
  );
  const updateCategory = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sub-category`,
    editingId as string,
    "sub-category",
  );

  const form = useForm<z.infer<typeof createSubCategorySchema>>({
    resolver: zodResolver(createSubCategorySchema),
    defaultValues: {
      title: initialCategory?.title,
      categoryId: initialCategory?.categoryId,
    },
  });

  const categoryOptions = category
    ? category?.map((row: ICategory) => {
        return {
          label: row.title,
          value: row.id,
        };
      })
    : [];

  async function onSubmit(data: z.infer<typeof createSubCategorySchema>) {
    setIsLoading(true);

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
        router.push("/dashboard/inventory/sub-category");
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
            submenu="sub-category"
            module="Main Category"
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
                        tooltipText="Add Category"
                        form={form}
                        nameInput="categoryId"
                        title="Category"
                        options={categoryOptions}
                        href="/dashboard/inventory/category/new"
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
                    <SubmitButton
                      loading={isLoading}
                      title={editingId ? "Submit Update" : "Save Main Category"}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubCategoryForm;
