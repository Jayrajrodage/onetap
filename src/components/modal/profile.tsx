import type { Key, Selection } from "@react-types/shared";

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
  Pagination,
  Spinner,
} from "@heroui/react";
import React from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { profileFilter } from "@/types";
import { useGetProfiles } from "@/hooks/useProfiles";

interface ProfileModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  setFilter: React.Dispatch<React.SetStateAction<profileFilter>>;
  selectedProfiles: Key[];
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onOpenChange,
  setFilter,
  selectedProfiles,
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(selectedProfiles.flat())
  );

  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useGetProfiles({
    page: page,
    pageSize: 20,
    search: debouncedSearch,
    enabled: isOpen,
  });

  const profiles = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onClose={() =>
        setFilter((prev) => ({
          ...prev,
          profiles: Array.from(selectedKeys),
        }))
      }
      onOpenChange={onOpenChange}
    >
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
              {error ? (
                <div className="text-center text-red-400">
                  {error.message || "something went wrong!"}
                </div>
              ) : isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Spinner />
                </div>
              ) : (
                <>
                  <Listbox
                    aria-label="Profile selection"
                    classNames={{
                      base: "w-full",
                      list: "max-h-[250px] overflow-scroll",
                    }}
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    variant="flat"
                    items={profiles}
                    onSelectionChange={setSelectedKeys}
                  >
                    {(item) => (
                      <ListboxItem key={item.id}>{item.name}</ListboxItem>
                    )}
                  </Listbox>
                  <Pagination
                    showControls
                    className="flex justify-center items-center mt-2"
                    initialPage={1}
                    page={page}
                    size="sm"
                    total={totalPages}
                    onChange={setPage}
                  />
                </>
              )}
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
