import { LucideIcon } from "lucide-react";

export interface ISidebarLinks {
  title: string;
  href?: string;
  icon: LucideIcon;
  module: string;
  dropdown: boolean;
  dropdownMenu?: IMenuItem[];
}

export type IMenuItem = {
  title: string;
  href: string;
};

export type ExcelCategoryProps = {
  image: string;
  title: string;
};
export type ExcelBrandProps = {
  image: string;
  title: string;
};

export type ICategory = {
  createdAt: string; // ISO date string
  description: string;
  id: string;
  imageUrl: string;
  slug: string;
  status: string; // Assuming status can only be "ACTIVE" or "INACTIVE"
  title: string;
  updatedAt: string; // ISO date string
  mainCategoryId: string;
};

export type IBrand = {
  id: string;
  title: string;
  imageUrl: string;
  slug: string;
  status: string;
};

export type IUnit = {
  id: string;
  title: string;
  abbreviation: string;
  status: string;
};

export type IWarehouse = {
  id: string;
  name: string;
  slug: string;
  country: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  zipCode: string;
  imageUrl: string;
  status: string;
  contactPerson: string;
};

export type ISupplier = {
  id: string;
  name: string;
  imageUrl: string;
  companyName: string;
  vatNumber: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  status: string;
};

export type IProduct = {
  id: string;
  name: string;
  slug: string;
  productCode: string;
  stockQty: number;
  // warehouseId: string;
  supplierId: string;
  brandId: string;
  subCategoryId: string;
  unitId: string;
  productCost: number;
  productPrice: number;
  alertQty: number;
  productTax: number;
  taxMethod: string;
  productImages: string[];
  productThumbnail: string;
  productDetails: string;
  status: string;
  isFeatured: boolean;
  batchNumber: string;
  expiryDate: any;
};

export type IRole = {
  id: string;
  displayName: string;
  roleName: string;
  description: string;
  status: string;
  permissions: any;
};
export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  plainPassword: string;
  role: IRole;
  status: string;
  imageUrl: string;
  roleId: string;
  inviteSent: boolean;
  name: string;
};

export type ICustomer = {
  id: string;
  user: IUser;
  additionalInfo: string;
  shippingAddress: string;
  billingAddress: string;
};
export type IPermission = {
  id: string;
  displayName: string;
  permissionName: string;
  description: string;
  status: string;
  module: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type SalesSummary = {
  todayOrders: number;
  yesterdayOrders: number;
  thisMonthOrders: number;
  lastMonthOrders: number;
  totalOrders: number;
  orderPending: number;
  orderProcessing: number;
  orderDelivered: number;
  orderFailed: number;
};
type OrderStatus = "PENDING" | "PROCESSING" | "DELIVERED" | "FAILED";
export interface LineOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  orderAmount: number;
  orderType: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type ISubCategory = {
  id: string;
  slug: string;
  title: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  categoryId: string;
  category: ICategory;
};

export type IMainCategory = {
  id: string;
  slug: string;
  title: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
