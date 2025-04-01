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
  const [baseInfo, setBaseInfo] = useState<StoredAssessment | null>(null);
  const [currentItems, setCurrentItems] = useState<ExtendedTestItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState<{
    totalProgress: number;
    domainProgress: {
      [key in Domain]?: {
        tested: number;
        direction: string;
        progress: number;
      };
    };
  }>({ totalProgress: 0, domainProgress: {} });

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

      // 检查是否完成当前组的所有测试项
      if (currentItemIndex < currentItems.length - 1) {
        // 继续测试当前组的下一个项目
        setCurrentItemIndex(currentItemIndex + 1);
        return;
      }

      // 当前组测试完成，获取下一批测试项
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
            <View className="basic-info">
              <Text className="info-text">姓名: {baseInfo?.name}</Text>
              <Text className="info-text">性别: {baseInfo?.gender}</Text>
              <Text className="info-text">出生日期: {baseInfo?.birthDate}</Text>
              <Text className="info-text">身高: {baseInfo?.height}cm</Text>
              <Text className="info-text">体重: {baseInfo?.weight}kg</Text>
            </View>
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

        {/* 总体进度 */}
        <View
          className="total-progress"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <View className="progress-label">
            <Text className="label">总体进度</Text>
            <Text className="count">{progress.totalProgress.toFixed(1)}%</Text>
            <Text className="expand-icon">{isExpanded ? "↑" : "↓"}</Text>
          </View>
          <View className="progress-bar">
            <View
              className="progress-fill"
              style={{
                width: `${Math.min(progress.totalProgress, 100)}%`,
              }}
            />
          </View>
        </View>

        {/* 各领域进度 */}
        {isExpanded && (
          <View className="progress-bars">
            {Object.entries(progress.domainProgress).map(
              ([domain, domainInfo]) => (
                <View key={domain} className="progress-item">
                  <View className="progress-label">
                    <Text className="label">{domain}</Text>
                    <Text className="count">{domainInfo.tested}项</Text>
                    <Text className="direction">
                      {domainInfo.direction === "backward" ? "←" : "→"}
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
                        width: `${Math.min(domainInfo.progress, 100)}%`,
                      }}
                    />
                  </View>
                </View>
              )
            )}
          </View>
        )}
      </View>

      <View className="items-container">
        {currentItems[currentItemIndex] && (
          <View className="test-item">
            <View className="item-content">
              <Text className="item-description">
                {currentItems[currentItemIndex].description}
              </Text>
              {currentItems[currentItemIndex].operationMethod && (
                <Text className="operation-method">
                  操作方法：{currentItems[currentItemIndex].operationMethod}
                </Text>
              )}
              {currentItems[currentItemIndex].passCriteria && (
                <Text className="pass-criteria">
                  通过标准：{currentItems[currentItemIndex].passCriteria}
                </Text>
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
