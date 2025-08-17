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
interface CheckHistory {
  id: number;
  name: string; // YYYY-MM-DD
  listName: string;
  checkInTime: string | null; // ISO string or null
  checkOutTime: string | null; // ISO string or null
}

export const dummyProfiles = [
  {
    id: 1,
    name: "John Doe",
    listName: "Guest List A",
    checkInTime: "2025-07-17T09:15:00",
    checkOutTime: "2025-07-17T17:45:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    listName: "Guest List B",
    checkInTime: "2025-07-18T08:55:00",
    checkOutTime: "2025-07-18T16:20:00",
  },
  {
    id: 3,
    name: "Michael Johnson",
    listName: "Student Group",
    checkInTime: "2025-07-19T10:10:00",
    checkOutTime: "2025-07-19T18:05:00",
  },
  {
    id: 4,
    name: "Emily Davis",
    listName: "VIP Event",
    checkInTime: "2025-07-20T09:05:00",
    checkOutTime: "2025-07-20T15:40:00",
  },
  {
    id: 5,
    name: "Chris Wilson",
    listName: "Conference Attendees",
    checkInTime: "2025-07-21T11:00:00",
    checkOutTime: "2025-07-21T19:10:00",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    listName: "Guest List A",
    checkInTime: "2025-07-22T08:40:00",
    checkOutTime: "2025-07-22T14:25:00",
  },
  {
    id: 7,
    name: "Daniel Brown",
    listName: "VIP Event",
    checkInTime: "2025-07-23T09:50:00",
    checkOutTime: "2025-07-23T17:30:00",
  },
  {
    id: 8,
    name: "Olivia Garcia",
    listName: "Student Group",
    checkInTime: "2025-07-24T10:30:00",
    checkOutTime: "2025-07-24T18:15:00",
  },
  {
    id: 9,
    name: "Liam Miller",
    listName: "Conference Attendees",
    checkInTime: "2025-07-25T09:20:00",
    checkOutTime: "2025-07-25T16:45:00",
  },
  {
    id: 10,
    name: "Isabella Lopez",
    listName: "Guest List B",
    checkInTime: "2025-07-26T08:55:00",
    checkOutTime: "2025-07-26T15:35:00",
  },
  {
    id: 11,
    name: "James Anderson",
    listName: "Guest List A",
    checkInTime: "2025-07-27T09:40:00",
    checkOutTime: "2025-07-27T17:20:00",
  },
  {
    id: 12,
    name: "Mia Thomas",
    listName: "VIP Event",
    checkInTime: "2025-07-28T10:05:00",
    checkOutTime: "2025-07-28T18:00:00",
  },
  {
    id: 13,
    name: "Benjamin Taylor",
    listName: "Student Group",
    checkInTime: "2025-07-29T09:10:00",
    checkOutTime: "2025-07-29T16:50:00",
  },
  {
    id: 14,
    name: "Charlotte Harris",
    listName: "Conference Attendees",
    checkInTime: "2025-07-30T11:15:00",
    checkOutTime: "2025-07-30T19:30:00",
  },
  {
    id: 15,
    name: "Ethan White",
    listName: "Guest List B",
    checkInTime: "2025-07-31T08:45:00",
    checkOutTime: "2025-07-31T14:55:00",
  },
  {
    id: 16,
    name: "Amelia Clark",
    listName: "Guest List A",
    checkInTime: "2025-08-01T09:25:00",
    checkOutTime: "2025-08-01T17:15:00",
  },
  {
    id: 17,
    name: "Logan Lewis",
    listName: "Student Group",
    checkInTime: "2025-08-02T10:40:00",
    checkOutTime: "2025-08-02T18:35:00",
  },
  {
    id: 18,
    name: "Harper Walker",
    listName: "VIP Event",
    checkInTime: "2025-08-03T09:00:00",
    checkOutTime: "2025-08-03T16:20:00",
  },
  {
    id: 19,
    name: "Alexander Hall",
    listName: "Conference Attendees",
    checkInTime: "2025-08-04T10:15:00",
    checkOutTime: "2025-08-04T18:25:00",
  },
  {
    id: 20,
    name: "Evelyn Allen",
    listName: "Guest List B",
    checkInTime: "2025-08-05T08:55:00",
    checkOutTime: "2025-08-05T15:50:00",
  },
  {
    id: 21,
    name: "William Young",
    listName: "Guest List A",
    checkInTime: "2025-08-06T09:30:00",
    checkOutTime: "2025-08-06T17:25:00",
  },
  {
    id: 22,
    name: "Ella King",
    listName: "VIP Event",
    checkInTime: "2025-08-07T09:50:00",
    checkOutTime: "2025-08-07T16:40:00",
  },
  {
    id: 23,
    name: "Henry Wright",
    listName: "Student Group",
    checkInTime: "2025-08-08T10:20:00",
    checkOutTime: "2025-08-08T18:10:00",
  },
  {
    id: 24,
    name: "Scarlett Scott",
    listName: "Conference Attendees",
    checkInTime: "2025-08-09T09:05:00",
    checkOutTime: "2025-08-09T15:45:00",
  },
  {
    id: 25,
    name: "Jackson Green",
    listName: "Guest List B",
    checkInTime: "2025-08-10T08:35:00",
    checkOutTime: "2025-08-10T14:40:00",
  },
  {
    id: 26,
    name: "Grace Baker",
    listName: "Guest List A",
    checkInTime: "2025-08-11T09:45:00",
    checkOutTime: "2025-08-11T17:05:00",
  },
  {
    id: 27,
    name: "Sebastian Nelson",
    listName: "Student Group",
    checkInTime: "2025-08-12T10:30:00",
    checkOutTime: "2025-08-12T18:20:00",
  },
  {
    id: 28,
    name: "Victoria Carter",
    listName: "VIP Event",
    checkInTime: "2025-08-13T09:15:00",
    checkOutTime: "2025-08-13T16:55:00",
  },
  {
    id: 29,
    name: "Matthew Mitchell",
    listName: "Conference Attendees",
    checkInTime: "2025-08-14T10:05:00",
    checkOutTime: "2025-08-14T18:45:00",
  },
  {
    id: 30,
    name: "Aria Perez",
    listName: "Guest List B",
    checkInTime: "2025-08-15T08:50:00",
    checkOutTime: "2025-08-15T15:25:00",
  },
  {
    id: 31,
    name: "Lucas Roberts",
    listName: "Guest List A",
    checkInTime: "2025-08-16T09:35:00",
    checkOutTime: "2025-08-16T17:30:00",
  },
];

interface HistoryTableProps {
  data?: { data: CheckHistory[]; pagination?: { totalPages: number } };
}

const HistoryTable: React.FC<HistoryTableProps> = ({
  data = { data: dummyProfiles, pagination: { totalPages: 7 } },
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const pages = data.pagination?.totalPages ?? 0 / rowsPerPage;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.data.slice(start, end);
  }, [page, data.data]);

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
              {row.checkInTime
                ? new Date(row.checkInTime).toLocaleTimeString()
                : "-"}
            </div>
          );

        case "latestCheckOut":
          return (
            <div className="text-sm">
              {row.checkOutTime
                ? new Date(row.checkOutTime).toLocaleTimeString()
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
  }, [data?.pagination?.totalPages, page, pages]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "listName", label: "List" },
    { key: "latestCheckIn", label: "Latest Check-In" },
    { key: "latestCheckOut", label: "Latest Check-Out" },
  ];

  return (
    <Table
      removeWrapper
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
        items={items ?? []}
        loadingContent={<Spinner />}
      >
        {(item: CheckHistory) => (
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

export default HistoryTable;
