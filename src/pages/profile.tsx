import Charts from "@/components/charts";
import SummaryCards from "@/components/summaryCards";
import HistoryTable from "@/components/table";
import DefaultLayout from "@/layouts/default";
import Navbar from "@/components/filterBar";
const checkinTrend = [
  { date: "2025-07-17", checkIns: 20 },
  { date: "2025-07-18", checkIns: 34 },
  { date: "2025-07-19", checkIns: 28 },
  { date: "2025-07-20", checkIns: 40 },
  { date: "2025-07-21", checkIns: 22 },
  { date: "2025-07-22", checkIns: 18 },
  { date: "2025-07-23", checkIns: 30 },
  { date: "2025-07-24", checkIns: 25 },
  { date: "2025-07-25", checkIns: 36 },
  { date: "2025-07-26", checkIns: 27 },
  { date: "2025-07-27", checkIns: 31 },
  { date: "2025-07-28", checkIns: 42 },
  { date: "2025-07-29", checkIns: 38 },
  { date: "2025-07-30", checkIns: 24 },
  { date: "2025-07-31", checkIns: 29 },
  { date: "2025-08-01", checkIns: 33 },
  { date: "2025-08-02", checkIns: 19 },
  { date: "2025-08-03", checkIns: 45 },
  { date: "2025-08-04", checkIns: 37 },
  { date: "2025-08-05", checkIns: 41 },
  { date: "2025-08-06", checkIns: 26 },
  { date: "2025-08-07", checkIns: 32 },
  { date: "2025-08-08", checkIns: 39 },
  { date: "2025-08-09", checkIns: 35 },
  { date: "2025-08-10", checkIns: 28 },
  { date: "2025-08-11", checkIns: 30 },
  { date: "2025-08-12", checkIns: 34 },
  { date: "2025-08-13", checkIns: 43 },
  { date: "2025-08-14", checkIns: 21 },
  { date: "2025-08-15", checkIns: 27 },
  { date: "2025-08-16", checkIns: 40 },
];

export default function Profile() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        <Navbar />
        <SummaryCards />
        <Charts
          checkinTrend={checkinTrend}
          eventStats={[
            { event: "Event A", profiles: 50, checkIns: 40, checkOuts: 30 },
            { event: "Event B", profiles: 30, checkIns: 25, checkOuts: 20 },
            { event: "Event C", profiles: 45, checkIns: 38, checkOuts: 33 },
            { event: "Event D", profiles: 60, checkIns: 55, checkOuts: 48 },
            { event: "Event E", profiles: 25, checkIns: 20, checkOuts: 18 },
          ]}
        />
        <HistoryTable />
      </div>
    </DefaultLayout>
  );
}
