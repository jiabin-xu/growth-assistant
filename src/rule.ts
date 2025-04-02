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
  domainMentalAges: Record<Domain, number>;
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

  // 如果当前是第一个月龄组，无法继续向前测试
  if (currentIndex <= 0) {
    // 如果第一个月龄通过，则可以认为找到基底
    return isAgeGroupAllPass(state, domain, currentIndex);
  }

  if (currentIndex + 1 === AGE_GROUPS.indexOf(state.mainTestAgeMonths)) {
    return false;
  }

  // 检查当前月龄和前一个月龄是否都通过
  const currentPassed = isAgeGroupAllPass(state, domain, currentIndex);
  const previousPassed = isAgeGroupAllPass(state, domain, currentIndex + 1);

  // 如果当前月龄和前一个月龄都通过，说明找到基底
  return currentPassed && previousPassed;
};

// 检查是否找到上限
const hasFoundCeiling = (state: AssessmentState, domain: Domain): boolean => {
  const currentIndex = state.lastTestedAgeIndex;

  // 如果当前是最后一个月龄组，无法继续向后测试
  if (currentIndex >= AGE_GROUPS.length - 1) {
    // 如果最后一个月龄失败，则可以认为找到上限
    return isAgeGroupAllFail(state, domain, currentIndex);
  }

  // 检查当前月龄和后一个月龄是否都失败
  const currentFailed = isAgeGroupAllFail(state, domain, currentIndex);
  const nextFailed = isAgeGroupAllFail(state, domain, currentIndex - 1);

  // 如果当前月龄和后一个月龄都失败，说明找到上限
  return currentFailed && nextFailed;
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
  const isComplete = isDomainComplete(state, state.currentDomain);

  if (isComplete) {
    const nextDomain = getNextDomain(state.currentDomain);
    if (!nextDomain) {
      return []; // 所有领域都测试完成
    }

    // 开始新领域的测试
    state.currentDomain = nextDomain;
    state.searchDirection = 'backward';
    state.lastTestedAgeIndex = AGE_GROUPS.indexOf(state.mainTestAgeMonths);
    return getItemsForDomain(nextDomain, state.mainTestAgeMonths);
  }

  // 确定下一个要测试的月龄
  let nextAgeIndex: number;
  console.log('state :>> ', state);
  console.log("state.searchDirection :>> ", state.searchDirection);
  if (state.searchDirection === 'backward') {
    const foundBasal = hasFoundBasal(state, state.currentDomain);
    console.log("foundBasal :>> ", foundBasal);
    if (foundBasal) {
      // 找到基底，切换到向后测试
      state.searchDirection = 'forward';
      nextAgeIndex = AGE_GROUPS.indexOf(state.mainTestAgeMonths) + 1;
    } else {
      // 继续向前测试
      nextAgeIndex = state.lastTestedAgeIndex - 1;
      // 边界检查
      if (nextAgeIndex < 0) {
        // 如果已经到达最小月龄，切换到向后测试
        state.searchDirection = 'forward';
        nextAgeIndex = AGE_GROUPS.indexOf(state.mainTestAgeMonths) + 1;
      }
    }
  } else {
    // 向后测试
    nextAgeIndex = state.lastTestedAgeIndex + 1;
    // 边界检查
    if (nextAgeIndex >= AGE_GROUPS.length) {
      // 如果已经到达最大月龄，完成当前领域
      return [];
    }
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
  const failedItems = domainItems.filter(item => state.results.get(item.id) === 'fail');

  // 找到最高通过的月龄
  // 找到通过测试的最高月龄和最低月龄
  const passedAges = passedItems.map(item => item.ageMonths);
  const minPassedAge = passedAges.length > 0 ? Math.min(...passedAges) : 0;

  // 按月龄分组测试项目
  const itemsByAge = domainItems.reduce((acc, item) => {
    const age = item.ageMonths;
    if (!acc[age]) {
      acc[age] = [];
    }
    acc[age].push(item);
    return acc;
  }, {} as Record<number, typeof domainItems>);

  let totalMentalAge = 0;

  // 遍历每个月龄段的项目
  Object.entries(itemsByAge).forEach(([ageStr, items]) => {
    const age = parseInt(ageStr);
    const itemsInAge = items.length;

    // 获取该月龄段的能区总分
    let ageGroupScore = 0;
    if (age <= 12) {
      ageGroupScore = 1.0;
    } else if (age <= 36) {
      ageGroupScore = 3.0;
    } else {
      ageGroupScore = 6.0;
    }

    // 计算该月龄段的得分
    let ageScore = 0;

    // 检查是否有测试记录
    const testedItems = items.filter(item =>
      state.results.get(item.id) === 'pass' ||
      state.results.get(item.id) === 'fail'
    );

    if (testedItems.length === 0) {
      // 未测试的月龄段
      if (age <= minPassedAge) {
        // 左侧未测区域，默认得满分
        ageScore = ageGroupScore;
      }
      // 右侧未测区域默认得0分，不需要处理
    } else {
      // 已测试的月龄段
      const passedInAge = items.filter(item => state.results.get(item.id) === 'pass').length;
      // 按通过项目比例计算得分
      ageScore = (passedInAge / itemsInAge) * ageGroupScore;
    }

    // 累加到总智龄
    totalMentalAge += ageScore;
  });

  return {
    mentalAge: Math.round(totalMentalAge * 10) / 10, // 保留一位小数
    itemsPassed: passedItems.length,
    totalItems: domainItems.length
  };
};

// 获取总体进度和各领域进度
export const getProgress = (state: AssessmentState): {
  totalProgress: number;
  domainProgress: {
    [key in Domain]?: {
      tested: number;
      direction: string;
      progress: number;
    };
  };
} => {
  const domainProgress: {
    [key in Domain]?: {
      tested: number;
      direction: string;
      progress: number;
    };
  } = {};

  let totalTestedItems = 0;
  let totalExpectedItems = 0;

  DOMAIN_ORDER.forEach((domain) => {
    // 计算当前测试范围的月龄索引
    const mainTestIndex = AGE_GROUPS.indexOf(state.mainTestAgeMonths);
    let startIndex = mainTestIndex;
    let endIndex = mainTestIndex;

    // 根据当前领域的测试方向更新范围
    if (domain === state.currentDomain) {
      if (state.searchDirection === 'backward') {
        startIndex = Math.min(startIndex, state.lastTestedAgeIndex);
      } else {
        endIndex = Math.max(endIndex, state.lastTestedAgeIndex);
      }
    }

    // 获取当前测试范围内的所有项目
    const domainItems = ALL_TEST_ITEMS.filter(item =>
      item.domain === domain &&
      AGE_GROUPS.indexOf(item.ageMonths) >= startIndex &&
      AGE_GROUPS.indexOf(item.ageMonths) <= endIndex
    );

    const testedItems = domainItems.filter(item => state.results.has(item.id));

    totalTestedItems += testedItems.length;
    totalExpectedItems += domainItems.length;

    domainProgress[domain] = {
      tested: testedItems.length,
      direction: domain === state.currentDomain ? state.searchDirection : 'backward',
      progress: domainItems.length > 0 ? (testedItems.length / domainItems.length) * 100 : 0
    };
  });

  return {
    totalProgress: totalExpectedItems > 0 ? (totalTestedItems / totalExpectedItems) * 100 : 0,
    domainProgress
  };
};

export const calculateScores = (state: AssessmentState): AssessmentResult => {
  const domainMentalAges = {} as Record<Domain, number>;
  let totalMentalAgeSum = 0;

  DOMAIN_ORDER.forEach(domain => {
    const score = calculateDomainScore(state, domain);
    domainMentalAges[domain] = score.mentalAge;
    totalMentalAgeSum += score.mentalAge;
  });

  const totalMentalAge = Math.round((totalMentalAgeSum / DOMAIN_ORDER.length) * 10) / 10;
  const developmentQuotient = Math.round((totalMentalAge / state.chronologicalAgeMonths) * 100);

  let dqClassification = "智力发育障碍";
  if (developmentQuotient >= 130) dqClassification = "优秀";
  else if (developmentQuotient >= 110) dqClassification = "良好";
  else if (developmentQuotient >= 80) dqClassification = "中等";
  else if (developmentQuotient >= 70) dqClassification = "临界偏低";
  console.log('domainMentalAges :>> ', domainMentalAges);
  return {
    domainMentalAges,
    totalMentalAge,
    developmentQuotient,
    dqClassification
  };
};
