"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "@/components/ui/use-toast";
import { createUnitSchema } from "@/config/form-schema";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import ImageInput from "@/components/global/form-inputs/image-input";
import { IUnit } from "../../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";

type Props = {
  editingId?: string;
  initialUnit?: IUnit | undefined;
};

const UnitForm = ({ editingId, initialUnit }: Props) => {
  const router = useRouter();
  // const initialImage = initialUnit?.imageUrl || "/placeholder.svg";
  // const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const addUnit = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/unit`,
    "units",
  );
  const updateUnit = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/unit`,
    editingId as string,
    "units",
  );
  const status = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];
  // 1. Define your form.
  const form = useForm<z.infer<typeof createUnitSchema>>({
    resolver: zodResolver(createUnitSchema),
    defaultValues: {
      title: initialUnit?.title,
      abbreviation: initialUnit?.abbreviation,
      status: initialUnit?.status,
      // imageUrl: imageUrl,
    },
  });

  async function onSubmit(data: z.infer<typeof createUnitSchema>) {
    setIsLoading(true);
    try {
      // data.imageUrl = imageUrl;
      let response: any;
      if (editingId) {
        response = await updateUnit.mutateAsync(data);
      } else {
        response = await addUnit.mutateAsync(data);
      }

      toast({
        title: `${response.message}`,
      });

      form.reset();

      router.push("/dashboard/inventory/units");
    } catch (error: any) {
      console.error("There was an error creating the data!", error);
      toast({
        title: error?.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormHeader
            menu="inventory"
            submenu="units"
            module="Unit"
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
                        name="abbreviation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Abbreviation</FormLabel>
                            <FormControl>
                              <Input placeholder="Abbreviation..." {...field} />
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
                title={editingId ? "Submit Update" : "Save Unit"}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UnitForm;
