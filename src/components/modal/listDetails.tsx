import {
  Modal,
  ModalContent,
  ModalBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
} from "@heroui/react";
import React from "react";

import { formatDateTime, getElapsedTime } from "@/helper/helper";
import { useSingleListParticipants } from "@/hooks/useParticipants";
import { participant } from "@/types";

interface listDetailsProps {
  onOpenChange: () => void;
  isOpen: boolean;
  listId: string | undefined;
}

export default function ListDetails({
  onOpenChange,
  isOpen,
  listId,
}: listDetailsProps) {
  const [page, setPage] = React.useState(1); // Start at 1
  const rowsPerPage = 10;
  const { data, isLoading, isSuccess } = useSingleListParticipants(
    page,
    rowsPerPage,
    listId,
    isOpen
  );

  const items = React.useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const renderCell = React.useCallback(
    (row: participant, columnKey: React.Key) => {
      switch (columnKey) {
        case "Profile-Name":
          return <div className="text-sm font-medium">{row.name}</div>;
        case "Check-in":
          return (
            <div className="text-sm">
              {formatDateTime(row.checkInDate * 1000)}
            </div>
          );
        case "Check-out":
          return (
            <div className="text-sm">
              {formatDateTime(row.checkOutDate * 1000)}
            </div>
          );
        case "Time-Elapsed":
          return (
            <div className="text-sm">
              {row.checkInDate && row.checkOutDate
                ? getElapsedTime(
                    row.checkInDate * 1000,
                    row.checkOutDate * 1000
                  )
                : "-"}
            </div>
          );
        default:
          return null;
      }
    },
    []
  );

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex w-full justify-end">
        {isSuccess && (
          <Pagination
            showControls
            classNames={{
              cursor: "bg-foreground text-background",
            }}
            color="default"
            page={page}
            total={data.pages}
            variant="light"
            onChange={setPage}
          />
        )}
      </div>
    );
  }, [page, data?.pages]);

  const columns = [
    { key: "Profile-Name", label: "Profile Name" },
    { key: "Check-in", label: "Check-in" },
    { key: "Check-out", label: "Check-out" },
    { key: "Time-Elapsed", label: "Time Elapsed" },
  ];

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      placement="center"
      size="4xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalBody>
              <Table
                isCompact
                isStriped
                aria-label="Check-in/out history table"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                  th: [
                    "bg-transparent",
                    "border-b",
                    "border-divider",
                    "text-base",
                  ],
                }}
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody
                  emptyContent={
                    <div className="text-center">No history found!</div>
                  }
                  isLoading={isLoading}
                  items={items}
                  loadingContent={<Spinner />}
                >
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
