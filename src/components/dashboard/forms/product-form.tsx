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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Barcode,
  Check,
  ChevronsUpDown,
  CircleHelp,
  RefreshCw,
  Upload,
} from "lucide-react";
import FormHeader from "./form-header";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { createProductSchema } from "@/config/form-schema";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import ImageInput from "@/components/global/form-inputs/image-input";
import {
  IBrand,
  ICategory,
  IProduct,
  ISupplier,
  IUnit,
  IWarehouse,
} from "../../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import SelectInput from "@/components/global/form-inputs/select-input";

type Props = {
  editingId?: string;
  initialProduct?: IProduct | undefined;
  categories?: ICategory[] | undefined;
  brands: IBrand[] | undefined;
  warehouses: IWarehouse[] | undefined;
  suppliers: ISupplier[] | undefined;
  units: IUnit[] | undefined;
};

const ProductForm = ({
  editingId,
  initialProduct,
  categories,
  brands,
  warehouses,
  suppliers,
  units,
}: Props) => {
  const router = useRouter();
  const initialImage = initialProduct?.productThumbnail || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const addProduct = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product`,
    "products",
  );
  const updateProduct = useUpdate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product`,
    editingId as string,
    "products",
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      // title: initialProduct?.title,
      // description: initialProduct?.description,
      // status: initialProduct?.status,
      // imageUrl: imageUrl,
    },
  });

  const categoryOptions = categories
    ? categories?.map((row: ICategory) => {
        return {
          label: row.title,
          value: row.id,
        };
      })
    : [];

  const brandOptions = brands
    ? brands?.map((row: IBrand) => {
        return {
          label: row.title,
          value: row.id,
        };
      })
    : [];

  const warehouseOptions = warehouses
    ? warehouses?.map((row: IWarehouse) => {
        return {
          label: row.name,
          value: row.id,
        };
      })
    : [];

  const suppliersOptions = suppliers
    ? suppliers?.map((row: ISupplier) => {
        return {
          label: row.name,
          value: row.id,
        };
      })
    : [];

  const unitsOptions = units
    ? units?.map((row: IUnit) => {
        return {
          label: `${row.title} (${row.abbreviation})`,
          value: row.id,
        };
      })
    : [];

  const status = [
    { label: "Active", value: "ACTIVE" },
    { label: "Disabled", value: "DISABLED" },
  ];

  async function onSubmit(data: z.infer<typeof createProductSchema>) {
    setIsLoading(true);
    try {
      data.productThumbnail = imageUrl;
      let response: any;
      if (editingId) {
        response = await updateProduct.mutateAsync(data);
      } else {
        response = await addProduct.mutateAsync(data);
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

      router.push("/dashboard/inventory/products");
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
            module="Product"
            title={editingId ? "Update" : "Create new"}
          />
          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name Producr</FormLabel>
                            <FormControl>
                              <Input placeholder="Name Product..." {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="productDetails"
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
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <SelectInput
                        add
                        tooltipText="Add Category"
                        form={form}
                        nameInput="categoryId"
                        title="Category"
                        options={categoryOptions}
                        href="/dashboard/inventory/products/new"
                      />

                      <SelectInput
                        add
                        tooltipText="Add Brand"
                        form={form}
                        nameInput="brandId"
                        title="Brand"
                        options={brandOptions}
                        href="/dashboard/inventory/brands/new"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <SelectInput
                        add
                        tooltipText="Add Supplier"
                        form={form}
                        nameInput="supplierId"
                        title="Supplier"
                        options={suppliersOptions}
                        href="/dashboard/inventory/suppliers/new"
                      />
                      <SelectInput
                        add
                        tooltipText="Add Warehouses"
                        form={form}
                        nameInput="warehouseId"
                        title="Warehouse"
                        options={warehouseOptions}
                        href="/dashboard/inventory/warehouse/new"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <SelectInput
                        add
                        tooltipText="Add Unit"
                        form={form}
                        nameInput="unitId"
                        title="Unit"
                        options={unitsOptions}
                        href="/dashboard/inventory/units/new"
                      />
                      <FormField
                        control={form.control}
                        name="alertQty"
                        render={({ field }) => (
                          <FormItem>
                            <div className="mb-[10px] mt-[5px] flex items-center gap-2">
                              <FormLabel>Quantity Alert</FormLabel>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button type="button">
                                      <CircleHelp className="h-4 w-4" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      After this stock quantity it will enable
                                      low stock warning.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Quantity Alert..."
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
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="categoryId"
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
                              product.
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
                title="Product Main Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endPoint={"productImage"}
              />
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6">
                    <div className="grid grid-cols-1">
                      <FormField
                        control={form.control}
                        name="productCode"
                        render={({ field }) => (
                          <FormItem>
                            <div className="mb-[10px] mt-[5px] flex items-center gap-2">
                              <FormLabel>Barcode</FormLabel>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button type="button">
                                      <CircleHelp className="h-4 w-4" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Generate random barcode.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <div className="item-center flex gap-2">
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Generate Barcode..."
                                  {...field}
                                />
                              </FormControl>
                              <Button
                                variant={"outline"}
                                type="button"
                                size={"sm"}
                              >
                                <RefreshCw className="5-4 w-4" />
                              </Button>
                            </div>
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
                title={editingId ? "Submit Update" : "Save Product"}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
