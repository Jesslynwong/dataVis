import ReportTable, { Item } from "./ReportTable";
import SeriesLineChart from "./SeriesLineChart";

export type DescriptiveStatistics = { [K in string]: Item };
export type CorrelationMatrix<T extends string = string> = {
  [K in T]: {
    [K in T]: number;
  };
};
interface StatisticsTabProps {
  dataSource: {
    descriptive_statistics: DescriptiveStatistics;
    correlation_matrix: CorrelationMatrix;
    x_axis_fields: string[];
    y_axis_field: string[];
  };
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
