/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-10-17 10:06:08
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-10-19 12:30:12
 * @FilePath: /dataVis/src/page/Report/DistributiveTab.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useState } from "react";
import DistributiveBarChart, { BarChartDataProps} from "./DistributionBarChart";

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
export default function DistributiveTab() {
  const [selectedNameIdx, setSelectedNameIdx] = useState(0);
  const items: MenuProps["items"] = attrs.map((val, idx) => {
    return {
      key: idx,
      label: <div onClick={() => setSelectedNameIdx(idx)}>{val}</div>,
    };
  });
  return (
    <>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space style={{color: '#5470C6', fontWeight: 500}}>
            {attrs[selectedNameIdx]}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <DistributiveBarChart data={mockdata[selectedNameIdx]} />
    </>
  );
}
