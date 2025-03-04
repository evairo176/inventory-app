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
  mainCategoryId: z.string(),
});

const createAdvertSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  status: z.enum(["ACTIVE", "DISABLED"]),
  type: z.enum(["BANNER", "ADVERT"]),
  size: z.enum(["FULL", "HALF", "QUARTER"]),
  imageUrl: z.string({ required_error: "Image is required" }),
  link: z.string({ required_error: "Link is required" }),
});

const getAllAdvertSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  imageUrl: z.string(),
  link: z.string(),
  size: z.string(),
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
  isFeatured: z.boolean().optional(),
  batchNumber: z.string().optional(),
  expiryDate: z.date().optional(),
  productCode: z.string(),
  stockQty: z.number(),
  supplierId: z.string(),
  brandId: z.string(),
  subCategoryId: z.string(),
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
  isFeatured: z.boolean(),
  batchNumber: z.string(),
  expiryDate: z.date(),
  productCode: z.string(),
  stockQty: z.number(),
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

const createRolesSchema = z.object({
  displayName: z.string(),
  roleName: z.string(),
  description: z.string().optional(),
  status: z.string(),
  permissionIds: z.any(),
});

const getAllRolesSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  roleName: z.string(),
  description: z.string(),
  status: z.string(),
});

const createUsersSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string(),
  imageUrl: z.string().optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one symbol.",
    }),
  roleId: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

const createCustomersSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string(),
  imageUrl: z.string().optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one symbol.",
    }),
  roleId: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
  additionalInfo: z.string().optional(),
  shippingAddress: z.string().optional(),
  billingAddress: z.string().optional(),
});

const updateCustomerSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string(),
  imageUrl: z.string().optional(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
  additionalInfo: z.string().optional(),
  shippingAddress: z.string().optional(),
  billingAddress: z.string().optional(),
});

const updateUsersSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string(),
  imageUrl: z.string().optional(),
  roleId: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

const getAllUsersSchema = z.object({
  id: z.string(),
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string(),
  imageUrl: z.string().optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one symbol.",
    }),
  role: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
  additionalInfo: z.string().optional(),
  shippingAddress: z.string().optional(),
  billingAddress: z.string().optional(),
});

const getAllPermissionsSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  permissionName: z.string(),
  description: z.string(),
  status: z.string(),
  module: z.string().optional(),
});

const createPermissionsSchema = z.object({
  displayName: z.string(),
  permissionName: z.string(),
  description: z.string(),
  status: z.string(),
  module: z.string().optional(),
});

const createMainCategorySchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  slug: z.string().optional(),
});

const createSubCategorySchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  slug: z.string().optional(),
  categoryId: z.string(),
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
  createRolesSchema,
  getAllRolesSchema,
  createUsersSchema,
  updateUsersSchema,
  getAllUsersSchema,
  getAllPermissionsSchema,
  createPermissionsSchema,
  createCustomersSchema,
  updateCustomerSchema,
  createMainCategorySchema,
  createSubCategorySchema,
  createAdvertSchema,
  getAllAdvertSchema,
};
