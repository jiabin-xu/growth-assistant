// 1. Define Core Types and Enums

export enum Domain {
  GrossMotor = '大运动',
  FineMotor = '精细动作',
  Language = '语言',
  Adaptive = '适应能力',
  Social = '社会行为',
}


export const DQ_CLASSIFICATIONS = {
  excellent: "优秀",
  good: "良好",
  normal: "正常",
  attention: "需要关注",
  delayed: "发育迟缓",
} as const;

export type DQClassification = keyof typeof DQ_CLASSIFICATIONS;

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
export interface TestItemDetailed {
  id: number;
  ageMonths: number;
  domain: Domain;
  description: string; // Short description from Table A.1 (includes R/* markers)
  operationMethod: string; // 操作方法 from Table B.1
  passCriteria: string; // 测查通过要求 from Table B.1
}

// Complete list of 261 items with details from Appendix B
export const ALL_TEST_ITEMS: TestItemDetailed[] = [
  // --- 1 Month ---
  {
    id: 1,
    ageMonths: 1,
    domain: Domain.GrossMotor,
    description: "抬肩坐起头竖直片刻",
    operationMethod: "婴儿仰卧, 主试者面向婴儿站立, 对婴儿微笑、说话, 直到婴儿注视到主试者的脸。这时主试者轻轻握住婴儿双肩(四指并拢置于肩胛骨外侧, 食指不能触碰颈部), 将婴儿拉坐起来, 观察婴儿控制头的能力",
    passCriteria: "婴儿头可竖直保持2s或以上"
  },
  {
    id: 2,
    ageMonths: 1,
    domain: Domain.GrossMotor,
    description: "俯卧头部翘动",
    operationMethod: "婴儿俯卧, 前臂屈曲支撑, 用玩具逗引婴儿抬头, 观察其反应",
    passCriteria: "婴儿有头部翘动即可通过"
  },
  {
    id: 3,
    ageMonths: 1,
    domain: Domain.FineMotor,
    description: "触碰手掌紧握拳",
    operationMethod: "婴儿仰卧, 主试者将食指从尺侧放入婴儿手掌中",
    passCriteria: "婴儿能将拳头握紧"
  },
  {
    id: 4,
    ageMonths: 1,
    domain: Domain.FineMotor,
    description: "手的自然状态",
    operationMethod: "主试者观察婴儿清醒时手的自然状态",
    passCriteria: "双手拇指内收不达掌心, 无发紧即通过"
  },
  {
    id: 5,
    ageMonths: 1,
    domain: Domain.Adaptive,
    description: "看黑白靶*",
    operationMethod: "婴儿仰卧, 主试者将黑白靶拿在距婴儿脸部上方20cm处移动, 吸引婴儿注意",
    passCriteria: "婴儿眼睛可明确注视黑白靶"
  },
  {
    id: 6,
    ageMonths: 1,
    domain: Domain.Adaptive,
    description: "眼跟红球过中线",
    operationMethod: "婴儿仰卧, 主试者手提红球, 在婴儿脸部上方20cm处轻轻晃动以引起婴儿注意, 然后把红球慢慢移动, 从头的一侧沿着弧形, 移向中央, 再移向头的另一侧, 观察婴儿头部和眼睛的活动。",
    passCriteria: "当主试者把红球移向中央时, 婴儿用眼睛跟踪看着红球转过中线, 三试一成"
  },
  {
    id: 7,
    ageMonths: 1,
    domain: Domain.Language,
    description: "自发细小喉音R",
    operationMethod: "婴儿仰卧、清醒。注意其发音",
    passCriteria: "观察或询问, 小儿能发出任何一种细小柔和的喉音"
  },
  {
    id: 8,
    ageMonths: 1,
    domain: Domain.Language,
    description: "听声音有反应*",
    operationMethod: "婴儿仰卧, 在其一侧耳上方10cm~15cm处轻摇铜铃, 观察婴儿的反应。(双侧均做, 一侧通过即可)",
    passCriteria: "婴儿听到铃声有一种或多种反应"
  },
  {
    id: 9,
    ageMonths: 1,
    domain: Domain.Social,
    description: "对发声的人有注视",
    operationMethod: "主试者面对婴儿的脸微笑并对其说话。但不能触碰婴儿的面孔或身体",
    passCriteria: "婴儿能注视主试者的脸"
  },
  {
    id: 10,
    ageMonths: 1,
    domain: Domain.Social,
    description: "眼跟踪走动的人",
    operationMethod: "婴儿横放在床上或斜躺在家长臂弯里, 主试者站立(直立位, 勿弯腰)逗引婴儿引起其注意后左右走动, 观察婴儿眼睛是否追随主试者",
    passCriteria: "眼睛随走动的人转动"
  },
  // --- 2 Months ---
  {
    id: 11,
    ageMonths: 2,
    domain: Domain.GrossMotor,
    description: "拉腕坐起头竖直短时",
    operationMethod: "婴儿仰卧, 主试者将拇指置于婴儿掌心, 余四指握住腕部轻拉婴儿坐起, 观察婴儿控制头部的能力",
    passCriteria: "当把婴儿拉起成坐位时婴儿头可自行竖直, 保持5s或以上"
  },
  {
    id: 12,
    ageMonths: 2,
    domain: Domain.GrossMotor,
    description: "俯卧头抬离床面",
    operationMethod: "婴儿俯卧, 前臂屈曲支撑, 用玩具逗引婴儿抬头, 观察其反应",
    passCriteria: "婴儿可自行将头抬离床面达2s或以上。"
  },
  {
    id: 13,
    ageMonths: 2,
    domain: Domain.FineMotor,
    description: "花铃棒留握片刻",
    operationMethod: "婴儿仰卧, 将花铃棒放在婴儿手中",
    passCriteria: "握住花铃棒不松手达2s或以上"
  },
  {
    id: 14,
    ageMonths: 2,
    domain: Domain.FineMotor,
    description: "拇指轻叩可分开*",
    operationMethod: "主试者分别轻叩婴儿双手手背, 观察拇指自然放松的状态",
    passCriteria: "婴儿双手握拳稍紧, 拇指稍内收, 但经轻叩即可打开"
  },
  {
    id: 15,
    ageMonths: 2,
    domain: Domain.Adaptive,
    description: "即刻注意大玩具",
    operationMethod: "婴儿仰卧, 用娃娃在婴儿脸部上方20cm处晃动, 观察其反应。",
    passCriteria: "可立刻注意到娃娃, 三试一成"
  },
  {
    id: 16,
    ageMonths: 2,
    domain: Domain.Adaptive,
    description: "眼跟红球上下移动*",
    operationMethod: "婴儿仰卧, 主试者提起红球, 在婴儿脸部上方20cm处轻轻晃动以引起婴儿注意, 先慢慢向上移动, 然后再从头顶向下颏处移动",
    passCriteria: "婴儿眼睛能上或下跟随红球"
  },
  {
    id: 17,
    ageMonths: 2,
    domain: Domain.Language,
    description: "发a、o、e等母音R",
    operationMethod: "询问或逗引婴儿发音",
    passCriteria: "能从喉部发出a、o、e等元音来"
  },
  {
    id: 18,
    ageMonths: 2,
    domain: Domain.Language,
    description: "听声音有复杂反应",
    operationMethod: "婴儿仰卧, 在其一侧耳上方10cm~15cm处轻摇铜铃, 观察婴儿的反应。(双侧均做, 一侧通过即可)",
    passCriteria: "婴儿听到声音有表情和肢体动作的变化"
  },
  {
    id: 19,
    ageMonths: 2,
    domain: Domain.Social,
    description: "自发微笑R",
    operationMethod: "观察或询问婴儿在无外界逗引时是否有自发微笑的情况",
    passCriteria: "婴儿能自发出现微笑, 但不一定出声。睡眠时微笑不通过"
  },
  {
    id: 20,
    ageMonths: 2,
    domain: Domain.Social,
    description: "逗引时有反应",
    operationMethod: "婴儿仰卧, 主试者弯腰, 对婴儿点头微笑或说话进行逗引, 观察其反应。但不能触碰婴儿的面孔或身体",
    passCriteria: "经逗引, 婴儿会出现微笑、发声、手脚乱动等一种或多种表现"
  },
  // --- 3 Months ---
  {
    id: 21,
    ageMonths: 3,
    domain: Domain.GrossMotor,
    description: "抱直头稳",
    operationMethod: "竖抱婴儿, 观察婴儿控制头部的能力",
    passCriteria: "能将头举正并稳定10s或以上"
  },
  {
    id: 22,
    ageMonths: 3,
    domain: Domain.GrossMotor,
    description: "俯卧抬头45°",
    operationMethod: "婴儿俯卧, 前臂屈曲支撑, 头正中位, 用玩具逗引婴儿抬头, 观察其反应",
    passCriteria: "头可自行抬离床面, 面部与床面成45°, 持续5s或以上"
  },
  {
    id: 23,
    ageMonths: 3,
    domain: Domain.FineMotor,
    description: "花铃棒留握30s",
    operationMethod: "婴儿仰卧或侧卧, 将花铃棒放入婴儿手中",
    passCriteria: "婴儿能握住花铃棒30s, 不借助床面的支持"
  },
  {
    id: 24,
    ageMonths: 3,
    domain: Domain.FineMotor,
    description: "两手搭在一起",
    operationMethod: "婴儿仰卧, 主试者观察婴儿双手是否能够自发搭在一起, 或主试者将其两手搭在一起, 随即松手, 观察婴儿双手状态。",
    passCriteria: "婴儿能将双手搭在一起, 保持3s~4s"
  },
  {
    id: 25,
    ageMonths: 3,
    domain: Domain.Adaptive,
    description: "即刻注意胸前玩具",
    operationMethod: "婴儿仰卧, 主试者将娃娃在婴儿身体上方20cm处沿中线自下向上移动。当玩具到婴儿乳头连线至下颏之间时, 观察婴儿反应",
    passCriteria: "当娃娃移动至婴儿乳头连线至下颌之间时, 立即注意即可通过"
  },
  {
    id: 26,
    ageMonths: 3,
    domain: Domain.Adaptive,
    description: "眼跟红球180°",
    operationMethod: "婴儿仰卧, 主试者手提红球, 在婴儿脸部上方20cm处轻轻晃动以引起婴儿注意, 然后把红球慢慢移动, 从头的一侧沿着弧形, 移向中央, 再移向头的另一侧, 观察婴儿头部和眼睛的活动",
    passCriteria: "婴儿用眼及头跟随红球转动180°, 三试一成"
  },
  {
    id: 27,
    ageMonths: 3,
    domain: Domain.Language,
    description: "笑出声R", // Note: Table B.1 has '笑出声', R added from A.1
    operationMethod: "逗引婴儿笑, 但不得接触身体",
    passCriteria: "观察或询问, 婴儿能发出\"咯咯\"笑声"
  },
  {
    id: 28,
    ageMonths: 3,
    domain: Domain.Social,
    description: "见人会笑",
    operationMethod: "主试者面对婴儿, 不做出接近性的社交行为或动作, 观察婴儿在无人逗引时的表情",
    passCriteria: "婴儿见到人自行笑起来"
  },
  {
    id: 29,
    ageMonths: 3,
    domain: Domain.Social,
    description: "灵敏模样",
    operationMethod: "主试者观察婴儿在不经逗引的情况下, 对周围人和环境的反应",
    passCriteria: "婴儿不经逗引可观察周围环境, 眼会东张西望"
  },
  // --- 4 Months ---
  {
    id: 30,
    ageMonths: 4,
    domain: Domain.GrossMotor,
    description: "扶腋可站片刻",
    operationMethod: "主试者扶婴儿腋下, 置于立位后放松手的支持, 观察其反应",
    passCriteria: "婴儿可用自己双腿支持大部分体重达2s或以上"
  },
  {
    id: 31,
    ageMonths: 4,
    domain: Domain.GrossMotor,
    description: "俯卧抬头90°",
    operationMethod: "婴儿俯卧, 前臂屈曲支撑, 头正中位, 用玩具逗引婴儿抬头, 观察其反应",
    passCriteria: "头可自行抬离床面, 面部与床面呈90°, 持续5s或以上"
  },
  {
    id: 32,
    ageMonths: 4,
    domain: Domain.FineMotor,
    description: "摇动并注视花铃棒",
    operationMethod: "抱坐, 将花铃棒放入婴儿手中, 鼓励婴儿摇动",
    passCriteria: "婴儿能注视花铃棒, 并摇动数下"
  },
  {
    id: 33,
    ageMonths: 4,
    domain: Domain.FineMotor,
    description: "试图抓物",
    operationMethod: "婴儿仰卧, 将花铃棒拿到婴儿可及的范围内, 观察婴儿反应, 但不能触碰婴儿",
    passCriteria: "婴儿手臂试图抬起或有手抓动作即可通过"
  },
  {
    id: 34,
    ageMonths: 4,
    domain: Domain.Adaptive,
    description: "目光对视*",
    operationMethod: "主试者或母亲对婴儿说话, 观察婴儿是否与人对视",
    passCriteria: "婴儿能与成人对视, 并保持5s或以上"
  },
  {
    id: 35,
    ageMonths: 4,
    domain: Domain.Language,
    description: "高声叫R", // Note: Table B.1 has '高声叫', R added from A.1
    operationMethod: "观察或询问婴儿在高兴或不满时的发音",
    passCriteria: "会高声叫(非高调尖叫)"
  },
  {
    id: 36,
    ageMonths: 4,
    domain: Domain.Language,
    description: "伊语作声R", // Note: Table B.1 has '伊语作声', R added from A.1
    operationMethod: "观察婴儿安静时的发音",
    passCriteria: "观察或询问, 婴儿会类似自言自语, 无音节、无意义"
  },
  {
    id: 37,
    ageMonths: 4,
    domain: Domain.Language,
    description: "找到声源",
    operationMethod: "抱坐, 主试者在婴儿耳后上方15cm处轻摇铜铃, 观察其反应",
    passCriteria: "可回头找到声源, 一侧耳通过即可"
  },
  {
    id: 38,
    ageMonths: 4,
    domain: Domain.Social,
    description: "注视镜中人像",
    operationMethod: "将无边镜子横放在婴儿面前约20cm处, 主试者或母亲可在镜中逗引婴儿, 观察婴儿反应",
    passCriteria: "婴儿可经逗引或自发注视镜中人像"
  },
  {
    id: 39,
    ageMonths: 4,
    domain: Domain.Social,
    description: "认亲人R", // Note: Table B.1 has '认亲人', R added from A.1
    operationMethod: "观察婴儿在看到母亲或其他亲人或听到亲人声音后的表情变化",
    passCriteria: "观察或询问, 在见到母亲或其他亲人时, 婴儿会变得高兴起来"
  },
  // --- 5 Months ---
  {
    id: 40,
    ageMonths: 5,
    domain: Domain.GrossMotor,
    description: "轻拉腕部即坐起",
    operationMethod: "婴儿仰卧, 主试者握住腕部, 轻拉到坐的位置",
    passCriteria: "婴儿自己能主动用力坐起, 拉坐过程中无头部后滞现象"
  },
  {
    id: 41,
    ageMonths: 5,
    domain: Domain.GrossMotor,
    description: "独坐头身前倾",
    operationMethod: "将婴儿以坐姿置于床上",
    passCriteria: "独坐保持5s或以上, 头身向前倾"
  },
  {
    id: 42,
    ageMonths: 5,
    domain: Domain.FineMotor,
    description: "抓住近处玩具",
    operationMethod: "抱坐, 婴儿手置于桌上。玩具(如花铃棒)放在距离婴儿手掌一侧2.5cm处, 鼓励婴儿取玩具",
    passCriteria: "婴儿可用一手或双手抓住玩具"
  },
  {
    id: 43,
    ageMonths: 5,
    domain: Domain.FineMotor,
    description: "玩手",
    operationMethod: "观察婴儿能否把双手放在一起互相玩弄",
    passCriteria: "婴儿会自发将双手抱到一起玩"
  },
  {
    id: 44,
    ageMonths: 5,
    domain: Domain.Adaptive,
    description: "注意小丸",
    operationMethod: "桌面上放一小丸, 主试者指点小丸或把小丸动来动去, 以引起婴儿注意",
    passCriteria: "婴儿明确地注意到小丸"
  },
  {
    id: 45,
    ageMonths: 5,
    domain: Domain.Adaptive,
    description: "拿住一积木注视另一积木",
    operationMethod: "抱坐, 婴儿手置于桌上, 主试者先放一块积木在婴儿手中, 再放另一块积木于桌上婴儿可及范围内, 适当逗引, 观察婴儿对第二块积木的反应",
    passCriteria: "婴儿拿着放在手中的第一块积木, 当第二块积木靠近时, 目光明确地注视第二块积木"
  },
  {
    id: 46,
    ageMonths: 5,
    domain: Domain.Language,
    description: "对人及物发声R", // Note: Table B.1 has '对人及物发声', R added from A.1
    operationMethod: "观察或询问婴儿看到熟悉的人或玩具时的发音",
    passCriteria: "观察或询问, 婴儿会发出象说话般的声音, 如伊伊呀呀、ma、pa、ba等辅元结合音"
  },
  {
    id: 47,
    ageMonths: 5,
    domain: Domain.Social,
    description: "对镜有游戏反应",
    operationMethod: "将无边镜子竖放在婴儿面前约20cm处, 主试者及家长影像不能在镜内出现, 观察婴儿反应",
    passCriteria: "对镜中自己的影像有面部表情变化或伴有肢体动作。"
  },
  {
    id: 48,
    ageMonths: 5,
    domain: Domain.Social,
    description: "见食物兴奋R", // Note: Table B.1 has '见食物兴奋', R added from A.1
    operationMethod: "观察婴儿看到奶瓶、饼干、水等食物时的反应",
    passCriteria: "观察或询问, 当婴儿看到奶瓶或母亲乳房时, 表现出高兴要吃的样子"
  },
  // --- 6 Months ---
  {
    id: 49,
    ageMonths: 6,
    domain: Domain.GrossMotor,
    description: "仰卧翻身R", // Note: Table B.1 has '仰卧翻身', R added from A.1
    operationMethod: "婴儿仰卧, 用玩具逗引其翻身",
    passCriteria: "观察或询问, 婴儿可从仰卧自行翻到俯卧位"
  },
  {
    id: 50,
    ageMonths: 6,
    domain: Domain.GrossMotor,
    description: "会拍桌子",
    operationMethod: "抱坐, 主试者示范拍打桌面, 鼓励婴儿照样做",
    passCriteria: "婴儿经示范后或自发拍打桌面, 并拍响"
  },
  {
    id: 51,
    ageMonths: 6,
    domain: Domain.FineMotor,
    description: "会撕揉纸张",
    operationMethod: "将一张28g粉色打字纸放入婴儿手中, 使婴儿能抓住纸, 观察婴儿反应",
    passCriteria: "能用双手反复揉搓纸张两次或以上, 或将纸撕破"
  },
  {
    id: 52,
    ageMonths: 6,
    domain: Domain.FineMotor,
    description: "耙弄到桌上一积木",
    operationMethod: "抱坐, 放一积木在婴儿容易够到的桌面上, 观察婴儿反应",
    passCriteria: "婴儿伸出手触碰到积木并抓握到"
  },
  {
    id: 53,
    ageMonths: 6,
    domain: Domain.Adaptive,
    description: "两手拿住积木",
    operationMethod: "抱坐, 先后递给婴儿两块积木, 婴儿自己拿或被动放在手中均可",
    passCriteria: "婴儿一手拿一块积木, 保持在手里10s或以上"
  },
  {
    id: 54,
    ageMonths: 6,
    domain: Domain.Adaptive,
    description: "寻找失落的玩具",
    operationMethod: "以红球逗引婴儿注意, 红球位置应与婴儿双眼在同一水平线上。主试者手提红球, 当婴儿注意到红球后, 立即松手使红球落地, 此时主试者的手保持原姿势, 观察婴儿反应",
    passCriteria: "红球落地后, 婴儿立即低下头寻找红球"
  },
  {
    id: 55,
    ageMonths: 6,
    domain: Domain.Language,
    description: "叫名字转头",
    operationMethod: "主试者或家长在婴儿背后呼唤其名字, 观察其反应",
    passCriteria: "婴儿会转头寻找呼唤的人"
  },
  {
    id: 56,
    ageMonths: 6,
    domain: Domain.Language,
    description: "理解手势",
    operationMethod: "主试者或妈妈(带养人)伸手表示要抱, 不得出声提示, 观察婴儿反应",
    passCriteria: "婴儿理解并将手伸向主试者或妈妈(带养人), 二试一成"
  },
  {
    id: 57,
    ageMonths: 6,
    domain: Domain.Social,
    description: "自喂食物R", // Note: Table B.1 has '自喂食物', R added from A.1
    operationMethod: "观察或询问婴儿拿到一块饼干或其他能拿住的食物时, 能否送至口中并咀嚼",
    passCriteria: "能将饼干送入口中并咀嚼, 有张嘴咬的动作而不是吸吮"
  },
  {
    id: 58,
    ageMonths: 6,
    domain: Domain.Social,
    description: "会躲猫猫",
    operationMethod: "主试者把自己的脸藏在一张中心有孔的A4纸后面(孔直径0.5cm), 呼唤婴儿名字, 婴儿听到声音, 观望时, 主试者沿纸边在纸的同一侧反复出现两次并逗引说\"喵、喵\", 第三次呼唤婴儿名字后从纸孔观察婴儿表情",
    passCriteria: "第三次呼唤婴儿时, 婴儿视线再次转向主试者刚才露脸的方向"
  },
  // --- 7 Months ---
  {
    id: 59,
    ageMonths: 7,
    domain: Domain.GrossMotor,
    description: "悬垂落地姿势*",
    operationMethod: "扶腋下使婴儿呈悬空位, 足离床面20cm~30cm, 立位瞬时落下, 观察脚落地瞬时的姿势",
    passCriteria: "婴儿能全脚掌着地"
  },
  {
    id: 60,
    ageMonths: 7,
    domain: Domain.GrossMotor,
    description: "独坐直",
    operationMethod: "将婴儿以坐姿置于床上",
    passCriteria: "独坐时背直, 无需手支撑床面, 保持1min或以上"
  },
  {
    id: 61,
    ageMonths: 7,
    domain: Domain.FineMotor,
    description: "耙弄到小丸",
    operationMethod: "抱坐, 将一小丸放在桌上, 鼓励婴儿取",
    passCriteria: "婴儿用所有手指弯曲做耙弄、搔抓动作, 最后成功地用全掌抓到小丸"
  },
  {
    id: 62,
    ageMonths: 7,
    domain: Domain.FineMotor,
    description: "自取一积木, 再取另一块",
    operationMethod: "抱坐, 出示一积木给婴儿, 抓住后, 再出示另一块, 观察其反应",
    passCriteria: "婴儿主动伸手去抓桌上的积木, 第一块积木握住并保留在手中后, 又成功地用另一只手抓住第二块积木"
  },
  {
    id: 63,
    ageMonths: 7,
    domain: Domain.Adaptive,
    description: "积木换手",
    operationMethod: "抱坐, 出示一积木给婴儿, 婴儿拿住后, 再向拿积木的手前出示另一块积木, 观察其反应",
    passCriteria: "婴儿将第一块积木传到另一只手后, 再去拿第二块积木"
  },
  {
    id: 64,
    ageMonths: 7,
    domain: Domain.Adaptive,
    description: "伸手够远处玩具",
    operationMethod: "抱坐, 将一玩具放于婴儿手恰好够不到的桌面上, 观察其反应",
    passCriteria: "欠身取, 并能拿到玩具"
  },
  {
    id: 65,
    ageMonths: 7,
    domain: Domain.Language,
    description: "发da-da ma-ma 无所指R", // Note: R added from A.1
    operationMethod: "观察婴儿在清醒状态时的发声情况",
    passCriteria: "观察或询问, 婴儿会发da-da、ma-ma的双唇音, 但无所指"
  },
  // Item 66 operation/criteria not in provided B.1 OCR, using A.1 desc
  {
    id: 66,
    ageMonths: 7,
    domain: Domain.Social,
    description: "抱脚玩",
    operationMethod: "婴儿仰卧, 观察其是否会自发或在主试者协助下将脚放入手中后玩脚", // Inferred based on similar items/common knowledge
    passCriteria: "婴儿能抱住脚玩或吸吮" // Inferred based on similar items/common knowledge
  },
  {
    id: 67,
    ageMonths: 7,
    domain: Domain.Social,
    description: "能认生人R", // Note: Table B.1 has '能认生人', R added from A.1
    operationMethod: "观察或询问婴儿对陌生人的反应",
    passCriteria: "婴儿有拒抱、哭、不高兴或惊奇等表现"
  },
  // --- 8 Months ---
  {
    id: 68,
    ageMonths: 8,
    domain: Domain.GrossMotor,
    description: "双手扶物可站立",
    operationMethod: "将婴儿置于床上, 协助婴儿双手抓握栏杆, 胸部不靠栏杆, 呈站立姿势观察",
    passCriteria: "双手扶栏杆支撑全身重量, 保持站立位5s或以上"
  },
  {
    id: 69,
    ageMonths: 8,
    domain: Domain.GrossMotor,
    description: "独坐自如",
    operationMethod: "婴儿坐位, 用玩具逗引, 婴儿上身可自由转动取物, 或轻轻将婴儿肩头向对侧推, 观察其侧平衡",
    passCriteria: "独坐时无须手支撑, 上身可自由转动取物或侧推后回正保持平衡不倒"
  },
  {
    id: 70,
    ageMonths: 8,
    domain: Domain.FineMotor,
    description: "拇他指捏小丸",
    operationMethod: "抱坐, 将一小丸放在桌上, 鼓励婴儿取",
    passCriteria: "婴儿会用拇他指捏起小丸"
  },
  {
    id: 71,
    ageMonths: 8,
    domain: Domain.FineMotor,
    description: "试图取第三块积木",
    operationMethod: "连续出示两块积木后婴儿均能拿到, 再出示第三块积木鼓励婴儿取",
    passCriteria: "有要取第三块积木的表现, 不一定能取到, 前两块仍保留在手中"
  },
  {
    id: 72,
    ageMonths: 8,
    domain: Domain.Adaptive,
    description: "有意识地摇铃",
    operationMethod: "主试者示范摇铃, 鼓励婴儿照样做",
    passCriteria: "婴儿能够有意识地摇铃"
  },
  {
    id: 73,
    ageMonths: 8,
    domain: Domain.Adaptive,
    description: "持续用手追逐玩具",
    operationMethod: "以玩具逗引婴儿来取, 将要取到时, 主试者将玩具移动到稍远的地方, 观察其反应",
    passCriteria: "婴儿持续追逐玩具, 力图拿到, 但不一定取到"
  },
  {
    id: 74,
    ageMonths: 8,
    domain: Domain.Language,
    description: "模仿声音R", // Note: R added from A.1
    operationMethod: "观察或询问婴儿是否会模仿咳嗽、弄舌的声音",
    passCriteria: "观察或询问, 婴儿能模仿发出类似声音"
  },
  {
    id: 75,
    ageMonths: 8,
    domain: Domain.Language,
    description: "可用动作手势表达(2/3)*",
    operationMethod: "主试者询问家长, 婴儿是否常有主动伸手表示要抱; 摊开手表示没有; 咂咂嘴表示好吃等动作手势",
    passCriteria: "三问中, 有两项表现即可通过"
  },
  {
    id: 76,
    ageMonths: 8,
    domain: Domain.Social,
    description: "懂得成人面部表情",
    operationMethod: "主试者或家长对婴儿训斥或赞许, 观察其反应",
    passCriteria: "婴儿表现出委屈或兴奋等反应"
  },
  // --- 9 Months ---
  {
    id: 77,
    ageMonths: 9,
    domain: Domain.GrossMotor,
    description: "拉双手会走",
    operationMethod: "站立位, 主试者牵婴儿双手, 牵手时不过多给力, 鼓励婴儿向前行走",
    passCriteria: "婴儿可自己用力, 较协调地移动双腿, 向前行走三步或以上"
  },
  {
    id: 78,
    ageMonths: 9,
    domain: Domain.GrossMotor,
    description: "会爬",
    operationMethod: "婴儿俯卧, 用玩具逗引婴儿爬",
    passCriteria: "婴儿能将腹部抬离床面, 四点支撑向前爬行(膝手爬)"
  },
  {
    id: 79,
    ageMonths: 9,
    domain: Domain.FineMotor,
    description: "拇食指捏小丸",
    operationMethod: "抱坐, 将一小丸放在桌上, 鼓励婴儿取",
    passCriteria: "婴儿会用拇食指捏起小丸"
  },
  {
    id: 80,
    ageMonths: 9,
    domain: Domain.FineMotor,
    description: "从杯中取出积木",
    operationMethod: "主试者在婴儿注视下将积木放入杯中, 鼓励婴儿取出",
    passCriteria: "婴儿能自行将积木取出, 不能倒出"
  },
  {
    id: 81,
    ageMonths: 9,
    domain: Domain.Adaptive,
    description: "积木对敲",
    operationMethod: "主试者出示两块积木, 示范积木对敲后, 让婴儿一手拿一块, 鼓励其照样做",
    passCriteria: "婴儿能把双手合到中线, 互敲积木, 对击可不十分准确"
  },
  {
    id: 82,
    ageMonths: 9,
    domain: Domain.Adaptive,
    description: "拨弄铃舌",
    operationMethod: "主试者轻摇铜铃以引起婴儿注意, 然后将铜铃递给婴儿, 观察其对铜铃的反应",
    passCriteria: "婴儿有意识寻找并拨弄或拿捏铃舌"
  },
  {
    id: 83,
    ageMonths: 9,
    domain: Domain.Language,
    description: "会欢迎R", // Note: R added from A.1
    operationMethod: "主试者只说欢迎, 不做手势示范, 鼓励婴儿以手势表示",
    passCriteria: "观察或询问, 婴儿能够做出欢迎的手势"
  },
  {
    id: 84,
    ageMonths: 9,
    domain: Domain.Language,
    description: "会再见R", // Note: R added from A.1
    operationMethod: "主试者只说再见, 不做手势示范, 鼓励婴儿以手势表示",
    passCriteria: "观察或询问, 婴儿能够做出再见的手势"
  },
  {
    id: 85,
    ageMonths: 9,
    domain: Domain.Social,
    description: "表示不要R", // Note: R added from A.1
    operationMethod: "观察或询问婴儿对不感兴趣的物品的反应",
    passCriteria: "观察或询问, 婴儿对不要之物有摇头或推开的动作"
  },
  // --- 10 Months ---
  {
    id: 86,
    ageMonths: 10,
    domain: Domain.GrossMotor,
    description: "保护性支撑*",
    operationMethod: "主试者站立在床或桌边, 由婴儿背后扶持其腋下抱起, 然后快速做俯冲动作, 观察婴儿反应",
    passCriteria: "婴儿出现双手张开, 向前伸臂, 类似保护自己的动作"
  },
  {
    id: 87,
    ageMonths: 10,
    domain: Domain.GrossMotor,
    description: "自己坐起",
    operationMethod: "将婴儿置于俯卧位, 用玩具逗引, 观察婴儿能否坐起",
    passCriteria: "无需协助, 婴儿能较协调地从俯卧位坐起, 并坐稳"
  },
  {
    id: 88,
    ageMonths: 10,
    domain: Domain.FineMotor,
    description: "拇食指动作熟练",
    operationMethod: "抱坐, 将一小丸放在桌上, 鼓励婴儿取",
    passCriteria: "婴儿会用拇食指的指端协调、熟练且迅速地对捏起小丸"
  },
  // Item 89 operation/criteria not in provided B.1 OCR, using A.1 desc
  {
    id: 89,
    ageMonths: 10,
    domain: Domain.Adaptive,
    description: "拿掉扣积木杯玩积木",
    operationMethod: "积木放在桌上, 在婴儿注视下用杯子盖住积木, 杯子的把手对着婴儿, 鼓励婴儿取积木", // From A.1 description + common sense
    passCriteria: "婴儿能主动拿掉杯子, 取出藏在杯子里面的积木" // From A.1 description + common sense
  },
  {
    id: 90,
    ageMonths: 10,
    domain: Domain.Adaptive,
    description: "寻找盒内东西",
    operationMethod: "在婴儿面前摇响装有硬币的盒, 然后避开婴儿将硬币取出, 给婴儿空盒, 观察其反应",
    passCriteria: "婴儿能明确地寻找盒内的硬币"
  },
  {
    id: 91,
    ageMonths: 10,
    domain: Domain.Language,
    description: "模仿发语声R", // Note: R added from A.1
    operationMethod: "观察或询问婴儿是否会模仿\"妈妈\"、\"爸爸\"、\"拿\"、\"走\"等语音",
    passCriteria: "观察或询问, 婴儿能模仿发语声"
  },
  {
    id: 92,
    ageMonths: 10,
    domain: Domain.Language,
    description: "懂得常见物及人名称",
    operationMethod: "主试者问婴儿\"妈妈在哪里?\"\"灯在哪里?\"\"阿姨在哪里?\"等人或物的名称, 观察其反应",
    passCriteria: "婴儿会用眼睛注视或指出2种或以上的人或物"
  },
  {
    id: 93,
    ageMonths: 10,
    domain: Domain.Social,
    description: "按指令取东西",
    operationMethod: "将娃娃、球和杯子并排放在婴儿双手可及的桌面上, 鼓励婴儿按指令取其中的一件。(每样东西交替问两次, 不能连续问)",
    passCriteria: "婴儿能理解指令并成功拿对其中一种或一种以上物品"
  },
  // --- 11 Months ---
  {
    id: 94,
    ageMonths: 11,
    domain: Domain.GrossMotor,
    description: "独站片刻",
    operationMethod: "将婴儿置于立位, 待婴儿站稳后松开双手, 观察其站立情况",
    passCriteria: "婴儿能独自站立2s或以上"
  },
  {
    id: 95,
    ageMonths: 11,
    domain: Domain.GrossMotor,
    description: "扶物下蹲取物",
    operationMethod: "婴儿手扶围栏站立, 不得倚靠。将玩具放在其脚边, 鼓励婴儿下蹲取物",
    passCriteria: "一手扶栏杆蹲下, 用另一只手捡玩具, 并能再站起来"
  },
  {
    id: 96,
    ageMonths: 11,
    domain: Domain.FineMotor,
    description: "积木放入杯中",
    operationMethod: "主试者示范将积木放入杯中, 鼓励婴儿照样做",
    passCriteria: "婴儿能有意识地将积木放入杯中并撒开手"
  },
  {
    id: 97,
    ageMonths: 11,
    domain: Domain.Adaptive,
    description: "打开包积木的方巾",
    operationMethod: "在婴儿注视下用方巾包起一积木, 然后打开, 再包上, 鼓励婴儿找",
    passCriteria: "婴儿有意识地打开包积木的方巾, 寻找积木, 成功将积木拿到手"
  },
  {
    id: 98,
    ageMonths: 11,
    domain: Domain.Adaptive,
    description: "模仿拍娃娃",
    operationMethod: "主试者示范拍娃娃, 鼓励婴儿照样做",
    passCriteria: "婴儿学大人样子轻拍娃娃"
  },
  {
    id: 99,
    ageMonths: 11,
    domain: Domain.Language,
    description: "有意识地发一个字音R", // Note: R added from A.1
    operationMethod: "观察或询问婴儿有意识的发音情况",
    passCriteria: "观察或询问, 有意识并正确地发出相应的字音, 如爸、妈、拿、走、姨、奶、汪汪等"
  },
  {
    id: 100,
    ageMonths: 11,
    domain: Domain.Language,
    description: "懂得\"不\"", // Note: R added from A.1
    operationMethod: "婴儿取一玩具玩时, 主试者说\"不动\"、\"不拿\", 不要做手势, 观察或询问其反应",
    passCriteria: "观察或询问, 婴儿会停止拿取玩具的动作"
  },
  {
    id: 101,
    ageMonths: 11,
    domain: Domain.Social,
    description: "会从杯中喝水R", // Note: R added from A.1
    operationMethod: "观察或询问婴儿能否从成人拿的杯子里喝到水",
    passCriteria: "观察或询问, 婴儿能从杯中喝到水"
  },
  {
    id: 102,
    ageMonths: 11,
    domain: Domain.Social,
    description: "会摘帽子",
    operationMethod: "主试者将帽子戴在婴儿头上, 观察其能否摘下帽子",
    passCriteria: "婴儿能用单手或双手摘下帽子"
  },
  // --- 12 Months ---
  {
    id: 103,
    ageMonths: 12,
    domain: Domain.GrossMotor,
    description: "独站稳",
    operationMethod: "将小儿置于立位, 待小儿站稳后松开双手, 观察其站立情况",
    passCriteria: "独自站立10s或以上, 允许身体轻微晃动"
  },
  {
    id: 104,
    ageMonths: 12,
    domain: Domain.GrossMotor,
    description: "牵一手可走",
    operationMethod: "主试者牵小儿一只手行走, 不要用力, 观察其行走情况",
    passCriteria: "小儿自己迈步, 牵一手能协调地移动双腿, 至少向前迈三步以上"
  },
  {
    id: 105,
    ageMonths: 12,
    domain: Domain.FineMotor,
    description: "全掌握笔留笔道",
    operationMethod: "主试者示范用笔在纸上画道, 鼓励小儿模仿",
    passCriteria: "小儿握笔在纸上留下笔道即可"
  },
  {
    id: 106,
    ageMonths: 12,
    domain: Domain.FineMotor,
    description: "试把小丸投小瓶",
    operationMethod: "出示一小丸及30ml广口试剂瓶, 主试者拿瓶, 示范并指点将小丸放入瓶内, 鼓励小儿照样做",
    passCriteria: "小儿捏住小丸试往瓶内投放, 但不一定成功"
  },
  {
    id: 107,
    ageMonths: 12,
    domain: Domain.Adaptive,
    description: "盖瓶盖",
    operationMethod: "瓶盖翻放在桌上, 主试者示范将瓶盖盖在瓶上, 鼓励小儿照样做",
    passCriteria: "小儿会将瓶盖翻正后盖在瓶上"
  },
  {
    id: 108,
    ageMonths: 12,
    domain: Domain.Language,
    description: "叫爸爸妈妈有所指R", // Note: R added from A.1
    operationMethod: "观察或询问小儿见到妈妈、爸爸时, 是否会有意识并准确地叫出",
    passCriteria: "小儿会主动地称呼爸爸或妈妈"
  },
  {
    id: 109,
    ageMonths: 12,
    domain: Domain.Language,
    description: "向他/她要东西知道给",
    operationMethod: "将一玩具放入小儿手中, 然后主试者或家长对小儿说\"把某某东西给我\", 不要伸手去拿, 观察小儿反应",
    passCriteria: "经要求, 小儿把玩具主动递给主试者或家长, 并主动松手"
  },
  {
    id: 110,
    ageMonths: 12,
    domain: Domain.Social,
    description: "穿衣知配合R", // Note: R added from A.1
    operationMethod: "观察或询问成人给小儿穿衣时的配合情况",
    passCriteria: "穿衣时小儿合作, 会有伸手、伸腿等配合动作, 不一定穿进去"
  },
  {
    id: 111,
    ageMonths: 12,
    domain: Domain.Social,
    description: "共同注意R", // Note: R added from A.1
    operationMethod: "观察或询问, 对家长指示的某一场景或过程, 小儿能否与家长一起关注",
    passCriteria: "小儿有共同注意过程"
  },
  // --- 15 Months ---
  {
    id: 112,
    ageMonths: 15,
    domain: Domain.GrossMotor,
    description: "独走自如",
    operationMethod: "观察小儿走路的情况",
    passCriteria: "小儿行走自如, 不左右摇摆, 会控制步速, 不惯性前冲"
  },
  {
    id: 113,
    ageMonths: 15,
    domain: Domain.GrossMotor,
    description: "自发乱画",
    operationMethod: "主试者出示纸和笔, 鼓励小儿画画",
    passCriteria: "小儿能用笔在纸上自行乱画"
  },
  {
    id: 114,
    ageMonths: 15,
    domain: Domain.FineMotor,
    description: "从瓶中拿到小丸",
    operationMethod: "出示装有小丸的30ml广口试剂瓶, 递给小儿, 说\"阿姨想要豆豆(小丸)怎么办?\"或\"把豆豆给妈妈\"。鼓励小儿将小丸取出, 但不能说倒出",
    passCriteria: "小儿能将小丸拿出或倒出"
  },
  {
    id: 115,
    ageMonths: 15,
    domain: Domain.FineMotor,
    description: "翻书两次",
    operationMethod: "主试者示范翻书, 鼓励小儿照样做",
    passCriteria: "做出翻书动作两次或以上"
  },
  {
    id: 116,
    ageMonths: 15,
    domain: Domain.Adaptive,
    description: "盖上圆盒",
    operationMethod: "主试者示范将圆盒盖好, 鼓励小儿照样做",
    passCriteria: "小儿会将圆盒盖上, 并盖严"
  },
  {
    id: 117,
    ageMonths: 15,
    domain: Domain.Adaptive,
    description: "会指眼耳鼻口手",
    operationMethod: "主试者问小儿\"眼在哪儿?\"\"耳在哪儿?\"\"鼻子在哪儿?\"等, 观察其反应",
    passCriteria: "能正确指出3个或3个以上身体部位"
  },
  {
    id: 118,
    ageMonths: 15,
    domain: Domain.Language,
    description: "说3~5个字R", // Note: R added from A.1
    operationMethod: "观察或询问小儿有意识讲话的情况",
    passCriteria: "有意识地说3~5个字(妈、爸除外)"
  },
  {
    id: 119,
    ageMonths: 15,
    domain: Domain.Social,
    description: "会脱袜子R", // Note: R added from A.1
    operationMethod: "观察或询问小儿脱袜子的方法",
    passCriteria: "观察或询问, 小儿能正确且有意识地脱下袜子"
  },
  // --- 18 Months ---
  {
    id: 120,
    ageMonths: 18,
    domain: Domain.GrossMotor,
    description: "扔球无方向",
    operationMethod: "主试者示范过肩扔球, 鼓励小儿照样做",
    passCriteria: "小儿举手过肩扔球, 可无方向"
  },
  {
    id: 121,
    ageMonths: 18,
    domain: Domain.GrossMotor,
    description: "模仿画道道",
    operationMethod: "主试者示范用蜡笔画出一无方向道道, 鼓励小儿模仿",
    passCriteria: "小儿能画出道道, 起止自如, 方向不限"
  },
  {
    id: 122,
    ageMonths: 18,
    domain: Domain.FineMotor,
    description: "积木搭高四块",
    operationMethod: "示范搭高两块积木, 推倒后一块一块出示积木, 鼓励小儿搭高",
    passCriteria: "小儿搭高四块积木或以上, 三试一成"
  },
  {
    id: 123,
    ageMonths: 18,
    domain: Domain.Adaptive,
    description: "正放圆积木入型板",
    operationMethod: "在型板圆孔下方放一圆积木, 圆孔靠近小儿身体。主试者对小儿说\"这是小朋友的家(指型板面而不是圆孔), 请帮这个小朋友(指圆积木)找到自己的家\", 不示范",
    passCriteria: "不经指点, 能正确将圆积木一次性放入孔内"
  },
  {
    id: 124,
    ageMonths: 18,
    domain: Domain.Adaptive,
    description: "懂得三个投向",
    operationMethod: "请小儿把三块积木分别递给妈妈、阿姨、放在桌子上, 妈妈阿姨不能伸手要",
    passCriteria: "小儿会正确地将积木送到要求的地方"
  },
  {
    id: 125,
    ageMonths: 18,
    domain: Domain.Language,
    description: "说十个字词R", // Note: R added from A.1
    operationMethod: "观察或询问小儿有意识讲话的情况并记录",
    passCriteria: "有意识说10个或以上单字或词(爸、妈除外)"
  },
  {
    id: 126,
    ageMonths: 18,
    domain: Domain.Social,
    description: "白天能控制大小便R", // Note: R added from A.1
    operationMethod: "观察或询问小儿大小便控制情况, 或询问白天是否尿湿裤子",
    passCriteria: "经人提醒或主动示意大小便, 白天基本不尿湿裤子"
  },
  {
    id: 127,
    ageMonths: 18,
    domain: Domain.Social,
    description: "会用匙*",
    operationMethod: "观察或询问小儿是否会自己用匙",
    passCriteria: "小儿能自己用匙吃饭, 允许少量遗洒"
  },
  // --- 21 Months ---
  {
    id: 128,
    ageMonths: 21,
    domain: Domain.GrossMotor,
    description: "脚尖走R", // Note: R added from A.1
    operationMethod: "主试者示范用脚尖行走, 鼓励小儿照样做",
    passCriteria: "小儿能用脚尖连续行走三步以上, 脚跟不得着地"
  },
  {
    id: 129,
    ageMonths: 21,
    domain: Domain.GrossMotor,
    description: "扶楼梯上楼",
    operationMethod: "在楼梯上放一玩具, 鼓励小儿上楼去取",
    passCriteria: "小儿能扶楼梯扶手, 熟练地上三阶以上台阶。"
  },
  {
    id: 130,
    ageMonths: 21,
    domain: Domain.FineMotor,
    description: "水晶线穿扣眼",
    operationMethod: "主试者示范用水晶线穿过扣眼, 鼓励小儿照样做",
    passCriteria: "小儿能将水晶线穿过扣眼0.5cm以上"
  },
  {
    id: 131,
    ageMonths: 21,
    domain: Domain.FineMotor,
    description: "模仿拉拉锁",
    operationMethod: "示范拉拉锁, 拉上、拉下各一次。主试者固定拉锁两端, 鼓励小儿照样做",
    passCriteria: "小儿能双手配合将锁头来回移动, 超过全拉锁的一半"
  },
  {
    id: 132,
    ageMonths: 21,
    domain: Domain.Adaptive,
    description: "积木搭高7~8块",
    operationMethod: "示范搭高两块积木, 推倒后一块一块出示积木, 鼓励小儿搭高",
    passCriteria: "小儿搭高7~8块积木, 三试一成"
  },
  {
    id: 133,
    ageMonths: 21,
    domain: Domain.Adaptive,
    description: "知道红色",
    operationMethod: "出示红、黄、蓝、绿四色图片, 问小儿\"哪个是红色?\"",
    passCriteria: "小儿能在四色图片中正确指出红色"
  },
  {
    id: 134,
    ageMonths: 21,
    domain: Domain.Language,
    description: "回答简单问题",
    operationMethod: "主试者问\"这是什么(球)?\"\"那是谁(带小儿者) ? \"\"爸爸干什么去了(上班)?\"",
    passCriteria: "小儿均能正确回答"
  },
  {
    id: 135,
    ageMonths: 21,
    domain: Domain.Language,
    description: "说3~5个字的句子R", // Note: R added from A.1
    operationMethod: "观察或询问小儿有意识说话的情况",
    passCriteria: "小儿能有意识地说出3~5个字的句子, 有主谓语"
  },
  {
    id: 136,
    ageMonths: 21,
    domain: Domain.Social,
    description: "能表示个人需要R", // Note: R added from A.1
    operationMethod: "观察或询问小儿是否会明确表示自己的需要",
    passCriteria: "小儿会说出三种或以上的需要, 如\"吃饭、喝水、玩汽车、上街\"等, 可伴手势"
  },
  {
    id: 137,
    ageMonths: 21,
    domain: Domain.Social,
    description: "想象性游戏R", // Note: R added from A.1
    operationMethod: "观察或询问小儿是否有想象性游戏, 如假装给娃娃或动物玩具喂饭、盖被子、打针等",
    passCriteria: "小儿有想象性游戏"
  },
  // --- 24 Months (2 years) ---
  {
    id: 138,
    ageMonths: 24,
    domain: Domain.GrossMotor,
    description: "双足跳离地面",
    operationMethod: "主试者示范双足同时离地跳起, 鼓励小儿照样做",
    passCriteria: "小儿会双足同时跳离地面, 同时落地, 两次以上"
  },
  {
    id: 139,
    ageMonths: 24,
    domain: Domain.FineMotor,
    description: "穿过扣眼后拉线",
    operationMethod: "主试者示范用水晶线穿过扣眼, 并将线拉出, 鼓励小儿照样做",
    passCriteria: "小儿能将水晶线穿过扣眼, 并能将线拉出"
  },
  {
    id: 140,
    ageMonths: 24,
    domain: Domain.FineMotor,
    description: "一页页翻书",
    operationMethod: "主试者示范一页页翻书, 鼓励小儿照样做",
    passCriteria: "小儿会用手捻书页, 每次一页, 连续翻书三页或以上"
  },
  {
    id: 141,
    ageMonths: 24,
    domain: Domain.Adaptive,
    description: "倒放圆积木入型板",
    operationMethod: "在小儿能正放圆积木入型板的基础上, 将型板倒转180°。圆积木仍在原处, 主试者对小儿说\"这是小朋友的家(指型板), 请帮这个小朋友(指圆积木)找到自己的家\", 不示范",
    passCriteria: "型板倒转后, 小儿能正确将圆积木一次性放入圆孔内"
  },
  {
    id: 142,
    ageMonths: 24,
    domain: Domain.Language,
    description: "说两句以上诗或儿歌",
    operationMethod: "鼓励小儿说唐诗或儿歌",
    passCriteria: "小儿能自发或稍经提示开头后完整说出两句或以上唐诗或儿歌"
  },
  {
    id: 143,
    ageMonths: 24,
    domain: Domain.Language,
    description: "说常见物用途(碗笔凳球)",
    operationMethod: "主试者分别提问小儿碗、笔、板凳、球的用途",
    passCriteria: "小儿会说出三种或以上物品的用途"
  },
  {
    id: 144,
    ageMonths: 24,
    domain: Domain.Social,
    description: "会打招呼",
    operationMethod: "示范或不示范小儿见人打招呼",
    passCriteria: "小儿会自发或模仿说\"你好\"、\"再见\"等"
  },
  {
    id: 145,
    ageMonths: 24,
    domain: Domain.Social,
    description: "问\"这是什么?\"R", // Note: R added from A.1
    operationMethod: "观察或询问, 小儿在见到某物时, 是否能自发提问\"这是什么?\"",
    passCriteria: "小儿会自发提出问题, 主动问\"这是什么?\""
  },
  // --- 27 Months ---
  {
    id: 146,
    ageMonths: 27,
    domain: Domain.GrossMotor,
    description: "独自上楼",
    operationMethod: "鼓励小儿不扶扶手上楼梯, 可示范",
    passCriteria: "不扶扶手, 稳定地上楼梯三阶或以上"
  },
  {
    id: 147,
    ageMonths: 27,
    domain: Domain.GrossMotor,
    description: "独自下楼",
    operationMethod: "鼓励小儿不扶扶手下楼梯, 可示范",
    passCriteria: "不扶扶手, 稳定地下楼梯三阶或以上"
  },
  {
    id: 148,
    ageMonths: 27,
    domain: Domain.FineMotor,
    description: "模仿画竖道",
    operationMethod: "主试者与小儿同向, 示范画一垂直线, 注意测查纸张放正, 鼓励小儿模仿",
    passCriteria: "小儿能画竖线, 长度>2.5cm, 所画线与垂直线的夹角应<30°"
  },
  {
    id: 149,
    ageMonths: 27,
    domain: Domain.FineMotor,
    description: "对拉锁",
    operationMethod: "出示打开的拉锁, 示范将拉锁对好, 鼓励小儿照样做",
    passCriteria: "小儿能将拉锁头部分或全部插进锁孔"
  },
  {
    id: 150,
    ageMonths: 27,
    domain: Domain.Adaptive,
    description: "认识大小",
    operationMethod: "主试者向小儿出示大小圆片, 请小儿把大的给妈妈或阿姨",
    passCriteria: "小儿会正确把大的给妈妈或阿姨, 三试二成"
  },
  {
    id: 151,
    ageMonths: 27,
    domain: Domain.Adaptive,
    description: "正放型板", // Note: Desc changed from '正放型板' in A.1 to '正放型板' in B.1 text, using B.1 context.
    operationMethod: "将圆、方、三角形三块积木放在与型板相应的孔旁, 主试者对小儿说\"这是小朋友的家(指型板), 请帮这些小朋友(指三块积木)找到自己的家\", 不示范。放置三角型积木方向要与型板一致",
    passCriteria: "小儿能一次性正确放入相应孔内, 仅等腰三角形可提示"
  },
  {
    id: 152,
    ageMonths: 27,
    domain: Domain.Language,
    description: "说7~10个字的句子",
    operationMethod: "观察或询问小儿有意识讲话的情况",
    passCriteria: "小儿能有意识地说出7~10个字的句子" // Based on item description, B.1 text doesn't explicitly state pass criteria here.
  },
  {
    id: 153,
    ageMonths: 27,
    domain: Domain.Language,
    description: "理解指令",
    operationMethod: "主试者对小儿说\"请举举你的手\"和\"请抬抬你的脚\", 可重复指令一遍, 但不能有示范的动作, 观察小儿反应",
    passCriteria: "小儿能按指令做出举手或抬脚动作"
  },
  {
    id: 154,
    ageMonths: 27,
    domain: Domain.Social,
    description: "脱单衣或裤R", // Note: R added from A.1
    operationMethod: "观察或询问小儿是否会自己脫上衣或裤子",
    passCriteria: "小儿不用帮忙, 自己脱掉单衣或单裤"
  },
  {
    id: 155,
    ageMonths: 27,
    domain: Domain.Social,
    description: "开始有是非观念",
    operationMethod: "主试者问小儿\"打人对不对?\", 观察小儿的反应或回答",
    passCriteria: "小儿摇头或说出不对"
  },
  // --- 30 Months (2.5 years) ---
  {
    id: 156,
    ageMonths: 30,
    domain: Domain.GrossMotor,
    description: "独脚站 2s",
    operationMethod: "主试者示范用独脚站立, 鼓励小儿照样做",
    passCriteria: "小儿不扶任何物体可单脚站立2s或以上"
  },
  {
    id: 157,
    ageMonths: 30,
    domain: Domain.FineMotor,
    description: "穿扣子3~5个",
    operationMethod: "主试者示范连续穿扣3~5个, 鼓励小儿照样做",
    passCriteria: "小儿能较熟练穿扣并拉过线3个或以上"
  },
  {
    id: 158,
    ageMonths: 30,
    domain: Domain.FineMotor,
    description: "模仿搭桥",
    operationMethod: "示范用下面二块, 上面一块共三块积木搭成有孔的桥, 并保留模型, 鼓励小儿照样做。主试者不得提示桥孔",
    passCriteria: "小儿能搭出有孔的桥"
  },
  {
    id: 159,
    ageMonths: 30,
    domain: Domain.Adaptive,
    description: "知道1与许多",
    operationMethod: "一块和数块积木分放两边, 请小儿指出哪边是多的, 再指另一边问\"这是几个?\"",
    passCriteria: "小儿先正确指出哪一边多, 后回答\"是1个\""
  },
  {
    id: 160,
    ageMonths: 30,
    domain: Domain.Adaptive,
    description: "倒放型板", // Note: A.1 desc is '倒放型板', B.1 desc confirms context.
    operationMethod: "在小儿正放三块积木入型板的基础上, 将型板倒转180°, 三块积木仍在原处, 主试者对小儿说\"这是小朋友的家(指型板), 请帮这些小朋友(指三块积木)找到自己的家\", 不示范",
    passCriteria: "小儿能一次性正确放入翻转后型板的相应孔内, 仅等腰三角形可提示"
  },
  {
    id: 161,
    ageMonths: 30,
    domain: Domain.Language,
    description: "说出图片10样",
    operationMethod: "出示图片, 依次指给小儿看, 鼓励其说出图片名称",
    passCriteria: "小儿能正确说出10样及以上。记录1. 北极熊2.树叶3.小鸡4. 青蛙5. 螳螂6. 猕猴桃7. 树8. 房子9. 雨伞10. 壶11. 铅笔12. 钥匙13. 打印机14.刀15. 电脑16. 管钳17.轮船18. 毛笔和砚台19. 国旗20.脚21. 嘴唇22. 步枪23. 雪花24中国结"
  },
  {
    id: 162,
    ageMonths: 30,
    domain: Domain.Language,
    description: "说自己名字",
    operationMethod: "主试者问小儿\"你叫什么名字?\"",
    passCriteria: "小儿能正确回答自己的大名"
  },
  {
    id: 163,
    ageMonths: 30,
    domain: Domain.Social,
    description: "来回倒水不洒",
    operationMethod: "在一个无把儿的杯中注入1/3杯水, 主试者示范将水倒入另一杯中, 来回各倒一次, 鼓励小儿照样做",
    passCriteria: "小儿会将水来回倒两次, 不洒水"
  },
  {
    id: 164,
    ageMonths: 30,
    domain: Domain.Social,
    description: "女孩扔果皮",
    operationMethod: "出示图片, 问小儿\"乱扔垃圾是不对的, 你看这个小女孩吃完的果皮应该扔哪儿?\", 鼓励小儿回答",
    passCriteria: "小儿能正确回答或指出应该扔垃圾筐"
  },
  // --- 33 Months ---
  {
    id: 165,
    ageMonths: 33,
    domain: Domain.GrossMotor,
    description: "立定跳远",
    operationMethod: "主试者示范跳过16开白纸(20cm宽), 鼓励小儿照样做",
    passCriteria: "小儿双足同时离地跳起跃过纸, 不得踩到纸"
  },
  {
    id: 166,
    ageMonths: 33,
    domain: Domain.FineMotor,
    description: "模仿画圆",
    operationMethod: "主试者示范画一圆形, 鼓励小儿模仿",
    passCriteria: "小儿所画圆二头相交, 为闭合圆形, 不能明显成角"
  },
  {
    id: 167,
    ageMonths: 33,
    domain: Domain.FineMotor,
    description: "拉拉锁",
    operationMethod: "出示打开的拉锁, 示范将拉锁对好并拉上, 鼓励小儿照样做",
    passCriteria: "小儿能将拉锁头全部插进锁孔, 并有拉的意识"
  },
  {
    id: 168,
    ageMonths: 33,
    domain: Domain.Adaptive,
    description: "积木搭高10块",
    operationMethod: "示范搭高二块积木, 推倒后一块一块出示积木, 鼓励小儿搭高。允许试三次",
    passCriteria: "小儿能搭高积木10块。三试一成"
  },
  {
    id: 169,
    ageMonths: 33,
    domain: Domain.Adaptive,
    description: "连续执行三个命令",
    operationMethod: "嘱小儿做三件事擦桌子、摇铃、把门打开, 可再重复命令一遍。小儿开始做后, 不能再提醒或给予暗示",
    passCriteria: "小儿会做每件事情, 没有遗忘任何一项, 但顺序可颠倒"
  },
  {
    id: 170,
    ageMonths: 33,
    domain: Domain.Language,
    description: "说出性别",
    operationMethod: "主试者问小儿性别, 若是女孩问\"你是女孩还是男孩?\"; 若是男孩问\"你是男孩还是女孩 ? \"",
    passCriteria: "小儿能正确说出自己的性别"
  },
  {
    id: 171,
    ageMonths: 33,
    domain: Domain.Language,
    description: "分清\"里\"\"外\"",
    operationMethod: "主试者将一小丸放入30毫升广口试剂瓶内问\"小丸是在瓶里? 还是在瓶外?\"",
    passCriteria: "小儿会正确说出是在里边"
  },
  {
    id: 172,
    ageMonths: 33,
    domain: Domain.Social,
    description: "会穿鞋",
    operationMethod: "主试者将小儿鞋脱下, 鞋尖对着小儿, 鼓励其穿上",
    passCriteria: "小儿会穿进鞋并将鞋提上, 不要求分左右"
  },
  {
    id: 173,
    ageMonths: 33,
    domain: Domain.Social,
    description: "解扣子",
    operationMethod: "出示娃娃, 鼓励小儿解扣子, 主试者应辅助小儿固定娃娃衣服",
    passCriteria: "小儿会自己解开某一个扣子"
  },
  // --- 36 Months (3 years) ---
  {
    id: 174,
    ageMonths: 36,
    domain: Domain.GrossMotor,
    description: "双脚交替跳",
    operationMethod: "主试者示范以高抬腿姿势原地交替跳起, 鼓励小儿照样做",
    passCriteria: "小儿可双足交替跳起, 双脚离地5cm"
  },
  {
    id: 175,
    ageMonths: 36,
    domain: Domain.FineMotor,
    description: "模仿画交叉线",
    operationMethod: "主试者与小儿同向示范画交叉线, 鼓励小儿模仿",
    passCriteria: "小儿能画出两直线并相交成角, 直线线条较连续"
  },
  {
    id: 176,
    ageMonths: 36,
    domain: Domain.FineMotor,
    description: "会拧螺丝",
    operationMethod: "主试者出示螺丝、螺母, 嘱其拧上。如小儿不会, 可示范",
    passCriteria: "小儿能双手配合将螺丝、螺母组装起来"
  },
  {
    id: 177,
    ageMonths: 36,
    domain: Domain.Adaptive,
    description: "懂得\"3\"",
    operationMethod: "主试者出示三块积木, 问小儿\"这是几块?\"",
    passCriteria: "小儿能正确说出\"三块\""
  },
  {
    id: 178,
    ageMonths: 36,
    domain: Domain.Adaptive,
    description: "认识两种颜色",
    operationMethod: "出示红、黄、蓝、绿四色图片, 先从非红色开始问, 避免顺口溜出, 请小儿说出各为何种颜色",
    passCriteria: "能正确说出两种或以上颜色"
  },
  {
    id: 179,
    ageMonths: 36,
    domain: Domain.Language,
    description: "说出图片14样",
    operationMethod: "出示图片, 依次指给小儿看, 鼓励其说出图片名称",
    passCriteria: "小儿能正确说出14样及以上。记录1. 北极熊2. 树叶3. 小鸡4. 青蛙5. 螳螂6. 猕猴桃7. 树8. 房子9. 雨伞10. 壶11. 铅笔12. 钥匙13.打印机14.刀15. 电脑16. 管钳17.轮船18. 毛笔和砚台19. 国旗20. 脚21. 嘴唇22. 步枪23.雪花24中国结"
  },
  {
    id: 180,
    ageMonths: 36,
    domain: Domain.Language,
    description: "发音基本清楚",
    operationMethod: "观察小儿在说话时的发音情况",
    passCriteria: "小儿会发清楚大多数语音, 不影响交流"
  },
  {
    id: 181,
    ageMonths: 36,
    domain: Domain.Social,
    description: "懂得\"饿了、冷了、累了\"",
    operationMethod: "主试者依次问\"饿了怎么办?冷了怎么办?累了怎么办?\"",
    passCriteria: "小儿能正确回答两问或以上  吃饭、穿衣、休息等"
  },
  {
    id: 182,
    ageMonths: 36,
    domain: Domain.Social,
    description: "扣扣子",
    operationMethod: "出示娃娃, 鼓励小儿扣扣子, 主试者应辅助小儿固定娃娃衣服",
    passCriteria: "小儿能自己扣上娃娃的某一个扣子"
  },
  // --- 42 Months (3.5 years) ---
  {
    id: 183,
    ageMonths: 42,
    domain: Domain.GrossMotor,
    description: "交替上楼",
    operationMethod: "主试者示范不扶扶手, 双足交替上楼, 鼓励小儿照样做",
    passCriteria: "小儿上台阶交替用脚, 一步一台阶, 可交替上楼三阶或以上"
  },
  {
    id: 184,
    ageMonths: 42,
    domain: Domain.GrossMotor,
    description: "并足从楼梯末级跳下",
    operationMethod: "主试者示范站在楼梯末级, 双足并拢跳至地面, 鼓励小儿照样做",
    passCriteria: "小儿双足并拢跳至地面, 双足落地后两脚间距离小于10cm"
  },
  {
    id: 185,
    ageMonths: 42,
    domain: Domain.FineMotor,
    description: "拼圆形、正方形",
    operationMethod: "主试者让小儿用4块塑料板拼圆形, 用2块等边三角形板拼正方形, 共限时2min",
    passCriteria: "两个图形均要拼对"
  },
  {
    id: 186,
    ageMonths: 42,
    domain: Domain.FineMotor,
    description: "会用剪刀",
    operationMethod: "主试者示范用打印纸剪一直线, 鼓励小儿照样做",
    passCriteria: "小儿能够剪出直线, 长度大于10cm, 与主剪方向角度小于15°"
  },
  {
    id: 187,
    ageMonths: 42,
    domain: Domain.Adaptive,
    description: "懂得\"5\"",
    operationMethod: "主试者出示五块积木, 问小儿\"这是几块?\"",
    passCriteria: "小儿能正确说出\"五块\""
  },
  {
    id: 188,
    ageMonths: 42,
    domain: Domain.Adaptive,
    description: "认识四种颜色",
    operationMethod: "主试者出示红、黄、蓝、绿四色图片, 先从非红色开始问, 避免顺口溜出, 请小儿说出各为何种颜色",
    passCriteria: "四种颜色全部答对"
  },
  {
    id: 189,
    ageMonths: 42,
    domain: Domain.Language,
    description: "会说反义词",
    operationMethod: "主试者分别问(1)火是热的, 冰呢? (2)大象的鼻子是长的, 小兔的尾巴呢? (3)头发是黑的, 牙齿呢? (4)木头是硬的, 棉花呢?",
    passCriteria: "四题中答对两个或以上"
  },
  {
    id: 190,
    ageMonths: 42,
    domain: Domain.Language,
    description: "说出图形(△○□)",
    operationMethod: "主试者依次出示积木△○□, 问小儿\"这是什么形状?\"",
    passCriteria: "小儿能正确回答三个图形的名称"
  },
  {
    id: 191,
    ageMonths: 42,
    domain: Domain.Social,
    description: "会穿上衣R", // Note: R added from A.1
    operationMethod: "观察小儿是否会穿上衣",
    passCriteria: "小儿无需大人帮忙, 会穿上衣并将扣子扣好或拉锁拉好"
  },
  {
    id: 192,
    ageMonths: 42,
    domain: Domain.Social,
    description: "吃饭之前为什么要洗手?",
    operationMethod: "主试者问小儿\"吃饭之前为什么要洗手?\"",
    passCriteria: "小儿能回答出原因\"为避免生病\"等"
  },
  // --- 48 Months (4 years) ---
  {
    id: 193,
    ageMonths: 48,
    domain: Domain.GrossMotor,
    description: "独脚站5s",
    operationMethod: "主试者示范用独脚站立, 鼓励小儿照样做",
    passCriteria: "小儿独脚站立5s或以上, 身体稳定"
  },
  {
    id: 194,
    ageMonths: 48,
    domain: Domain.GrossMotor,
    description: "并足从楼梯末级跳下稳",
    operationMethod: "主试者示范站在楼梯末级, 双足并拢跳至地面, 鼓励小儿照样做",
    passCriteria: "小儿双足并拢跳至地面, 双足落地后两脚间距离小于5cm, 并站稳"
  },
  {
    id: 195,
    ageMonths: 48,
    domain: Domain.FineMotor,
    description: "模仿画方形",
    operationMethod: "主试者示范画一正方形, 鼓励小儿模仿",
    passCriteria: "小儿能基本模仿画出, 所画图形允许稍有倾斜, 有一个角可以<45°"
  },
  {
    id: 196,
    ageMonths: 48,
    domain: Domain.FineMotor,
    description: "照图组装螺丝",
    operationMethod: "主试者出示组装好的螺丝图片5s后收起, 将分开的螺丝、平垫和螺母交给小儿, 请小儿凭记忆组装。主试者可针对落下的零件提示\"还有呢?\"",
    passCriteria: "小儿无需提示或稍经提示后自行将螺丝、平垫、螺母按顺序组装起来"
  },
  {
    id: 197,
    ageMonths: 48,
    domain: Domain.Adaptive,
    description: "找不同(3个)",
    operationMethod: "出示找不同图画, 主试者问小儿两张图画有什么不同之处? 小熊示教, 限时2min",
    passCriteria: "能找到包括示教内容的3处不同或以上"
  },
  {
    id: 198,
    ageMonths: 48,
    domain: Domain.Adaptive,
    description: "图画补缺(3/6)",
    operationMethod: "出示补缺图片, 主试者问小儿各图中缺什么? 第一幅图示教",
    passCriteria: "要求说对包括示教内容的三幅图或以上"
  },
  {
    id: 199,
    ageMonths: 48,
    domain: Domain.Language,
    description: "模仿说复合句",
    operationMethod: "主试者说一句话\"妈妈叫我一定不要和小朋友打架\", 可重复一遍, 鼓励小儿复述",
    passCriteria: "小儿能够复述较完整的复合句, 偶尔漏字/错字"
  },
  {
    id: 200,
    ageMonths: 48,
    domain: Domain.Language,
    description: "锅、手机、眼睛的用途",
    operationMethod: "主试者问(1)锅是做什么用的? (2)手机是干什么用的? (3)眼睛有什么作用?",
    passCriteria: "三问均正确。"
  },
  {
    id: 201,
    ageMonths: 48,
    domain: Domain.Social,
    description: "会做集体游戏R", // Note: R added from A.1
    operationMethod: "观察或询问小儿能否做集体游戏",
    passCriteria: "小儿能主动参加集体游戏, 并能遵守游戏规则"
  },
  {
    id: 202,
    ageMonths: 48,
    domain: Domain.Social,
    description: "分辨男女厕所",
    operationMethod: "出示男女厕所标识图片, 问小儿应该进哪个厕所, 并提问\"为什么\"",
    passCriteria: "小儿能正确识别标志并用语言表达出性别意义"
  },
  // --- 54 Months (4.5 years) ---
  {
    id: 203,
    ageMonths: 54,
    domain: Domain.GrossMotor,
    description: "独脚站 10s",
    operationMethod: "主试者示范用独脚站立, 鼓励小儿照样做",
    passCriteria: "小儿独脚站立10s或以上, 身体稳定"
  },
  {
    id: 204,
    ageMonths: 54,
    domain: Domain.GrossMotor,
    description: "足尖对足跟向前走2m",
    operationMethod: "主试者示范, 脚跟对脚尖向前走直线, 鼓励小儿照样做",
    passCriteria: "小儿能脚跟对脚尖向前走2m(六步), 允许身体有小幅晃动"
  },
  {
    id: 205,
    ageMonths: 54,
    domain: Domain.FineMotor,
    description: "折纸边角整齐",
    operationMethod: "主试者示范用一长方形纸横竖对齐各折一次, 鼓励小儿照样做",
    passCriteria: "小儿折纸基本成长方形, 折纸边差距<1cm, 纸边夹角<15°"
  },
  {
    id: 206,
    ageMonths: 54,
    domain: Domain.FineMotor,
    description: "筷子夹花生米",
    operationMethod: "主试者鼓励小儿用筷子夹花生米, 从桌子上夹到盒子里, 连做三遍",
    passCriteria: "小儿熟练地夹起三次以上, 过程中无掉落"
  },
  {
    id: 207,
    ageMonths: 54,
    domain: Domain.Adaptive,
    description: "类同",
    operationMethod: "主试者给小儿一个圆形扣子, 然后出示第一组模板(包括圆型、方型、三角型), 问\"你手里的东西和我这些东西哪些是一类的? 为什么?\", 然后收起, 再出示第二组模版(包括方型钮扣、三角型、方型), 提问同上",
    passCriteria: "两问均答对"
  },
  {
    id: 208,
    ageMonths: 54,
    domain: Domain.Adaptive,
    description: "图画补缺(4/6)",
    operationMethod: "出示补缺图片, 主试者问小儿各图中缺什么? 第一幅图示教",
    passCriteria: "要求说对包括示教內容的四幅图或以上" // Typo '內容' corrected to '内容'
  },
  {
    id: 209,
    ageMonths: 54,
    domain: Domain.Language,
    description: "会漱口",
    operationMethod: "观察小儿是否会漱口",
    passCriteria: "小儿能灵活左右漱口并将水吐出"
  },
  {
    id: 210,
    ageMonths: 54,
    domain: Domain.Language,
    description: "会认识数字",
    operationMethod: "主试者出示图片, 随意指出10以内数字, 让小儿认",
    passCriteria: "小儿全部正确答出"
  },
  {
    id: 211,
    ageMonths: 54,
    domain: Domain.Social,
    description: "懂得上午、下午",
    operationMethod: "如在上午测试, 主试者问(1)现在是上午还是下午? (2)太阳落山是在下午还是上午? 如在下午测试, 则主试者问(1)现在是下午还是上午? (2)太阳升起是在上午还是下午?",
    passCriteria: "两问均回答正确"
  },
  {
    id: 212,
    ageMonths: 54,
    domain: Domain.Social,
    description: "数手指",
    operationMethod: "主试者问小儿一只手有几个手指, 如答对, 再问两只手有几个手指",
    passCriteria: "小儿会心算出两手有十个手指"
  },
  // --- 60 Months (5 years) ---
  {
    id: 213,
    ageMonths: 60,
    domain: Domain.GrossMotor,
    description: "单脚跳",
    operationMethod: "主试者示范原地单脚跳, 鼓励小儿照样做",
    passCriteria: "小儿能单脚连续跳3次或以上, 可伸开双臂保持平衡, 允许小儿在一脚范围内跳动"
  },
  {
    id: 214,
    ageMonths: 60,
    domain: Domain.GrossMotor,
    description: "踩踏板",
    operationMethod: "主试者示范在一级台阶上以同一只脚上下台阶, 鼓励小儿照样做",
    passCriteria: "小儿以同一只脚能稳当并较熟练地完成3组, 可稍有停顿"
  },
  {
    id: 215,
    ageMonths: 60,
    domain: Domain.FineMotor,
    description: "照图拼椭圆形",
    operationMethod: "将事先画好的椭圆形放在小儿面前, 嘱其将6块塑料片按图分别放进去, 不予提醒, 限时2min",
    passCriteria: "小儿全部拼对"
  },
  {
    id: 216,
    ageMonths: 60,
    domain: Domain.FineMotor,
    description: "试剪圆形",
    operationMethod: "主试者给小儿出示一张已画好圆形(直径7.5cm)的1/2 A4打印纸, 鼓励小儿将圆形剪下(附原图)", // Diameter info differs slightly in B.1 text, used B.1's value.
    passCriteria: "小儿能剪出大致圆形, 允许出角"
  },
  {
    id: 217,
    ageMonths: 60,
    domain: Domain.Adaptive,
    description: "找不同(5个)",
    operationMethod: "出示找不同图画, 主试者问小儿两张图画有什么不同之处? 小熊示教。限时2min",
    passCriteria: "能找到包括示教內容的5处不同或以上" // Typo '內容' corrected to '内容'
  },
  {
    id: 218,
    ageMonths: 60,
    domain: Domain.Adaptive,
    description: "图画补缺(5/6)",
    operationMethod: "出示补缺图片, 主试者问小儿各图中缺什么? 第一幅图示教",
    passCriteria: "要求说对包括示教內容的五幅图或以上" // Typo '內容' corrected to '内容'
  },
  {
    id: 219,
    ageMonths: 60,
    domain: Domain.Language,
    description: "你姓什么?",
    operationMethod: "主试者问小儿\"你姓什么?\"",
    passCriteria: "小儿正确回答出姓, 连名带姓不能通过"
  },
  {
    id: 220,
    ageMonths: 60,
    domain: Domain.Language,
    description: "说出两种圆形的东西",
    operationMethod: "主试者让小儿说出两种圆形的东西",
    passCriteria: "小儿能说出两种或以上圆形的东西"
  },
  {
    id: 221,
    ageMonths: 60,
    domain: Domain.Social,
    description: "你家住哪里?",
    operationMethod: "主试者问小儿\"你家住在哪里?\", 或追问\"你再说详细些, 我怎么送你回家呢?\"",
    passCriteria: "小儿说出的住址可使他人较容易找到"
  },
  // --- 66 Months (5.5 years) ---
  {
    id: 222,
    ageMonths: 66,
    domain: Domain.GrossMotor,
    description: "接球",
    operationMethod: "主试者示范用双手而非前胸接球, 然后与小儿相距一米, 将球拍给小儿, 鼓励小儿用手接住球",
    passCriteria: "小儿用手接住球, 三次中接住一次即可, 用双臂或用前胸接球不通过"
  },
  {
    id: 223,
    ageMonths: 66,
    domain: Domain.GrossMotor,
    description: "足尖对足跟向后走2m",
    operationMethod: "主试者示范, 脚跟对脚尖向后走直线, 鼓励小儿照样做",
    passCriteria: "小儿能脚跟对脚尖向后走2m(六步), 允许身体有小幅晃动"
  },
  {
    id: 224,
    ageMonths: 66,
    domain: Domain.FineMotor,
    description: "会写自己的名字",
    operationMethod: "主试者让小儿写出自己的名字。",
    passCriteria: "小儿能正确写出自己的名字。"
  },
  {
    id: 225,
    ageMonths: 66,
    domain: Domain.FineMotor,
    description: "剪平滑圆形",
    operationMethod: "主试者给小儿出示一张已画好圆形(直径7.5cm)的1/2A4打印纸, 鼓励小儿将圆形剪下(附原图)",
    passCriteria: "小儿能剪出平滑的圆形, 无成角、毛边"
  },
  {
    id: 226,
    ageMonths: 66,
    domain: Domain.Adaptive,
    description: "树间站人",
    operationMethod: "主试者问小儿\"两棵树之间站一个人, 一排三棵树之间站几个人?\"",
    passCriteria: "小儿回答\"两个人。\""
  },
  {
    id: 227,
    ageMonths: 66,
    domain: Domain.Adaptive,
    description: "十字切苹果",
    operationMethod: "主试者问小儿\"将一个苹果十字切开是几块?\" 如小儿不理解, 主试者可用手势比划提示",
    passCriteria: "不经提示或仅在主试者手势比划提示后答\"四块\""
  },
  {
    id: 228,
    ageMonths: 66,
    domain: Domain.Language,
    description: "知道自己属相",
    operationMethod: "主试者问小儿\"你是属什么的?\"",
    passCriteria: "小儿能正确说出自己的属相"
  },
  {
    id: 229,
    ageMonths: 66,
    domain: Domain.Language,
    description: "倒数数字",
    operationMethod: "主试者先示教\"你会倒着数数吗?1、2、3倒数就是……3、2、1, 现在请你从24开始倒数, 24、23、22、21……\", 鼓励小儿完成倒数",
    passCriteria: "小儿能较流利地正确数出13~1"
  },
  {
    id: 230,
    ageMonths: 66,
    domain: Domain.Social,
    description: "为什么要走人行横道?",
    operationMethod: "主试者问小儿:\"过马路为什么要走人行横道?\"",
    passCriteria: "小儿能正确回答。为了安全, 如怕被汽车撞了等"
  },
  {
    id: 231,
    ageMonths: 66,
    domain: Domain.Social,
    description: "鸡在水中游",
    operationMethod: "出示鸡在水中游图画, 主试者问小儿画的对不对, 如回答\"不对\", 问哪里画错了",
    passCriteria: "小儿能正确回答鸡不能在水里游泳"
  },
  // --- 72 Months (6 years) ---
  {
    id: 232,
    ageMonths: 72,
    domain: Domain.GrossMotor,
    description: "抱肘连续跳",
    operationMethod: "主试者示范原地抱肘单脚跳, 鼓励小儿照样做",
    passCriteria: "小儿抱肘单脚原地连续跳3次或以上, 基本在原地跳动"
  },
  {
    id: 233,
    ageMonths: 72,
    domain: Domain.GrossMotor,
    description: "拍球(2个)",
    operationMethod: "主试者示范拍球, 鼓励小儿照样做(向下扔落地的第一下不算拍球)。允许试三次",
    passCriteria: "小儿连续拍球2个或以上"
  },
  {
    id: 234,
    ageMonths: 72,
    domain: Domain.FineMotor,
    description: "拼长方形",
    operationMethod: "主试者让小儿用2块非等边三角形板拼长方形, 出示时要求短边相对, 限时2min",
    passCriteria: "小儿拼对长方形"
  },
  {
    id: 235,
    ageMonths: 72,
    domain: Domain.FineMotor,
    description: "临摹组合图形",
    operationMethod: "主试者出示正方形和圆形的组合图形, 鼓励小儿临摹。",
    passCriteria: "小儿能画出, 无转向"
  },
  {
    id: 236,
    ageMonths: 72,
    domain: Domain.Adaptive,
    description: "找不同(7个)",
    operationMethod: "出示找不同图画, 主试者问小儿两张图画有什么不同之处? 小熊示教。限时2min",
    passCriteria: "能找到包括示教内容的7处不同或以上"
  },
  {
    id: 237,
    ageMonths: 72,
    domain: Domain.Adaptive,
    description: "知道左右",
    operationMethod: "主试者让小儿用左手摸右耳朵, 右手摸左耳朵, 右手摸右腿",
    passCriteria: "小儿全部做对"
  },
  {
    id: 238,
    ageMonths: 72,
    domain: Domain.Language,
    description: "描述图画内容",
    operationMethod: "主试者出示三幅连环画, 然后对小儿说\"这三幅图连起来讲了一个故事, 请你给我讲一讲故事的内容是什么? 小猴子为什么哭了?\", 若小儿回答第一问后不再答, 可再追问\"小猴子为什么哭了 ? \"",
    passCriteria: "能分别描述每张图画的基本内容"
  },
  {
    id: 239,
    ageMonths: 72,
    domain: Domain.Language,
    description: "上班、窗、苹果、香蕉(2/3)",
    operationMethod: "主试者问(1)人为什么要上班?—挣钱或建设国家(2)房子为什么要有窗户?—透光或通风(3)苹果和香蕉有什么共同点? —水果",
    passCriteria: "答对两题或以上。(1)挣钱或建设国家; (2)透光或通风; (3)水果"
  },
  {
    id: 240,
    ageMonths: 72,
    domain: Domain.Social,
    description: "一年有哪四个季节?",
    operationMethod: "主试者问小儿一年有哪四个季节",
    passCriteria: "春、夏、秋、冬, 顺序可以颠倒"
  },
  {
    id: 241,
    ageMonths: 72,
    domain: Domain.Social,
    description: "认识标识",
    operationMethod: "依次出示两组标识图片, 问\"哪一个是代表危险的标志? 为什么?\"",
    passCriteria: "两组图均正确指出危险的标志, 并说对理由"
  },
  // --- 78 Months (6.5 years) ---
  {
    id: 242,
    ageMonths: 78,
    domain: Domain.GrossMotor,
    description: "踢带绳的球",
    operationMethod: "主试者示范用一手提绳, 将球停稳, 以内踝及足弓内侧来踢球, 鼓励小儿照样做。如小儿用足外侧踢, 可示范更正一次姿势",
    passCriteria: "小儿连续用足内踝踢球2个或以上"
  },
  {
    id: 243,
    ageMonths: 78,
    domain: Domain.GrossMotor,
    description: "拍球(5个)",
    operationMethod: "主试者示范拍球, 鼓励小儿照样做(向下扔落地的第一下不算拍球)。允许试三次",
    passCriteria: "小儿连续拍球5个或以上"
  },
  {
    id: 244,
    ageMonths: 78,
    domain: Domain.FineMotor,
    description: "临摹六边形",
    operationMethod: "主试者出示六边形图形, 鼓励小儿临摹",
    passCriteria: "小儿可临摹出六边形, 6个角均画得好, 连接线平直"
  },
  {
    id: 245,
    ageMonths: 78,
    domain: Domain.FineMotor,
    description: "试打活结",
    operationMethod: "出示一双筷子和一根绳, 主试者示范用绳将筷子以活结方式捆上, 鼓励小儿照样做。小儿打结时主试者应辅助固定筷子",
    passCriteria: "经示范后, 小儿能用活结将筷子捆上"
  },
  {
    id: 246,
    ageMonths: 78,
    domain: Domain.Adaptive,
    description: "图形类比",
    operationMethod: "主试者出示图形, 问右边的4幅图中哪一幅放在左边空白处合适。第一题示教",
    passCriteria: "小儿能指对包括第一题在内的三道题或以上"
  },
  {
    id: 247,
    ageMonths: 78,
    domain: Domain.Adaptive,
    description: "面粉的用途",
    operationMethod: "主试者问小儿\"面粉能做哪些东西?\"",
    passCriteria: "小儿能回答两种或以上"
  },
  {
    id: 248,
    ageMonths: 78,
    domain: Domain.Language,
    description: "归纳图画主题",
    operationMethod: "主试者出示三幅连环画, 然后对小儿说\"这三幅图连起来讲了一个故事, 请你给我讲一讲故事的内容是什么? 小猴子为什么哭了?\", 若小儿回答第一问后不再答, 可再追问\"小猴子为什么哭了 ? \"",
    passCriteria: "能明确理解故事的主题"
  },
  {
    id: 249,
    ageMonths: 78,
    domain: Domain.Language,
    description: "认识钟表",
    operationMethod: "主试者请小儿看钟表图辨认时间",
    passCriteria: "小儿能辨认两张图或以上所表示的时间"
  },
  {
    id: 250,
    ageMonths: 78,
    domain: Domain.Social,
    description: "懂得星期几", // Note: A.1 description '懂得星期几', B.1 has '懂得星期几'
    operationMethod: "主试者先告诉小儿今天是星期几, 然后提问\"请告诉我后天是星期几? 明天是星期几?\"",
    passCriteria: "小儿均能正确说出"
  },
  {
    id: 251,
    ageMonths: 78,
    domain: Domain.Social,
    description: "雨中看书",
    operationMethod: "出示雨中看书图片, 主试者问小儿画的对不对, 如回答\"不对\", 问哪里画错了",
    passCriteria: "小儿能正确回答下雨了, 不能在雨里看书, 会淋湿、生病、书湿了"
  },
  // --- 84 Months (7 years) ---
  {
    id: 252,
    ageMonths: 84,
    domain: Domain.GrossMotor,
    description: "连续踢带绳的球",
    operationMethod: "主试者示范用一手提绳, 将球停稳, 以内踝及足弓内侧来踢球, 鼓励小儿照样做。如小儿用足外侧踢, 可示范更正一次姿势",
    passCriteria: "小儿用足内踝踢球3个或以上, 踢一下落地一下"
  },
  {
    id: 253,
    ageMonths: 84,
    domain: Domain.GrossMotor,
    description: "交替踩踏板",
    operationMethod: "主试者示范在一级台阶上交替换脚上下共3组(示范时主试者要边喊口号边示范), 请小儿照样做, 若小儿不会两脚交替可提醒小儿\"换脚\"",
    passCriteria: "小儿能稳当并较熟练地两脚交替完成3组, 可稍有停顿"
  },
  {
    id: 254,
    ageMonths: 84,
    domain: Domain.FineMotor,
    description: "学翻绳",
    operationMethod: "主试者示范将一根绳子做翻绳最初级模式, 鼓励小儿跟着做",
    passCriteria: "小儿能跟着主试者一步一步, 或在主试者示范后自行做到中指挑绳"
  },
  {
    id: 255,
    ageMonths: 84,
    domain: Domain.FineMotor,
    description: "打活结",
    operationMethod: "出示一双筷子和一根绳, 鼓励其用绳将筷子以活结方式捆上, 小儿打结时主试者应辅助固定筷子",
    passCriteria: "无需示范, 小儿能用活结将筷子捆上"
  },
  {
    id: 256,
    ageMonths: 84,
    domain: Domain.Adaptive,
    description: "数字类比",
    operationMethod: "主试者出示图形, 问下边的4幅图中哪一幅放在上边空白处合适。第一题示教",
    passCriteria: "小儿能指对包括第一题在内的三道题或以上"
  },
  {
    id: 257,
    ageMonths: 84,
    domain: Domain.Adaptive,
    description: "什么动物没有脚?",
    operationMethod: "主试者问小儿\"什么动物没有脚?(脚定义为走路用的)\"",
    passCriteria: "小儿回答蛇、鱼等两类或以上没有脚的动物"
  },
  {
    id: 258,
    ageMonths: 84,
    domain: Domain.Language,
    description: "为什么要进行预防接种?",
    operationMethod: "主试者问小儿\"小朋友为什么要打预防针?\"",
    passCriteria: "小儿能表达出预防生病/感冒或打预防针可以不生病等"
  },
  {
    id: 259,
    ageMonths: 84,
    domain: Domain.Language,
    description: "毛衣、裤、鞋共同点?",
    operationMethod: "主试者问小儿\"毛衣、长裤和鞋有什么共同之处?\"",
    passCriteria: "小儿回答都是穿的、能保暖"
  },
  {
    id: 260,
    ageMonths: 84,
    domain: Domain.Social,
    description: "紧急电话",
    operationMethod: "主试者分别问小儿火警、匪警(找警察帮助)、急救电话是多少?",
    passCriteria: "小儿能正确回答出两种或以上电话号码"
  },
  {
    id: 261,
    ageMonths: 84,
    domain: Domain.Social,
    description: "猫头鹰抓老鼠",
    operationMethod: "出示猫头鹰抓老鼠图片, 主试者问小儿画的对不对, 如回答\"不对\", 问哪里画错了",
    passCriteria: "小儿能正确回答猫头鹰白天睡觉, 不会在白天出来抓老鼠"
  }
];

// Example: Accessing item 1 details
// console.log(ALL_TEST_ITEMS[0]);
// Example: Accessing item 261 details
// console.log(ALL_TEST_ITEMS[260]);
// --- End Placeholder ---
