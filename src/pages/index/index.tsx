import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useShare } from "../../hooks/useShare";
import "./index.scss";
import assessmentIcon from "../../assets/images/assessment.svg";
import historyIcon from "../../assets/images/history.svg";

export default function Index() {
  // 添加分享功能
  useShare("萌宝成长小助手 - 妈妈不再焦虑儿保");

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
        {/* <Image
          className="logo"
          src="/assets/images/logo.png"
          mode="aspectFit"
        /> */}
        <div className="logo"></div>
        <Text className="title">儿童发育评估</Text>
        <Text className="subtitle">科学评估，助力成长</Text>
      </View>

      <View className="content">
        <View className="card start-card" onClick={handleStartAssessment}>
          <View className="card-icon">
            <Image src={assessmentIcon} mode="aspectFit" />
          </View>
          <View className="card-content">
            <Text className="card-title">开始评估</Text>
            <Text className="card-desc">进行新的发育评估测试</Text>
          </View>
        </View>

        <View className="card history-card" onClick={handleViewHistory}>
          <View className="card-icon">
            <Image src={historyIcon} mode="aspectFit" />
          </View>
          <View className="card-content">
            <Text className="card-title">评估历史</Text>
            <Text className="card-desc">查看历史评估记录</Text>
          </View>
        </View>
      </View>

      <View className="footer">
        <Text className="disclaimer-text">
          评估方案严格按照 「国家卫生和计划生育委员会」
          发布的《0岁~6岁儿童发育行为评估量表》执行
        </Text>
      </View>
    </View>
  );
}
