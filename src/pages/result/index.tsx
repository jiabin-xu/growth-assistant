import { View, Text, Button } from "@tarojs/components";
import { useCallback } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { BasicInfoCard } from "../../components/assessment/BasicInfoCard";
import { AssessmentResultTable } from "../../components/assessment/AssessmentResultTable";
import { RadarChart } from "../../components/assessment/RadarChart";
import { InterpretationCard } from "../../components/assessment/InterpretationCard";
import { NextStepsCard } from "../../components/assessment/NextStepsCard";
import { useAssessmentData } from "../../hooks/useAssessmentData";
import { calculateAge, getNextAssessmentDate } from "../../utils";
import "./index.scss";

export default function Result() {
  const router = useRouter();
  const { id } = router.params;

  const { assessment, loading, actualAgeMonths, domainAnalysis } =
    useAssessmentData(id);

  const handleViewHistory = useCallback(() => {
    Taro.navigateTo({
      url: "/pages/history/index",
    });
  }, []);

  const handleNewAssessment = useCallback(() => {
    Taro.navigateTo({
      url: "/pages/assessment/index",
    });
  }, []);

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
  const { dqClassification, domainMentalAges, totalMentalAge } = results;

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
      />

      <RadarChart
        domainMentalAges={domainMentalAges}
        actualAgeMonths={actualAgeMonths}
        name={name}
      />

      <InterpretationCard domainAnalysis={domainAnalysis} />

      <NextStepsCard nextAssessmentDate={getNextAssessmentDate(birthDate)} />

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
