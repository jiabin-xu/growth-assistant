import { AGE_GROUPS } from "../constants";

export const calculateAgeMonths = (birthDate: Date, assessmentDate: Date): number => {
  const diffTime = Math.abs(assessmentDate.getTime() - birthDate.getTime());
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const ageInMonths = diffDays / 30.4375;
  return Math.round(ageInMonths * 10) / 10;
};

export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
};

export const calculateAge = (birthDate: string | undefined): string => {
  if (!birthDate) return "未知";
  const birth = new Date(birthDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birth.getTime());
  const months = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return `${years}岁${remainingMonths}个月`;
};

export const findMainTestAge = (chronoAgeMonths: number): number => {
  return AGE_GROUPS.reduce((closest, age) => {
    const currentDiff = Math.abs(chronoAgeMonths - age);
    const closestDiff = Math.abs(chronoAgeMonths - closest);
    return currentDiff < closestDiff ? age : closest;
  }, AGE_GROUPS[0]);
};

export const getNextAssessmentDate = (birthDate: string): { nextDate: string; nextAgeMonths: number } => {
  const birthDateTime = new Date(birthDate);
  const today = new Date();

  const ageInMonths = calculateAgeMonths(birthDateTime, today);
  const nextAgeMonths = AGE_GROUPS.find(age => age > ageInMonths) || AGE_GROUPS[AGE_GROUPS.length - 1];
  const monthsToAdd = nextAgeMonths - ageInMonths;
  const nextDate = new Date(today);
  nextDate.setMonth(nextDate.getMonth() + Math.ceil(monthsToAdd));

  return {
    nextDate: formatDate(nextDate),
    nextAgeMonths: nextAgeMonths
  };
};

export const getAgeRangeKey = (ageMonths: number): string => {
  if (ageMonths >= 0 && ageMonths <= 6) return "0-6m";
  if (ageMonths > 6 && ageMonths <= 12) return "7-12m";
  if (ageMonths > 12 && ageMonths <= 24) return "13-24m";
  if (ageMonths > 24 && ageMonths <= 36) return "25-36m";
  if (ageMonths > 36 && ageMonths <= 54) return "37-54m";
  if (ageMonths > 54 && ageMonths <= 84) return "55-84m";
  return "55-84m";
};

export const formatAgeMonths = (months: number | undefined): string => {
  if (!months && months !== 0) return "暂无";

  if (months < 12) {
    return `${months}个月`;
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = Math.floor(months % 12);
    return `${years}岁${remainingMonths > 0 ? `${remainingMonths}月` : ''}`;
  }
};

/**
 * 寻找第一个小于或等于chronoAgeMonths的age值
 * @param chronoAgeMonths 实际年龄（月）
 * @returns 第一个小于或等于chronoAgeMonths的age值，如果没有则返回第一个age值
 */
export const findClosestLowerAge = (chronoAgeMonths: number): number => {
  // 按降序排列的年龄组
  const sortedAges = [...AGE_GROUPS].sort((a, b) => b - a);

  // 寻找第一个小于或等于chronoAgeMonths的age
  const closestLowerAge = sortedAges.find(age => age <= chronoAgeMonths);

  // 如果没有找到合适的值（chronoAgeMonths小于最小值），返回最小的age
  return closestLowerAge !== undefined ? closestLowerAge : AGE_GROUPS[0];
};
