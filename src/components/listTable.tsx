import React, { useState } from "react";
import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";

import { EyeIcon } from "./icons";
import ListDetails from "./modal/listDetails";

import { typeLists } from "@/types";

interface listTableProps {
  lists: typeLists[];
}
interface listHistory extends typeLists {
  totalCheckIn: number;
  totalProfiles: number;
  totalCheckOut: number | null;
}

const ListTable: React.FC<listTableProps> = ({ lists }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [page, setPage] = useState(1);
  const [selectedListId, setSelectedListId] = useState(1);
  const rowsPerPage = 5;
  const listHistoryData: listHistory[] = React.useMemo(() => {
    return lists.map((list) => ({
      ...list,
      totalProfiles: list.profiles.length,
      totalCheckIn: list.profiles.filter((p) => !!p.checkIn).length,
      totalCheckOut: list.profiles.filter((p) => !!(p as any)?.checkOut).length,
    }));
  }, [lists]);

  const pages = Math.ceil(listHistoryData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return listHistoryData.slice(start, end);
  }, [page, listHistoryData]);

  const renderCell = React.useCallback(
    (row: listHistory, columnKey: React.Key) => {
      switch (columnKey) {
        case "name":
          return <div className="text-base font-medium">{row.name}</div>;

        case "date":
          return (
            <div className="text-base">
              {new Date(row.date).toLocaleString()}
            </div>
          );

        case "totalProfiles":
          return <div className="text-sm">{row.totalProfiles}</div>;

        case "totalCheckIn":
          return <div className="text-sm">{row.totalCheckIn}</div>;

        case "totalCheckOut":
          return <div className="text-sm">{row.totalCheckOut ?? "-"}</div>;

        case "profileDetails":
          return (
            <div className="flex justify-center items-center">
              <Button
                isIconOnly
                variant="light"
                onPress={() => {
                  setSelectedListId(row.id);
                  onOpen();
                }}
              >
                <EyeIcon />
              </Button>
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
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          page={page}
          total={pages}
          variant="light"
          onChange={(page) => setPage(page)}
        />
      </div>
    );
  }, [page, pages]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "date", label: "Date" },
    { key: "totalProfiles", label: "Total Profiles" },
    { key: "totalCheckIn", label: "Total Check-In" },
    { key: "totalCheckOut", label: "Total Check-Out" },
    { key: "profileDetails", label: "Profile Details" },
  ];

  return (
    <>
      <Table
        aria-label="List Table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          th: ["bg-transparent", "border-b", "border-divider", "text-base"],
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={<div className="text-center">No history found!</div>}
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
      <ListDetails
        isOpen={isOpen}
        listId={selectedListId}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default ListTable;
