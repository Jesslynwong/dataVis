import { JsonReport } from ".";
import ReportTable from "./ReportTable";

interface StatisticsTabProps {
  dataSource: JsonReport["report"]["analysis_results"];
}
export default function StatisticsTab({ dataSource }: StatisticsTabProps) {
  return (
    <div>
      <div>
        {/* <SeriesLineChart data={dataSource.descriptive_statistics} /> */}
        <ReportTable dataSource={dataSource} />
      </div>
    </div>
  );
}
