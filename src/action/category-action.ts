import { createCategorySchema } from "@/config/form-schema";
import fetcher from "@/utils/fetcher";
import useSWR, { mutate as globalMutate } from "swr";
import { z } from "zod";
import { ExcelCategoryProps } from "../types/types";

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

// Hook to add a single category
export const useAddCategory = (path: string) => {
  const { mutate } = useSWR(path);

  const addCategory = async (data: z.infer<typeof createCategorySchema>) => {
    const response = await apiRequest(path, "POST", data);

    // Update the local data
    await mutate();

    // Optionally, globally mutate if necessary
    await globalMutate(path);

    return response;
  };

  return addCategory;
};

// Hook to create bulk categories
export const useCreateBulkCategory = (path: string) => {
  const { mutate } = useSWR(path);

  const createBulkCategory = async (data: ExcelCategoryProps[]) => {
    const bulkData = { categories: data };
    const response = await apiRequest(path, "POST", bulkData);

    // Update the local data
    await mutate();

    // Optionally, globally mutate if necessary
    await globalMutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`);

    return response;
  };

  return createBulkCategory;
};

// Hook to get categories
export const useGetCategory = (path: string) => {
  const { data, error, mutate, isLoading } = useSWR(path, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, mutate, isLoading };
};

// Hook to delete a category
export const useDeleteCategory = (path: string) => {
  const { mutate } = useSWR(path);

  const deleteCategory = async (id: string) => {
    const response = await apiRequest(`${path}/${id}`, "DELETE");

    // Update the local data
    await mutate();

    // Optionally, globally mutate if necessary
    await globalMutate(path);

    return response;
  };

  return deleteCategory;
};

// Hook to get categories by id
export const useGetCategoryId = (path: string) => {
  const { data, error, mutate, isLoading } = useSWR(path, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, mutate, isLoading, useGetCategoryId };
};

// Hook to update a category by id
export const useUpdateCategory = (path: string) => {
  const { mutate } = useSWR(path);

  const updateCategory = async (
    id: string,
    data: z.infer<typeof createCategorySchema>,
  ) => {
    const response = await apiRequest(`${path}/${id}`, "PUT", data);

    // Update the local data
    await mutate();

    // Optionally, globally mutate if necessary
    await globalMutate(path);
    await globalMutate(`${path}/${id}`);

    return response;
  };

  return updateCategory;
};
