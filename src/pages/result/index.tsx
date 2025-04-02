import { View, Text, Button } from "@tarojs/components";
import { useState, useEffect, useMemo } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { VChartSimple } from "@visactor/taro-vchart";
import { VChart } from "@visactor/vchart/esm/core";
import { Domain } from "../../constants";
import "./index.scss";
import { VChartEnvType } from "@visactor/taro-vchart/esm/typings";
import { registerRadarChart } from "@visactor/vchart/esm/chart";
// import { registerRadarChart } from "@visactor/vchart";

interface Assessment {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  height: string;
  weight: string;
  results: {
    developmentQuotient: number;
    dqClassification: string;
    domainMentalAges: Record<Domain, number>;
    totalMentalAge: number;
  };
}

// 领域名称映射
const DOMAIN_NAMES: Record<Domain, string> = {
  [Domain.GrossMotor]: "大运动",
  [Domain.FineMotor]: "精细动作",
  [Domain.Language]: "语言",
  [Domain.Adaptive]: "适应能力",
  [Domain.Social]: "社会行为",
};

VChart.useRegisters([registerRadarChart]);

export default function Result() {
  const router = useRouter();
  const { id } = router.params;

  const canvasId = useMemo(
    () => `myChart_${Math.random().toString(36).substring(2, 10)}`,
    []
  );

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    try {
      const assessments = Taro.getStorageSync("assessments") || [];
      const currentAssessment = assessments.find((a) => a.id === id);

      if (!currentAssessment) {
        Taro.showToast({
          title: "未找到评估信息",
          icon: "error",
        });
        return;
      }

      setAssessment(currentAssessment);
    } catch (e) {
      console.error("获取评估结果失败:", e);
      Taro.showToast({
        title: "获取结果失败",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleViewHistory = () => {
    Taro.navigateTo({
      url: "/pages/history/index",
    });
  };

  const handleNewAssessment = () => {
    Taro.navigateTo({
      url: "/pages/assessment/index",
    });
  };

  const mockData = [
    {
      id: "白金",
      values: [
        {
          key: "大运动",
          value: 5,
          type: "user",
        },
        {
          key: "精细动作",
          value: 5,
          type: "user",
        },
        {
          key: "语言",
          value: 5,
          type: "user",
        },
        {
          key: "适应能力",
          value: 5,
          type: "user",
        },
        {
          key: "社会行为",
          value: 5,
          type: "user",
        },
        {
          key: "大运动",
          value: 11,
          type: "age",
        },
        {
          key: "精细动作",
          value: 10,
          type: "age",
        },
        {
          key: "语言",
          value: 4,
          type: "age",
        },
        {
          key: "适应能力",
          value: 2,
          type: "age",
        },
        {
          key: "社会行为",
          value: 6,
          type: "age",
        },
      ],
    },
  ];

  console.log("assessment :>> ", assessment);

  const getRadarChartSpec = () => {
    if (!assessment?.results.domainMentalAges) return null;

    // 计算用户实际月龄
    const birthDate = new Date(assessment.birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birthDate.getTime());
    const actualAgeMonths = Math.floor(
      diffTime / (1000 * 60 * 60 * 24 * 30.44)
    );

    // 构建雷达图数据
    const chartData = [
      {
        id: assessment.name,
        values: [
          // 发育年龄数据
          ...Object.entries(assessment.results.domainMentalAges).map(
            ([domain, age]) => ({
              key: DOMAIN_NAMES[domain as Domain],
              value: age,
              type: "发育年龄",
            })
          ),
          // 实际年龄数据
          ...Object.keys(assessment.results.domainMentalAges).map((domain) => ({
            key: DOMAIN_NAMES[domain as Domain],
            value: actualAgeMonths,
            type: "实际年龄",
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
      legend: {
        visible: true,
      },
      tooltip: {
        visible: true,
        formatter: (datum) => {
          return `${datum.type}: ${datum.value}个月`;
        },
      },
    };
  };

  if (loading) {
    return (
      <View className="result loading">
        <Text>加载中...</Text>
      </View>
    );
  }

  if (!assessment) {
    return (
      <View className="result loading">
        <Text>未找到评估信息</Text>
      </View>
    );
  }

  const { name, birthDate, gender, height, weight, results } = assessment;
  const {
    developmentQuotient,
    dqClassification,
    domainMentalAges,
    totalMentalAge,
  } = results || {};

  // 计算年龄
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const months = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years}岁${remainingMonths}个月`;
  };

  const radarSpec = getRadarChartSpec();

  return (
    <View className="result">
      <View className="header">
        <Text className="title">评估结果</Text>
        <Text className="subtitle">{name}</Text>
      </View>

      <View className="basic-info">
        <Text className="info-title">基本信息</Text>
        <View className="info-grid">
          <View className="info-item">
            <Text className="label">性别</Text>
            <Text className="value">{gender}</Text>
          </View>
          <View className="info-item">
            <Text className="label">年龄</Text>
            <Text className="value">{calculateAge(birthDate)}</Text>
          </View>
          <View className="info-item">
            <Text className="label">身高</Text>
            <Text className="value">{height}cm</Text>
          </View>
          <View className="info-item">
            <Text className="label">体重</Text>
            <Text className="value">{weight}kg</Text>
          </View>
        </View>
      </View>

      <View className="score-card">
        <View className="main-score">
          <Text className="score-value">{developmentQuotient || 0}</Text>
          <Text className="score-label">发育商 (DQ)</Text>
        </View>
        <Text className="classification">{dqClassification || ""}</Text>
      </View>

      <View className="radar-chart">
        <Text className="chart-title">领域能力分布</Text>
        {radarSpec && (
          <VChartSimple
            type={Taro.getEnv() as VChartEnvType}
            chartConstructor={VChart}
            spec={radarSpec}
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

      <View className="details-card">
        <Text className="card-title">领域得分</Text>
        <View className="domains">
          {domainMentalAges &&
            Array.from(Object.entries(domainMentalAges)).map(
              ([domain, age]) => (
                <View key={domain} className="domain-item">
                  <Text className="domain-name">
                    {DOMAIN_NAMES[domain as Domain]}
                  </Text>
                  <Text className="domain-score">{age}个月</Text>
                </View>
              )
            )}
        </View>
        <View className="total-age">
          <Text className="label">总体发育年龄</Text>
          <Text className="value">{totalMentalAge || 0}个月</Text>
        </View>
      </View>

      <View className="actions">
        <Button className="action-btn history" onClick={handleViewHistory}>
          查看历史记录
        </Button>
        <Button className="action-btn new" onClick={handleNewAssessment}>
          开始新的评估
        </Button>
      </View>
    </View>
  );
}
