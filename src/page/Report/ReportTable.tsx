import { ExpandAltOutlined } from "@ant-design/icons";
import { render } from "@testing-library/react";
import { ConfigProvider, Table, TableProps } from "antd";
import styled from "styled-components";
import RowRadarChart from "./RowRadarChart";
import { CorrelationMatrix, DescriptiveStatistics } from "./StatisticsTab";

export type Item = {
  count: number;
  mean: number;
  std: number;
  min: number;
  "25%": number;
  "50%": number;
  "75%": number;
  max: number;
  median: number;
};

type DataType = Item & { key: string; name: string };

interface ReportTableProps {
  dataSource: {
    descriptive_statistics: DescriptiveStatistics;
    correlation_matrix: CorrelationMatrix;
    x_axis_fields: string[];
    y_axis_field: string[];
  };
}

export default function ReportTable({ dataSource }: ReportTableProps) {
  const {
    descriptive_statistics,
    correlation_matrix,
    x_axis_fields,
    y_axis_field,
  } = dataSource;
  const items = [
    "count",
    "mean",
    "std",
    "min",
    "25%",
    "50%",
    "75%",
    "max",
    "median",
  ] as const;
  const fieldNames = Object.keys(descriptive_statistics);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Axis",
      dataIndex: "name",
      fixed: "left",
      align: "center",
      render: (text) => (
        <StyledAxisField>
          {x_axis_fields.includes(text)
            ? "x"
            : y_axis_field.includes(text)
            ? "y"
            : ""}
        </StyledAxisField>
      ),
    },
    {
      title: "Field",
      dataIndex: "name",
      align: "center",
      fixed: "left",
      render: (text) => <StyledNameFiled>{text}</StyledNameFiled>,
    },
    ...items.map((v) => ({
      title: v,
      dataIndex: v,
      sorter: { compare: (a: DataType, b: DataType) => a[v] - b[v] },
      align: "center" as const,
      render: (text: string) => <StyledCellValue>{text}</StyledCellValue>,
    })),
  ];

  const data: DataType[] = fieldNames.map((field) => ({
    ...descriptive_statistics[field],
    name: field,
    key: field,
  }));

  console.log(data);

  return (
    <TableWrapper>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        bordered
        // title={() => "Header"}
        scroll={{ x: "max-content" }}
        // size="middle"
        pagination={false}
        expandable={{
          expandIcon: (props) => (
            <div style={{ width: "60px" }}>
              <ExpandAltOutlined
                style={{ color: "#6e75b3" }}
                onClick={(e) => props.onExpand(props.record, e)}
              />
            </div>
          ),
          expandedRowRender: (data) => (
            <RowRadarChart
              fieldToShow={data.name}
              correlation_matrix={correlation_matrix}
            />
          ),
        }}
      />
    </TableWrapper>
  );
}

const TableWrapper = styled.div``;

const StyledNameFiled = styled.div`
  text-align: left;
  color: #4e5386;
  font-weight: 500;
  font-size: 16px;
`;

const StyledAxisField = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #6e75b3;
  opacity: 0.5;
`;

const StyledCellValue = styled.span`
  color: #4e3d55;
  opacity: 0.7;
`;
