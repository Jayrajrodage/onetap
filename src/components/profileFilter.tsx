import { Button, useDisclosure } from "@heroui/react";

import ProfileModal from "./modal/profile";
import DateRangeModel from "./modal/dateRange";

import { profileFilter } from "@/types";

interface profileFilterProps {
  setFilter: React.Dispatch<React.SetStateAction<profileFilter>>;
}

export default function ProfileFilter({ setFilter }: profileFilterProps) {
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onOpenChange: onOpenChangeProfile,
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
          <h1>Profile Analytics</h1>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Button size="sm" variant={"bordered"} onPress={onOpenProfile}>
            Profile
          </Button>
          <Button size="sm" variant={"bordered"} onPress={onOpenDate}>
            Dates
          </Button>
        </div>
      </div>
      <ProfileModal
        isOpen={isOpenProfile}
        setFilter={setFilter}
        onOpenChange={onOpenChangeProfile}
      />
      <DateRangeModel
        isOpen={isOpenDate}
        setFilter={setFilter}
        onOpenChange={onOpenChangeDate}
      />
    </nav>
  );
}
