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
