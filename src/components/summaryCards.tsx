import { Card, CardBody, CardHeader } from "@heroui/react";

const SummaryCards = ({
  totalProfiles = 0,
  totalLists = 0,
  totalCheckIns = 0,
  avgCheckInsPerDay = 0,
}) => {
  const metrics = [
    { title: "Total Profiles", value: totalProfiles },
    { title: "Total Lists", value: totalLists },
    { title: "Total Check-ins", value: totalCheckIns },
    { title: "Avg Check-ins", value: avgCheckInsPerDay },
  ];

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

export default SummaryCards;
