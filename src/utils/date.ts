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

export const getNextAssessmentDate = (birthDate: string): string => {
  const nextDate = new Date();
  nextDate.setMonth(nextDate.getMonth() + 3);
  return formatDate(nextDate);
};

export const calculateActualAgeMonths = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birth.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
}; 