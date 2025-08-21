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

import { participant } from "@/types";

interface listTableProps {
  participants: participant[];
}
interface listHistory {
  id: string;
  name: string;
  date: number;
  totalCheckIn: number;
  totalProfiles: number;
  totalCheckOut: number | null;
}

const ListTable: React.FC<listTableProps> = ({ participants }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [page, setPage] = useState(1);
  const [selectedListId, setSelectedListId] = useState("");
  const rowsPerPage = 5;

  const listHistoryData: listHistory[] = React.useMemo(() => {
    const listMap = new Map<
      string,
      {
        id: string;
        name: string;
        date: number;
        profiles: Set<string>;
        totalCheckIn: number;
        totalCheckOut: number;
      }
    >();

    participants.forEach((p) => {
      if (!listMap.has(p.listId)) {
        listMap.set(p.listId, {
          id: p.listId,
          name: p.listName,
          date: p.checkInDate,
          profiles: new Set(),
          totalCheckIn: 0,
          totalCheckOut: 0,
        });
      }
      const entry = listMap.get(p.listId)!;

      if (!entry.profiles.has(p.profileId)) {
        entry.profiles.add(p.profileId);
      }
      if (p.checkedIn) {
        entry.totalCheckIn += 1;
      }
      if (p.checkedOut) {
        entry.totalCheckOut += 1;
      }
      // Use the latest checkInDate as the list date
      if (p.checkInDate > entry.date) {
        entry.date = p.checkInDate;
      }
    });

    return Array.from(listMap.values()).map((entry) => ({
      id: entry.id,
      name: entry.name,
      date: entry.date,
      totalProfiles: entry.profiles.size,
      totalCheckIn: entry.totalCheckIn,
      totalCheckOut: entry.totalCheckOut,
    }));
  }, [participants]);

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
          return <div className="text-sm font-medium">{row.name}</div>;

        case "date":
          return (
            <div className="text-sm">{new Date(row.date).toLocaleString()}</div>
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
          th: ["text-base"],
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
                <TableCell className="py-2 px-4">
                  {renderCell(item, columnKey)}
                </TableCell>
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
