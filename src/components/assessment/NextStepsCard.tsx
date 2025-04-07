import { View, Text } from "@tarojs/components";
import { NextStepsCardProps } from "../../types/assessment";
import { formatAgeMonths } from "../../utils";
import "./next-steps.scss";

export const NextStepsCard: React.FC<NextStepsCardProps> = ({
  nextAssessmentDate,
}) => {
  const { nextDate, nextAgeMonths } = nextAssessmentDate;

  return (
    <View className="next-steps-card">
      <Text className="card-title">后续跟进</Text>
      <View className="next-steps-content">
        <View className="next-assessment">
          <Text className="subtitle">建议下次评估时间：</Text>
          <Text className="time">{nextDate}</Text>
          <Text className="subtitle age-info">
            将进行 {formatAgeMonths(nextAgeMonths)} 的测试
          </Text>
        </View>
      </View>
    </View>
  );
};
