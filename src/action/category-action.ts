import { createCategorySchema } from "@/config/form-schema";
import fetcher from "@/utils/fetcher";
import axios from "axios";
import useSWR from "swr";
import { z } from "zod";

export const useAddCategory = (path: string) => {
  const { mutate } = useSWR(path);

  const addCategory = async (data: z.infer<typeof createCategorySchema>) => {
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Could not add crategory");
    }

    mutate();

    return res.json();
  };

  return addCategory;
};

export const useGetCategory = (path: string) => {
  const { mutate, isLoading, error } = useSWR(path, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { mutate, isLoading, error };
};
