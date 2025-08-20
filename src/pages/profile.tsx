import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Spinner } from "@heroui/react";

import ProfileCharts from "@/components/profileCharts";
import DefaultLayout from "@/layouts/default";
import ProfileFilter from "@/components/profileFilter";
import { profileFilter } from "@/types";
import ProfileCards from "@/components/profileCards";
import ProfileTable from "@/components/profileTable";
import { useGetParticipants } from "@/hooks/useParticipants";

export default function Profile() {
  const [filter, setFilter] = useState<profileFilter>({
    profiles: [],
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
    isFetched: participantsFetched,
  } = useGetParticipants({
    profileIds: filter.profiles.map((p) => p.toString()),
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
                <ProfileFilter filter={filter} setFilter={setFilter} />
                <ProfileCards participants={participantsData?.data || []} />
                <ProfileCharts
                  filter={filter}
                  participantsData={participantsData?.data || []}
                />
                <ProfileTable participants={participantsData?.data || []} />
              </>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
