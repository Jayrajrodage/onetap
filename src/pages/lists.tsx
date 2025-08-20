import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Spinner } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { listsFilter } from "@/types";
import ListsFilter from "@/components/listsFilter";
import ListsCards from "@/components/listCards";
import ListCharts from "@/components/listCharts";
import ListTable from "@/components/listTable";
import { useGetParticipants } from "@/hooks/useParticipants";
const Lists = () => {
  const [filter, setFilter] = useState<listsFilter>({
    lists: [],
    view: "day",
    dateRange: {
      start: today(getLocalTimeZone()).subtract({ days: 31 }),
      end: today(getLocalTimeZone()),
    },
  });

  const {
    data: participantsData,
    isLoading: participantsLoading,
    error: participantsError,
    isSuccess: participantsFetched,
  } = useGetParticipants({
    listIds: filter.lists.map((p) => p.toString()),
    ltCheckInDate: Math.ceil(
      (filter.dateRange?.end?.toDate(getLocalTimeZone()).getTime() ?? 0) / 1000
    ),
    gtCheckInDate: Math.ceil(
      (filter.dateRange?.start.toDate(getLocalTimeZone()).getTime() ?? 0) / 1000
    ),
  });

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        {participantsError ? (
          <div className="text-center text-red-400">something went wrong!</div>
        ) : participantsLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <>
            {participantsFetched && (
              <>
                <ListsFilter filter={filter} setFilter={setFilter} />
                <ListsCards participants={participantsData.data} />
                <ListCharts participantsData={participantsData.data} />
                <ListTable participants={participantsData.data} />
              </>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Lists;
