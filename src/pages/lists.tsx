import { useMemo, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";

import DefaultLayout from "@/layouts/default";
import { listsFilter } from "@/types";
import ListsFilter from "@/components/listsFilter";
import ListsCards from "@/components/listCards";
import { demoLists, demoProfiles } from "@/utils/data.json";
import ListCharts from "@/components/listCharts";
import ListTable from "@/components/listTable";
const Lists = () => {
  const [filter, setFilter] = useState<listsFilter>({
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

  // ✅ Apply profile filter: keep only profiles that belong to selected lists
  const filteredProfiles = useMemo(() => {
    // Get selected list IDs from filter.lists
    const selectedListIds =
      filter.lists.length > 0
        ? filter.lists.map((l) => l.toString())
        : demoLists.map((l) => l.id.toString());

    // Collect all profile IDs from the selected lists
    const profileIdsInSelectedLists = Array.from(
      new Set(
        demoLists
          .filter((list) => selectedListIds.includes(list.id.toString()))
          .flatMap((list) => list.profiles.map((p) => p.profileId.toString()))
      )
    );

    // Filter demoProfiles by both profile filter and presence in selected lists
    return demoProfiles.filter((p) =>
      profileIdsInSelectedLists.includes(p.id.toString())
    );
  }, [filter]);

  const filteredLists = useMemo(() => {
    // If filter.lists has selected list IDs, only include those lists and their profiles
    if (filter.lists.length > 0) {
      return demoLists
        .filter((list) => filter.lists.includes(list.id.toString()))
        .map((list) => ({
          ...list,
          profiles: list.profiles,
        }));
    }

    // If no lists are selected, include all lists with isInRange
    return demoLists
      .filter((list) => isInRange(list.date))
      .map((list) => ({
        ...list,
        profiles: list.profiles,
      }));
  }, [filter, isInRange]);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        <ListsFilter setFilter={setFilter} />
        <ListsCards lists={filteredLists} profiles={filteredProfiles} />
        <ListCharts lists={filteredLists} />
        <ListTable lists={filteredLists} />
      </div>
    </DefaultLayout>
  );
};

export default Lists;
