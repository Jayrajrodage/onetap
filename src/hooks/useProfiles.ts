import { useQuery } from "@tanstack/react-query";

import { api } from "@/config/axios";
import { profilesResponse, useProfilesParams } from "@/types";

export function useGetProfiles({
  page,
  pageSize,
  search,
  enabled = true,
}: useProfilesParams) {
  return useQuery<profilesResponse>({
    queryKey: ["profiles", { page, pageSize, search }],
    queryFn: async () => {
      const params = search ? { searchText: search } : { page, pageSize };
      const response = await api.get<profilesResponse>(`/api/profiles`, {
        params,
      });

      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });
}
