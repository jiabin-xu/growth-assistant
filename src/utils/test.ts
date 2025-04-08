import { ALL_TEST_ITEMS, AGE_GROUPS, Domain, TestItem, TestResultStatus } from "../constants/rule";
import { AssessmentState, AssessmentProgress, DomainScore, AssessmentResult } from "./types";
import { getNextDomain, DOMAIN_ORDER } from "./domain";
import { findClosestLowerAge, calculateAgeMonths } from "./age";
import { getDevelopmentStatus } from "./status";

export const initializeAssessment = (birthDate: Date, assessmentDate: Date): AssessmentState => {
  const chronologicalAgeMonths = calculateAgeMonths(birthDate, assessmentDate);
  const mainTestAgeMonths = findClosestLowerAge(chronologicalAgeMonths);
  const mainTestAgeIndex = AGE_GROUPS.indexOf(mainTestAgeMonths);


  return {
    birthDate,
    assessmentDate,
    chronologicalAgeMonths,
    mainTestAgeMonths,
    results: new Map(),
    currentDomain: Domain.GrossMotor,
    searchDirection: "backward",
    lastTestedAgeIndex: mainTestAgeIndex,
    finishedPoints: 0,
    totalPoints: DOMAIN_ORDER.length * 5
  };
};

export const getItemsForDomain = (domain: Domain, ageMonths: number): TestItem[] => {
  return ALL_TEST_ITEMS.filter(item =>
    item.domain === domain && item.ageMonths === ageMonths
  );
};

const isAgeGroupAllPass = (state: AssessmentState, domain: Domain, ageIndex: number): boolean => {
  if (ageIndex < 0 || ageIndex >= AGE_GROUPS.length) return false;

  const items = getItemsForDomain(domain, AGE_GROUPS[ageIndex]);
  return items.length > 0 && items.every(item =>
    state.results.get(item.id) === "pass"
  );
};

const isAgeGroupAllFail = (state: AssessmentState, domain: Domain, ageIndex: number): boolean => {
  if (ageIndex < 0 || ageIndex >= AGE_GROUPS.length) return false;

  const items = getItemsForDomain(domain, AGE_GROUPS[ageIndex]);
  return items.length > 0 && items.every(item =>
    state.results.get(item.id) === "fail"
  );
};

const hasFoundBasal = (state: AssessmentState, domain: Domain): boolean => {
  const currentIndex = state.lastTestedAgeIndex;

  if (currentIndex <= 0) {
    return isAgeGroupAllPass(state, domain, currentIndex);
  }
  // console.trace('currentIndex :>> ', currentIndex);
  // console.trace('AGE_GROUPS.indexOf(state.mainTestAgeMonths) :>> ', AGE_GROUPS.indexOf(state.mainTestAgeMonths));
  if (currentIndex + 1 >= AGE_GROUPS.indexOf(state.mainTestAgeMonths)) {
    return false;
  }

  const currentPassed = isAgeGroupAllPass(state, domain, currentIndex);
  const previousPassed = isAgeGroupAllPass(state, domain, currentIndex + 1);

  const result = currentPassed && previousPassed;

  if (!result) {
    // progress +1
    state.totalPoints += 1;
    console.log('totalPoints +1  hasFoundBasal:>> ', state.totalPoints);
  }
  return result;
};

const hasFoundCeiling = (state: AssessmentState, domain: Domain): boolean => {
  const currentIndex = state.lastTestedAgeIndex;
  console.log('currentIndex :>> ', currentIndex);

  if (currentIndex >= AGE_GROUPS.length - 1) {
    return isAgeGroupAllFail(state, domain, currentIndex);
  }
  // if(currentIndex)

  const currentFailed = isAgeGroupAllFail(state, domain, currentIndex);
  const nextFailed = isAgeGroupAllFail(state, domain, currentIndex + 1);

  const result = currentFailed && nextFailed;
  console.log('result :>> ', result);
  if (!result) {
    // progress +1
    state.totalPoints += 1;
    console.log('totalPoints +1  hasFoundCeiling:>> ', state.totalPoints);
  }
  return result;
};

export const isDomainComplete = (state: AssessmentState, domain: Domain): boolean => {
  if (state.searchDirection === "backward") {
    if (!hasFoundBasal(state, domain)) return false;
    return false;
  }

  return hasFoundCeiling(state, domain);
};

export const getInitialTestItems = (state: AssessmentState): TestItem[] => {
  return getItemsForDomain(state.currentDomain, state.mainTestAgeMonths);
};

export const getNextTestItems = (state: AssessmentState): TestItem[] => {
  const isComplete = isDomainComplete(state, state.currentDomain);
  // 分子+1
  state.finishedPoints += 1;

  if (isComplete) {
    const nextDomain = getNextDomain(state.currentDomain);
    if (!nextDomain) {
      return [];
    }

    state.currentDomain = nextDomain;
    state.searchDirection = "backward";
    state.lastTestedAgeIndex = AGE_GROUPS.indexOf(state.mainTestAgeMonths);
    return getItemsForDomain(nextDomain, state.mainTestAgeMonths);
  }

  let nextAgeIndex: number;
  if (state.searchDirection === "backward") {
    const foundBasal = hasFoundBasal(state, state.currentDomain);
    if (foundBasal) {
      state.searchDirection = "forward";
      nextAgeIndex = AGE_GROUPS.indexOf(state.mainTestAgeMonths) + 1;
    } else {
      nextAgeIndex = state.lastTestedAgeIndex - 1;
      if (nextAgeIndex < 0) {
        state.searchDirection = "forward";
        nextAgeIndex = AGE_GROUPS.indexOf(state.mainTestAgeMonths) + 1;
      }
    }
  } else {
    nextAgeIndex = state.lastTestedAgeIndex + 1;
    if (nextAgeIndex >= AGE_GROUPS.length) {
      return [];
    }
  }

  state.lastTestedAgeIndex = nextAgeIndex;

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

export const getProgress = (state: AssessmentState): AssessmentProgress => {
  const { finishedPoints, totalPoints } = state
  // console.log('finishedPoints :>> ', finishedPoints);
  // console.log('totalPoints :>> ', totalPoints);
  // 总进度百分比 = 当前点数 / 总可能点数 * 100
  return {
    totalProgress: (finishedPoints / totalPoints) * 100
  };
};

const calculateDomainScore = (state: AssessmentState, domain: Domain): DomainScore => {
  const domainItems = ALL_TEST_ITEMS.filter(item => item.domain === domain);
  const passedItems = domainItems.filter(item => state.results.get(item.id) === "pass");
  const failedItems = domainItems.filter(item => state.results.get(item.id) === "fail");

  const passedAges = passedItems.map(item => item.ageMonths);
  const minPassedAge = passedAges.length > 0 ? Math.min(...passedAges) : 0;

  const itemsByAge = domainItems.reduce((acc, item) => {
    const age = item.ageMonths;
    if (!acc[age]) {
      acc[age] = [];
    }
    acc[age].push(item);
    return acc;
  }, {} as Record<number, TestItem[]>);

  let mentalAge = 0;
  Object.entries(itemsByAge).forEach(([age, items]) => {
    const ageNum = Number(age);
    const passedCount = items.filter(item => state.results.get(item.id) === "pass").length;
    if (passedCount === items.length) {
      mentalAge = Math.max(mentalAge, ageNum);
    }
  });

  return {
    mentalAge,
    itemsPassed: passedItems.length,
    totalItems: domainItems.length
  };
};

export const calculateScores = (state: AssessmentState): AssessmentResult => {
  const domainMentalAges: Record<Domain, number> = {} as Record<Domain, number>;
  let totalMentalAge = 0;

  DOMAIN_ORDER.forEach(domain => {
    const score = calculateDomainScore(state, domain);
    domainMentalAges[domain] = score.mentalAge;
    totalMentalAge += score.mentalAge;
  });

  const averageMentalAge = totalMentalAge / DOMAIN_ORDER.length;
  const developmentQuotient = Math.round((averageMentalAge / state.chronologicalAgeMonths) * 100);

  const dqClassification = getDevelopmentStatus(developmentQuotient);

  console.log('dqClassification :>> ', dqClassification);
  return {
    domainMentalAges,
    totalMentalAge: averageMentalAge,
    developmentQuotient,
    dqClassification
  };
};
