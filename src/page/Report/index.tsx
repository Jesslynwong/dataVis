import { Button, Card, ConfigProvider, message, Tabs, TabsProps } from "antd";
import styled from "styled-components";
import Ideas from "./IdeasTab";
import { useNavigate, useParams } from "react-router-dom";
import StatisticsTab from "./StatisticsTab";
import DistributiveTab from "./DistributiveTab";

import template from "../../stubs/template.json";
import { useGlobalContext } from "../../App";
import { useMemo } from "react";

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

export type JsonReport<T extends string = string> = {
  report: {
    title: string;
    missing_values: unknown;
    outliers: {
      [K in T]: number[];
    };
    analysis_results: {
      statistical_analysis_fields: T[];
      x_axis_fields: T[];
      y_axis_field: T;
      descriptive_statistics: {
        [K in T]: Item;
      };
      correlation_matrix: {
        [K in T]: {
          [K in T]: number;
        };
      };
    };
  };
  Ideas: {
    ideas: {
      Idea: string;
      Idea_No: string;
      Reasoning: string;
      Solution: string;
    }[];
    summary: string;
  };
};

export type JsonSource<T extends string = string> = ({
  [K in T]: number;
} & {
  name: string;
  address: string;
})[];

export default function Report() {
  const { uid } = useParams();
  const { fileList, setFileList } = useGlobalContext();

  const fileResponse = useMemo(() => {
    const matchedFile = fileList.find((file) => file.uid === uid);
    // eslint-disable-next-line no-constant-condition
    if (true) {
      // todo: local mock data
      return {
        json_report: template as JsonReport,
        json_source: [] as JsonSource,
      };
    }
    return matchedFile?.response.response as {
      json_report: JsonReport;
      json_source: JsonSource;
    };
  }, [fileList, uid]);

  console.log(">> fileResponse: ", fileResponse);

  const navigate = useNavigate();

  if (!fileResponse) {
    setFileList(fileList.filter((v) => v.uid !== uid));
    message.error("Unexpected error happened!");
    navigate("/");
  }

  const { report, Ideas: ideas } = fileResponse.json_report;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Statistics",
      children: (
        <StatisticsTab
          dataSource={{
            analysis_results: report.analysis_results,
            outliers: report.outliers,
          }}
        />
      ),
    },
    {
      key: "2",
      label: "Distributive",
      children: <DistributiveTab />,
    },
    {
      key: "3",
      label: "Ideas",
      children: <Ideas dataSource={ideas} />,
    },
  ];

  return (
    <ReportWrapper>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerSplitColor: "#bec0da",
            },
            Tabs: {
              inkBarColor: "#6e75b3",
              itemSelectedColor: "#6e75b3",
              itemHoverColor: "#7f8ae8",
              itemColor: "#bec0da",
              fontSize: 16,
            },
          },
        }}
      >
        <Card>
          <Tabs
            defaultActiveKey="1"
            items={items}
            tabBarExtraContent={
              <Button onClick={() => navigate("/")}>Back</Button>
            }
          />
        </Card>
      </ConfigProvider>
    </ReportWrapper>
  );
}

const ReportWrapper = styled.div`
  padding: 20px;
`;
