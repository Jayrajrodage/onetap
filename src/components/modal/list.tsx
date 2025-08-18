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
import React from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { demoLists } from "@/utils/data.json";
import { listsFilter } from "@/types";

interface listModelProps {
  isOpen: boolean;
  onOpenChange: () => void;
  setFilter: React.Dispatch<React.SetStateAction<listsFilter>>;
}

const ListModal: React.FC<listModelProps> = ({
  isOpen,
  onOpenChange,
  setFilter,
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  const filteredLists = React.useMemo(() => {
    return demoLists.filter((list) =>
      list.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [debouncedSearch]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() =>
        setFilter((prev) => ({
          ...prev,
          lists: Array.from(selectedKeys),
        }))
      }
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Select Lists
            </ModalHeader>
            <ModalBody>
              <Input
                isClearable
                className="mb-2"
                placeholder="Search lists..."
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
                items={filteredLists}
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

export default ListModal;
