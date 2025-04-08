import { View, Text, Button } from "@tarojs/components";
import { useCallback } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { BasicInfoCard } from "../../components/assessment/BasicInfoCard";
import { AssessmentResultTable } from "../../components/assessment/AssessmentResultTable";
import { RadarChart } from "../../components/assessment/RadarChart";
import { InterpretationCard } from "../../components/assessment/InterpretationCard";
import { NextStepsCard } from "../../components/assessment/NextStepsCard";
import { useAssessmentData } from "../../hooks/useAssessmentData";
import { useShare } from "../../hooks/useShare";
import { calculateAge, getNextAssessmentDate } from "../../utils";
import "./index.scss";

export default function Result() {
  const router = useRouter();
  const { id } = router.params;

  const { assessment, loading, actualAgeMonths, domainAnalysis } =
    useAssessmentData(id);

  useShare("宝宝发育评估结果 - 萌宝成长小助手");

  const handleViewFailedItems = useCallback(() => {
    if (!assessment || !assessment.id) return;

    // 存储当前评估ID，以便在未通过项目页面使用
    Taro.setStorageSync("currentAssessmentId", assessment.id);

    // 导航到未通过项目页面
    Taro.navigateTo({
      url: "/pages/failed-items/index",
    });
  }, [assessment]);

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
    dqClassification,
    domainMentalAges,
    totalMentalAge,
    developmentQuotient,
  } = results;

  return (
    <View className="result">
      <View className="header">
        <Text className="title">{name}的发展评估</Text>
      </View>

      <BasicInfoCard
        gender={gender}
        age={calculateAge(birthDate)}
        height={height}
        weight={weight}
      />

      <AssessmentResultTable
        dqClassification={dqClassification}
        totalMentalAge={totalMentalAge}
        domainAnalysis={domainAnalysis}
        developmentQuotient={developmentQuotient}
      />

      <RadarChart
        domainMentalAges={domainMentalAges}
        actualAgeMonths={actualAgeMonths}
        name={name}
      />

      <InterpretationCard domainAnalysis={domainAnalysis} />

      <NextStepsCard nextAssessmentDate={getNextAssessmentDate(birthDate)} />

      <View className="actions">
        <Button
          className="action-btn history-btn"
          onClick={handleViewFailedItems}
        >
          查看未通过项目
        </Button>
        <Button className="action-btn new-btn" openType="share">
          分享
        </Button>
      </View>
    </View>
  );
}
