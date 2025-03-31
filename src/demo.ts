// 1. Define Core Types and Enums

enum Domain {
  GrossMotor = '大运动',
  FineMotor = '精细动作',
  Language = '语言',
  Adaptive = '适应能力',
  Social = '社会行为',
}

interface TestItem {
  id: number;          // Unique ID (1-261)
  ageMonths: number;   // Age group this item belongs to (e.g., 1, 2, 12, 15, 84)
  domain: Domain;      // The developmental domain
  description: string; // Optional: Description from the table (e.g., "抱直头稳")
}

type TestResultStatus = 'pass' | 'fail' | 'not_tested';

interface TestResult {
  itemId: number;
  status: TestResultStatus;
  // timestamp?: Date; // Optional: when it was tested
}

// All defined age groups from the standard
const AGE_GROUPS: readonly number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 21, 24, 27, 30, 33, 36,
  42, 48, 54, 60, 66, 72, 78, 84
];

// --- Placeholder for ALL 261 Test Items ---
// In a real app, load this from a data source (DB, JSON file)
// Sample data included for demonstration
const ALL_TEST_ITEMS: TestItem[] = [
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

// Helper function to get items for a specific age group
function getItemsForAgeGroup(ageMonths: number): TestItem[] {
  return ALL_TEST_ITEMS.filter(item => item.ageMonths === ageMonths);
}

// Helper function to get items for a specific age group and domain
function getItemsForAgeGroupAndDomain(ageMonths: number, domain: Domain): TestItem[] {
  return ALL_TEST_ITEMS.filter(item => item.ageMonths === ageMonths && item.domain === domain);
}

// Helper to calculate chronological age in months (rounded to one decimal)
function calculateAgeMonths(birthDate: Date, assessmentDate: Date): number {
  const diffTime = Math.abs(assessmentDate.getTime() - birthDate.getTime());
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const ageInMonths = diffDays / 30.4375; // Average days per month
  return Math.round(ageInMonths * 10) / 10;
}

// 2. Core Assessment Class
class DevelopmentalAssessment {
  private birthDate: Date;
  private assessmentDate: Date;
  public chronologicalAgeMonths: number;
  public mainTestAgeMonths: number; // 主测月龄
  private results: Map<number, TestResultStatus>; // Internal state for results

  constructor(birthDate: Date, assessmentDate: Date) {
    if (assessmentDate < birthDate) {
      throw new Error("Assessment date cannot be before birth date.");
    }
    this.birthDate = birthDate;
    this.assessmentDate = assessmentDate;
    this.chronologicalAgeMonths = calculateAgeMonths(birthDate, assessmentDate);
    this.mainTestAgeMonths = this.findMainTestAge(this.chronologicalAgeMonths);
    this.results = new Map<number, TestResultStatus>();
    // Initialize all items as 'not_tested'
    ALL_TEST_ITEMS.forEach(item => this.results.set(item.id, 'not_tested'));
  }

  /**
   * Finds the closest age group in AGE_GROUPS to the chronological age.
   * Rule 4.2.2: If exactly between two, choose the lower one.
   */
  private findMainTestAge(chronoAgeMonths: number): number {
    let closestAge = AGE_GROUPS[0];
    let minDiff = Math.abs(chronoAgeMonths - closestAge);

    for (let i = 1; i < AGE_GROUPS.length; i++) {
      const currentAge = AGE_GROUPS[i];
      const diff = Math.abs(chronoAgeMonths - currentAge);

      if (diff < minDiff) {
        minDiff = diff;
        closestAge = currentAge;
      } else if (diff === minDiff) {
        // If equidistant, prefer the lower age group (which is already set)
        // No change needed here as we iterate upwards
      } else {
        // Difference is increasing, we passed the closest
        break;
      }
    }
    // Special case: if exactly halfway, e.g., chronoAge is 2.5, closest is 2 and 3. Prefer 2.
    const index = AGE_GROUPS.indexOf(closestAge);
    if (index > 0) {
      const prevAge = AGE_GROUPS[index - 1];
      const midPoint = (prevAge + closestAge) / 2;
      if (chronoAgeMonths === midPoint) {
        return prevAge; // Choose lower if exactly halfway
      }
    }


    return closestAge;
  }

  /**
   * 1. Get the initial set of test items based on rule 4.2.3.1
   * Tests the mainTestAgeMonths and 2 age groups before and 2 after.
   */
  public getInitialTestItems(): TestItem[] {
    const mainIndex = AGE_GROUPS.indexOf(this.mainTestAgeMonths);
    if (mainIndex === -1) return []; // Should not happen if mainTestAge is valid

    const indicesToTest = new Set<number>();
    for (let i = Math.max(0, mainIndex - 2); i <= Math.min(AGE_GROUPS.length - 1, mainIndex + 2); i++) {
      indicesToTest.add(i);
    }

    const initialItems: TestItem[] = [];
    indicesToTest.forEach(index => {
      initialItems.push(...getItemsForAgeGroup(AGE_GROUPS[index]));
    });

    return initialItems;
  }

  /**
   * Records the result for a specific test item.
   */
  public recordResult(itemId: number, status: TestResultStatus): void {
    if (this.results.has(itemId)) {
      this.results.set(itemId, status);
    } else {
      console.warn(`Item ID ${itemId} not found in the assessment scale.`);
    }
  }

  /**
   * Gets the current result status for an item.
   */
  public getResult(itemId: number): TestResultStatus | undefined {
    return this.results.get(itemId);
  }

  /**
   * 4. Calculate the next items to test based on 4.2.3 rules and current results.
   */
  public getNextTestItems(): TestItem[] {
    const nextItems = new Map<number, TestItem>(); // Use Map to avoid duplicates
    const mainIndex = AGE_GROUPS.indexOf(this.mainTestAgeMonths);

    // Check if initial 5 age groups are fully tested. If not, return missing ones.
    const initialAgesIndices = new Set<number>();
    for (let i = Math.max(0, mainIndex - 2); i <= Math.min(AGE_GROUPS.length - 1, mainIndex + 2); i++) {
      initialAgesIndices.add(i);
    }
    const initialUntested: TestItem[] = [];
    initialAgesIndices.forEach(index => {
      const age = AGE_GROUPS[index];
      getItemsForAgeGroup(age).forEach(item => {
        if (this.results.get(item.id) === 'not_tested') {
          initialUntested.push(item);
        }
      });
    });
    // If any items from the initial 5 groups are still untested, prioritize them
    if (initialUntested.length > 0) {
      initialUntested.forEach(item => nextItems.set(item.id, item));
      return Array.from(nextItems.values());
    }


    // If initial tests are done, apply forward/backward rules per domain
    for (const domain of Object.values(Domain)) {
      // Backward Check (Rule 4.2.3.2)
      let continueBackward = true;
      let currentIndex = mainIndex - 1;
      while (continueBackward && currentIndex >= 0) {
        const age1 = AGE_GROUPS[currentIndex];
        const status1 = this.checkAgeGroupStatus(age1, domain);

        const age2 = (currentIndex - 1 >= 0) ? AGE_GROUPS[currentIndex - 1] : null;
        const status2 = age2 !== null ? this.checkAgeGroupStatus(age2, domain) : 'all_pass'; // Assume pass if at boundary

        if (status1 === 'all_pass' && status2 === 'all_pass') {
          continueBackward = false; // Stop backward search for this domain
        } else if (status1 === 'not_fully_tested' || status2 === 'not_fully_tested') {
          // This case should be handled by the initial check, but as fallback:
          if (status1 === 'not_fully_tested') {
            getItemsForAgeGroupAndDomain(age1, domain)
              .filter(item => this.results.get(item.id) === 'not_tested')
              .forEach(item => nextItems.set(item.id, item));
          }
          if (age2 && status2 === 'not_fully_tested') {
            getItemsForAgeGroupAndDomain(age2, domain)
              .filter(item => this.results.get(item.id) === 'not_tested')
              .forEach(item => nextItems.set(item.id, item));
          }
          continueBackward = false; // Stop and test these missing ones
        }
        else {
          // At least one failure in the last two preceding groups. Need to test the *next* older group.
          const nextBackwardIndex = currentIndex - 1; // Test the group before the current two
          if (nextBackwardIndex >= 0) {
            const nextBackwardAge = AGE_GROUPS[nextBackwardIndex];
            // Only add if *any* item in that group is untested
            const itemsToAdd = getItemsForAgeGroupAndDomain(nextBackwardAge, domain)
              .filter(item => this.results.get(item.id) === 'not_tested');
            if (itemsToAdd.length > 0) {
              itemsToAdd.forEach(item => nextItems.set(item.id, item));
            } else {
              // This age group is already fully tested, but didn't trigger stop condition? Continue checking further back.
            }

          } else {
            continueBackward = false; // Reached the beginning
          }
          currentIndex--; // Move to check the next pair backward
        }
        // Only decrement if we didn't find items to add and didn't stop
        if (continueBackward) {
          // If we stopped due to 'all_pass', don't decrement further back than needed
          // If we found items to add, we should stop backward search for now
          // Decrement only if neither condition is met (e.g., one passed, one failed -> need to go further back)
        }


      }


      // Forward Check (Rule 4.2.3.3)
      let continueForward = true;
      currentIndex = mainIndex + 1;
      while (continueForward && currentIndex < AGE_GROUPS.length) {
        const age1 = AGE_GROUPS[currentIndex];
        const status1 = this.checkAgeGroupStatus(age1, domain);

        const age2 = (currentIndex + 1 < AGE_GROUPS.length) ? AGE_GROUPS[currentIndex + 1] : null;
        const status2 = age2 !== null ? this.checkAgeGroupStatus(age2, domain) : 'all_fail'; // Assume fail if at boundary

        if (status1 === 'all_fail' && status2 === 'all_fail') {
          continueForward = false; // Stop forward search for this domain
        } else if (status1 === 'not_fully_tested' || status2 === 'not_fully_tested') {
          // Prioritize testing incomplete groups within the initial range (handled above)
          // If outside initial range and found untested, test them
          if (status1 === 'not_fully_tested') {
            getItemsForAgeGroupAndDomain(age1, domain)
              .filter(item => this.results.get(item.id) === 'not_tested')
              .forEach(item => nextItems.set(item.id, item));
          }
          if (age2 && status2 === 'not_fully_tested') {
            getItemsForAgeGroupAndDomain(age2, domain)
              .filter(item => this.results.get(item.id) === 'not_tested')
              .forEach(item => nextItems.set(item.id, item));
          }
          continueForward = false; // Stop and test these missing ones
        }
        else {
          // At least one pass in the last two succeeding groups. Need to test the *next* younger group.
          const nextForwardIndex = currentIndex + 1;
          if (nextForwardIndex < AGE_GROUPS.length) {
            const nextForwardAge = AGE_GROUPS[nextForwardIndex];
            const itemsToAdd = getItemsForAgeGroupAndDomain(nextForwardAge, domain)
              .filter(item => this.results.get(item.id) === 'not_tested');
            if (itemsToAdd.length > 0) {
              itemsToAdd.forEach(item => nextItems.set(item.id, item));
            } else {
              // Already tested, continue forward
            }
          } else {
            continueForward = false; // Reached the end
          }
          currentIndex++; // Move forward
        }
        // Only increment if we didn't find items to add and didn't stop
        if (continueForward) {
          // Increment only if we didn't stop due to 'all_fail' and didn't find new items to test
        }
      }
    }

    return Array.from(nextItems.values());
  }


  /** Helper to check the pass/fail status of all items in an age group for a specific domain */
  private checkAgeGroupStatus(ageMonths: number, domain: Domain): 'all_pass' | 'all_fail' | 'mixed' | 'not_fully_tested' {
    const items = getItemsForAgeGroupAndDomain(ageMonths, domain);
    if (items.length === 0) return 'all_pass'; // Or 'all_fail'? Define behavior for empty group. Let's treat as pass for basal, fail for ceiling.

    let passes = 0;
    let fails = 0;
    let notTested = 0;

    for (const item of items) {
      const status = this.results.get(item.id);
      if (status === 'pass') {
        passes++;
      } else if (status === 'fail') {
        fails++;
      } else {
        notTested++;
      }
    }

    if (notTested > 0) return 'not_fully_tested';
    if (fails === 0) return 'all_pass';
    if (passes === 0) return 'all_fail';
    return 'mixed';
  }

  /**
   * 5. Calculate developmental scores based on rules 4.4.1 and 4.4.2
   */
  public calculateScores(): {
    domainMentalAges: Map<Domain, number>;
    totalMentalAge: number;
    developmentQuotient: number;
    dqClassification: string;
  } {
    const domainMentalAges = new Map<Domain, number>();
    let totalMentalAgeSum = 0;

    for (const domain of Object.values(Domain)) {
      let basalAgeMonths = 0;
      let domainScore = 0;

      // Find Basal Age (Highest age group where ALL items passed) - Rule 4.4.2.1
      // Check backwards from mainTestAgeMonths initially, then cover all
      let basalFound = false;
      for (let i = AGE_GROUPS.length - 1; i >= 0; i--) {
        const age = AGE_GROUPS[i];
        const status = this.checkAgeGroupStatus(age, domain);
        if (status === 'all_pass') {
          basalAgeMonths = age; // The highest fully passed age group
          basalFound = true;
          break;
        }
      }

      // Calculate score contribution from basal age and all preceding ages
      if (basalFound) {
        const basalIndex = AGE_GROUPS.indexOf(basalAgeMonths);
        for (let i = 0; i <= basalIndex; i++) {
          const age = AGE_GROUPS[i];
          const { totalPoints } = this.getScorePointsForAgeGroup(age);
          // Assume all items passed up to and including basal age
          domainScore += totalPoints;
        }
      }


      // Add scores for items passed *above* the basal age
      const basalIndex = basalFound ? AGE_GROUPS.indexOf(basalAgeMonths) : -1;
      for (let i = basalIndex + 1; i < AGE_GROUPS.length; i++) {
        const age = AGE_GROUPS[i];
        const { pointsPerItem } = this.getScorePointsForAgeGroup(age);
        const itemsInGroup = getItemsForAgeGroupAndDomain(age, domain);

        for (const item of itemsInGroup) {
          if (this.results.get(item.id) === 'pass') {
            domainScore += pointsPerItem;
          }
        }
      }

      // Round domain score (mental age in months) to one decimal place
      const roundedDomainScore = Math.round(domainScore * 10) / 10;
      domainMentalAges.set(domain, roundedDomainScore);
      totalMentalAgeSum += roundedDomainScore;
    }

    // Calculate Total Mental Age (average of domains, rounded) - Rule 4.4.2.2
    const totalMentalAge = Math.round((totalMentalAgeSum / Object.keys(Domain).length) * 10) / 10;

    // Calculate Development Quotient (DQ) - Rule 2.3
    const developmentQuotient = this.chronologicalAgeMonths > 0
      ? Math.round((totalMentalAge / this.chronologicalAgeMonths) * 100)
      : 0; // Avoid division by zero

    // Classify DQ based on Rule 5
    let dqClassification = "智力发育障碍"; // < 70
    if (developmentQuotient >= 130) {
      dqClassification = "优秀";
    } else if (developmentQuotient >= 110) {
      dqClassification = "良好";
    } else if (developmentQuotient >= 80) {
      dqClassification = "中等";
    } else if (developmentQuotient >= 70) {
      dqClassification = "临界偏低";
    }


    return {
      domainMentalAges,
      totalMentalAge,
      developmentQuotient,
      dqClassification
    };
  }

  /** Helper to get scoring points based on age group (Rule 4.4.1) */
  private getScorePointsForAgeGroup(ageMonths: number): { totalPoints: number; pointsPerItem: number } {
    let totalPoints = 0;
    if (ageMonths >= 1 && ageMonths <= 12) {
      totalPoints = 1.0;
    } else if (ageMonths >= 15 && ageMonths <= 36) {
      totalPoints = 3.0;
    } else if (ageMonths >= 42 && ageMonths <= 84) {
      totalPoints = 6.0;
    }

    // Need to know how many items are in THIS age group for ANY domain to divide points?
    // Reread 4.4.1: "每个能区 X 分... 若有两个测查项目则各为 X/2 分"
    // This implies the division is based on items *within that domain* for that age group.
    // Let's recalculate pointsPerItem based on items per domain per age.
    // This function needs the domain context, or the calculation needs to happen inside calculateScores loop.

    // ***Revised approach: Calculate pointsPerItem within the calculateScores loop ***
    // This function will just return the *Total* score value for passing the month.
    return { totalPoints, pointsPerItem: 0 }; // pointsPerItem will be calculated contextually
  }

  /** Revised scoring calculation inside calculateScores incorporating points per item */
  public calculateScoresRevised(): {
    domainMentalAges: Map<Domain, number>;
    totalMentalAge: number;
    developmentQuotient: number;
    dqClassification: string;
  } {
    const domainMentalAges = new Map<Domain, number>();
    let totalMentalAgeSum = 0;

    for (const domain of Object.values(Domain)) {
      let basalAgeMonthsValue = 0; // The score value corresponding to the basal age
      let highestConsecutivePassAge = 0;
      let domainScore = 0;

      // Find Highest Consecutive Pass Age Group (Basal Age)
      let lastPassedAgeIndex = -1;
      for (let i = 0; i < AGE_GROUPS.length; i++) {
        const age = AGE_GROUPS[i];
        const status = this.checkAgeGroupStatus(age, domain);
        if (status === 'all_pass') {
          lastPassedAgeIndex = i;
        } else {
          // Stop checking for consecutive passes once a non-'all_pass' is found
          // However, need to check ALL groups to establish the true basal
          // Let's stick to the previous basal finding method (highest all_pass anywhere)
        }
      }

      // Recalculate Basal Finding: Highest age group where ALL items passed
      let basalIndex = -1;
      for (let i = AGE_GROUPS.length - 1; i >= 0; i--) {
        const age = AGE_GROUPS[i];
        if (this.checkAgeGroupStatus(age, domain) === 'all_pass') {
          basalIndex = i;
          break;
        }
      }

      // Calculate score for basal age and all preceding age groups
      if (basalIndex !== -1) {
        for (let i = 0; i <= basalIndex; i++) {
          const age = AGE_GROUPS[i];
          const { totalPoints } = this.getScorePointsForAgeGroup(age);
          domainScore += totalPoints; // Add the full value for this month
        }
      }


      // Add scores for items passed *above* the basal age index
      for (let i = basalIndex + 1; i < AGE_GROUPS.length; i++) {
        const age = AGE_GROUPS[i];
        const itemsInGroupDomain = getItemsForAgeGroupAndDomain(age, domain);
        const numItems = itemsInGroupDomain.length;
        if (numItems === 0) continue; // Skip if no items for this domain/age

        const { totalPoints } = this.getScorePointsForAgeGroup(age);
        const pointsPerItem = totalPoints / numItems; // Score per item for this specific domain/age

        for (const item of itemsInGroupDomain) {
          if (this.results.get(item.id) === 'pass') {
            domainScore += pointsPerItem;
          }
        }
      }

      // Round domain score (mental age in months) to one decimal place
      const roundedDomainScore = Math.round(domainScore * 10) / 10;
      domainMentalAges.set(domain, roundedDomainScore);
      totalMentalAgeSum += roundedDomainScore;
    }

    // Calculate Total Mental Age (average of domains, rounded) - Rule 4.4.2.2
    const totalMentalAge = Math.round((totalMentalAgeSum / Object.keys(Domain).length) * 10) / 10;

    // Calculate Development Quotient (DQ) - Rule 2.3
    const developmentQuotient = this.chronologicalAgeMonths > 0
      ? Math.round((totalMentalAge / this.chronologicalAgeMonths) * 100)
      : 0; // Avoid division by zero

    // Classify DQ based on Rule 5
    let dqClassification = "智力发育障碍"; // < 70
    if (developmentQuotient >= 130) {
      dqClassification = "优秀";
    } else if (developmentQuotient >= 110) {
      dqClassification = "良好";
    } else if (developmentQuotient >= 80) {
      dqClassification = "中等";
    } else if (developmentQuotient >= 70) {
      dqClassification = "临界偏低";
    }

    return {
      domainMentalAges,
      totalMentalAge,
      developmentQuotient,
      dqClassification
    };
  }


}

// --- Example Usage ---

const birthDate = new Date('2022-01-15');
const assessmentDate = new Date('2022-07-20'); // Approx 6 months old

try {
  const assessment = new DevelopmentalAssessment(birthDate, assessmentDate);

  console.log(`Chronological Age: ${assessment.chronologicalAgeMonths} months`);
  console.log(`Main Test Age (主测月龄): ${assessment.mainTestAgeMonths} months`);

  // 1. Get Initial Items
  const initialItems = assessment.getInitialTestItems();
  console.log("\nInitial Test Items IDs:", initialItems.map(item => item.id));
  // Simulate testing some initial items... Assume testing for 4, 5, 6, 7, 8 months
  // Example: Assume child passes all 4, 5, 6 month items, fails some 7 month, passes some 8 month
  getItemsForAgeGroup(4).forEach(item => assessment.recordResult(item.id, 'pass'));
  getItemsForAgeGroup(5).forEach(item => assessment.recordResult(item.id, 'pass'));
  getItemsForAgeGroup(6).forEach(item => assessment.recordResult(item.id, 'pass'));
  // Let's assume item 59 (GrossMotor, 7m) is failed, others passed
  getItemsForAgeGroup(7).forEach(item => assessment.recordResult(item.id, item.id === 59 ? 'fail' : 'pass'));
  // Let's assume item 68 (GrossMotor, 8m) is passed, item 70 (FineMotor) failed, others passed
  getItemsForAgeGroup(8).forEach(item => assessment.recordResult(item.id, item.id === 70 ? 'fail' : 'pass'));


  // 2. Get Next Items
  let nextItems = assessment.getNextTestItems();
  console.log("\nNext Test Items IDs (after initial):", nextItems.map(item => item.id));
  // Expected: Based on fails/passes in 7/8 months, rules 4.2.3.2/4.2.3.3 apply
  // Backward: 6m and 5m passed -> Stop backward check.
  // Forward: 7m has a fail, 8m has a fail/pass mix. Neither are 'all_fail'. Need to test 9m.
  // Expect items from 9 month age group.

  // Simulate testing 9m items
  if (nextItems.length > 0) {
    console.log("\n--- Simulating Testing Next Batch ---");
    getItemsForAgeGroup(9).forEach(item => {
      // Assume all 9m fail for simplicity to test ceiling
      if (assessment.getResult(item.id) === 'not_tested') { // Only record if it was in the nextItems list
        assessment.recordResult(item.id, 'fail');
        console.log(`Recorded FAIL for item ${item.id} (9 months)`);
      }
    });

    nextItems = assessment.getNextTestItems();
    console.log("\nNext Test Items IDs (after 9m fails):", nextItems.map(item => item.id));
    // Forward check: 8m was mixed, 9m was 'all_fail'. Need to test 10m.
    // Expect items from 10 month age group.

    // Simulate testing 10m items - assume all fail
    console.log("\n--- Simulating Testing Next Batch ---");
    getItemsForAgeGroup(10).forEach(item => {
      if (assessment.getResult(item.id) === 'not_tested') {
        assessment.recordResult(item.id, 'fail');
        console.log(`Recorded FAIL for item ${item.id} (10 months)`);
      }
    });

    nextItems = assessment.getNextTestItems();
    console.log("\nNext Test Items IDs (after 10m fails):", nextItems.map(item => item.id));
    // Forward check: 9m all_fail, 10m all_fail -> Stop forward check.
    // Expect empty list.
  }


  // 3. Calculate Scores
  console.log("\n--- Calculating Final Scores ---");
  const scores = assessment.calculateScoresRevised(); // Use revised scoring
  console.log("Domain Mental Ages (months):");
  scores.domainMentalAges.forEach((age, domain) => {
    console.log(`  ${domain}: ${age}`);
  });
  console.log(`Total Mental Age (months): ${scores.totalMentalAge}`);
  console.log(`Development Quotient (DQ): ${scores.developmentQuotient}`);
  console.log(`DQ Classification: ${scores.dqClassification}`);

} catch (error) {
  console.error("Assessment Error:", error);
}