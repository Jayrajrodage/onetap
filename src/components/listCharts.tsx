import React, { useMemo } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { participant } from "@/types";

interface ListChartsProps {
  participantsData: participant[]; // Adjust type as needed
}

const ListCharts: React.FC<ListChartsProps> = ({ participantsData }) => {
  const barData = useMemo(() => {
    // Group by listId
    const listMap: Record<
      string,
      {
        name: string;
        profiles: Set<string>;
        checkIns: number;
        checkOuts: number;
        date: number;
      }
    > = {};

    participantsData.forEach((p) => {
      if (!listMap[p.listId]) {
        listMap[p.listId] = {
          name: p.listName,
          profiles: new Set(),
          checkIns: 0,
          checkOuts: 0,
          date: p.checkInDate || 0,
        };
      }

      listMap[p.listId].profiles.add(p.profileId);
      if (p.checkedIn) listMap[p.listId].checkIns += 1;
      if (p.checkedOut) listMap[p.listId].checkOuts += 1;
      // Use the latest checkInDate as the list date
      if (p.checkInDate > listMap[p.listId].date) {
        listMap[p.listId].date = p.checkInDate;
      }
    });
    const listsArr = Object.values(listMap).sort((a, b) => b.date - a.date);

    return listsArr.slice(0, 7).map((list) => ({
      name: list.name,
      profiles: list.profiles.size,
      checkIns: list.checkIns,
      checkOuts: list.checkOuts,
    }));
  }, [participantsData]);

  return (
    <div className="w-full">
      <div className="bg-white p-2 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">List Analytics</h3>
        <ResponsiveContainer className="-ml-7" height={300} width="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={false} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profiles" fill="#82ca9d" name="Profile" />
            <Bar dataKey="checkIns" fill="#8884d8" name="Check-ins" />
            <Bar dataKey="checkOuts" fill="#ffc658" name="Check-outs" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ListCharts;
