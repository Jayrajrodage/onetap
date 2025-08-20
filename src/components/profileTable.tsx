import React, { useState } from "react";
import {
  TableHeader,
  TableColumn,
  TableBody,
  Table,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
} from "@heroui/react";

import { participant } from "@/types";
interface CheckHistory {
  id: string;
  name: string;
  listName: string;
  latestCheckIn: string | null;
  latestCheckOut: any;
}

interface profileTableProps {
  participants: participant[];
}

const ProfileTable: React.FC<profileTableProps> = ({ participants }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const checkHistoryData = React.useMemo(() => {
    const seen = new Set<string>();

    return participants
      .filter((p) => p.checkedIn)
      .map((p) => ({
        id: p.id.toString(),
        name: p.name || `Participant ${p.id}`,
        listName: p.listName || "-",
        latestCheckIn: p.checkedIn
          ? new Date(p.checkInDate * 1000).toISOString()
          : null,
        latestCheckOut: p.checkedOut
          ? new Date(p.checkOutDate * 1000).toISOString()
          : null,
      }))
      .filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);

        return true;
      });
  }, [participants]);

  const pages = Math.ceil(checkHistoryData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return checkHistoryData.slice(start, end);
  }, [page, checkHistoryData]);

  const renderCell = React.useCallback(
    (row: CheckHistory, columnKey: React.Key) => {
      switch (columnKey) {
        case "name":
          return <div className="text-base font-medium">{row.name}</div>;

        case "listName":
          return <div className="text-base">{row.listName}</div>;

        case "latestCheckIn":
          return (
            <div className="text-sm">
              {row.latestCheckIn
                ? new Date(row.latestCheckIn).toLocaleString()
                : "-"}
            </div>
          );

        case "latestCheckOut":
          return (
            <div className="text-sm">
              {row.latestCheckOut
                ? new Date(row.latestCheckOut).toLocaleString()
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
    { key: "listName", label: "List Name" },
    { key: "latestCheckIn", label: "Latest Check-In" },
    { key: "latestCheckOut", label: "Latest Check-Out" },
  ];

  return (
    <Table
      aria-label="Check-in/out history table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        th: ["bg-transparent", "border-b", "border-divider", "text-base"],
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
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
  );
};

export default ProfileTable;
