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
import { toast } from "sonner";
import { createProductSchema } from "@/config/form-schema";
import SubmitButton from "@/components/global/form-inputs/submit-button";
import ImageInput from "@/components/global/form-inputs/image-input";
import {
  IBrand,
  ICategory,
  IProduct,
  ISupplier,
  IUnit,
} from "../../../types/types";
import { useCreate, useUpdate } from "@/action/global-action";
import SelectInput from "@/components/global/form-inputs/select-input";
import {
  generateBarcode,
  generateUniqueNineDigitNumber,
} from "@/utils/barcode";
import Image from "next/image";
import MultipleImageInput from "@/components/global/form-inputs/multiple-image-input";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { CalendarComponent } from "@/components/ui/calendar";
import { convertToIsoDatetime } from "@/utils/convert-to-iso-datetime";

type Props = {
  editingId?: string;
  initialProduct?: IProduct | undefined;
  categories?: ICategory[] | undefined;
  brands: IBrand[] | undefined;
  suppliers: ISupplier[] | undefined;
  units: IUnit[] | undefined;
};

const ProductForm = ({
  editingId,
  initialProduct,
  categories,
  brands,
  suppliers,
  units,
}: Props) => {
  const router = useRouter();
  const initialImages = initialProduct?.productImages || [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];
  const productCode = initialProduct?.productCode
    ? generateBarcode(initialProduct?.productCode)
    : "";
  const [productImages, setProductImages] = useState(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [barcode, setBarcode] = useState<string>("");
  const [imageBarcode, setImageBarcode] = useState<string>(productCode);
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
      name: initialProduct?.name,
      productDetails: initialProduct?.productDetails,
      alertQty: initialProduct?.alertQty,
      productCost: initialProduct?.productCost,
      productPrice: initialProduct?.productPrice,
      productTax: initialProduct?.productTax,
      productThumbnail: initialProduct?.productThumbnail
        ? initialProduct?.productThumbnail
        : "/placeholder.svg",
      productImages: productImages,
      isFeatured: initialProduct?.isFeatured,
      batchNumber: initialProduct?.batchNumber,
      productCode: initialProduct?.productCode,
      stockQty: initialProduct?.stockQty,
      status: initialProduct?.status,
      categoryId: initialProduct?.categoryId,
      brandId: initialProduct?.brandId,
      supplierId: initialProduct?.supplierId,
      expiryDate: initialProduct?.expiryDate
        ? new Date(initialProduct?.expiryDate)
        : undefined,
      unitId: initialProduct?.unitId,
      taxMethod: initialProduct?.taxMethod as "INCLUSIVE" | "EXCLUSIVE",
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

  const taxMethodOptions = [
    { label: "Inclusive", value: "INCLUSIVE" },
    { label: "Exclusive", value: "EXCLUSIVE" },
  ];

  async function onSubmit(data: z.infer<typeof createProductSchema>) {
    console.log({ data });
    setIsLoading(true);
    data.productImages = productImages;
    data.productThumbnail = productImages[0];
    let responsePromise: Promise<any>;
    if (editingId) {
      responsePromise = updateProduct.mutateAsync(data);
    } else {
      responsePromise = addProduct.mutateAsync(data);
    }

    toast.promise(responsePromise, {
      loading: "Loading...",
      success: (data: any) => {
        form.reset();
        router.push("/dashboard/inventory/products");
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
  console.log({ form: form.formState.errors });
  function genarateBarcode() {
    const uniqueNumber = generateUniqueNineDigitNumber(); // Generate a unique barcode number
    const barcodeDataUrl = generateBarcode(uniqueNumber);

    setBarcode(uniqueNumber);
    form.setValue("productCode", uniqueNumber);
    setImageBarcode(barcodeDataUrl);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormHeader
            menu="inventory"
            submenu="products"
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
                            <FormLabel>Name Product</FormLabel>
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
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="mb-[5px] mt-[5px]">
                              Expiry Date
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-2"
                                align="start"
                              >
                                <CalendarComponent
                                  initialFocus
                                  mode="single"
                                  selected={field.value ?? undefined}
                                  toYear={2050}
                                  translate="en"
                                  onSelect={field.onChange}
                                />
                              </PopoverContent>
                            </Popover>

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
                                onChange={(event) =>
                                  field.onChange(parseFloat(event.target.value))
                                }
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
                      <FormField
                        control={form.control}
                        name="productCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Cost</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Product Cost..."
                                {...field}
                                onChange={(event) =>
                                  field.onChange(parseFloat(event.target.value))
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="productPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Product Price..."
                                {...field}
                                onChange={(event) =>
                                  field.onChange(parseFloat(event.target.value))
                                }
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
                      <FormField
                        control={form.control}
                        name="productTax"
                        render={({ field }) => (
                          <FormItem>
                            <div className="mb-[10px] mt-[5px] flex items-center gap-2">
                              <FormLabel>Product Tax (%)</FormLabel>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button type="button">
                                      <CircleHelp className="h-4 w-4" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      The product tax is in percentage eg 3{" "}
                                      {"=>"} 3%
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Product Tax..."
                                {...field}
                                onChange={(event) =>
                                  field.onChange(parseFloat(event.target.value))
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <SelectInput
                        form={form}
                        nameInput="taxMethod"
                        title="Tax Method"
                        options={taxMethodOptions}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="mt-4 grid gap-6">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="batchNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Batch Number</FormLabel>
                            <FormControl>
                              <Input
                                className="justify-between"
                                type="text"
                                placeholder="Batch Number..."
                                {...field}
                                onChange={(event) =>
                                  field.onChange(event.target.value)
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Featured</FormLabel>
                              <FormDescription>
                                Featured Products will be used in POS
                              </FormDescription>
                            </div>
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
                                onClick={genarateBarcode}
                              >
                                <RefreshCw className="5-4 w-4" />
                              </Button>
                            </div>
                            {imageBarcode && (
                              <Image
                                src={imageBarcode}
                                width={200}
                                height={100}
                                alt={barcode}
                                className="mx-auto h-[100px] w-[200px]"
                              />
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <FormField
                        control={form.control}
                        name="stockQty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Stock Qty</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Product Stock Qty..."
                                {...field}
                                onChange={(event) =>
                                  field.onChange(parseFloat(event.target.value))
                                }
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
              <MultipleImageInput
                title="Product Images"
                imageUrls={productImages}
                setImageUrls={setProductImages}
                endPoint={"productImages"}
              />
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
