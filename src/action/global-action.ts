import { apiRequest, fetcher } from "@/utils/api-request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch all brands
export const useGet = (path: string, queryKey: string) => {
  return useQuery({
    queryKey: [`${queryKey}`],
    queryFn: () => fetcher(path),
  });
};

// Fetch a single brand by ID
export const useGetById = (path: string, id: string, queryKey: string) => {
  return useQuery({
    queryKey: [`${queryKey}`, id],
    queryFn: () => fetcher(`${path}/${id}`),
  });
};

// Create a new brand
export const useCreate = (path: string, queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBrand: any) => {
      return await apiRequest(path, "POST", newBrand);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });
    },
  });
};

// Update an existing brand
export const useUpdate = (path: string, id: string, queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedBrand: any) => {
      return await apiRequest(`${path}/${id}`, "PUT", updatedBrand);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`, id] });
    },
  });
};

// Delete a brand
export const useDelete = (path: string, id: string, queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await apiRequest(`${path}/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });
    },
  });
};
