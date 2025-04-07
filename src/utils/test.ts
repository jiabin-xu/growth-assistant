import { ALL_TEST_ITEMS, AGE_GROUPS, Domain, TestItem, TestResultStatus } from "../constants/rule";
import { AssessmentState, AssessmentProgress, DomainScore, AssessmentResult } from "./types";
import { getNextDomain, DOMAIN_ORDER } from "./domain";
import { findMainTestAge, calculateAgeMonths } from "./age";
import { getDevelopmentStatus } from "./status";

export const initializeAssessment = (birthDate: Date, assessmentDate: Date): AssessmentState => {
  const chronologicalAgeMonths = calculateAgeMonths(birthDate, assessmentDate);
  const mainTestAgeMonths = findMainTestAge(chronologicalAgeMonths);
  const mainTestAgeIndex = AGE_GROUPS.indexOf(mainTestAgeMonths);

  return {
    birthDate,
    assessmentDate,
    chronologicalAgeMonths,
    mainTestAgeMonths,
    results: new Map(),
    currentDomain: Domain.GrossMotor,
    searchDirection: "backward",
    lastTestedAgeIndex: mainTestAgeIndex
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

  if (currentIndex + 1 === AGE_GROUPS.indexOf(state.mainTestAgeMonths)) {
    return false;
  }

  const currentPassed = isAgeGroupAllPass(state, domain, currentIndex);
  const previousPassed = isAgeGroupAllPass(state, domain, currentIndex + 1);

  return currentPassed && previousPassed;
};

const hasFoundCeiling = (state: AssessmentState, domain: Domain): boolean => {
  const currentIndex = state.lastTestedAgeIndex;

  if (currentIndex >= AGE_GROUPS.length - 1) {
    return isAgeGroupAllFail(state, domain, currentIndex);
  }

  const currentFailed = isAgeGroupAllFail(state, domain, currentIndex);
  const nextFailed = isAgeGroupAllFail(state, domain, currentIndex - 1);

  return currentFailed && nextFailed;
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
  const domainProgress: AssessmentProgress["domainProgress"] = {};
  let totalTested = 0;
  let totalItems = 0;

  DOMAIN_ORDER.forEach(domain => {
    const items = ALL_TEST_ITEMS.filter(item => item.domain === domain);
    const testedItems = items.filter(item => state.results.has(item.id));

    domainProgress[domain] = {
      tested: testedItems.length,
      direction: state.currentDomain === domain ? state.searchDirection : "",
      progress: (testedItems.length / items.length) * 100
    };

    totalTested += testedItems.length;
    totalItems += items.length;
  });

  return {
    totalProgress: (totalTested / totalItems) * 100,
    domainProgress
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
