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

export interface DomainProgress {
  tested: number;
  direction: string;
  progress: number;
}

export interface AssessmentProgress {
  totalProgress: number;
  domainProgress: {
    [key in Domain]?: DomainProgress;
  };
}
