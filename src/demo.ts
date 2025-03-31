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

/// --- Keep previous Types and Enums (Domain, TestItem, TestResultStatus, AGE_GROUPS, ALL_TEST_ITEMS) ---
// --- Keep previous Helper Functions (getItemsForAgeGroup, getItemsForAgeGroupAndDomain, calculateAgeMonths) ---

enum DomainSearchStatus {
  NeedsBackward = 'NeedsBackward', // Still searching for Basal
  NeedsForward = 'NeedsForward',   // Basal found, searching for Ceiling
  Complete = 'Complete'            // Basal and Ceiling found
}

// 2. Core Assessment Class (Modified)
class DevelopmentalAssessment {
  private birthDate: Date;
  private assessmentDate: Date;
  public chronologicalAgeMonths: number;
  public mainTestAgeMonths: number; // 主测月龄
  private mainTestAgeIndex: number;
  private results: Map<number, TestResultStatus>; // Internal state for results

  // State tracking for exploration
  private testedAgeIndices: Set<number>;
  private domainSearchStatus: Map<Domain, DomainSearchStatus>;

  constructor(birthDate: Date, assessmentDate: Date) {
    if (assessmentDate < birthDate) {
      throw new Error("Assessment date cannot be before birth date.");
    }
    this.birthDate = birthDate;
    this.assessmentDate = assessmentDate;
    this.chronologicalAgeMonths = calculateAgeMonths(birthDate, assessmentDate);
    this.mainTestAgeMonths = this.findMainTestAge(this.chronologicalAgeMonths);
    this.mainTestAgeIndex = AGE_GROUPS.indexOf(this.mainTestAgeMonths);
    if (this.mainTestAgeIndex === -1) {
      throw new Error("Calculated main test age month is not in the defined AGE_GROUPS.");
    }

    this.results = new Map<number, TestResultStatus>();
    ALL_TEST_ITEMS.forEach(item => this.results.set(item.id, 'not_tested'));

    // Initialize state
    this.testedAgeIndices = new Set<number>();
    this.domainSearchStatus = new Map<Domain, DomainSearchStatus>();
    Object.values(Domain).forEach(domain => {
      this.domainSearchStatus.set(domain, DomainSearchStatus.NeedsBackward); // Start by searching backward
    });
  }

  // --- findMainTestAge remains the same ---
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
      } else {
        break; // Difference is increasing
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
   * 1. Get the initial set of test items (Revised)
   * Returns only items for the mainTestAgeMonths.
   */
  public getInitialTestItems(): TestItem[] {
    // Mark this index as tested (or about to be)
    this.testedAgeIndices.add(this.mainTestAgeIndex);
    return getItemsForAgeGroup(this.mainTestAgeMonths);
  }

  /**
   * Records the result for a specific test item.
   */
  public recordResult(itemId: number, status: TestResultStatus): void {
    if (this.results.has(itemId)) {
      this.results.set(itemId, status);
      // Find which age index this item belongs to and mark it as tested
      const item = ALL_TEST_ITEMS.find(i => i.id === itemId);
      if (item) {
        const itemAgeIndex = AGE_GROUPS.indexOf(item.ageMonths);
        if (itemAgeIndex !== -1) {
          this.testedAgeIndices.add(itemAgeIndex);
        }
      }
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


  /** Helper to check the pass/fail status of all items in an age group for a specific domain */
  private checkAgeGroupStatus(ageIndex: number, domain: Domain): 'all_pass' | 'all_fail' | 'mixed' | 'not_fully_tested' {
    if (ageIndex < 0 || ageIndex >= AGE_GROUPS.length) {
      // Treat out-of-bounds indices strategically for basal/ceiling checks
      // For basal (backward check), out-of-bounds lower index implies "pass"
      // For ceiling (forward check), out-of-bounds higher index implies "fail"
      // This needs context, handled within checkBasal/checkCeiling directly.
      // Here, if directly asked, return not tested.
      return 'not_fully_tested';
    }
    const ageMonths = AGE_GROUPS[ageIndex];
    const items = getItemsForAgeGroupAndDomain(ageMonths, domain);
    if (items.length === 0) return 'all_pass'; // Treat empty domain/age groups as passed

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

  /** Checks if Basal is confirmed for a domain (Rule 4.2.3.2) */
  private checkBasalConfirmed(domain: Domain): boolean {
    // Iterate backwards from the lowest tested index for this domain
    const testedIndicesForDomain = Array.from(this.testedAgeIndices)
      .filter(index => getItemsForAgeGroupAndDomain(AGE_GROUPS[index], domain).length > 0) // Consider only relevant indices
      .sort((a, b) => a - b); // Sort ascending

    if (testedIndicesForDomain.length < 2) return false; // Need at least two tested points to check consecutive

    const lowestTestedIndex = testedIndicesForDomain[0];

    // Check the lowest tested index and the one before it
    const status1 = this.checkAgeGroupStatus(lowestTestedIndex, domain);
    // Treat index -1 (below first group) as implicitly passed for basal check
    const status0 = this.checkAgeGroupStatus(lowestTestedIndex - 1, domain);
    const precedingActuallyTested = this.testedAgeIndices.has(lowestTestedIndex - 1);


    // Basal is established if the two *lowest consecutive tested points* are 'all_pass'
    // OR if the very first age group (index 0) is tested and 'all_pass'
    if (lowestTestedIndex === 0 && status1 === 'all_pass') return true;

    // Find the lowest *pair* of tested indices
    for (let i = 0; i < testedIndicesForDomain.length - 1; i++) {
      const idx1 = testedIndicesForDomain[i];
      const idx2 = testedIndicesForDomain[i + 1];
      // Are they consecutive AGE GROUPS?
      if (idx2 === idx1 + 1) {
        const s1 = this.checkAgeGroupStatus(idx1, domain);
        const s2 = this.checkAgeGroupStatus(idx2, domain);
        // Check if *these two consecutive groups* are passed
        if (s1 === 'all_pass' && s2 === 'all_pass') {
          // But is this the true basal? True basal requires checking *below* the lowest failure
          // Let's simplify: if *any* two consecutive are passed, assume basal established for now for deciding next step
          // Correct basal calculation during scoring is more precise.
          // Re-evaluate: Rule 4.2.3.2 -> Stop going backward when 2 consecutive prior PASS.
          // Check status relative to the *lowest non-passed* or lowest tested point.
          break; // Found a pass pair, but maybe not the true basal yet
        }
      }
    }

    // Simpler Check: Check status relative to the lowest tested point
    // If the lowest tested point AND the one before it PASS, basal is confirmed.
    if (precedingActuallyTested) {
      if (status1 === 'all_pass' && status0 === 'all_pass') return true;
    } else {
      // If the preceding wasn't tested, we can't confirm based on this pair yet.
      // If the lowest tested IS index 0 and it passed, that's basal.
      if (lowestTestedIndex === 0 && status1 === 'all_pass') return true;
    }


    // More robust basal check: Iterate backward from main index until two consecutive passes are found
    let consecutivePasses = 0;
    for (let i = this.mainTestAgeIndex; i >= 0; i--) {
      if (!this.testedAgeIndices.has(i)) continue; // Skip untested indices
      const status = this.checkAgeGroupStatus(i, domain);
      if (status === 'all_pass') {
        consecutivePasses++;
        if (consecutivePasses === 2) return true;
      } else {
        consecutivePasses = 0; // Reset counter if not pass
      }
    }
    // Check if index 0 passed (edge case)
    if (consecutivePasses === 1 && this.testedAgeIndices.has(0) && this.checkAgeGroupStatus(0, domain) === 'all_pass') {
      // If we only found one pass at index 0, check implicit pass before it
      return true;
    }

    return false; // Default if no 2 consecutive passes found going down
  }

  /** Checks if Ceiling is confirmed for a domain (Rule 4.2.3.3) */
  private checkCeilingConfirmed(domain: Domain): boolean {
    // Iterate forwards from the highest tested index for this domain
    const testedIndicesForDomain = Array.from(this.testedAgeIndices)
      .filter(index => getItemsForAgeGroupAndDomain(AGE_GROUPS[index], domain).length > 0)
      .sort((a, b) => b - a); // Sort descending

    if (testedIndicesForDomain.length < 2) return false;

    const highestTestedIndex = testedIndicesForDomain[0];
    const status1 = this.checkAgeGroupStatus(highestTestedIndex, domain);
    // Treat index beyond last group as implicitly failed for ceiling check
    const status2 = this.checkAgeGroupStatus(highestTestedIndex + 1, domain);
    const succeedingActuallyTested = this.testedAgeIndices.has(highestTestedIndex + 1);


    // Ceiling is established if the two *highest consecutive tested points* are 'all_fail'
    // OR if the very last age group is tested and 'all_fail'
    if (highestTestedIndex === AGE_GROUPS.length - 1 && status1 === 'all_fail') return true;

    if (succeedingActuallyTested) {
      if (status1 === 'all_fail' && status2 === 'all_fail') return true;
    } else {
      // If the succeeding wasn't tested, we can't confirm based on this pair yet.
      if (highestTestedIndex === AGE_GROUPS.length - 1 && status1 === 'all_fail') return true;
    }

    // More robust ceiling check: Iterate forward from main index until two consecutive fails are found
    let consecutiveFails = 0;
    for (let i = this.mainTestAgeIndex; i < AGE_GROUPS.length; i++) {
      if (!this.testedAgeIndices.has(i)) continue; // Skip untested indices
      const status = this.checkAgeGroupStatus(i, domain);
      if (status === 'all_fail') {
        consecutiveFails++;
        if (consecutiveFails === 2) return true;
      } else {
        consecutiveFails = 0; // Reset counter if not fail
      }
    }
    // Check if last index failed (edge case)
    const lastIndex = AGE_GROUPS.length - 1;
    if (consecutiveFails === 1 && this.testedAgeIndices.has(lastIndex) && this.checkAgeGroupStatus(lastIndex, domain) === 'all_fail') {
      // If we only found one fail at the last index, check implicit fail after it
      return true;
    }

    return false; // Default if no 2 consecutive fails found going up
  }

  /**
   * 4. Calculate the single next age group to test (Revised)
   * Prioritizes backward search, then forward.
   */
  public getNextTestItems(): TestItem[] {
    let nextIndexToTest: number | null = null;
    let targetBackwardIndex: number | null = null;
    let targetForwardIndex: number | null = null;

    // Update domain search statuses based on current results
    Object.values(Domain).forEach(domain => {
      if (this.domainSearchStatus.get(domain) === DomainSearchStatus.NeedsBackward) {
        if (this.checkBasalConfirmed(domain)) {
          this.domainSearchStatus.set(domain, DomainSearchStatus.NeedsForward);
        }
      }
      if (this.domainSearchStatus.get(domain) === DomainSearchStatus.NeedsForward) {
        if (this.checkCeilingConfirmed(domain)) {
          this.domainSearchStatus.set(domain, DomainSearchStatus.Complete);
        }
      }
    });

    // --- Determine Next Index ---
    let lowestUntestedBackward: number | null = null;
    let lowestUntestedForward: number | null = null;

    // Find lowest needed backward index across incomplete domains
    for (const domain of Object.values(Domain)) {
      if (this.domainSearchStatus.get(domain) === DomainSearchStatus.NeedsBackward) {
        // Find the lowest tested index for this domain
        const testedIndices = Array.from(this.testedAgeIndices).sort((a, b) => a - b);
        const domainTestedIndices = testedIndices.filter(idx => getItemsForAgeGroupAndDomain(AGE_GROUPS[idx], domain).length > 0);
        const lowestTested = domainTestedIndices.length > 0 ? domainTestedIndices[0] : this.mainTestAgeIndex; // Start from main if none tested below

        const potentialNextBackward = lowestTested - 1;
        if (potentialNextBackward >= 0 && !this.testedAgeIndices.has(potentialNextBackward)) {
          if (lowestUntestedBackward === null || potentialNextBackward < lowestUntestedBackward) {
            lowestUntestedBackward = potentialNextBackward;
          }
        }
      }
    }

    // If backward search is needed, prioritize it
    if (lowestUntestedBackward !== null) {
      nextIndexToTest = lowestUntestedBackward;
    } else {
      // Backward search complete or not needed for any domain, check forward
      for (const domain of Object.values(Domain)) {
        if (this.domainSearchStatus.get(domain) === DomainSearchStatus.NeedsForward) {
          // Find the highest tested index for this domain
          const testedIndices = Array.from(this.testedAgeIndices).sort((a, b) => b - a); // Descending
          const domainTestedIndices = testedIndices.filter(idx => getItemsForAgeGroupAndDomain(AGE_GROUPS[idx], domain).length > 0);
          const highestTested = domainTestedIndices.length > 0 ? domainTestedIndices[0] : this.mainTestAgeIndex; // Start from main if none tested above

          const potentialNextForward = highestTested + 1;
          if (potentialNextForward < AGE_GROUPS.length && !this.testedAgeIndices.has(potentialNextForward)) {
            if (lowestUntestedForward === null || potentialNextForward < lowestUntestedForward) {
              lowestUntestedForward = potentialNextForward;
            }
          }
        }
      }
      if (lowestUntestedForward !== null) {
        nextIndexToTest = lowestUntestedForward;
      }
    }

    // --- Return Items for the Determined Index ---
    if (nextIndexToTest !== null) {
      const nextAgeMonth = AGE_GROUPS[nextIndexToTest];
      this.testedAgeIndices.add(nextIndexToTest); // Mark as targeted for testing
      console.log(`LOG: Next age group to test: ${nextAgeMonth} months (Index: ${nextIndexToTest})`); // Debug log
      // Return only items within this age group that haven't been tested yet
      return getItemsForAgeGroup(nextAgeMonth).filter(item => this.results.get(item.id) === 'not_tested');
    } else {
      console.log("LOG: No further items to test based on Basal/Ceiling rules."); // Debug log
      return []; // Assessment complete based on rules
    }
  }

  // --- calculateScoresRevised remains the same ---
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
      let basalIndex = -1;
      for (let i = AGE_GROUPS.length - 1; i >= 0; i--) {
        // Need to ensure the group was actually tested to qualify as basal
        if (this.testedAgeIndices.has(i) && this.checkAgeGroupStatus(i, domain) === 'all_pass') {
          // Check if the one before it ALSO passed (or it's index 0)
          const prevStatus = (i === 0) ? 'all_pass' : this.checkAgeGroupStatus(i - 1, domain);
          const prevTested = (i === 0) || this.testedAgeIndices.has(i - 1);
          // Simpler: find highest index where it and the one below (if exists) are passed
          if (prevTested && prevStatus === 'all_pass') {
            // This 'i' is the higher of the two consecutive passes, qualifies as basal start
            // But scoring includes all points *up to* this point.
            // Basal definition: highest age before the first failure. Assume pass below.
            // Find lowest index with a failure or mixed result
            let firstFailIndex = -1;
            for (let j = 0; j < AGE_GROUPS.length; j++) {
              if (this.testedAgeIndices.has(j)) {
                const status = this.checkAgeGroupStatus(j, domain);
                if (status === 'fail' || status === 'mixed') {
                  firstFailIndex = j;
                  break;
                }
              }
            }
            // Basal index is the one *before* the first failure
            basalIndex = (firstFailIndex === -1)
              ? AGE_GROUPS.length - 1 // All passed
              : firstFailIndex - 1;

            break; // Found the basal based on first failure method
          } else if (i === 0) { // Special case: index 0 passed, treat as basal
            basalIndex = 0;
            break;
          }


        }
      }
      // If no passes found at all, basalIndex remains -1


      // Calculate score for basal age and all preceding age groups
      // Assume all items passed up to and including the basal index
      if (basalIndex !== -1) {
        for (let i = 0; i <= basalIndex; i++) {
          const age = AGE_GROUPS[i];
          const { totalPoints } = this.getScorePointsForAgeGroup(age);
          const itemsInGroupDomain = getItemsForAgeGroupAndDomain(age, domain);
          const numItems = itemsInGroupDomain.length;
          if (numItems > 0) {
            domainScore += totalPoints; // Add the full value for this month/domain if basal applies
          }
        }
      }


      // Add scores for items passed *above* the basal index
      for (let i = basalIndex + 1; i < AGE_GROUPS.length; i++) {
        // Only consider scores for items in *tested* age groups above basal
        if (this.testedAgeIndices.has(i)) {
          const age = AGE_GROUPS[i];
          const itemsInGroupDomain = getItemsForAgeGroupAndDomain(age, domain);
          const numItems = itemsInGroupDomain.length;
          if (numItems === 0) continue;

          const { totalPoints } = this.getScorePointsForAgeGroup(age);
          const pointsPerItem = totalPoints / numItems;

          for (const item of itemsInGroupDomain) {
            if (this.results.get(item.id) === 'pass') {
              domainScore += pointsPerItem;
            }
          }
        }
      }

      const roundedDomainScore = Math.round(domainScore * 10) / 10;
      domainMentalAges.set(domain, roundedDomainScore);
      totalMentalAgeSum += roundedDomainScore;
    }

    const totalMentalAge = Math.round((totalMentalAgeSum / Object.keys(Domain).length) * 10) / 10;
    const developmentQuotient = this.chronologicalAgeMonths > 0
      ? Math.round((totalMentalAge / this.chronologicalAgeMonths) * 100)
      : 0;

    let dqClassification = "智力发育障碍"; // < 70
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
  }

  /** Helper to get scoring points based on age group (Rule 4.4.1) */
  private getScorePointsForAgeGroup(ageMonths: number): { totalPoints: number } {
    let totalPoints = 0;
    if (ageMonths >= 1 && ageMonths <= 12) totalPoints = 1.0;
    else if (ageMonths >= 15 && ageMonths <= 36) totalPoints = 3.0;
    else if (ageMonths >= 42 && ageMonths <= 84) totalPoints = 6.0;
    return { totalPoints };
  }

}

// --- Example Usage (Revised Flow) ---

const birthDateRev = new Date('2022-01-15'); // ~6 months old
const assessmentDateRev = new Date('2022-07-20');

try {
  const assessment = new DevelopmentalAssessment(birthDateRev, assessmentDateRev);

  console.log(`Chronological Age: ${assessment.chronologicalAgeMonths} months`);
  console.log(`Main Test Age (主测月龄): ${assessment.mainTestAgeMonths} months`); // Should be 6

  // 1. Get Initial Items (Only for main test age)
  let currentItems = assessment.getInitialTestItems();
  console.log(`\nInitial Test Items (Age ${assessment.mainTestAgeMonths}m) IDs:`, currentItems.map(item => item.id));

  // Simulate testing month 6 - Assume all pass
  console.log("\n--- Simulating Testing Month 6 (All Pass) ---");
  currentItems.forEach(item => assessment.recordResult(item.id, 'pass'));

  // 2. Get Next Items (Should go backward first)
  currentItems = assessment.getNextTestItems();
  console.log(`\nNext Test Items (Expected Age 5m) IDs:`, currentItems.map(item => item.id)); // Should be items for age 5m

  // Simulate testing month 5 - Assume all pass
  console.log("\n--- Simulating Testing Month 5 (All Pass) ---");
  currentItems.forEach(item => assessment.recordResult(item.id, 'pass'));

  // 3. Get Next Items (Check Basal - 6m passed, 5m passed -> Basal confirmed for all domains. Should go forward)
  currentItems = assessment.getNextTestItems();
  console.log(`\nNext Test Items (Expected Age 7m) IDs:`, currentItems.map(item => item.id)); // Should be items for age 7m

  // Simulate testing month 7 - Assume some fail (e.g., item 59)
  console.log("\n--- Simulating Testing Month 7 (Item 59 Fail) ---");
  currentItems.forEach(item => assessment.recordResult(item.id, item.id === 59 ? 'fail' : 'pass'));

  // 4. Get Next Items (Basal OK, Ceiling not confirmed. Need to go forward)
  currentItems = assessment.getNextTestItems();
  console.log(`\nNext Test Items (Expected Age 8m) IDs:`, currentItems.map(item => item.id)); // Should be items for age 8m

  // Simulate testing month 8 - Assume all fail
  console.log("\n--- Simulating Testing Month 8 (All Fail) ---");
  currentItems.forEach(item => assessment.recordResult(item.id, 'fail'));

  // 5. Get Next Items (Check Ceiling: 7m mixed, 8m all_fail. Need one more fail -> test 9m)
  currentItems = assessment.getNextTestItems();
  console.log(`\nNext Test Items (Expected Age 9m) IDs:`, currentItems.map(item => item.id)); // Should be items for age 9m

  // Simulate testing month 9 - Assume all fail
  console.log("\n--- Simulating Testing Month 9 (All Fail) ---");
  currentItems.forEach(item => assessment.recordResult(item.id, 'fail'));

  // 6. Get Next Items (Check Ceiling: 8m all_fail, 9m all_fail -> Ceiling confirmed. Stop.)
  currentItems = assessment.getNextTestItems();
  console.log(`\nNext Test Items (Expected Empty):`, currentItems.map(item => item.id)); // Should be empty []

  // 7. Calculate Scores
  console.log("\n--- Calculating Final Scores ---");
  const scores = assessment.calculateScoresRevised();
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