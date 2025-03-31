import { View, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";

interface Assessment {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  startTime: string;
  endTime?: string;
  results?: {
    developmentQuotient: number;
    dqClassification: string;
  };
  status: "completed" | "in_progress";
}

export default function History() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = Taro.getStorageSync("assessments") || [];
      setAssessments(
        data.sort(
          (a, b) =>
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        )
      );
    } catch (e) {
      console.error("获取历史记录失败:", e);
      Taro.showToast({
        title: "获取历史失败",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleViewResult = (id: string) => {
    Taro.navigateTo({
      url: `/pages/result/index?id=${id}`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <View className="history loading">
        <Text>加载中...</Text>
      </View>
    );
  }

  if (assessments.length === 0) {
    return (
      <View className="history empty">
        <Text className="empty-text">暂无评估记录</Text>
      </View>
    );
  }

  return (
    <View className="history">
      <View className="header">
        <Text className="title">评估历史</Text>
        <Text className="subtitle">查看历史评估记录</Text>
      </View>

      <View className="records">
        {assessments.map((assessment) => (
          <View
            key={assessment.id}
            className="record-card"
            onClick={() => handleViewResult(assessment.id)}
          >
            <View className="record-header">
              <Text className="name">{assessment.name}</Text>
              <Text className={`status ${assessment.status}`}>
                {assessment.status === "completed" ? "已完成" : "进行中"}
              </Text>
            </View>

            <View className="record-info">
              <View className="info-item">
                <Text className="label">性别</Text>
                <Text className="value">{assessment.gender}</Text>
              </View>
              <View className="info-item">
                <Text className="label">出生日期</Text>
                <Text className="value">
                  {formatDate(assessment.birthDate)}
                </Text>
              </View>
              <View className="info-item">
                <Text className="label">评估日期</Text>
                <Text className="value">
                  {formatDate(assessment.startTime)}
                </Text>
              </View>
            </View>

            {assessment.status === "completed" && assessment.results && (
              <View className="record-result">
                <View className="result-item">
                  <Text className="score">
                    {assessment.results.developmentQuotient}
                  </Text>
                  <Text className="label">发育商 (DQ)</Text>
                </View>
                <Text className="classification">
                  {assessment.results.dqClassification}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
