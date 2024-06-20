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
};

export type IBrand = {
  id: string;
  title: string;
  imageUrl: string;
  slug: string;
  status: string;
};

export type IUnit = {
  title: string;
  abbreviation: string;
  status: string;
};

export type IWarehouse = {
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
  name: string;
  slug: string;
  productCode: string;
  stockQty: number;
  warehouseId: string;
  supplierId: string;
  brandId: string;
  categoryId: string;
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
};
