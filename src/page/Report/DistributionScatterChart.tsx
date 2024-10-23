/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-10-23 18:04:24
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-10-23 21:19:53
 * @FilePath: /dataVis/src/page/Report/ScatterChart.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";

import { GridComponent, GridComponentOption } from "echarts/components";
import { ScatterChart, ScatterSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, ScatterChart, CanvasRenderer, UniversalTransition]);

export interface DistributionScatterChartProps {
  data: number[][];
}

export default function DistributionScatterChart({
  data,
}: DistributionScatterChartProps) {
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

function getOption(data: number[][]) {
  return {
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: data,
        type: "scatter",
      },
    ],
  };
}
