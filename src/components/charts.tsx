import React, { useMemo } from "react";
import {
  LineChart,
  Line,
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

interface ChartsProps {
  lists: typeLists[];
}

const Charts: React.FC<ChartsProps> = ({ lists }) => {
  const last31Days = useMemo(() => {
    const today = new Date();

    return Array.from({ length: 31 }, (_, i) => {
      const d = new Date(today);

      d.setDate(today.getDate() - (30 - i));

      return d.toISOString().split("T")[0];
    });
  }, []);

  const checkinTrend = useMemo(() => {
    return last31Days.map((date) => {
      const list = lists.find((l) => l.date === date);

      return {
        date,
        checkIns: list ? list.profiles.filter((p) => p.checkIn).length : 0,
      };
    });
  }, [lists, last31Days]);

  const barData = useMemo(() => {
    // Take the last 5 lists (most recent by date)
    const sortedLists = [...lists].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sortedLists.slice(0, 5).map((list) => ({
      name: list.name,
      profiles: list.profiles.length,
      checkIns: list.profiles.filter((p) => p.checkIn).length,
      checkOuts: list.profiles.filter((p) => p.checkOut).length,
    }));
  }, [lists]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Line Chart - Check-in Trend */}
      <div className="bg-white p-2 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">Check-in Trend</h3>
        <ResponsiveContainer height={300} width="100%">
          <LineChart data={checkinTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              dataKey="checkIns"
              dot={{ r: 3 }}
              stroke="#8884d8"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Event Stats */}
      <div className="bg-white p-2 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">List Analytics</h3>
        <ResponsiveContainer height={300} width="100%">
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

export default Charts;
