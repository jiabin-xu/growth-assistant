import { View, Text, Button, Swiper, SwiperItem } from "@tarojs/components";
import { useState, useEffect, useMemo } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { VChartSimple } from "@visactor/taro-vchart";
import { VChart } from "@visactor/vchart/esm/core";
import { Domain } from "../../constants";
import "./index.scss";
import { VChartEnvType } from "@visactor/taro-vchart/esm/typings";
import { registerRadarChart } from "@visactor/vchart/esm/chart";
import { registerDiscreteLegend } from "@visactor/vchart/esm/component";
import { getInterpretationAndSuggestions } from "src/utils/evaluate";

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

VChart.useRegisters([
  registerRadarChart,
  // registerTooltip,
  // registerCanvasTooltipHandler,
  registerDiscreteLegend,
]);

// 格式化日期
const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

// 获取下次评估建议日期（3个月后）
const getNextAssessmentDate = (birthDate: string): string => {
  const nextDate = new Date();
  nextDate.setMonth(nextDate.getMonth() + 3);
  return formatDate(nextDate);
};
const getUpcomingMilestones = (currentAge: number): string[] => {
  return [
    "预期3个月内可以达成的能力目标1",
    "预期3个月内可以达成的能力目标2",
    "预期3个月内可以达成的能力目标3",
  ];
};

// 分享报告
const handleShare = () => {
  Taro.showShareMenu({
    withShareTicket: true,
    menus: ["shareAppMessage", "shareTimeline"],
  });
};

// 下载PDF
const handleDownloadPDF = () => {
  Taro.showToast({
    title: "正在生成PDF...",
    icon: "loading",
  });
  // TODO: 实现PDF生成和下载逻辑
};

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

          // 实际年龄数据
          ...Object.keys(assessment.results.domainMentalAges).map((domain) => ({
            key: DOMAIN_NAMES[domain as Domain],
            value: actualAgeMonths,
            type: "实际年龄",
          })),
          ...Object.entries(assessment.results.domainMentalAges).map(
            ([domain, age]) => ({
              key: DOMAIN_NAMES[domain as Domain],
              value: age,
              type: "发育年龄",
            })
          ),
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
        orient: "top",
      },
      // tooltip: {
      //   visible: true,
      //   formatter: (datum) => {
      //     return `${datum.type}: ${datum.value}个月`;
      //   },
      // },
    };
  };

  const { name, birthDate, gender, height, weight, results } = assessment || {};
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

  const actualAgeMonths = useMemo(() => {
    if (!assessment?.birthDate) return 0;
    const birthDate = new Date(assessment.birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birthDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
  }, [assessment?.birthDate]);

  const domainAnalysis = useMemo(() => {
    if (!domainMentalAges || !developmentQuotient) return [];

    return Object.entries(domainMentalAges).map(([domain, mentalAgeValue]) => {
      const mentalAge = Number(mentalAgeValue);
      const { interpretation, suggestions } = getInterpretationAndSuggestions(
        domain as Domain,
        Number(developmentQuotient),
        mentalAge
      );

      return {
        domain: domain as Domain,
        domainName: DOMAIN_NAMES[domain as Domain],
        mentalAge,
        interpretation,
        suggestions,
        description: interpretation,
        developmentStatus:
          Number(mentalAge) >= actualAgeMonths
            ? "领先"
            : Number(mentalAge) >= actualAgeMonths * 0.8
            ? "正常"
            : "需要关注",
        gap: Math.abs(mentalAge - actualAgeMonths),
      };
    });
  }, [domainMentalAges, developmentQuotient, actualAgeMonths]);

  // 替换原有的suggestions

  const radarSpec = getRadarChartSpec();

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

  return (
    <View className="result">
      <View className="header">
        <Text className="title">{name}的评估结果</Text>
      </View>

      <View className="basic-info">
        <Text className="info-title">基本信息</Text>
        <View className="info-grid">
          <View className="info-item">
            <Text className="label">性别：</Text>
            <Text className="value">{gender}</Text>
          </View>
          <View className="info-item">
            <Text className="label">年龄：</Text>
            <Text className="value">{calculateAge(birthDate)}</Text>
          </View>
          <View className="info-item">
            <Text className="label">身高：</Text>
            <Text className="value">{height}cm</Text>
          </View>
          <View className="info-item">
            <Text className="label">体重：</Text>
            <Text className="value">{weight}kg</Text>
          </View>
        </View>
      </View>

      <View className="score-card">
        <View className="main-score">
          <Text className="score-label">发育评估结果</Text>
          <Text className="classification">
            {dqClassification || "暂无结果"}
          </Text>
        </View>
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

      <View className="interpretation-card">
        <Text className="card-title">解读与建议</Text>
        {domainAnalysis.length > 0 && (
          <Swiper
            className="domain-swiper"
            indicatorDots
            indicatorColor="rgba(0, 0, 0, .3)"
            indicatorActiveColor="#3498db"
            circular
          >
            {domainAnalysis.map((analysis) => (
              <SwiperItem key={analysis.domain} className="domain-swiper-item">
                <View className="domain-interpretation">
                  <View className="domain-header">
                    <Text className="domain-title">
                      {analysis.domainName}能力解读
                    </Text>
                    <View className="domain-status">
                      <Text className="domain-age">
                        发展水平：{analysis.mentalAge}个月
                      </Text>
                      {/* <Text
                        className={`status-tag ${analysis.developmentStatus.toLowerCase()}`}
                      >
                        {analysis.developmentStatus}
                      </Text> */}
                    </View>
                  </View>
                  <View className="domain-content">
                    <View className="current-status">
                      <Text className="subtitle">当前表现</Text>
                      <Text className="description">
                        {analysis.interpretation}
                      </Text>
                    </View>
                    <View className="suggestions">
                      <Text className="subtitle">发展建议</Text>
                      <View className="suggestion-list">
                        {analysis.suggestions?.map((suggestion, index) => (
                          <View key={index} className="suggestion-item">
                            <Text className="suggestion-dot">•</Text>
                            <Text className="suggestion-text">
                              {suggestion}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        )}
      </View>

      <View className="next-steps-card">
        <Text className="card-title">后续跟进</Text>
        <View className="next-steps-content">
          <View className="next-assessment">
            <Text className="subtitle">建议复查时间</Text>
            <Text className="time">
              {getNextAssessmentDate(assessment.birthDate)}
            </Text>
          </View>
          <View className="milestones">
            <Text className="subtitle">近期发展里程碑</Text>
            <View className="milestone-list">
              {getUpcomingMilestones(assessment.results.totalMentalAge).map(
                (milestone, index) => (
                  <View key={index} className="milestone-item">
                    <Text className="milestone-dot">○</Text>
                    <Text className="milestone-text">{milestone}</Text>
                  </View>
                )
              )}
            </View>
          </View>
        </View>
      </View>

      <View className="report-footer">
        <View className="report-meta">
          <Text className="report-id">报告编号：{assessment.id}</Text>
          <Text className="report-date">
            评估日期：{formatDate(new Date())}
          </Text>
        </View>
        <View className="report-actions">
          <Button className="action-btn share" onClick={handleShare}>
            分享报告
          </Button>
          <Button className="action-btn download" onClick={handleDownloadPDF}>
            下载 PDF
          </Button>
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
