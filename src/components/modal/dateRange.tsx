import {
  Button,
  DateRangePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React from "react";

import { profileFilter } from "@/types";

interface DateRangeModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  filter: profileFilter;
  setFilter: React.Dispatch<React.SetStateAction<profileFilter>>;
}

const DateRangeModel: React.FC<DateRangeModalProps> = ({
  isOpen,
  onOpenChange,
  filter,
  setFilter,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                value={filter.dateRange}
                onChange={(value) =>
                  setFilter((prev) => ({
                    ...prev,
                    dateRange: value,
                  }))
                }
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
