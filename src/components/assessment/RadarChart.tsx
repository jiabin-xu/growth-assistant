import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { VChartSimple } from "@visactor/taro-vchart";
import { VChart } from "@visactor/vchart/esm/core";
import { VChartEnvType } from "@visactor/taro-vchart/esm/typings";
import { RadarChartProps } from "../../types/assessment";
import { useChartConfig } from "../../hooks/useChartConfig";
import "./radar-chart.scss";
import { registerWXEnv } from "@visactor/vchart/esm/env";
import { registerRadarChart } from "@visactor/vchart/esm/chart/radar";
import { registerDiscreteLegend } from "@visactor/vchart/esm/component";

VChart.useRegisters([
  registerRadarChart,
  registerWXEnv,
  // registerTooltip,
  registerDiscreteLegend,
  // registerCanvasTooltipHandler,
]);

export const RadarChart: React.FC<RadarChartProps> = ({
  domainMentalAges,
  actualAgeMonths,
  name,
}) => {
  const chartSpec = useChartConfig(domainMentalAges, actualAgeMonths, name);
  const canvasId = `radarChart_${Math.random().toString(36).substring(2, 10)}`;

  return (
    <View className="radar-chart">
      <Text className="chart-title">领域能力分布</Text>
      {chartSpec && (
        <VChartSimple
          type={Taro.getEnv() as VChartEnvType}
          chartConstructor={VChart}
          spec={chartSpec}
          canvasId={canvasId}
          style={{
            width: "100%",
            height: "300px",
          }}
          onChartInit={(chart) => {
            console.log("chart init:", chart);
          }}
          onChartReady={(chart) => {
            console.log("chart ready:", chart);
          }}
          onChartUpdate={(chart) => {
            console.log("chart update:", chart);
          }}
        />
      )}
    </View>
  );
};
