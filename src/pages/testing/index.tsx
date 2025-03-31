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
} from "../../rule";
import {
  Domain,
  TestItem,
  TestResultStatus,
  AGE_GROUPS,
} from "../../constants";
import "./index.scss";

interface StoredAssessment {
  id: string;
  name: string;
  birthDate: string;
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
  const [loading, setLoading] = useState(true);
  const [domainProgress, setDomainProgress] = useState<{
    [key in Domain]?: {
      tested: number;
      direction: string;
    };
  }>({});

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

      const birthDate = new Date(storedAssessment.birthDate);
      const assessmentDate = new Date();

      // 使用新的初始化函数
      const assessmentState = initializeAssessment(birthDate, assessmentDate);
      setAssessment(assessmentState);

      // 获取初始测试项
      const initialItems = getInitialTestItems(assessmentState);
      setCurrentItems(initialItems);

      // 初始化领域进度
      const progress: {
        [key in Domain]?: { tested: number; direction: string };
      } = {};
      Object.values(Domain).forEach((domain) => {
        progress[domain] = {
          tested: 0,
          direction: "backward",
        };
      });
      setDomainProgress(progress);
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

      // 更新当前领域的进度
      setDomainProgress((prev) => ({
        ...prev,
        [newState.currentDomain]: {
          tested: (prev[newState.currentDomain]?.tested || 0) + 1,
          direction: newState.searchDirection,
        },
      }));

      // 检查当前月龄组是否已全部测试完成
      const remainingItems = currentItems.filter((item) => item.id !== itemId);

      if (remainingItems.length === 0) {
        // 获取下一批测试项
        const nextItems = getNextTestItems(newState);

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
          const direction =
            newState.searchDirection === "forward" ? "向后" : "向前";
          Taro.showToast({
            title: `开始${direction}测试`,
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
      } else {
        setCurrentItems(remainingItems);
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
        {assessment && (
          <View className="test-info">
            <Text className="age-text">
              主测月龄: {assessment.mainTestAgeMonths}个月
            </Text>
            <Text className="direction-text">
              {assessment.searchDirection === "backward"
                ? "向前测试"
                : "向后测试"}
            </Text>
          </View>
        )}
      </View>

      <View className="domain-progress">
        <View className="current-domain">
          {assessment && (
            <>
              <Text className="domain-name">{assessment.currentDomain}</Text>
              <Text className="age-text">
                {AGE_GROUPS[assessment.lastTestedAgeIndex]}个月龄测试项目
              </Text>
            </>
          )}
        </View>
        <View className="progress-bars">
          {Object.entries(domainProgress).map(([domain, progress]) => (
            <View key={domain} className="progress-item">
              <View className="progress-label">
                <Text className="label">{domain}</Text>
                <Text className="count">{progress.tested}项</Text>
                <Text className="direction">
                  {progress.direction === "backward" ? "←" : "→"}
                </Text>
              </View>
              <View
                className={`progress-bar ${
                  domain === assessment?.currentDomain ? "active" : ""
                }`}
              >
                <View
                  className="progress-fill"
                  style={{
                    width: `${
                      progress.tested ? Math.min(progress.tested * 10, 100) : 0
                    }%`,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="items-container">
        {currentItems.map((item) => (
          <View key={item.id} className="test-item">
            <View className="item-content">
              <Text className="item-description">{item.description}</Text>
              {item.operationMethod && (
                <Text className="operation-method">
                  操作方法：{item.operationMethod}
                </Text>
              )}
              {item.passCriteria && (
                <Text className="pass-criteria">
                  通过标准：{item.passCriteria}
                </Text>
              )}
            </View>

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
