import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { RadarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useMemo } from "react";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  RadarChart,
  CanvasRenderer,
]);

interface RowRadarChartProps<T extends string = string> {
  fieldToShow: T;
  correlation_matrix: {
    [K in T]: {
      [K in T]: number;
    };
  };
}
export default function RowRadarChart({
  correlation_matrix,
  fieldToShow,
}: RowRadarChartProps) {
  const option = useMemo(() => {
    return getChartOption(fieldToShow, correlation_matrix);
  }, [correlation_matrix, fieldToShow]);

  useEffect(() => {
    const chartDom = document.getElementById(`radarChart-${fieldToShow}`);
    if (chartDom) {
      const lineChart = echarts.init(chartDom);
      lineChart.setOption(option);
      const resize = () => lineChart.resize();
      window.addEventListener("resize", resize);
      return () => {
        window.removeEventListener("resize", resize);
      };
    }
  }, [fieldToShow, option]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <div
        id={`radarChart-${fieldToShow}`}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

const getChartOption = (
  field: RowRadarChartProps["fieldToShow"],
  matrix: RowRadarChartProps["correlation_matrix"]
) => {
  const fields = Object.keys(matrix);
  const indicator = fields.map((v) => ({
    name: v,
    min: -1,
    max: 1,
    color: "teal",
  }));

  return {
    title: {
      text: `Correlation Matrix of ${field}`,
    },
    tooltip: {
      trigger: "item",
    },
    radar: {
      splitArea: {
        areaStyle: {
          color: ["rgba(242, 49, 49,.2)", "rgba(18, 223, 235,.2)"],
          shadowColor: "rgba(0, 0, 0, 0.2)",
          shadowBlur: 10,
          opacity: 0.4,
        },
      },
      splitNumber: 2,
      splitLine: {
        show: false,
      },
      indicator,
    },
    series: [
      {
        name: "correlation_matrix",
        type: "radar",
        symbol: "none",
        lineStyle: {
          width: 1,
        },
        emphasis: {
          areaStyle: {
            color: "rgba(0,250,0,0.3)",
          },
        },
        data: [
          {
            value: fields.map((v) => matrix[field][v]),
            name: field,
          },
        ],
      },
    ],
  };
};
