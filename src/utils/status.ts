export const getStatusDisplay = (status: string): string => {
  switch (status) {
    case "excellent":
      return "优秀";
    case "good":
      return "良好";
    case "normal":
      return "正常";
    case "attention":
      return "需要关注";
    case "delayed":
      return "发育迟缓";
    default:
      return status;
  }
};

export const getScoreRange = (score: number): string => {
  if (score >= 130) return ">130";
  if (score >= 110) return "110-129";
  if (score >= 80) return "80-109";
  if (score >= 70) return "70-79";
  return "<70";
};

export const getDevelopmentStatus = (dq: number): string => {
  if (dq >= 130) return "excellent";
  if (dq >= 110) return "good";
  if (dq >= 90) return "normal";
  if (dq >= 80) return "attention";
  return "delayed";
};
