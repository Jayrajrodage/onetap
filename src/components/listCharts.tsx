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

import { typeLists } from "@/types";

interface ListChartsProps {
  lists: typeLists[];
}

const ListCharts: React.FC<ListChartsProps> = ({ lists }) => {
  const barData = useMemo(() => {
    // Take the last 5 lists (most recent by date)
    const sortedLists = [...lists].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sortedLists.slice(0, 7).map((list) => ({
      name: list.name,
      profiles: list.profiles.length,
      checkIns: list.profiles.filter((p) => p.checkIn).length,
      checkOuts: list.profiles.filter((p) => p.checkOut).length,
    }));
  }, [lists]);

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
