/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-09-12 17:09:20
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-10-11 15:55:21
 * @FilePath: /dataVis/src/page/Ideas/index.tsx
 */
import React, { ReactNode } from 'react';
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Card } from "antd";
import "./index.css";
import { CheckCircleTwoTone } from '@ant-design/icons';


interface DataType {
  key: string;
  Icon: ReactNode;
  Idea: string;
  Reasoning: string;
  Solution: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "",
    dataIndex: "Icon",
    key: "Icon",
  },
  {
    title: "Idea",
    dataIndex: "Idea",
    key: "Idea",
  }, 
  {
    title: "Reasoning",
    dataIndex: "Reasoning",
    key: "Reasoning",
  },
  {
    title: "Solution",
    dataIndex: "Solution",
    key: "Solution",
  },
];

const data: DataType[] = [
  {
    key: "1",
    Icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: 20}}/>,
    Idea: "Emoticons 1.2 The 'age' column shows a significant skew towards younger individuals, which may not accurately represent the general population.",
    Reasoning:
      "The histogram for 'age' shows a peak at the lower end, indicating a higher frequency of younger individuals. This skew could lead to biased predictions if the model is trained on this data.",
    Solution:
      "Consider collecting more data from older individuals to balance the age distribution or apply a weighting scheme to adjust for the skew.",
  },
  {
    key: "2",
    Icon: <CheckCircleTwoTone twoToneColor="#52c41a"style={{fontSize: 20}} />,
    Idea: "The 'liability' column has a high variance, which could lead to overfitting in the model.",
    Reasoning:
      "The histogram for 'liability' shows a wide spread of values, indicating high variance. This could make it difficult for the model to generalize well.",
    Solution:
      "Apply feature scaling or normalization to the 'liability' column to reduce its variance and improve model performance.",
  },
  {
    key: "3",
    Icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: 20}}/>,
    Idea: "The 'Average monthly expenditure' column has a few extreme values that could be outliers.",
    Reasoning:
      "The histogram for 'Average monthly expenditure' shows a few bars at the higher end, which could be outliers. These outliers could skew the model's predictions.",
    Solution:
      "Identify and remove or adjust the extreme values in the 'Average monthly expenditure' column to reduce their impact on the model.",
  },
];

export default function Ideas() {
  return (
    <div id="idea-content-outline">
      <Card
        title="Summary"
        bordered={false}
        style={{ width: "100%", maxHeight: "50vh", overflow: "scroll", marginBottom: "24px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <p>
          Three key issues were identified: data skew in 'age', high variance in
          'liability', and potential outliers in 'Average monthly expenditure'.
          Solutions involve balancing the age distribution, normalizing
          'liability', and handling outliers in 'Average monthly expenditure' to
          improve model performance.
        </p>
      </Card>
      <Table<DataType> columns={columns} dataSource={data} pagination={false} style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/>
    </div>
  );
}

