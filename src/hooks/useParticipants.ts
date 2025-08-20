import { useQuery } from "@tanstack/react-query";

import { api } from "@/config/axios";
import { participantsResponse, useParticipantsParams } from "@/types";

export function useGetParticipants({
  listIds,
  profileIds,
  enabled = true,
  ltCheckInDate,
  gtCheckInDate,
}: useParticipantsParams) {
  return useQuery<participantsResponse>({
    queryKey: [
      "participants",
      { listIds, profileIds, ltCheckInDate, gtCheckInDate },
    ],
    queryFn: async () => {
      const firstResponse = await api.get<participantsResponse>(
        `/api/participants`,
        {
          params: {
            page: 0,
            listIds: listIds?.join(","),
            profileIds: profileIds?.join(","),
            ltCheckInDate: ltCheckInDate,
            gtCheckInDate: gtCheckInDate,
          },
        }
      );

      const totalPages = firstResponse.data.pages ?? 0;

      const requests = [];

      for (let i = 1; i <= totalPages; i++) {
        requests.push(
          api.get<participantsResponse>(`/api/participants`, {
            params: {
              page: i,
              listIds: listIds?.join(","),
              profileIds: profileIds?.join(","),
              ltCheckInDate: ltCheckInDate,
              gtCheckInDate: gtCheckInDate,
            },
          })
        );
      }

      const responses = await Promise.all(requests);

      const allParticipants = [
        ...firstResponse.data.data,
        ...responses.flatMap((res) => res.data.data),
      ];

      return {
        ...firstResponse.data,
        data: allParticipants,
      };
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled,
  });
}

export function useSingleListParticipants(
  page: number,
  pageSize: number,
  listId?: string,
  enabled = true
) {
  return useQuery<participantsResponse>({
    queryKey: ["participants", "single-list", page, pageSize, listId],
    queryFn: async () => {
      const response = await api.get<participantsResponse>(
        `/api/participants`,
        {
          params: {
            listId,
            pageSize,
            page,
          },
        }
      );

      return response.data;
    },
    enabled: !!listId && enabled,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
