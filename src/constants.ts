// 1. Define Core Types and Enums

export enum Domain {
  GrossMotor = '大运动',
  FineMotor = '精细动作',
  Language = '语言',
  Adaptive = '适应能力',
  Social = '社会行为',
}

export interface TestItem {
  id: number;          // Unique ID (1-261)
  ageMonths: number;   // Age group this item belongs to (e.g., 1, 2, 12, 15, 84)
  domain: Domain;      // The developmental domain
  description: string; // Optional: Description from the table (e.g., "抱直头稳")
}

export type TestResultStatus = 'pass' | 'fail' | 'not_tested';

export interface TestResult {
  itemId: number;
  status: TestResultStatus;
  // timestamp?: Date; // Optional: when it was tested
}

// All defined age groups from the standard
export const AGE_GROUPS: readonly number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 21, 24, 27, 30, 33, 36,
  42, 48, 54, 60, 66, 72, 78, 84
];

// --- Placeholder for ALL 261 Test Items ---
// In a real app, load this from a data source (DB, JSON file)
// Sample data included for demonstration
export const ALL_TEST_ITEMS: TestItem[] = [
  // 1 Month
  { id: 1, ageMonths: 1, domain: Domain.GrossMotor, description: "抬肩坐起头竖直片刻" },
  { id: 2, ageMonths: 1, domain: Domain.GrossMotor, description: "俯卧头部翘动" },
  { id: 3, ageMonths: 1, domain: Domain.FineMotor, description: "触碰手掌紧握拳" },
  { id: 4, ageMonths: 1, domain: Domain.FineMotor, description: "手的自然状态" },
  { id: 5, ageMonths: 1, domain: Domain.Adaptive, description: "看黑白靶*" },
  { id: 6, ageMonths: 1, domain: Domain.Adaptive, description: "眼跟红球过中线" },
  { id: 7, ageMonths: 1, domain: Domain.Language, description: "自发细小喉音R" },
  { id: 8, ageMonths: 1, domain: Domain.Language, description: "听声音有反应*" },
  { id: 9, ageMonths: 1, domain: Domain.Social, description: "对发声的人有注视" },
  { id: 10, ageMonths: 1, domain: Domain.Social, description: "眼跟踪走动的人" },
  // 2 Months
  { id: 11, ageMonths: 2, domain: Domain.GrossMotor, description: "拉腕坐起头竖直短时" },
  { id: 12, ageMonths: 2, domain: Domain.GrossMotor, description: "俯卧头抬离床面" },
  { id: 13, ageMonths: 2, domain: Domain.FineMotor, description: "花铃棒留握片刻" },
  { id: 14, ageMonths: 2, domain: Domain.FineMotor, description: "拇指轻叩可分开*" },
  { id: 15, ageMonths: 2, domain: Domain.Adaptive, description: "即刻注意大玩具" },
  { id: 16, ageMonths: 2, domain: Domain.Adaptive, description: "眼跟红球上下移动*" },
  { id: 17, ageMonths: 2, domain: Domain.Language, description: "发a、o、e等母音R" },
  { id: 18, ageMonths: 2, domain: Domain.Language, description: "听声音有复杂反应" },
  { id: 19, ageMonths: 2, domain: Domain.Social, description: "自发微笑R" },
  { id: 20, ageMonths: 2, domain: Domain.Social, description: "逗引时有反应" },
  // 3 Months
  { id: 21, ageMonths: 3, domain: Domain.GrossMotor, description: "抱直头稳" },
  { id: 22, ageMonths: 3, domain: Domain.GrossMotor, description: "俯卧抬头45°" },
  { id: 23, ageMonths: 3, domain: Domain.FineMotor, description: "花铃棒留握30s" },
  { id: 24, ageMonths: 3, domain: Domain.FineMotor, description: "两手搭在一起" },
  { id: 25, ageMonths: 3, domain: Domain.Adaptive, description: "即刻注意胸前玩具" },
  { id: 26, ageMonths: 3, domain: Domain.Adaptive, description: "眼跟红球180°" },
  { id: 27, ageMonths: 3, domain: Domain.Language, description: "笑出声R" },
  { id: 28, ageMonths: 3, domain: Domain.Social, description: "见人会笑" },
  { id: 29, ageMonths: 3, domain: Domain.Social, description: "灵敏模样" },
  // 4 Months
  { id: 30, ageMonths: 4, domain: Domain.GrossMotor, description: "扶腋可站片刻" },
  { id: 31, ageMonths: 4, domain: Domain.GrossMotor, description: "俯卧抬头90°" },
  { id: 32, ageMonths: 4, domain: Domain.FineMotor, description: "摇动并注视花铃棒" },
  { id: 33, ageMonths: 4, domain: Domain.FineMotor, description: "试图抓物" },
  { id: 34, ageMonths: 4, domain: Domain.Adaptive, description: "目光对视*" },
  { id: 35, ageMonths: 4, domain: Domain.Language, description: "高声叫R" },
  { id: 36, ageMonths: 4, domain: Domain.Language, description: "伊语作声R" },
  { id: 37, ageMonths: 4, domain: Domain.Language, description: "找到声源" },
  { id: 38, ageMonths: 4, domain: Domain.Social, description: "注视镜中人像" },
  { id: 39, ageMonths: 4, domain: Domain.Social, description: "认亲人R" },
  // 5 Months
  { id: 40, ageMonths: 5, domain: Domain.GrossMotor, description: "轻拉腕部即坐起" },
  { id: 41, ageMonths: 5, domain: Domain.GrossMotor, description: "独坐头身前倾" },
  { id: 42, ageMonths: 5, domain: Domain.FineMotor, description: "抓住近处玩具" },
  { id: 43, ageMonths: 5, domain: Domain.FineMotor, description: "玩手" },
  { id: 44, ageMonths: 5, domain: Domain.Adaptive, description: "注意小丸" },
  { id: 45, ageMonths: 5, domain: Domain.Adaptive, description: "拿住一积木注视另一积木" },
  { id: 46, ageMonths: 5, domain: Domain.Language, description: "对人及物发声R" },
  { id: 47, ageMonths: 5, domain: Domain.Social, description: "对镜有游戏反应" },
  { id: 48, ageMonths: 5, domain: Domain.Social, description: "见食物兴奋R" },
  // ... add all other items up to 84 months
];
// --- End Placeholder ---
