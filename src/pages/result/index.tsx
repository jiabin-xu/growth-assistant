import { View, Text, Button } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import "./index.scss";

export default function Result() {
  const router = useRouter();
  const { id } = router.params;

  const [assessment, setAssessment] = useState(null);
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

  if (loading) {
    return (
      <View className="result loading">
        <Text>加载中...</Text>
      </View>
    );
  }

  const { name, results } = assessment || {};
  const {
    developmentQuotient,
    dqClassification,
    domainMentalAges,
    totalMentalAge,
  } = results || {};

  return (
    <View className="result">
      <View className="header">
        <Text className="title">评估结果</Text>
        <Text className="subtitle">{name || ""}</Text>
      </View>

      <View className="score-card">
        <View className="main-score">
          <Text className="score-value">{developmentQuotient || 0}</Text>
          <Text className="score-label">发育商 (DQ)</Text>
        </View>
        <Text className="classification">{dqClassification || ""}</Text>
      </View>

      <View className="details-card">
        <Text className="card-title">领域得分</Text>
        <View className="domains">
          {domainMentalAges &&
            Object.entries(domainMentalAges).map(([domain, age]) => (
              <View key={domain} className="domain-item">
                <Text className="domain-name">{domain}</Text>
                <Text className="domain-score">{age}个月</Text>
              </View>
            ))}
        </View>
        <View className="total-age">
          <Text className="label">总体发育年龄</Text>
          <Text className="value">{totalMentalAge || 0}个月</Text>
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
