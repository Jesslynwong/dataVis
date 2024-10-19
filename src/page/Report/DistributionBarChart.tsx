/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-10-18 14:18:18
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-10-19 12:35:32
 * @FilePath: /dataVis/src/page/Report/DistributionBarChart.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

export interface DistributionBarChartProps {
  data: {
    xAxisLabel: number[];
    yValue: number[];
  };
}

export type BarChartDataProps = Pick<
  DistributionBarChartProps["data"],
  "xAxisLabel" | "yValue"
>;

export default function DistributionBarChart({
  data,
}: DistributionBarChartProps) {
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={getOption(data)}
      notMerge={true}
      lazyUpdate={true}
      theme={"theme_name"}
      //   onChartReady={this.onChartReadyCallback}
      //   onEvents={EventsDict}
      //   opts={}
    />
  );
}

function getOption(data: BarChartDataProps) {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "rgba(74, 211, 164, 0)",
        },
      },
      formatter: function (params: { value: any }[]) {
        return `🔘 frequency: ${params[0].value}`;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: data.xAxisLabel.slice(0, data.xAxisLabel.length - 1),
        show: false,
      },
      {
        type: "category",
        data: data.xAxisLabel,
        boundaryGap: false,
        axisTick: { alignWithLabel: true },
        position: "bottom",
      },
    ],
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data.yValue,
        type: "bar",
        barCategoryGap: "20%",
        itemStyle: {},
        xAxisIndex: 0,
        backgroundStyle: {
          color: "rgba(220, 220, 220, 0.8)",
        },
      },
    ],
  };
}
