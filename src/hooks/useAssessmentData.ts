import { useState, useEffect, useMemo } from "react";
import Taro from "@tarojs/taro";
import { Assessment, DomainAnalysis } from "../types/assessment";
import { Domain } from "../constants";
import { analyzeDomain } from "../utils/assessment";

export const useAssessmentData = (id?: string) => {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

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

  const actualAgeMonths = useMemo(() => {
    if (!assessment?.birthDate) return 0;
    const birthDate = new Date(assessment.birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birthDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
  }, [assessment?.birthDate]);

  const domainAnalysis = useMemo(() => {
    if (!assessment?.results.domainMentalAges || !assessment?.results.developmentQuotient)
      return [] as DomainAnalysis[];

    return Object.entries(assessment.results.domainMentalAges).map(([domain, mentalAgeValue]) => {
      const mentalAge = Number(mentalAgeValue);
      return analyzeDomain(
        domain as Domain,
        mentalAge,
        actualAgeMonths,
        Number(assessment.results.developmentQuotient)
      );
    });
  }, [assessment?.results.domainMentalAges, assessment?.results.developmentQuotient, actualAgeMonths]);
  console.log('domainAnalysis :>> ', domainAnalysis); 
  return {
    assessment,
    loading,
    actualAgeMonths,
    domainAnalysis,
  };
}; 