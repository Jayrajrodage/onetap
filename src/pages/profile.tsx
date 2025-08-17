import { useState, useMemo } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";

import Charts from "@/components/charts";
import SummaryCards from "@/components/summaryCards";
import HistoryTable from "@/components/table";
import DefaultLayout from "@/layouts/default";
import Navbar from "@/components/filterBar";
import { profileFilter, typeLists } from "@/types";
import { profiles, lists } from "@/utils/data.json";

export default function Profile() {
  const [filter, setFilter] = useState<profileFilter>({
    profiles: [],
    lists: [],
    view: "day",
    dateRange: {
      start: today(getLocalTimeZone()).subtract({ days: 31 }),
      end: today(getLocalTimeZone()),
    },
  });

  // ✅ Helper: check if a date is in range
  const isInRange = (date: string | Date | null | undefined) => {
    if (!date || !filter.dateRange) return false;
    const d = new Date(date);

    return (
      d >= new Date(filter.dateRange.start.toString()) &&
      d <= new Date(filter.dateRange.end.toString())
    );
  };

  // ✅ Apply profile filter
  const filteredProfiles = useMemo(() => {
    return filter.profiles.length > 0
      ? profiles.filter((p) => filter.profiles.includes(p.id.toString()))
      : profiles;
  }, [filter]);

  // ✅ Apply profile filter to lists too
  const filteredLists = useMemo(() => {
    return lists.reduce((acc: typeLists[], list) => {
      const filteredProfiles =
        filter.profiles.length > 0
          ? list.profiles.filter((p: any) =>
              filter.profiles.includes(p.profileId.toString())
            )
          : list.profiles;

      // ✅ only push the list if it has profiles left
      if (filteredProfiles.length > 0) {
        if (isInRange(list.date)) {
          acc.push({
            ...list,
            profiles: filteredProfiles,
          });
        }
      }

      return acc;
    }, []);
  }, [filter]);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        <Navbar filter={filter} setFilter={setFilter} />
        <SummaryCards lists={filteredLists} profiles={filteredProfiles} />
        <Charts lists={filteredLists} />
        <HistoryTable />
      </div>
    </DefaultLayout>
  );
}
