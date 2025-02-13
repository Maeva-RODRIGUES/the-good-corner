import instance from "@/lib/instance";
import { ProductType } from "@/types/ads";
import { CategoryType } from "@/types/categories";
import { ApiResponse } from "@/types/common";

export async function getLastAds() {
  const { data } = await instance.get<ApiResponse<ProductType[]>>(
    "/ads/list?limit=5&order=DESC"
  );

  return data;
}

export async function getAds(id: string) {
  const { data } = await instance.get<ApiResponse<CategoryType>>(
    `/categories/find/${id}`
  );
  return data;
}

export async function categoriesList() {
  const { data } = await instance.get<ApiResponse<CategoryType[]>>(
    "categories/list"
  );
  return data;
}
