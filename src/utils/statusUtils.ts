/**
 * 将英文状态转换为中文显示
 * @param status 英文状态
 * @returns 中文状态
 */
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