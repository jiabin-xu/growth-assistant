import { Domain } from "./index";

// 领域名称映射
export const DOMAIN_NAMES: Record<Domain, string> = {
  [Domain.GrossMotor]: "大运动",
  [Domain.FineMotor]: "精细动作",
  [Domain.Language]: "语言",
  [Domain.Adaptive]: "适应能力",
  [Domain.Social]: "社会行为",
};

// 获取领域描述
export const getDomainDescription = (domain: Domain, age: number): string => {
  const descriptions: Record<Domain, string> = {
    [Domain.GrossMotor]: `在大运动方面，您的孩子表现出${age}个月龄水平的发展状态。表现在身体平衡、协调性和基本运动技能等方面。`,
    [Domain.FineMotor]: `在精细动作方面，您的孩子展现出${age}个月龄水平的操作能力。这包括手指灵活度、手眼协调等细节动作。`,
    [Domain.Language]: `在语言发展方面，您的孩子达到${age}个月龄的水平。这体现在语言理解、表达和交流能力等方面。`,
    [Domain.Adaptive]: `在适应能力方面，您的孩子表现出${age}个月龄水平的发展。这包括问题解决、生活自理等适应性行为。`,
    [Domain.Social]: `在社会行为方面，您的孩子展现出${age}个月龄水平的社交能力。这体现在与他人互动、情感表达等方面。`,
  };
  return descriptions[domain];
};

// 获取领域建议
export const getDomainSuggestions = (domain: Domain): string[] => {
  const suggestions: Record<Domain, string[]> = {
    [Domain.GrossMotor]: [
      "每天安排30分钟以上的户外活动时间",
      "鼓励参与跑跳、攀爬等大肌肉活动",
      "进行亲子互动游戏，如追逐、躲猫猫等",
    ],
    [Domain.FineMotor]: [
      "提供画画、捏泥等手工活动机会",
      "练习使用筷子、穿衣扣扣子等日常动作",
      "玩拼图、积木等益智玩具",
    ],
    [Domain.Language]: [
      "每天进行亲子共读活动",
      "鼓励孩子表达想法和需求",
      "创造更多与同龄人交流的机会",
    ],
    [Domain.Adaptive]: [
      "培养生活自理能力",
      "给予解决问题的机会和时间",
      "建立规律的生活作息",
    ],
    [Domain.Social]: [
      "创造与其他孩子互动的机会",
      "参与集体活动",
      "鼓励表达情感和共情能力",
    ],
  };
  return suggestions[domain];
};
