import { View, Text } from "@tarojs/components";
import { NextStepsCardProps } from "../../types/assessment";
import "./next-steps.scss";

export const NextStepsCard: React.FC<NextStepsCardProps> = ({ nextAssessmentDate }) => {
  return (
    <View className="next-steps-card">
      <Text className="card-title">后续跟进</Text>
      <View className="next-steps-content">
        <View className="next-assessment">
          <Text className="subtitle">建议下次评估时间：</Text>
          <Text className="time">{nextAssessmentDate}</Text>
        </View>
      </View>
    </View>
  );
}; 