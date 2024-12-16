import { CategoryType } from "./categories";
type ProductKey =
  "title" | "description" | "price" | "picture" | "location";

export type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  location: string;
  created_at: string;
  updated_at: string;
  category: CategoryType;
};

export type ProductTypeWithKeys = ProductType & {
  [key: string]: string | number;
};
export type AdCreateFormInfosWithoutParams = Omit<
  ProductType,
  "id" | "created_at" | "updated_at"
>;
export type AdCreateFormInfos = Omit<
  ProductType,
  "id" | "created_at" | "updated_at" | "category"
> & { categoryId: string };
