import {
  Button,
  DateRangePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RangeValue,
} from "@heroui/react";
import React, { useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

interface DateRangeModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
}

const DateRangeModel: React.FC<DateRangeModalProps> = ({
  isOpen,
  onOpenChange,
  setFilter,
}) => {
  const [dateRange, setdateRange] = useState<RangeValue<CalendarDate> | null>({
    start: today(getLocalTimeZone()).subtract({ days: 31 }),
    end: today(getLocalTimeZone()),
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
