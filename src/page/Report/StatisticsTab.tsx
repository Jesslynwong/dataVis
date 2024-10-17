import { JsonReport } from ".";
import StatisticsTable from "./StatisticsTable";

interface StatisticsTabProps {
  dataSource: Pick<JsonReport["report"], "analysis_results" | "outliers">;
}
export default function StatisticsTab({ dataSource }: StatisticsTabProps) {
  return (
    <div>
      <StatisticsTable dataSource={dataSource} />
    </div>
  );
}
