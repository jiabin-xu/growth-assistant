import { useMemo } from "react";
import { Domain } from "../constants/rule";
import { VChart } from "@visactor/vchart/esm/core";
import { registerRadarChart } from "@visactor/vchart/esm/chart";
import { registerDiscreteLegend } from "@visactor/vchart/esm/component";

VChart.useRegisters([registerRadarChart, registerDiscreteLegend]);

export const useChartConfig = (
  domainMentalAges: Record<Domain, number>,
  actualAgeMonths: number,
  name: string
) => {
  return useMemo(() => {
    if (!domainMentalAges) return null;

    const chartData = [
      {
        id: name,
        values: [
          // 实际年龄数据
          ...Object.keys(domainMentalAges).map((domain) => ({
            key: domain,
            value: actualAgeMonths,
            type: "实际年龄",
          })),
          // 发育年龄数据
          ...Object.entries(domainMentalAges).map(([domain, age]) => ({
            key:domain,
            value: age,
            type: "发育年龄",
          })),
        ],
      },
    ];

    return {
      type: "radar",
      data: chartData,
      categoryField: "key",
      valueField: "value",
      seriesField: "type",
      area: {
        visible: true,
      },
      color: ["#999", "#58cc02"],
      legends: {
        visible: true,
        orient: "top" as const,
      },
    };
  }, [domainMentalAges, actualAgeMonths, name]);
}; 