import { View, Text, Button } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import {
  AssessmentState,
  initializeAssessment,
  recordResult,
  getInitialTestItems,
  getNextTestItems,
  calculateScores,
  getProgress,
} from "../../utils";
import {
  Domain,
  TestItem,
  TestResultStatus,
  TestResult,
} from "../../constants/rule";
import { useShare } from "../../hooks/useShare";
import BasicInfo from "../../components/BasicInfo";
import "./index.scss";

interface StoredAssessment {
  id: string;
  name: string;
  birthDate: string;
  height: string;
  weight: string;
  gender: string;
}

// 扩展 TestItem 接口
interface ExtendedTestItem extends TestItem {
  operationMethod?: string;
  passCriteria?: string;
}

export default function Testing() {
  const router = useRouter();
  const { id } = router.params;
  const [assessment, setAssessment] = useState<AssessmentState | null>(null);
  const [currentItems, setCurrentItems] = useState<ExtendedTestItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [baseInfo, setBaseInfo] = useState<StoredAssessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({ totalProgress: 0 });

  // 添加分享功能
  useShare("发育评估测试 - 萌宝成长小助手");

  const currentItem = currentItems[currentItemIndex];

  // console.log("currentItem?.ageMonths :>> ", currentItem?.ageMonths);
  // 初始化评估
  useEffect(() => {
    if (!id) return;

    try {
      const assessments = Taro.getStorageSync("assessments") || [];
      const storedAssessment = assessments.find(
        (a: StoredAssessment) => a.id === id
      );

      if (!storedAssessment) {
        Taro.showToast({
          title: "未找到评估信息",
          icon: "error",
        });
        return;
      }

      setBaseInfo(storedAssessment);

      const birthDate = new Date(storedAssessment.birthDate);
      const assessmentDate = new Date();

      // 使用新的初始化函数
      const assessmentState = initializeAssessment(birthDate, assessmentDate);
      setAssessment(assessmentState);
      console.log("assessmentState :>> ", assessmentState);
      // 获取初始测试项
      const initialItems = getInitialTestItems(assessmentState);
      setCurrentItems(initialItems);
      setCurrentItemIndex(0);

      // 初始化进度
      setProgress(getProgress(assessmentState));
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

  // 处理单个测试项结果
  const handleItemResult = async (itemId: number, result: TestResultStatus) => {
    if (!assessment) return;

    try {
      // 记录结果并获取新状态
      const newState = recordResult(assessment, itemId, result);
      setAssessment(newState);

      // 更新进度
      setProgress(getProgress(newState));

      // 保存每个测试项的结果
      const testResult: TestResult = {
        itemId,
        status: result,
      };

      // 获取已有的测试结果
      const existingResults = Taro.getStorageSync(`test_results_${id}`) || [];
      // 添加新结果
      const updatedResults = [...existingResults, testResult];
      // 保存更新后的结果
      Taro.setStorageSync(`test_results_${id}`, updatedResults);

      // 检查是否完成当前组的所有测试项
      if (currentItemIndex < currentItems.length - 1) {
        // 继续测试当前组的下一个项目
        setCurrentItemIndex(currentItemIndex + 1);
        return;
      }

      // 当前组测试完成，获取下一批测试项
      const nextItems = getNextTestItems(newState);
      console.log(
        "nextItems :>> ",
        nextItems.map((item) => item.ageMonths)
      );
      if (nextItems.length === 0) {
        // 评估完成，计算结果
        const results = calculateScores(newState);

        // 保存结果
        const assessments = Taro.getStorageSync("assessments") || [];
        const updatedAssessments = assessments.map((a: StoredAssessment) => {
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
        return;
      }

      // 显示方向变化提示
      if (newState.searchDirection !== assessment.searchDirection) {
        Taro.showToast({
          title: `开始测试${newState.currentDomain}能力上限`,
          icon: "none",
          duration: 2000,
        });
      }

      // 显示领域变化提示
      if (newState.currentDomain !== assessment.currentDomain) {
        Taro.showToast({
          title: `开始测试${newState.currentDomain}`,
          icon: "none",
          duration: 2000,
        });
      }

      setCurrentItems(nextItems);
      setCurrentItemIndex(0);
    } catch (e) {}
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
      <View className="progress-bar">
        <View
          className="progress-fill"
          style={{
            width: `${Math.min(progress.totalProgress, 100)}%`,
          }}
        />
      </View>

      <View className="header">
        <Text className="title">发育评估测试</Text>
        {assessment && <BasicInfo baseInfo={baseInfo} />}
      </View>

      <View className="items-container">
        {currentItems[currentItemIndex] && (
          <View className="test-item" key={currentItems[currentItemIndex].id}>
            <View className="item-content">
              <View className="main-section">
                <Text className="domain-tag">{assessment?.currentDomain}</Text>
                <Text className="item-description">
                  {currentItems[currentItemIndex].description}
                </Text>
              </View>

              {(currentItems[currentItemIndex].operationMethod ||
                currentItems[currentItemIndex].passCriteria) && (
                <View className="details-section">
                  {currentItems[currentItemIndex].operationMethod && (
                    <View className="detail-item">
                      <Text className="detail-label">操作方法</Text>
                      <Text className="detail-content">
                        {currentItems[currentItemIndex].operationMethod}
                      </Text>
                    </View>
                  )}
                  {currentItems[currentItemIndex].passCriteria && (
                    <View className="detail-item">
                      <Text className="detail-label">通过标准</Text>
                      <Text className="detail-content">
                        {currentItems[currentItemIndex].passCriteria}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>

            <View className="item-actions">
              <Button
                className="action-btn fail"
                onClick={() =>
                  handleItemResult(currentItems[currentItemIndex].id, "fail")
                }
              >
                未通过
              </Button>
              <Button
                className="action-btn pass"
                onClick={() =>
                  handleItemResult(currentItems[currentItemIndex].id, "pass")
                }
              >
                通过
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
