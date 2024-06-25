import { z } from "zod";

const createCategorySchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  slug: z.string().optional(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
});

const getAllCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  status: z.string(),
  imageUrl: z.string(),
  createdAt: z.string(),
});

const createBrandSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  slug: z.string().optional(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
});

const getAllBrandSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.string(),
  imageUrl: z.string(),
  createdAt: z.string(),
});

const createWarehouseSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "state must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "country must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  contactPerson: z.string().min(2, {
    message: "contact person must be at least 2 characters.",
  }),
  zipCode: z.string().min(2, {
    message: "zipCode must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

const getAllWarehouseSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  city: z.string(),
  phone: z.string(),
  email: z.string(),
  zipCode: z.string(),
  imageUrl: z.string(),
  status: z.string(),
  contactPerson: z.string(),
  createdAt: z.string(),
});

const createSupplierSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "companyName must be at least 2 characters.",
  }),
  vatNumber: z.string().min(2, {
    message: "vatNumber must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "state must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "country must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  address: z.string().min(2, {
    message: "address person must be at least 2 characters.",
  }),
  postalCode: z.string().min(2, {
    message: "postalCode must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

const getAllSupplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  companyName: z.string(),
  vatNumber: z.string(),
  country: z.string(),
  city: z.string(),
  phone: z.string(),
  email: z.string(),
  postalCode: z.string(),
  imageUrl: z.string(),
  status: z.string(),
  address: z.string(),
  createdAt: z.string(),
});

const createUnitSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  abbreviation: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

const getAllUnitSchema = z.object({
  id: z.string(),
  title: z.string(),
  abbreviation: z.string(),
  status: z.string(),
  createdAt: z.string(),
});

const createProductSchema = z.object({
  name: z.string(),
  productCode: z.string(),
  stockQty: z.number(),
  warehouseId: z.string(),
  supplierId: z.string(),
  brandId: z.string(),
  categoryId: z.string(),
  unitId: z.string(),
  productCost: z.number(),
  productPrice: z.number(),
  alertQty: z.number(),
  productTax: z.number(),
  taxMethod: z.enum(["INCLUSIVE", "EXCLUSIVE"]), // Assuming taxMethod can be "inclusive" or "exclusive"
  productImages: z.array(z.string()),
  productThumbnail: z.string(),
  productDetails: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

const getAllProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  productCode: z.string(),
  stockQty: z.number(),
  warehouseId: z.string(),
  supplierId: z.string(),
  brandId: z.string(),
  categoryId: z.string(),
  unitId: z.string(),
  productCost: z.number(),
  productPrice: z.number(),
  alertQty: z.number(),
  productTax: z.number(),
  taxMethod: z.string(), // Assuming taxMethod can be "inclusive" or "exclusive"
  productImages: z.array(z.string()),
  productThumbnail: z.string(),
  productDetails: z.string(),
  status: z.string(),
});

export {
  createCategorySchema,
  getAllCategorySchema,
  createBrandSchema,
  getAllBrandSchema,
  createWarehouseSchema,
  getAllWarehouseSchema,
  createSupplierSchema,
  getAllSupplierSchema,
  createUnitSchema,
  getAllUnitSchema,
  createProductSchema,
  getAllProductSchema,
};
