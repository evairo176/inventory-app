import { apiRequest, fetcher } from "@/utils/api-request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch all brands
export const useGetBrands = (path: string) => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => fetcher(path),
  });
};

// Fetch a single brand by ID
export const useGetBrandById = (path: string, id: string) => {
  return useQuery({
    queryKey: ["brands", id],
    queryFn: () => fetcher(`${path}/${id}`),
  });
};

// Create a new brand
export const useCreateBrand = (path: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBrand: any) => {
      return await apiRequest(path, "POST", newBrand);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

// Update an existing brand
export const useUpdateBrand = (path: string, id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedBrand: any) => {
      return await apiRequest(`${path}/${id}`, "PUT", updatedBrand);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brands", id] });
    },
  });
};

// Delete a brand
export const useDeleteBrand = (path: string, id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await apiRequest(`${path}/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};
