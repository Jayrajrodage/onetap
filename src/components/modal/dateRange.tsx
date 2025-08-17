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

interface DateRangeModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const DateRangeModel: React.FC<DateRangeModalProps> = ({
  isOpen,
  onOpenChange,
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
              <DateRangePicker aria-label="Date Range" label="Stay duration" />
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
