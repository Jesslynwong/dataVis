import { Button, Card, ConfigProvider, Tabs, TabsProps } from "antd";
import styled from "styled-components";
import Statistics from "../Statistics";
import Ideas from "../Ideas";
import { useNavigate } from "react-router-dom";
import StatisticsTab from "./StatisticsTab";
import IdeasTab from "./IdeasTab";

import mockData from "../../stubs/template.json";

export default function Report() {
  const navigate = useNavigate();

  const { report } = mockData;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Statistics",
      children: (
        <StatisticsTab
          dataSource={{
            ...report.analysis_results,
          }}
        />
      ),
    },
    {
      key: "2",
      label: "Ideas",
      children: <Ideas />,
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
