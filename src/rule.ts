import { ALL_TEST_ITEMS, AGE_GROUPS, Domain, TestItem, TestResultStatus } from './constants';

// --- 类型定义 ---
export interface AssessmentState {
  birthDate: Date;
  assessmentDate: Date;
  chronologicalAgeMonths: number;
  mainTestAgeMonths: number;
  results: Map<number, TestResultStatus>;
  currentDomain: Domain;
  searchDirection: 'backward' | 'forward';  // 当前搜索方向
  lastTestedAgeIndex: number;              // 最后测试的月龄索引
}

export interface DomainScore {
  mentalAge: number;
  itemsPassed: number;
  totalItems: number;
}

export interface AssessmentResult {
  domainMentalAges: Map<Domain, number>;
  totalMentalAge: number;
  developmentQuotient: number;
  dqClassification: string;
}

// --- 工具函数 ---
export const calculateAgeMonths = (birthDate: Date, assessmentDate: Date): number => {
  const diffTime = Math.abs(assessmentDate.getTime() - birthDate.getTime());
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const ageInMonths = diffDays / 30.4375;
  return Math.round(ageInMonths * 10) / 10;
};

export const findMainTestAge = (chronoAgeMonths: number): number => {
  return AGE_GROUPS.reduce((closest, age) => {
    const currentDiff = Math.abs(chronoAgeMonths - age);
    const closestDiff = Math.abs(chronoAgeMonths - closest);
    return currentDiff < closestDiff ? age : closest;
  }, AGE_GROUPS[0]);
};

// --- 领域顺序 ---
export const DOMAIN_ORDER: Domain[] = [
  Domain.GrossMotor,
  Domain.FineMotor,
  Domain.Adaptive,
  Domain.Language,
  Domain.Social
];

// --- 核心函数 ---
export const initializeAssessment = (birthDate: Date, assessmentDate: Date): AssessmentState => {
  const chronologicalAgeMonths = calculateAgeMonths(birthDate, assessmentDate);
  const mainTestAgeMonths = findMainTestAge(chronologicalAgeMonths);
  const mainTestAgeIndex = AGE_GROUPS.indexOf(mainTestAgeMonths);

  return {
    birthDate,
    assessmentDate,
    chronologicalAgeMonths,
    mainTestAgeMonths,
    results: new Map<number, TestResultStatus>(),
    currentDomain: Domain.GrossMotor,
    searchDirection: 'backward',
    lastTestedAgeIndex: mainTestAgeIndex
  };
};

export const getItemsForDomain = (domain: Domain, ageMonths: number): TestItem[] => {
  return ALL_TEST_ITEMS.filter(item =>
    item.domain === domain && item.ageMonths === ageMonths
  );
};

// 检查某个月龄段的所有项目是否全部通过
const isAgeGroupAllPass = (state: AssessmentState, domain: Domain, ageIndex: number): boolean => {
  if (ageIndex < 0 || ageIndex >= AGE_GROUPS.length) return false;

  const items = getItemsForDomain(domain, AGE_GROUPS[ageIndex]);
  return items.length > 0 && items.every(item =>
    state.results.get(item.id) === 'pass'
  );
};

// 检查某个月龄段的所有项目是否全部失败
const isAgeGroupAllFail = (state: AssessmentState, domain: Domain, ageIndex: number): boolean => {
  if (ageIndex < 0 || ageIndex >= AGE_GROUPS.length) return false;

  const items = getItemsForDomain(domain, AGE_GROUPS[ageIndex]);
  return items.length > 0 && items.every(item =>
    state.results.get(item.id) === 'fail'
  );
};

// 检查是否找到基底
const hasFoundBasal = (state: AssessmentState, domain: Domain): boolean => {
  const currentIndex = state.lastTestedAgeIndex;
  return isAgeGroupAllPass(state, domain, currentIndex) &&
    isAgeGroupAllPass(state, domain, currentIndex - 1);
};

// 检查是否找到上限
const hasFoundCeiling = (state: AssessmentState, domain: Domain): boolean => {
  const currentIndex = state.lastTestedAgeIndex;
  return isAgeGroupAllFail(state, domain, currentIndex) &&
    isAgeGroupAllFail(state, domain, currentIndex + 1);
};

// 检查当前领域是否完成测试
export const isDomainComplete = (state: AssessmentState, domain: Domain): boolean => {
  // 如果正在向前测试，需要找到基底
  if (state.searchDirection === 'backward') {
    if (!hasFoundBasal(state, domain)) return false;
    // 找到基底后切换到向后测试
    return false;
  }

  // 如果正在向后测试，需要找到上限
  return hasFoundCeiling(state, domain);
};

export const getNextDomain = (currentDomain: Domain): Domain | null => {
  const currentIndex = DOMAIN_ORDER.indexOf(currentDomain);
  return currentIndex < DOMAIN_ORDER.length - 1 ? DOMAIN_ORDER[currentIndex + 1] : null;
};

export const getInitialTestItems = (state: AssessmentState): TestItem[] => {
  return getItemsForDomain(state.currentDomain, state.mainTestAgeMonths);
};

export const getNextTestItems = (state: AssessmentState): TestItem[] => {
  // 检查当前领域是否完成
  if (isDomainComplete(state, state.currentDomain)) {
    const nextDomain = getNextDomain(state.currentDomain);
    if (!nextDomain) return []; // 所有领域都测试完成

    // 开始新领域的测试
    state.currentDomain = nextDomain;
    state.searchDirection = 'backward';
    state.lastTestedAgeIndex = AGE_GROUPS.indexOf(state.mainTestAgeMonths);
    return getItemsForDomain(nextDomain, state.mainTestAgeMonths);
  }

  // 确定下一个要测试的月龄
  let nextAgeIndex: number;
  if (state.searchDirection === 'backward') {
    if (hasFoundBasal(state, state.currentDomain)) {
      // 找到基底，切换到向后测试
      state.searchDirection = 'forward';
      nextAgeIndex = AGE_GROUPS.indexOf(state.mainTestAgeMonths) + 1;
    } else {
      // 继续向前测试
      nextAgeIndex = state.lastTestedAgeIndex - 1;
    }
  } else {
    // 向后测试
    nextAgeIndex = state.lastTestedAgeIndex + 1;
  }

  // 更新最后测试的月龄索引
  state.lastTestedAgeIndex = nextAgeIndex;

  // 获取下一个月龄的测试项
  if (nextAgeIndex >= 0 && nextAgeIndex < AGE_GROUPS.length) {
    return getItemsForDomain(state.currentDomain, AGE_GROUPS[nextAgeIndex]);
  }

  return [];
};

export const recordResult = (
  state: AssessmentState,
  itemId: number,
  status: TestResultStatus
): AssessmentState => {
  const newResults = new Map(state.results);
  newResults.set(itemId, status);

  return {
    ...state,
    results: newResults
  };
};

const calculateDomainScore = (
  state: AssessmentState,
  domain: Domain
): DomainScore => {
  const domainItems = ALL_TEST_ITEMS.filter(item => item.domain === domain);
  const passedItems = domainItems.filter(item => state.results.get(item.id) === 'pass');

  // 简化的得分计算：每个通过的项目按其月龄计分
  const mentalAge = passedItems.reduce((sum, item) => sum + item.ageMonths, 0) /
    (passedItems.length || 1);

  return {
    mentalAge: Math.round(mentalAge * 10) / 10,
    itemsPassed: passedItems.length,
    totalItems: domainItems.length
  };
};

export const calculateScores = (state: AssessmentState): AssessmentResult => {
  const domainMentalAges = new Map<Domain, number>();
  let totalMentalAgeSum = 0;

  DOMAIN_ORDER.forEach(domain => {
    const score = calculateDomainScore(state, domain);
    domainMentalAges.set(domain, score.mentalAge);
    totalMentalAgeSum += score.mentalAge;
  });

  const totalMentalAge = Math.round((totalMentalAgeSum / DOMAIN_ORDER.length) * 10) / 10;
  const developmentQuotient = Math.round((totalMentalAge / state.chronologicalAgeMonths) * 100);

  let dqClassification = "智力发育障碍";
  if (developmentQuotient >= 130) dqClassification = "优秀";
  else if (developmentQuotient >= 110) dqClassification = "良好";
  else if (developmentQuotient >= 80) dqClassification = "中等";
  else if (developmentQuotient >= 70) dqClassification = "临界偏低";

  return {
    domainMentalAges,
    totalMentalAge,
    developmentQuotient,
    dqClassification
  };
};
