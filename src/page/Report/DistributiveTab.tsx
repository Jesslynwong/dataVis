/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-10-17 10:06:08
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-10-23 21:15:50
 * @FilePath: /dataVis/src/page/Report/DistributiveTab.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useState } from "react";
import DistributiveBarChart, {
  BarChartDataProps,
} from "./DistributionBarChart";
import DistributionScatterChart from "./DistributionScatterChart";
import { JsonSource } from "./index";
const attrs = ["deposit", "age", "liability"];
const mockdata: BarChartDataProps[] = [
  {
    xAxisLabel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    yValue: [120, 200, 150, 80, 70, 110, 130, 120, 210, 110, 210],
  },
  {
    xAxisLabel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    yValue: [120, 200, 150, 80, 70, 110, 130, 120, 210],
  },
  {
    xAxisLabel: [0, 1, 2, 3, 4, 5, 6, 7],
    yValue: [120, 200, 150, 80, 70, 110, 130],
  },
];

interface DistributiveTabProps {
  dataSource: {
    rawData: JsonSource;
    xAxisLabel: string[];
    yAxisLabel: string;
  };
}
export default function DistributiveTab({ dataSource }: DistributiveTabProps) {
  const { rawData, xAxisLabel, yAxisLabel } = dataSource;
  const selectiveAttr: string[] = [...xAxisLabel, yAxisLabel];
  const [selectedNameIdx, setSelectedNameIdx] = useState(0);
  // attrs
  const items: MenuProps["items"] = selectiveAttr.map((val, idx) => {
    return {
      key: idx,
      label: <div onClick={() => setSelectedNameIdx(idx)}>{val}</div>,
    };
  });

  interface Cal2Darr {
    [key: string]: number;
  }

  const get2Darr = (xObj: Cal2Darr, yObj: Cal2Darr): number[][] => {
    const x = Object.values(xObj);
    const y = Object.values(yObj);
    const mergedArray = x.map((value, index) => [value, y[index]]);
    return mergedArray;
  };
  return (
    <>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space style={{ color: "#5470C6", fontWeight: 500 }}>
            {selectiveAttr[selectedNameIdx]}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      {/* use other api data */}
      {/* <DistributiveBarChart data={mockdata[selectedNameIdx]} /> */}
      {selectedNameIdx !== selectiveAttr.length - 1 && (
        <DistributionScatterChart
          data={get2Darr(
            rawData[selectiveAttr[selectedNameIdx]] as unknown as Cal2Darr,
            rawData[yAxisLabel] as unknown as Cal2Darr
          )}
        />
      )}
    </>
  );
}
