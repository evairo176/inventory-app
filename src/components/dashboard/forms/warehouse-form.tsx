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
import { createWarehouseSchema } from "@/config/form-schema";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import ImageInput from "@/components/global/form-inputs/image-input";
import { IWarehouse } from "../../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import { Country, State, City } from "country-state-city";

type Props = {
  editingId?: string;
  initialWarehouse?: IWarehouse | undefined;
};

const WarehouseForm = ({ editingId, initialWarehouse }: Props) => {
  const router = useRouter();
  const initialImage = initialWarehouse?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const addWarehouse = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse`,
    "warehouses",
  );
  const updateWarehouse = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse`,
    editingId as string,
    "warehouses",
  );
  // console.log(Country.getAllCountries());
  // console.log(State.getAllStates());
  const status = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];
  // 1. Define your form.
  const form = useForm<z.infer<typeof createWarehouseSchema>>({
    resolver: zodResolver(createWarehouseSchema),
    defaultValues: {
      name: initialWarehouse?.name,
      status: initialWarehouse?.status,
      phone: initialWarehouse?.phone,
      email: initialWarehouse?.email,
      country: initialWarehouse?.country,
      city: initialWarehouse?.email,
      zipCode: initialWarehouse?.zipCode,
      contactPerson: initialWarehouse?.contactPerson,
      imageUrl: imageUrl,
    },
  });

  async function onSubmit(data: z.infer<typeof createWarehouseSchema>) {
    setIsLoading(true);
    try {
      data.imageUrl = imageUrl;
      let response: any;
      if (editingId) {
        response = await updateWarehouse.mutateAsync(data);
      } else {
        response = await addWarehouse.mutateAsync(data);
      }

      toast({
        title: `${response.message}`,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });

      form.reset();

      router.push("/dashboard/inventory/warehouse");
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

  function goBack() {
    router.back();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormHeader
            goBack={goBack}
            module="Warehouse"
            title={editingId ? "Update" : "Create new"}
          />
          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Warehouse Name</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Name..." {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone..." {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Country</FormLabel>
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
                                      ? Country.getAllCountries()?.find(
                                          (country) =>
                                            country.name === field.value,
                                        )?.name
                                      : "Select country"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className=" p-0">
                                <Command>
                                  <CommandInput placeholder="Search status..." />
                                  <CommandEmpty>No country found.</CommandEmpty>
                                  <CommandGroup>
                                    <CommandList>
                                      {Country.getAllCountries()?.map(
                                        (country) => (
                                          <CommandItem
                                            value={country.name}
                                            key={country.name}
                                            onSelect={() => {
                                              form.setValue(
                                                "country",
                                                country.name,
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                country.name === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {country.name}
                                          </CommandItem>
                                        ),
                                      )}
                                    </CommandList>
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>City</FormLabel>
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
                                      ? City.getAllCities()?.find(
                                          (city) => city.name === field.value,
                                        )?.name
                                      : "Select country"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className=" p-0">
                                <Command>
                                  <CommandInput placeholder="Search status..." />
                                  <CommandEmpty>No country found.</CommandEmpty>
                                  <CommandGroup>
                                    <CommandList>
                                      {City.getAllCities()?.map((city) => (
                                        <CommandItem
                                          value={city.name}
                                          key={city.name}
                                          onSelect={() => {
                                            form.setValue("city", city.name);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              city.name === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {city.name}
                                        </CommandItem>
                                      ))}
                                    </CommandList>
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Contact Person..."
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip code</FormLabel>
                            <FormControl>
                              <Input placeholder="Zip code..." {...field} />
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
                <CardHeader>
                  <CardTitle>Warehouse Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
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
                              Warehouse.
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
                title="Warehouse Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endPoint={"warehouseImage"}
              />

              <SubmitButton
                loading={isLoading}
                title={editingId ? "Submit Update" : "Save Warehouse"}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WarehouseForm;
