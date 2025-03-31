import { View, Text, Button } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { DevelopmentalAssessment } from "../../rule";
import "./index.scss";

export default function Testing() {
  const router = useRouter();
  const { id } = router.params;

  const [assessment, setAssessment] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    try {
      // 获取评估基本信息
      const assessments = Taro.getStorageSync("assessments") || [];
      const currentAssessment = assessments.find((a) => a.id === id);

      if (!currentAssessment) {
        Taro.showToast({
          title: "未找到评估信息",
          icon: "error",
        });
        return;
      }

      // 初始化评估实例
      const birthDate = new Date(currentAssessment.birthDate);
      const assessmentDate = new Date();
      const assessmentInstance = new DevelopmentalAssessment(
        birthDate,
        assessmentDate
      );

      setAssessment({
        ...currentAssessment,
        instance: assessmentInstance,
      });

      // 获取初始测试项
      const initialItems = assessmentInstance.getInitialTestItems();
      setCurrentItems(initialItems);
    } catch (e) {
      console.error("初始化评估失败:", e);
      Taro.showToast({
        title: "初始化评估失败",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleItemResult = (itemId, result) => {
    if (!assessment?.instance) return;

    try {
      // 记录结果
      assessment.instance.recordResult(itemId, result);

      // 获取下一批测试项
      const nextItems = assessment.instance.getNextTestItems();

      if (nextItems.length === 0) {
        // 评估完成，计算结果
        const results = assessment.instance.calculateScores();

        // 保存结果
        const assessments = Taro.getStorageSync("assessments") || [];
        const updatedAssessments = assessments.map((a) => {
          if (a.id === id) {
            return {
              ...a,
              results,
              endTime: new Date().toISOString(),
              status: "completed",
            };
          }
          return a;
        });
        Taro.setStorageSync("assessments", updatedAssessments);

        // 跳转到结果页
        Taro.navigateTo({
          url: `/pages/result/index?id=${id}`,
        });
      } else {
        setCurrentItems(nextItems);
      }
    } catch (e) {
      console.error("处理测试结果失败:", e);
      Taro.showToast({
        title: "处理结果失败",
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <View className="testing loading">
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View className="testing">
      <View className="header">
        <Text className="title">发育评估测试</Text>
        <Text className="subtitle">{assessment?.name || ""}</Text>
      </View>

      <View className="items-container">
        {currentItems.map((item) => (
          <View key={item.id} className="test-item">
            <View className="item-header">
              <Text className="item-title">{item.title}</Text>
              <Text className="item-domain">{item.domain}</Text>
            </View>

            <Text className="item-description">{item.description}</Text>

            <View className="item-actions">
              <Button
                className="action-btn fail"
                onClick={() => handleItemResult(item.id, "fail")}
              >
                未通过
              </Button>
              <Button
                className="action-btn pass"
                onClick={() => handleItemResult(item.id, "pass")}
              >
                通过
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
