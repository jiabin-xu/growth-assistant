import { DQ_CLASSIFICATIONS, DQClassification } from "../constants/rule";

export const getStatusDisplay = (status: string): string => {
  return DQ_CLASSIFICATIONS[status as DQClassification] || status;
};

export const getScoreRange = (score: number): string => {
  if (score >= 130) return ">130";
  if (score >= 110) return "110-129";
  if (score >= 80) return "80-109";
  if (score >= 70) return "70-79";
  return "<70";
};

export const getDevelopmentStatus = (dq: number): DQClassification => {
  if (dq >= 130) return "excellent";
  if (dq >= 110) return "good";
  if (dq >= 90) return "normal";
  if (dq >= 80) return "attention";
  return "delayed";
};
