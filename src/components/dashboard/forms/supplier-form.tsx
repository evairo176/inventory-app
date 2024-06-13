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
import { createSupplierSchema } from "@/config/form-schema";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import ImageInput from "@/components/global/form-inputs/image-input";
import { ISupplier } from "../../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import { Country, State, City } from "country-state-city";

type Props = {
  editingId?: string;
  initialSupplier?: ISupplier | undefined;
};

const SupplierForm = ({ editingId, initialSupplier }: Props) => {
  const router = useRouter();
  const initialImage = initialSupplier?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState({
    label: initialSupplier?.country as string,
    value: initialSupplier
      ? Country.getAllCountries()?.find(
          (row) => row.name === initialSupplier?.country,
        )?.isoCode
      : "",
  });
  const [state, setState] = useState({
    label: initialSupplier?.state as string,
    value: initialSupplier
      ? State.getAllStates()?.find((row) => row.name === initialSupplier?.state)
          ?.isoCode
      : "",
  });
  const [city, setCity] = useState({
    label: initialSupplier?.city as string,
    value: initialSupplier?.city,
  });
  const addSupplier = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/supplier`,
    "suppliers",
  );
  const updateSupplier = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/supplier`,
    editingId as string,
    "suppliers",
  );
  const status = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];

  // 1. Define your form.
  const form = useForm<z.infer<typeof createSupplierSchema>>({
    resolver: zodResolver(createSupplierSchema),
    defaultValues: {
      name: initialSupplier?.name,
      companyName: initialSupplier?.companyName,
      vatNumber: initialSupplier?.vatNumber,
      status: initialSupplier?.status,
      phone: initialSupplier?.phone,
      email: initialSupplier?.email,
      country: initialSupplier?.country,
      state: initialSupplier?.state,
      city: initialSupplier?.city,
      postalCode: initialSupplier?.postalCode,
      address: initialSupplier?.address,
      imageUrl: imageUrl,
    },
  });

  async function onSubmit(data: z.infer<typeof createSupplierSchema>) {
    setIsLoading(true);
    try {
      data.imageUrl = imageUrl;
      let response: any;
      if (editingId) {
        response = await updateSupplier.mutateAsync(data);
      } else {
        response = await addSupplier.mutateAsync(data);
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

      router.push("/dashboard/inventory/suppliers");
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

  const onCountryChange = (countryCode: string, name: string) => {
    setCountry({
      label: name,
      value: countryCode,
    });
    form.setValue("country", name);
    form.setValue("state", "");
    form.setValue("city", "");
  };

  const onStateChange = (stateCode: string, name: string) => {
    setState({
      label: name,
      value: stateCode,
    });
    form.setValue("state", name);
    form.setValue("city", "");
  };

  const onCityChange = (cityCode: string, name: string) => {
    setCity({
      label: name,
      value: cityCode,
    });
    form.setValue("city", name);
  };

  function goBack() {
    router.back();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormHeader
            goBack={goBack}
            module="Supplier"
            title={editingId ? "Update" : "Create new"}
          />
          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Name</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="vatNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>VAT number</FormLabel>
                            <FormControl>
                              <Input placeholder="VAT number..." {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Company Name..." {...field} />
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
                                      ? Country.getAllCountries().find(
                                          (countryCode) =>
                                            countryCode.name === field.value,
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
                                        (countryCode) => (
                                          <CommandItem
                                            value={countryCode.name}
                                            key={countryCode.isoCode}
                                            onSelect={() =>
                                              onCountryChange(
                                                countryCode.isoCode,
                                                countryCode.name,
                                              )
                                            }
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                countryCode.name === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {countryCode.name}
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
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>State</FormLabel>
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
                                      ? State.getStatesOfCountry(
                                          country.value,
                                        ).find(
                                          (stateCode) =>
                                            stateCode.name === field.value,
                                        )?.name
                                      : "Select state"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className=" p-0">
                                <Command>
                                  <CommandInput placeholder="Search status..." />
                                  <CommandEmpty>No state found.</CommandEmpty>
                                  <CommandGroup>
                                    <CommandList>
                                      {State.getStatesOfCountry(
                                        country.value,
                                      )?.map((stateCode) => (
                                        <CommandItem
                                          value={stateCode.name}
                                          key={stateCode.isoCode}
                                          onSelect={() =>
                                            onStateChange(
                                              stateCode.isoCode,
                                              stateCode.name,
                                            )
                                          }
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              stateCode.name === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {stateCode.name}
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
                                      ? City.getCitiesOfState(
                                          country.value as string,
                                          state.value as string,
                                        ).find(
                                          (cityCode) =>
                                            cityCode.name === field.value,
                                        )?.name
                                      : "Select city"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className=" p-0">
                                <Command>
                                  <CommandInput placeholder="Search status..." />
                                  <CommandEmpty>No city found.</CommandEmpty>
                                  <CommandGroup>
                                    <CommandList>
                                      {City.getCitiesOfState(
                                        country.value as string,
                                        state.value as string,
                                      )?.map((cityCode) => (
                                        <CommandItem
                                          value={cityCode.name}
                                          key={cityCode.name}
                                          onSelect={() =>
                                            onCityChange(
                                              cityCode.name,
                                              cityCode.name,
                                            )
                                          }
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              cityCode.name === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {cityCode.name}
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
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Address..." {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Postal code..." {...field} />
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
                  <CardTitle>Supplier Status</CardTitle>
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
                              Supplier.
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
                title="Supplier Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endPoint={"supplierImage"}
              />

              <SubmitButton
                loading={isLoading}
                title={editingId ? "Submit Update" : "Save Supplier"}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SupplierForm;
