import { Card, CardBody, CardHeader } from "@heroui/react";
import React, { useMemo } from "react";

import { profile, typeLists } from "@/types";

interface listCardsProps {
  profiles: profile[];
  lists: typeLists[];
}

const ListsCards: React.FC<listCardsProps> = ({ profiles, lists }) => {
  const metrics = useMemo(() => {
    // ✅ Total check-ins
    const totalCheckIns = lists.reduce((sum, list) => {
      const count = list.profiles.filter((p: any) => {
        return p.checkIn;
      }).length;

      return sum + count;
    }, 0);

    // ✅ Total check-outs
    const totalCheckOuts = lists.reduce((sum, list) => {
      const count = list.profiles.filter((p: any) => p.checkOut).length;

      return sum + count;
    }, 0);

    return [
      { title: "Total Lists", value: lists.length },
      { title: "Total Profiles", value: profiles.length },
      { title: "Total Check-ins", value: totalCheckIns },
      { title: "Total Check-outs", value: totalCheckOuts },
    ];
  }, [profiles, lists]);

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
