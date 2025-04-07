import { Domain, DQClassification } from "../constants/rule";

export interface Assessment {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  height: string;
  weight: string;
  results: AssessmentResults;
}

export interface AssessmentResults {
  developmentQuotient: number;
  dqClassification: DQClassification;
  domainMentalAges: Record<Domain, number>;
  totalMentalAge: number;
}

export interface DomainAnalysis {
  domain: Domain;
  mentalAge: number;
  interpretation: string;
  suggestions: string[];
  description: string;
  developmentStatus: DQClassification;
  gap: number;
  customSuggestions: string[];
  dq?: number;
}

export interface BasicInfoProps {
  gender: string;
  age: string;
  height: string;
  weight: string;
}

export interface AssessmentResultTableProps {
  dqClassification: DQClassification;
  totalMentalAge: number;
  domainAnalysis: DomainAnalysis[];
  developmentQuotient?: number;
}

export interface RadarChartProps {
  domainMentalAges: Record<Domain, number>;
  actualAgeMonths: number;
  name: string;
}

export interface InterpretationCardProps {
  domainAnalysis: DomainAnalysis[];
}

export interface NextStepsCardProps {
  nextAssessmentDate: {
    nextDate: string;
    nextAgeMonths: number;
  };
}
