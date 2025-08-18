import { Button, useDisclosure } from "@heroui/react";

import DateRangeModel from "./modal/dateRange";
import ListModal from "./modal/list";

import { listsFilter } from "@/types";

interface listsFilterProps {
  setFilter: React.Dispatch<React.SetStateAction<listsFilter>>;
}

export default function ListsFilter({ setFilter }: listsFilterProps) {
  const {
    isOpen: isOpenLists,
    onOpen: onOpenLists,
    onOpenChange: onOpenChangeLists,
  } = useDisclosure();
  const {
    isOpen: isOpenDate,
    onOpen: onOpenDate,
    onOpenChange: onOpenChangeDate,
  } = useDisclosure();

  return (
    <nav>
      <div className="max-w-6xl mx-auto flex flex-wrap gap-5 items-center justify-between">
        <div>
          <h1>Lists Analytics</h1>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Button size="sm" variant={"bordered"} onPress={onOpenLists}>
            Lists
          </Button>
          <Button size="sm" variant={"bordered"} onPress={onOpenDate}>
            Dates
          </Button>
        </div>
      </div>
      <ListModal
        isOpen={isOpenLists}
        setFilter={setFilter}
        onOpenChange={onOpenChangeLists}
      />
      <DateRangeModel
        isOpen={isOpenDate}
        setFilter={setFilter}
        onOpenChange={onOpenChangeDate}
      />
    </nav>
  );
}
