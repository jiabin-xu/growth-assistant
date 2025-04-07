import { Domain } from "../constants/rule";
import { DomainAnalysis } from "../types/assessment";
import pingjia from "../data/pingjia.json";
import { getAgeRangeKey } from "./age";
import { getDevelopmentStatus, getScoreRange } from "./status";

export const DOMAIN_ORDER: Domain[] = [
  Domain.GrossMotor,
  Domain.FineMotor,
  Domain.Adaptive,
  Domain.Language,
  Domain.Social
];

export const getNextDomain = (currentDomain: Domain): Domain | null => {
  const currentIndex = DOMAIN_ORDER.indexOf(currentDomain);
  return currentIndex < DOMAIN_ORDER.length - 1 ? DOMAIN_ORDER[currentIndex + 1] : null;
};

export const getInterpretationAndSuggestions = (
  domain: Domain,
  ageMonths: number,
  score: number
): {
  interpretation: string;
  suggestions: string[];
} => {
  const ageRangeKey = getAgeRangeKey(ageMonths);
  const scoreRange = getScoreRange(score);
  const domainData = pingjia.find(item => item.domain.includes(domain));

  if (!domainData) {
    return {
      interpretation: "",
      suggestions: []
    };
  }

  const classification = domainData.classifications.find(item => item.range === scoreRange);
  const suggestion = classification?.suggestions[ageRangeKey];

  return {
    interpretation: classification?.interpretation || "",
    suggestions: suggestion
  };
};

export const analyzeDomain = (
  domain: Domain,
  mentalAge: number,
  actualAgeMonths: number,
  developmentQuotient: number
): DomainAnalysis => {
  const { interpretation = "", suggestions = [] } = getInterpretationAndSuggestions(
    domain,
    mentalAge,
    developmentQuotient
  );

  const domainDQ = Math.round((mentalAge / actualAgeMonths) * 100);
  const developmentStatus = getDevelopmentStatus(domainDQ);

  return {
    domain,
    mentalAge,
    interpretation,
    suggestions,
    description: interpretation,
    developmentStatus,
    gap: Math.abs(mentalAge - actualAgeMonths),
    customSuggestions: [],
  };
};
