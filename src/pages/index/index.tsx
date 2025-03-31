import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

export default function Index() {
  const handleStartAssessment = () => {
    Taro.navigateTo({
      url: "/pages/assessment/index",
    });
  };

  const handleViewHistory = () => {
    Taro.navigateTo({
      url: "/pages/history/index",
    });
  };

  return (
    <View className="index">
      <View className="header">
        <Image
          className="logo"
          src="/assets/images/logo.png"
          mode="aspectFit"
        />
        <Text className="title">儿童发育评估</Text>
        <Text className="subtitle">科学评估，助力成长</Text>
      </View>

      <View className="content">
        <View className="card start-card" onClick={handleStartAssessment}>
          <View className="card-icon">
            <Image src="/assets/images/assessment.png" mode="aspectFit" />
          </View>
          <View className="card-content">
            <Text className="card-title">开始评估</Text>
            <Text className="card-desc">进行新的发育评估测试</Text>
          </View>
        </View>

        <View className="card history-card" onClick={handleViewHistory}>
          <View className="card-icon">
            <Image src="/assets/images/history.png" mode="aspectFit" />
          </View>
          <View className="card-content">
            <Text className="card-title">评估历史</Text>
            <Text className="card-desc">查看历史评估记录</Text>
          </View>
        </View>
      </View>

      <View className="footer">
        <Text className="footer-text">专业的儿童发育评估工具</Text>
      </View>
    </View>
  );
}
