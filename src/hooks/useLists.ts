import { useQuery } from "@tanstack/react-query";

import { api } from "@/config/axios";
import { listsResponse, useListsParams } from "@/types";

export function useGetLists({
  page,
  pageSize,
  search,
  enabled = true,
}: useListsParams) {
  return useQuery<listsResponse>({
    queryKey: ["lists", { page, pageSize, search }],
    queryFn: async () => {
      const response = await api.get<listsResponse>(`/api/lists`, {
        params: { page, pageSize, searchText: search },
      });

      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });
}
