import { ProductType } from "./ads";

export type CategoryType = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  ads?: ProductType[];
};
