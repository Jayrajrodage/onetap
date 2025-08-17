import type { Selection } from "@react-types/shared";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Listbox,
  ListboxItem,
  Input,
} from "@heroui/react";
import React, { useEffect } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import data from "@/utils/data.json";

interface ProfileModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  const filteredProfiles = React.useMemo(() => {
    return data.profiles.filter((profile) =>
      profile.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [debouncedSearch]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Select Profile
            </ModalHeader>
            <ModalBody>
              <Input
                isClearable
                className="mb-2"
                placeholder="Search profiles..."
                value={search}
                onValueChange={setSearch}
              />
              <Listbox
                aria-label="Profile selection"
                classNames={{
                  base: "w-full",
                  list: "max-h-[250px] overflow-scroll",
                }}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                variant="flat"
                items={filteredProfiles}
                onSelectionChange={setSelectedKeys}
              >
                {(item) => <ListboxItem key={item.id}>{item.name}</ListboxItem>}
              </Listbox>
            </ModalBody>
            <ModalFooter>
              {Array.from(selectedKeys).length > 0 && (
                <Button onPress={() => setSelectedKeys(new Set([]))}>
                  Clear
                </Button>
              )}
              <Button color="default" onPress={onClose}>
                Continue{" "}
                {Array.from(selectedKeys).length > 0 && (
                  <>({Array.from(selectedKeys).length})</>
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
