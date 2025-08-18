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
} from "@heroui/react";
import { useMemo } from "react";

import { demoLists, demoProfiles } from "@/utils/data.json";
import { formatDateTime, getElapsedTime } from "@/helper/helper";
interface listDetailsProps {
  onOpenChange: () => void;
  isOpen: boolean;
  listId: number | undefined;
}

export default function ListDetails({
  onOpenChange,
  isOpen,
  listId,
}: listDetailsProps) {
  const list = useMemo(
    () => demoLists.find((list) => list.id === listId),
    [listId]
  );

  // Get profile details for this list
  const profiles = useMemo(() => {
    if (!list) return [];

    return list.profiles.map((p) => {
      const profileInfo = demoProfiles.find((dp) => dp.id === p.profileId);

      return {
        name: profileInfo ? profileInfo.name : `Profile ${p.profileId}`,
        checkIn: p.checkIn ?? null,
        checkOut: (p as any).checkOut ?? null,
      };
    });
  }, [list]);

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalBody>
              {list ? (
                profiles.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table isStriped>
                      <TableHeader>
                        <TableColumn>Profile Name</TableColumn>
                        <TableColumn>Check-in</TableColumn>
                        <TableColumn>Check-out</TableColumn>
                        <TableColumn>Time Elapsed</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {profiles.map((p, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{formatDateTime(p.checkIn)}</TableCell>
                            <TableCell>{formatDateTime(p.checkOut)}</TableCell>
                            <TableCell>
                              {p.checkIn && p.checkOut
                                ? getElapsedTime(p.checkIn, p.checkOut)
                                : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <>No profiles found for this list.</>
                )
              ) : (
                <>Ops list not found!</>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
