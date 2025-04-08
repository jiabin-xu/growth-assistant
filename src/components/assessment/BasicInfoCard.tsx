import { View, Text } from "@tarojs/components";
import { BasicInfoProps } from "../../types/assessment";
import "./basic-info.scss";

export const BasicInfoCard: React.FC<BasicInfoProps> = ({
  gender,
  age,
  height,
  weight,
}) => {
  return (
    <View className="basic-info-card">
      <Text className="info-title">基本信息</Text>
      <View className="info-grid">
        <View className="info-item">
          <Text className="label">性别：</Text>
          <Text className="value">{gender}</Text>
        </View>
        <View className="info-item">
          <Text className="label">年龄：</Text>
          <Text className="value">{age}</Text>
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
  );
};
