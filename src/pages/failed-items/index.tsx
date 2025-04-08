import { View, Text, Button } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { ALL_TEST_ITEMS } from "../../constants/rule";
import { useShare } from "../../hooks/useShare";
import "./index.scss";

interface FailedItem {
  id: number;
  domain: string;
  ageMonths: number;
  description: string;
  operationMethod: string;
  passCriteria: string;
}

export default function FailedItems() {
  useShare("未通过项目 - 萌宝成长小助手");

  const [failedItems, setFailedItems] = useState<FailedItem[]>([]);
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFailedItems = async () => {
      try {
        // 获取当前评估 ID
        const assessmentId = Taro.getStorageSync("currentAssessmentId");
        if (!assessmentId) {
          Taro.showToast({
            title: "未找到评估信息",
            icon: "error",
          });
          return;
        }

        // 获取评估数据
        const assessments = Taro.getStorageSync("assessments") || [];
        const currentAssessment = assessments.find(
          (a) => a.id === assessmentId
        );

        if (!currentAssessment) {
          Taro.showToast({
            title: "未找到评估信息",
            icon: "error",
          });
          return;
        }

        setAssessment(currentAssessment);

        // 从测试结果中找出未通过的项目
        const allItemsWithDetails = ALL_TEST_ITEMS.map((item) => ({
          ...item,
          operationMethod: item.operationMethod || "",
          passCriteria: item.passCriteria || "",
        }));

        // 获取评估过程中记录的测试结果
        // 注意: 这里我们需要额外存储和获取测试过程中的原始结果
        const testResults =
          Taro.getStorageSync(`test_results_${assessmentId}`) || [];

        // 筛选出未通过的项目
        const failed = testResults
          .filter((result) => result.status === "fail")
          .map((result) => {
            const itemDetails = allItemsWithDetails.find(
              (item) => item.id === result.itemId
            );
            return itemDetails
              ? {
                  id: itemDetails.id,
                  domain: itemDetails.domain,
                  ageMonths: itemDetails.ageMonths,
                  description: itemDetails.description,
                  operationMethod: itemDetails.operationMethod,
                  passCriteria: itemDetails.passCriteria,
                }
              : null;
          })
          .filter(Boolean);

        setFailedItems(failed);
      } catch (e) {
        console.error("获取未通过项目失败:", e);
        Taro.showToast({
          title: "获取数据失败",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFailedItems();
  }, []);

  const handleBack = () => {
    Taro.navigateBack();
  };

  if (loading) {
    return (
      <View className="failed-items loading">
        <Text>加载中...</Text>
      </View>
    );
  }

  if (failedItems.length === 0) {
    return (
      <View className="failed-items empty">
        <Text className="empty-text">没有未通过的项目</Text>
        <Button className="back-button" onClick={handleBack}>
          返回
        </Button>
      </View>
    );
  }

  // 按领域和年龄分组
  const groupedItems = failedItems.reduce((acc, item) => {
    const domain = item.domain;
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(item);
    return acc;
  }, {});

  return (
    <View className="failed-items">
      <View className="header">
        <Text className="title">未通过项目列表</Text>
        {assessment && (
          <Text className="subtitle">{assessment.name}的评估</Text>
        )}
      </View>

      {Object.entries(groupedItems).map(([domain, items]) => (
        <View key={domain} className="domain-section">
          <View className="domain-header">
            <Text className="domain-title">{domain}</Text>
          </View>
          <View className="items-list">
            {(items as FailedItem[]).map((item) => (
              <View key={item.id} className="item-card">
                <View className="item-header">
                  <Text className="item-title">{item.description}</Text>
                  <Text className="item-age">{item.ageMonths} 月龄</Text>
                </View>
                <View className="item-content">
                  <View className="item-section">
                    <Text className="section-label">操作方法：</Text>
                    <Text className="section-text">{item.operationMethod}</Text>
                  </View>
                  <View className="item-section">
                    <Text className="section-label">通过标准：</Text>
                    <Text className="section-text">{item.passCriteria}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}

      <Button className="back-button" onClick={handleBack}>
        返回
      </Button>
    </View>
  );
}
