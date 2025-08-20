import {
  Button,
  DateRangePicker,
  DateValue,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RangeValue,
} from "@heroui/react";
import React, { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";

import { listsFilter, profileFilter } from "@/types";

interface DateRangeModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  filter: profileFilter | listsFilter;
}

const DateRangeModel: React.FC<DateRangeModalProps> = ({
  isOpen,
  onOpenChange,
  setFilter,
  filter,
}) => {
  const [dateRange, setdateRange] = useState<RangeValue<DateValue> | null>({
    start:
      filter.dateRange?.start ??
      today(getLocalTimeZone()).subtract({ days: 31 }),
    end: filter.dateRange?.end ?? today(getLocalTimeZone()),
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() =>
        setFilter((prev: any) => ({
          ...prev,
          dateRange: dateRange,
        }))
      }
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Select Date Range
            </ModalHeader>
            <ModalBody>
              <DateRangePicker
                aria-label="Date Range"
                label="Date Range (MM:DD:YY)"
                value={dateRange}
                onChange={setdateRange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" onPress={onClose}>
                Continue{" "}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DateRangeModel;
