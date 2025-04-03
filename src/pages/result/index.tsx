import { View, Text, Button, Swiper, SwiperItem } from "@tarojs/components";
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

// 获取领域描述
const getDomainDescription = (domain: Domain, age: number): string => {
  const descriptions: Record<Domain, string> = {
    [Domain.GrossMotor]: `在大运动方面，您的孩子表现出${age}个月龄水平的发展状态。表现在身体平衡、协调性和基本运动技能等方面。`,
    [Domain.FineMotor]: `在精细动作方面，您的孩子展现出${age}个月龄水平的操作能力。这包括手指灵活度、手眼协调等细节动作。`,
    [Domain.Language]: `在语言发展方面，您的孩子达到${age}个月龄的水平。这体现在语言理解、表达和交流能力等方面。`,
    [Domain.Adaptive]: `在适应能力方面，您的孩子表现出${age}个月龄水平的发展。这包括问题解决、生活自理等适应性行为。`,
    [Domain.Social]: `在社会行为方面，您的孩子展现出${age}个月龄水平的社交能力。这体现在与他人互动、情感表达等方面。`,
  };
  return descriptions[domain];
};

// 获取领域建议
const getDomainSuggestions = (domain: Domain): string[] => {
  const suggestions: Record<Domain, string[]> = {
    [Domain.GrossMotor]: [
      "每天安排30分钟以上的户外活动时间",
      "鼓励参与跑跳、攀爬等大肌肉活动",
      "进行亲子互动游戏，如追逐、躲猫猫等",
    ],
    [Domain.FineMotor]: [
      "提供画画、捏泥等手工活动机会",
      "练习使用筷子、穿衣扣扣子等日常动作",
      "玩拼图、积木等益智玩具",
    ],
    [Domain.Language]: [
      "每天进行亲子共读活动",
      "鼓励孩子表达想法和需求",
      "创造更多与同龄人交流的机会",
    ],
    [Domain.Adaptive]: [
      "培养生活自理能力",
      "给予解决问题的机会和时间",
      "建立规律的生活作息",
    ],
    [Domain.Social]: [
      "创造与其他孩子互动的机会",
      "参与集体活动",
      "鼓励表达情感和共情能力",
    ],
  };
  return suggestions[domain];
};

// 获取即将到来的发展里程碑
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

      <View className="interpretation-card">
        <Text className="card-title">专业解读与建议</Text>
        {domainMentalAges && (
          <Swiper
            className="domain-swiper"
            indicatorDots
            indicatorColor="rgba(0, 0, 0, .3)"
            indicatorActiveColor="#3498db"
            circular
          >
            {Object.entries(domainMentalAges).map(([domain, age]) => (
              <SwiperItem key={domain} className="domain-swiper-item">
                <View className="domain-interpretation">
                  <View className="domain-header">
                    <Text className="domain-title">
                      {DOMAIN_NAMES[domain as Domain]}能力解读
                    </Text>
                    <Text className="domain-age">发展水平：{age}个月</Text>
                  </View>
                  <View className="domain-content">
                    <View className="current-status">
                      <Text className="subtitle">当前表现</Text>
                      <Text className="description">
                        {getDomainDescription(domain as Domain, age)}
                      </Text>
                    </View>
                    <View className="suggestions">
                      <Text className="subtitle">发展建议</Text>
                      <View className="suggestion-list">
                        {getDomainSuggestions(domain as Domain).map(
                          (suggestion, index) => (
                            <View key={index} className="suggestion-item">
                              <Text className="suggestion-dot">•</Text>
                              <Text className="suggestion-text">
                                {suggestion}
                              </Text>
                            </View>
                          )
                        )}
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
