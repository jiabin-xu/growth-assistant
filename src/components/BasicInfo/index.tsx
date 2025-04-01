import { View, Text } from "@tarojs/components";
import "./index.scss";

interface BaseInfo {
  name: string;
  gender: string;
  birthDate: string;
  height: string;
  weight: string;
}

interface BasicInfoProps {
  baseInfo: BaseInfo | null;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ baseInfo }) => {
  if (!baseInfo) return null;

  return (
    <View className="basic-info">
      <Text className="info-text highlight">姓名: {baseInfo.name}</Text>
      <Text className="info-text">性别: {baseInfo.gender}</Text>
      <Text className="info-text ">出生日期: {baseInfo.birthDate}</Text>
      <Text className="info-text">身高: {baseInfo.height}cm</Text>
      <Text className="info-text ">体重: {baseInfo.weight}kg</Text>
    </View>
  );
};

export default BasicInfo;
