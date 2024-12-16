import instance from "@/lib/instance";
import { ProductType } from "@/types/ads";
import { ApiResponse } from "@/types/common";

export async function createAd(formData: FormData) {
  const { data } = await instance.post<ApiResponse<ProductType>>(
    "/ads/create",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

export async function updateAd(id: string, formData: FormData) {
  const { data } = await instance.patch(`/ads/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

export async function findAd(id: string) {
  const { data } = await instance.get<ApiResponse<ProductType>>(
    `/ads/find/${id}`
  );

  return data;
}
