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
import { createAdvertSchema } from "@/config/form-schema";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import ImageInput from "@/components/global/form-inputs/image-input";
import { AdvertSize, AdvertType, IAdvert } from "../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import { toast } from "sonner";
import SelectInput from "@/components/global/form-inputs/select-input";

type Props = {
  editingId?: string;
  initialAdvert?: IAdvert | undefined;
};

const AdvertForm = ({ editingId, initialAdvert }: Props) => {
  const router = useRouter();
  const initialImage = initialAdvert?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const addAdvert = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/advert`,
    "advert",
  );
  const updateAdvert = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/advert`,
    editingId as string,
    "advert",
  );

  const status: {
    label: string;
    value: "ACTIVE" | "DISABLED";
  }[] = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];

  const SIZE_ADVERT: {
    label: string;
    value: AdvertSize;
  }[] = [
    { label: "FULL", value: "FULL" },
    { label: "HALF", value: "HALF" },
    { label: "QUARTER", value: "QUARTER" },
  ];

  const TYPE_ADVERT: {
    label: string;
    value: AdvertType;
  }[] = [
    { label: "ADVERT", value: "ADVERT" },
    { label: "BANNER", value: "BANNER" },
  ];

  const form = useForm<z.infer<typeof createAdvertSchema>>({
    resolver: zodResolver(createAdvertSchema),
    defaultValues: {
      title: initialAdvert?.title,
      status: initialAdvert?.status ? "ACTIVE" : "DISABLED",
      link: initialAdvert?.link,
      imageUrl: imageUrl,
      size: initialAdvert?.size as AdvertSize,
      type: initialAdvert?.type,
    },
  });

  async function onSubmit(data: z.infer<typeof createAdvertSchema>) {
    setIsLoading(true);
    data.imageUrl = imageUrl;
    let responsePromise: Promise<any>;
    if (editingId) {
      responsePromise = updateAdvert.mutateAsync(data);
    } else {
      responsePromise = addAdvert.mutateAsync(data);
    }

    toast.promise(responsePromise, {
      loading: "Loading...",
      success: (data: any) => {
        form.reset();
        router.push("/dashboard/inventory/advert");
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
            submenu="advert"
            module="Advert"
            title={editingId ? "Update" : "Create new"}
          />
          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6 ">
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
                        name="link"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                              <Input placeholder="Link..." {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <SelectInput
                        form={form}
                        nameInput="size"
                        title="Size"
                        options={SIZE_ADVERT}
                      />

                      <SelectInput
                        form={form}
                        nameInput="type"
                        title="Type"
                        options={TYPE_ADVERT}
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
                        title="Status"
                        options={status}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <ImageInput
                title="Advert Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endPoint={"advertImage"}
              />

              <SubmitButton
                loading={isLoading}
                title={editingId ? "Submit Update" : "Save Advert"}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdvertForm;
