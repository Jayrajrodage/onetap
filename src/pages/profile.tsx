import { useState, useMemo } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";

import ProfileCharts from "@/components/profileCharts";
import DefaultLayout from "@/layouts/default";
import ProfileFilter from "@/components/profileFilter";
import { profileFilter, typeLists } from "@/types";
import { demoLists, demoProfiles } from "@/utils/data.json";
import ProfileCards from "@/components/profileCards";
import ProfileTable from "@/components/profileTable";

export default function Profile() {
  const [filter, setFilter] = useState<profileFilter>({
    profiles: [],
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
      ? demoProfiles.filter((p) => filter.profiles.includes(p.id.toString()))
      : demoProfiles;
  }, [filter]);

  // ✅ Apply profile filter to lists too
  const filteredLists = useMemo(() => {
    return demoLists.reduce((acc: typeLists[], list) => {
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
        <ProfileFilter setFilter={setFilter} />
        <ProfileCards lists={filteredLists} profiles={filteredProfiles} />
        <ProfileCharts filter={filter} lists={filteredLists} />
        <ProfileTable profiles={filter.profiles} />
      </div>
    </DefaultLayout>
  );
}
