import React, { useState } from "react";
import { Key } from "@react-types/shared";
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

import { demoLists, demoProfiles as allProfiles } from "@/utils/data.json";
interface CheckHistory {
  id: string;
  name: string;
  listName: string;
  latestCheckIn: string | null;
  latestCheckOut: any;
}

interface profileTableProps {
  profiles: Key[];
}

const ProfileTable: React.FC<profileTableProps> = ({ profiles }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const checkHistoryData = React.useMemo(() => {
    const profileIds =
      profiles.length === 0
        ? allProfiles.map((p) => p.id.toString())
        : profiles.map((p) => p.toString());

    return profileIds.map((profileId) => {
      // Find profile info
      const profileInfo = allProfiles.find(
        (p) => p.id.toString() === profileId.toString()
      );

      // Find all lists containing this profile
      const listsWithProfile = demoLists
        .filter((list) =>
          list.profiles.some(
            (p) => p.profileId.toString() === profileId.toString()
          )
        )
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

      // Most recent list
      const recentList = listsWithProfile[0];
      // Profile data in that list
      const profileData =
        recentList &&
        recentList.profiles.find(
          (p) => p.profileId.toString() === profileId.toString()
        );

      return {
        id: profileId.toString(),
        name: profileInfo ? profileInfo.name : `Profile ${profileId}`,
        listName: recentList ? recentList.name : "-",
        latestCheckIn: profileData?.checkIn ?? null,
        latestCheckOut:
          profileData && typeof (profileData as any).checkOut === "string"
            ? (profileData as any).checkOut
            : null,
      };
    });
  }, [profiles, demoLists]);

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
