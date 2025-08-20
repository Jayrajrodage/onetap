import { Card, CardBody, CardHeader } from "@heroui/react";
import React, { useMemo } from "react";

import { participant } from "@/types";

interface listCardsProps {
  participants: participant[];
}

const ListsCards: React.FC<listCardsProps> = ({ participants }) => {
  const metrics = useMemo(() => {
    // Unique profile IDs
    const uniqueProfileIds = new Set(participants.map((p) => p.profileId));
    // Unique list IDs
    const uniqueListIds = new Set(participants.map((p) => p.listId));

    // Total check-ins
    const totalCheckIns = participants.filter((p) => p.checkedIn).length;
    // Total check-outs
    const totalCheckOuts = participants.filter((p) => p.checkedOut).length;

    return [
      { title: "Total Lists", value: uniqueListIds.size },
      { title: "Total Profiles", value: uniqueProfileIds.size },
      { title: "Total Check-ins", value: totalCheckIns },
      { title: "Total Check-outs", value: totalCheckOuts },
    ];
  }, [participants]);

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, idx) => (
        <Card key={idx} className="rounded-2xl shadow-sm">
          <CardHeader>
            <div className="text-base font-medium text-gray-600">
              {metric.title}
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ListsCards;
