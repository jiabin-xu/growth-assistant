import { Domain, TestResultStatus } from "../constants/rule";

export interface AssessmentState {
  birthDate: Date;
  assessmentDate: Date;
  chronologicalAgeMonths: number;
  mainTestAgeMonths: number;
  results: Map<number, TestResultStatus>;
  currentDomain: Domain;
  searchDirection: "backward" | "forward";
  lastTestedAgeIndex: number;
  finishedPoints: number;
  totalPoints: number;
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

export interface AssessmentProgress {
  totalProgress: number;
}
