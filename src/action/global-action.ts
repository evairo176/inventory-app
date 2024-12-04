import { apiRequest, fetcher } from "@/utils/api-request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch all datas
export const useGet = (path: string, queryKey: string) => {
  return useQuery({
    queryKey: [`${queryKey}`],
    queryFn: () => fetcher(path),
  });
};

// Fetch all datas
export const useGetEnable = (
  path: string,
  queryKey: string,
  enableValue: string,
) => {
  return useQuery({
    queryKey: [`${queryKey}`],
    queryFn: () => fetcher(path),
    enabled: !!enableValue,
  });
};

// Fetch a single data by ID
export const useGetById = (path: string, id: string, queryKey: string) => {
  return useQuery({
    queryKey: [`${queryKey}`, id],
    queryFn: () => fetcher(`${path}/${id}`),
  });
};

// Create a new data
export const useCreate = (path: string, queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newData: any) => {
      return await apiRequest(path, "POST", newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });
      if (queryKey === "customers") {
        queryClient.invalidateQueries({ queryKey: [`users`] });
      }

      const splitQuery = queryKey.split("-");
      if (splitQuery?.length > 0) {
        if (splitQuery[0] === "pos") {
          console.log(splitQuery[0]);
          queryClient.invalidateQueries({ queryKey: [`analytic-sales`] });
        }
      }
    },
  });
};

// Create a new data
export const useCreateBulk = (path: string, queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newData: any) => {
      return await apiRequest(path, "POST", newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });
    },
  });
};

// Update an existing data
export const useUpdate = (path: string, id: string, queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: any) => {
      return await apiRequest(`${path}/${id}`, "PUT", updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`, id] });
      if (queryKey === "customers") {
        queryClient.invalidateQueries({ queryKey: [`users`] });
        queryClient.invalidateQueries({ queryKey: [`users`, id] });
      }
    },
  });
};

// Delete a data
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
