import { ALL_TEST_ITEMS, AGE_GROUPS, Domain, TestItem, TestResultStatus } from './constants'; // Assuming these are in a separate file now

// --- Helper Functions (Keep these as before or in a utility file) ---

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
  // Basic calculation, consider edge cases or a library for production
  const diffTime = Math.abs(assessmentDate.getTime() - birthDate.getTime());
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const ageInMonths = diffDays / 30.4375; // Average days per month
  return Math.round(ageInMonths * 10) / 10;
}

// Finds the closest age group, preferring lower if equidistant
function findMainTestAge(chronoAgeMonths: number): number {
  let closestAge = AGE_GROUPS[0];
  let minDiff = Math.abs(chronoAgeMonths - closestAge);

  for (let i = 1; i < AGE_GROUPS.length; i++) {
    const currentAge = AGE_GROUPS[i];
    const diff = Math.abs(chronoAgeMonths - currentAge);

    if (diff < minDiff) {
      minDiff = diff;
      closestAge = currentAge;
    } else if (diff === minDiff) {
      // Prefer lower age if equidistant, closestAge already holds the lower one
    } else {
      // Difference is increasing, we passed the closest
      break;
    }
  }
  // Special case: check if exactly halfway between the chosen closest and the one below it
  const index = AGE_GROUPS.indexOf(closestAge);
  if (index > 0) {
    const prevAge = AGE_GROUPS[index - 1];
    const midPoint = (prevAge + closestAge) / 2;
    if (chronoAgeMonths === midPoint) {
      return prevAge; // Rule 4.2.2: Choose lower if exactly halfway
    }
  }
  return closestAge;
}

// --- Core Assessment Logic ---

enum DomainSearchDirection {
  Backward = 'Backward', // Searching for Basal
  Forward = 'Forward',   // Basal found, searching for Ceiling
  Complete = 'Complete'  // Basal and Ceiling found
}

type AgeGroupStatus = 'all_pass' | 'all_fail' | 'mixed' | 'not_fully_tested';

export class DevelopmentalAssessment {
  private birthDate: Date;
  private assessmentDate: Date;
  public chronologicalAgeMonths: number;
  public mainTestAgeMonths: number; // 主测月龄
  public mainTestAgeIndex: number;

  // State: Results and tested age groups
  private results: Map<number, TestResultStatus>; // <itemId, status>
  private testedAgeIndices: Set<number>; // Indices in AGE_GROUPS that have been targeted
  private domainTestedIndices: Map<Domain, Set<number>>; // Track tested indices per domain

  // State: Domain-specific search progress
  private domainSearchDirection: Map<Domain, DomainSearchDirection>;
  // Cache status to avoid recalculation
  private domainAgeGroupStatusCache: Map<string, AgeGroupStatus>; // key: `${domain}_${ageIndex}`

  private clearStatusCacheForIndex(ageIndex: number): void {
    Object.values(Domain).forEach(domain => {
      const cacheKey = `${domain}_${ageIndex}`;
      this.domainAgeGroupStatusCache.delete(cacheKey);
    });
  }

  constructor(birthDate: Date, assessmentDate: Date) {
    if (assessmentDate < birthDate) {
      throw new Error("Assessment date cannot be before birth date.");
    }
    this.birthDate = birthDate;
    this.assessmentDate = assessmentDate;
    this.chronologicalAgeMonths = calculateAgeMonths(birthDate, assessmentDate);
    this.mainTestAgeMonths = findMainTestAge(this.chronologicalAgeMonths);
    this.mainTestAgeIndex = AGE_GROUPS.indexOf(this.mainTestAgeMonths);

    if (this.mainTestAgeIndex === -1) {
      throw new Error("Calculated main test age month is not valid.");
    }

    // Initialize results
    this.results = new Map<number, TestResultStatus>();
    ALL_TEST_ITEMS.forEach(item => this.results.set(item.id, 'not_tested'));

    // Initialize state tracking
    this.testedAgeIndices = new Set<number>();
    this.domainTestedIndices = new Map<Domain, Set<number>>();
    this.domainSearchDirection = new Map<Domain, DomainSearchDirection>();
    this.domainAgeGroupStatusCache = new Map<string, AgeGroupStatus>();
    Object.values(Domain).forEach(domain => {
      this.domainSearchDirection.set(domain, DomainSearchDirection.Backward); // Start searching backward
      this.domainTestedIndices.set(domain, new Set<number>()); // Initialize tested indices for each domain
    });
  }

  /**
   * Requirement 2: Provide first test items (main test age only).
   */
  public getInitialTestItems(): TestItem[] {
    this.testedAgeIndices.add(this.mainTestAgeIndex); // Mark as targeted
    this.clearStatusCacheForIndex(this.mainTestAgeIndex); // Ensure status is recalculated after testing
    console.log(`LOG: Initial target age group: ${this.mainTestAgeMonths} months (Index: ${this.mainTestAgeIndex})`);
    return getItemsForAgeGroup(this.mainTestAgeMonths);
  }

  /**
   * Requirement 3: Internal result maintenance.
   * Records a result and clears the status cache for the affected age group.
   */
  public recordResult(itemId: number, status: TestResultStatus): void {
    const currentStatus = this.results.get(itemId);
    if (currentStatus !== undefined) {
      if (currentStatus !== 'not_tested' && currentStatus !== status) {
        console.warn(`WARN: Changing result for item ${itemId} from ${currentStatus} to ${status}`);
      }
      this.results.set(itemId, status);

      // Mark the age group as tested and clear its status cache
      const item = ALL_TEST_ITEMS.find(i => i.id === itemId);
      if (item) {
        const itemAgeIndex = AGE_GROUPS.indexOf(item.ageMonths);
        if (itemAgeIndex !== -1) {
          this.testedAgeIndices.add(itemAgeIndex);
          // Add to domain-specific tested indices
          const domainIndices = this.domainTestedIndices.get(item.domain);
          if (domainIndices) {
            domainIndices.add(itemAgeIndex);
          }
          this.clearStatusCacheForIndex(itemAgeIndex);
        }
      }
    } else {
      console.warn(`WARN: Item ID ${itemId} not found.`);
    }
  }

  /** Helper: Get or calculate the status for a domain/ageIndex. */
  private getDomainAgeGroupStatus(domain: Domain, ageIndex: number): AgeGroupStatus {
    const cacheKey = `${domain}_${ageIndex}`;
    if (this.domainAgeGroupStatusCache.has(cacheKey)) {
      return this.domainAgeGroupStatusCache.get(cacheKey)!;
    }

    if (ageIndex < 0 || ageIndex >= AGE_GROUPS.length) {
      return 'not_fully_tested'; // Out of bounds is considered untested for status check
    }
    if (!this.testedAgeIndices.has(ageIndex)) {
      return 'not_fully_tested'; // Not targeted for testing yet
    }

    const ageMonths = AGE_GROUPS[ageIndex];
    const items = getItemsForAgeGroupAndDomain(ageMonths, domain);
    // If a domain has NO items at a certain age, how should it count?
    // Let's treat it as 'all_pass' for Basal purposes and 'all_fail' for Ceiling?
    // Or simply ignore it? Let's ignore it for status calculation - it doesn't contribute.
    // If needed for basal/ceiling across gaps, handle there.
    // For simplicity now: treat as 'all_pass' if no items.
    if (items.length === 0) {
      this.domainAgeGroupStatusCache.set(cacheKey, 'all_pass');
      return 'all_pass';
    }


    let passes = 0;
    let fails = 0;
    let notTestedCount = 0;

    for (const item of items) {
      const status = this.results.get(item.id);
      if (status === 'pass') passes++;
      else if (status === 'fail') fails++;
      else notTestedCount++;
    }

    let calculatedStatus: AgeGroupStatus;
    if (notTestedCount > 0) calculatedStatus = 'not_fully_tested';
    else if (fails === 0) calculatedStatus = 'all_pass'; // All items tested, no fails
    else if (passes === 0) calculatedStatus = 'all_fail'; // All items tested, no passes
    else calculatedStatus = 'mixed';

    this.domainAgeGroupStatusCache.set(cacheKey, calculatedStatus);
    return calculatedStatus;
  }

  // --- Basal/Ceiling Confirmation Helpers (Rule 4.2.3) ---

  /** Checks if Basal is confirmed for a domain */
  private isBasalConfirmed(domain: Domain): boolean {
    // Basal is confirmed if two consecutive age groups are 'all_pass'.
    // We check backwards from the lowest tested index.
    const testedIndices = Array.from(this.testedAgeIndices).sort((a, b) => a - b);
    if (testedIndices.length === 0) return false; // Nothing tested yet

    for (let i = 0; i < testedIndices.length; i++) {
      const index1 = testedIndices[i];
      // Check this index and the one *logically before* it in AGE_GROUPS
      const index0 = index1 - 1;

      const status1 = this.getDomainAgeGroupStatus(domain, index1);

      // If index1 is the first age group (0) and passes, basal is confirmed.
      if (index1 === 0 && status1 === 'all_pass') return true;

      // Check if the preceding group (index0) exists and was tested
      if (index0 >= 0 && this.testedAgeIndices.has(index0)) {
        const status0 = this.getDomainAgeGroupStatus(domain, index0);
        if (status0 === 'all_pass' && status1 === 'all_pass') {
          return true; // Found two consecutive tested passes
        }
      }
      // If index0 was not tested, we cannot confirm based on index1 yet.
    }
    return false;
  }

  /** Checks if Ceiling is confirmed for a domain */
  private isCeilingConfirmed(domain: Domain): boolean {
    // Ceiling is confirmed if two consecutive age groups are 'all_fail'.
    // We check forwards from the lowest tested index up to the highest.
    const testedIndices = Array.from(this.testedAgeIndices).sort((a, b) => a - b);
    if (testedIndices.length === 0) return false;

    for (let i = 0; i < testedIndices.length; i++) {
      const index1 = testedIndices[i];
      // Check this index and the one *logically after* it in AGE_GROUPS
      const index2 = index1 + 1;

      const status1 = this.getDomainAgeGroupStatus(domain, index1);

      // If index1 is the last age group and fails, ceiling is confirmed.
      if (index1 === AGE_GROUPS.length - 1 && status1 === 'all_fail') return true;

      // Check if the succeeding group (index2) exists and was tested
      if (index2 < AGE_GROUPS.length && this.testedAgeIndices.has(index2)) {
        const status2 = this.getDomainAgeGroupStatus(domain, index2);
        if (status1 === 'all_fail' && status2 === 'all_fail') {
          return true; // Found two consecutive tested fails
        }
      }
      // If index2 was not tested, we cannot confirm based on index1 yet.
    }
    return false;
  }

  /**
   * Requirement 4: Calculate the single next age group's items.
   * Prioritizes backward search for Basal, then forward for Ceiling.
   * Returns items for only one age group per call.
   */
  private updateDomainSearchDirections(): void {
    Object.values(Domain).forEach(domain => {
      const currentDirection = this.domainSearchDirection.get(domain)!;
      if (currentDirection === DomainSearchDirection.Backward && this.isBasalConfirmed(domain)) {
        console.log(`LOG: Basal confirmed for domain ${domain}. Switching to Forward search.`);
        this.domainSearchDirection.set(domain, DomainSearchDirection.Forward);
        if (this.isCeilingConfirmed(domain)) {
          console.log(`LOG: Ceiling also confirmed for domain ${domain}. Marking Complete.`);
          this.domainSearchDirection.set(domain, DomainSearchDirection.Complete);
        }
      } else if (currentDirection === DomainSearchDirection.Forward && this.isCeilingConfirmed(domain)) {
        console.log(`LOG: Ceiling confirmed for domain ${domain}. Marking Complete.`);
        this.domainSearchDirection.set(domain, DomainSearchDirection.Complete);
      }
    });
  }

  private getNextBackwardIndices(): Map<Domain, number> {
    const nextIndices = new Map<Domain, number>();
    Object.values(Domain).forEach(domain => {
      const domainIndices = this.domainTestedIndices.get(domain);
      if (!domainIndices || this.domainSearchDirection.get(domain) !== DomainSearchDirection.Backward) return;

      const testedIndicesSorted = Array.from(domainIndices).sort((a, b) => a - b);
      const lowestTested = testedIndicesSorted[0];

      const potentialNext = lowestTested !== undefined ? lowestTested - 1 : this.mainTestAgeIndex - 1;
      if (potentialNext >= 0 && !domainIndices.has(potentialNext)) {
        nextIndices.set(domain, potentialNext);
      } else if (potentialNext === -1) {
        console.log(`LOG: Reached index 0 while searching backward for ${domain}. Switching to Forward.`);
        this.domainSearchDirection.set(domain, DomainSearchDirection.Forward);
      }
    });
    return nextIndices;
  }

  private getNextForwardIndices(): Map<Domain, number> {
    const nextIndices = new Map<Domain, number>();
    Object.values(Domain).forEach(domain => {
      const domainIndices = this.domainTestedIndices.get(domain);
      if (!domainIndices || this.domainSearchDirection.get(domain) !== DomainSearchDirection.Forward) return;

      const testedIndicesSorted = Array.from(domainIndices).sort((a, b) => b - a);
      const highestTested = testedIndicesSorted[0];

      const potentialNext = highestTested !== undefined ? highestTested + 1 : this.mainTestAgeIndex + 1;
      if (potentialNext < AGE_GROUPS.length && !domainIndices.has(potentialNext)) {
        nextIndices.set(domain, potentialNext);
      } else if (potentialNext >= AGE_GROUPS.length) {
        console.log(`LOG: Reached end index while searching forward for ${domain}. Marking Complete.`);
        this.domainSearchDirection.set(domain, DomainSearchDirection.Complete);
      }
    });
    return nextIndices;
  }

  private getItemsForIndices(indices: Map<Domain, number>): TestItem[] {
    let nextItems: TestItem[] = [];
    indices.forEach((nextIndex, domain) => {
      const nextAgeMonth = AGE_GROUPS[nextIndex];
      const domainIndices = this.domainTestedIndices.get(domain);
      if (domainIndices) {
        domainIndices.add(nextIndex);
        this.clearStatusCacheForIndex(nextIndex);
        console.log(`LOG: Adding items for domain ${domain} at ${nextAgeMonth} months (Index: ${nextIndex})`);

        const items = getItemsForAgeGroupAndDomain(nextAgeMonth, domain)
          .filter(item => this.results.get(item.id) === 'not_tested');
        nextItems = nextItems.concat(items);
      }
    });
    return nextItems;
  }

  public getNextTestItems(): TestItem[] {
    this.updateDomainSearchDirections();

    const backwardIndices = this.getNextBackwardIndices();
    const forwardIndices = this.getNextForwardIndices();
    const nextItems = this.getItemsForIndices(new Map([...backwardIndices, ...forwardIndices]));

    if (nextItems.length > 0) {
      return nextItems;
    }

    const allComplete = Array.from(this.domainSearchDirection.values())
      .every(d => d === DomainSearchDirection.Complete);
    if (allComplete) {
      console.log("LOG: All domains are Complete. Assessment finished.");
    } else {
      console.log("LOG: No next items determined, but not all domains are Complete. Review state:",
        Object.fromEntries(this.domainSearchDirection));
    }
    return [];
  }

  /**
   * Requirement 5: Calculate developmental scores.
   * Uses Basal (assume pass below) and Ceiling (assume fail above).
   */
  public calculateScores(): {
    domainMentalAges: Map<Domain, number>;
    totalMentalAge: number; // Average of domain mental ages
    developmentQuotient: number;
    dqClassification: string;
  } {
    const domainMentalAges = new Map<Domain, number>();
    let totalMentalAgeSum = 0;

    for (const domain of Object.values(Domain)) {
      let domainScore = 0;

      // 1. Determine Basal Index for this domain
      // Basal Age = Highest age BEFORE the first age group with one or more failures.
      // If all tested passed, basal is the highest tested age. If none passed, basal is 0.
      let basalIndex = -1; // Index in AGE_GROUPS. -1 means score is 0.
      let firstFailOrMixedIndex = -1;
      const testedIndicesSorted = Array.from(this.testedAgeIndices).sort((a, b) => a - b);

      for (const index of testedIndicesSorted) {
        const status = this.getDomainAgeGroupStatus(domain, index);
        if (status === 'all_fail' || status === 'mixed') {
          firstFailOrMixedIndex = index;
          break;
        }
        // Track highest pass if no fails found yet
        if (status === 'all_pass') {
          basalIndex = index; // Update potential basal
        }
      }

      // If a failure was found, the basal is the index *before* it.
      if (firstFailOrMixedIndex !== -1) {
        basalIndex = firstFailOrMixedIndex - 1;
      }
      // If no failures found, basalIndex already holds the highest tested pass index.
      // If no passes were found (basalIndex still -1), the score starts from 0.


      // 2. Calculate score based on Basal
      // Sum points for all age groups up to and including basalIndex
      if (basalIndex >= 0) {
        for (let i = 0; i <= basalIndex; i++) {
          const age = AGE_GROUPS[i];
          const { totalPoints } = this.getScorePointsForAgeGroup(age);
          const itemsInGroupDomain = getItemsForAgeGroupAndDomain(age, domain);
          // Only add points if the domain actually has items at this age
          if (itemsInGroupDomain.length > 0) {
            domainScore += totalPoints;
          }
        }
      }

      // 3. Add points for items passed *above* basalIndex up to ceiling
      // Ceiling = Lowest age where two consecutive groups are 'all_fail'. Assume fail above.
      // Iterate from basalIndex + 1 onwards.
      for (let i = basalIndex + 1; i < AGE_GROUPS.length; i++) {
        // Stop adding points if ceiling is reached (two consecutive fails)
        const status_i = this.getDomainAgeGroupStatus(domain, i);
        const status_i_plus_1 = this.getDomainAgeGroupStatus(domain, i + 1);
        // Check if i and i+1 were actually tested and both failed
        const tested_i = this.testedAgeIndices.has(i);
        const tested_i_plus_1 = this.testedAgeIndices.has(i + 1);

        if (tested_i && status_i === 'all_fail' && tested_i_plus_1 && status_i_plus_1 === 'all_fail') {
          console.log(`LOG: Scoring for ${domain} stopped at index ${i} due to ceiling.`);
          break; // Ceiling reached, stop adding points
        }
        // If index i is the last group and failed, also stop.
        if (tested_i && i === AGE_GROUPS.length - 1 && status_i === 'all_fail') {
          console.log(`LOG: Scoring for ${domain} stopped at last index ${i} (failed).`);
          break;
        }


        // Only add points if this age group was actually tested
        if (this.testedAgeIndices.has(i)) {
          const age = AGE_GROUPS[i];
          const itemsInGroupDomain = getItemsForAgeGroupAndDomain(age, domain);
          const numItems = itemsInGroupDomain.length;
          if (numItems === 0) continue;

          const { totalPoints } = this.getScorePointsForAgeGroup(age);
          const pointsPerItem = totalPoints / numItems;

          for (const item of itemsInGroupDomain) {
            // Only score passed items
            if (this.results.get(item.id) === 'pass') {
              domainScore += pointsPerItem;
            }
          }
        }
        // If group 'i' wasn't tested but is between basal/ceiling, rules imply score=0 for it.
      }

      // Round domain score (mental age in months) to one decimal place
      const roundedDomainScore = Math.round(domainScore * 10) / 10;
      domainMentalAges.set(domain, roundedDomainScore);
      totalMentalAgeSum += roundedDomainScore;
    }

    // Calculate Total Mental Age (average of domains, rounded) - Rule 4.4.2.2
    const numDomains = Object.keys(Domain).length;
    const totalMentalAge = numDomains > 0
      ? Math.round((totalMentalAgeSum / numDomains) * 10) / 10
      : 0;

    // Calculate Development Quotient (DQ) - Rule 2.3
    const developmentQuotient = this.chronologicalAgeMonths > 0
      ? Math.round((totalMentalAge / this.chronologicalAgeMonths) * 100)
      : 0; // Avoid division by zero

    // Classify DQ based on Rule 5
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


// --- Example Usage (Refined Flow) ---

// Assume constants (ALL_TEST_ITEMS etc.) are imported from './constants'
async function runAssessment() {
  const birthDate = new Date('2022-01-15'); // ~6 months old
  const assessmentDate = new Date('2022-07-20');

  try {
    const assessment = new DevelopmentalAssessment(birthDate, assessmentDate);

    console.log(`Chrono Age: ${assessment.chronologicalAgeMonths}m, Main Test Age: ${assessment.mainTestAgeMonths}m`);

    // --- Testing Loop ---
    let itemsToTest = assessment.getInitialTestItems();
    let iteration = 0;
    const MAX_ITERATIONS = AGE_GROUPS.length + 5; // Safety break

    while (itemsToTest.length > 0 && iteration < MAX_ITERATIONS) {
      iteration++;
      const currentAgeMonth = itemsToTest[0]?.ageMonths; // All items are from the same group
      console.log(`\n--- Iteration ${iteration}: Testing Age ${currentAgeMonth}m ---`);
      console.log(`Item IDs: [${itemsToTest.map(i => i.id).join(', ')}]`);

      // ** SIMULATE TESTING **
      // Replace this with actual user interaction/results recording
      // Example Simulation:
      if (currentAgeMonth === 6) itemsToTest.forEach(item => assessment.recordResult(item.id, 'pass')); // Pass 6m
      else if (currentAgeMonth === 5) itemsToTest.forEach(item => assessment.recordResult(item.id, 'pass')); // Pass 5m (Basal now confirmed)
      else if (currentAgeMonth === 7) itemsToTest.forEach(item => assessment.recordResult(item.id, item.id === 59 ? 'fail' : 'pass')); // Mixed 7m
      else if (currentAgeMonth === 8) itemsToTest.forEach(item => assessment.recordResult(item.id, 'fail')); // Fail 8m
      else if (currentAgeMonth === 9) itemsToTest.forEach(item => assessment.recordResult(item.id, 'fail')); // Fail 9m (Ceiling now confirmed)
      else itemsToTest.forEach(item => assessment.recordResult(item.id, 'pass')); // Default pass for others if needed


      console.log(`Finished testing Age ${currentAgeMonth}m.`);

      // Get next batch
      itemsToTest = assessment.getNextTestItems();
    }

    if (iteration >= MAX_ITERATIONS) {
      console.warn("WARN: Maximum testing iterations reached. Check for infinite loop condition.");
    }

    // --- Calculate Scores ---
    console.log("\n--- Calculating Final Scores ---");
    const scores = assessment.calculateScores(); // Use the score calculation method
    console.log("Domain Mental Ages (months):");
    scores.domainMentalAges.forEach((age, domain) => {
      console.log(`  ${domain}: ${age.toFixed(1)}`);
    });
    console.log(`Total Mental Age (months): ${scores.totalMentalAge.toFixed(1)}`);
    console.log(`Development Quotient (DQ): ${scores.developmentQuotient}`);
    console.log(`DQ Classification: ${scores.dqClassification}`);

  } catch (error) {
    console.error("Assessment Error:", error);
  }
}

// Create a separate file e.g., `constants.ts` for these:
/*
export enum Domain { ... }
export interface TestItem { ... }
export type TestResultStatus = ...;
export const AGE_GROUPS: readonly number[] = [ ... ];
export const ALL_TEST_ITEMS: TestItem[] = [ ... ]; // <<<=== The full list of 261 items here
*/

// Run the assessment
runAssessment();