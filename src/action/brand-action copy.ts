import { createBrandSchema } from "@/config/form-schema";
import fetcher from "@/utils/fetcher";
import useSWR, { mutate as globalMutate } from "swr";
import { z } from "zod";
import { ExcelBrandProps } from "../../types/types";

// Utility function to handle API requests
const apiRequest = async (path: string, method: string, data?: any) => {
  const res = await fetch(path, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API request failed");
  }

  return res.json();
};

// Hook to add a single Brand
export const useAddBrand = (path: string) => {
  const { mutate } = useSWR(path);

  const addBrand = async (data: z.infer<typeof createBrandSchema>) => {
    const response = await apiRequest(path, "POST", data);

    // Update the local data
    await mutate();

    // Optionally, globally mutate if necessary
    await globalMutate(path);

    return response;
  };

  return addBrand;
};

// Hook to create bulk categories
export const useCreateBulkBrand = (path: string) => {
  const { mutate } = useSWR(path);

  const createBulkBrand = async (data: ExcelBrandProps[]) => {
    const bulkData = { categories: data };
    const response = await apiRequest(path, "POST", bulkData);

    // Update the local data
    await mutate();

    // Optionally, globally mutate if necessary
    await globalMutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brand`);

    return response;
  };

  return createBulkBrand;
};

// Hook to get categories
export const useGetBrand = (path: string) => {
  const { data, error, mutate, isLoading } = useSWR(path, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, mutate, isLoading };
};

// Hook to delete a Brand
export const useDeleteBrand = (path: string) => {
  const { mutate } = useSWR(path);

  const deleteBrand = async (id: string) => {
    const response = await apiRequest(`${path}/${id}`, "DELETE");

    // Update the local data
    await mutate();

    // Optionally, globally mutate if necessary
    await globalMutate(path);

    return response;
  };

  return deleteBrand;
};

// Hook to get categories by id
export const useGetBrandId = (path: string) => {
  const { data, error, mutate, isLoading } = useSWR(path, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, mutate, isLoading, useGetBrandId };
};

// Hook to update a Brand by id
export const useUpdateBrand = (path: string) => {
  const { mutate } = useSWR(path);

  const updateBrand = async (
    id: string,
    data: z.infer<typeof createBrandSchema>,
  ) => {
    const response = await apiRequest(`${path}/${id}`, "PUT", data);

    // Update the local data
    await mutate();

    // Optionally, globally mutate if necessary
    await globalMutate(path);
    await globalMutate(`${path}/${id}`);

    return response;
  };

  return updateBrand;
};
