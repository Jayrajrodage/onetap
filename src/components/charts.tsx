import React from "react";
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

type CheckinTrend = {
  date: string;
  checkIns: number;
};

type EventStats = {
  event: string;
  profiles: number;
  checkIns: number;
  checkOuts: number;
};

interface ChartsProps {
  checkinTrend: CheckinTrend[];
  eventStats: EventStats[];
}

const Charts: React.FC<ChartsProps> = ({ checkinTrend, eventStats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Line Chart - Check-in Trend */}
      <div className="bg-white p-2 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">Check-in Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
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
          <BarChart data={eventStats.slice(0, 5)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="event" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profiles" fill="#82ca9d" name="Profiles" />
            <Bar dataKey="checkIns" fill="#8884d8" name="Check-ins" />
            <Bar dataKey="checkOuts" fill="#ffc658" name="Check-outs" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
