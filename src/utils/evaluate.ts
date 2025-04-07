import { Domain } from "src/constants/rule";
import pingjia from "src/data/pingjia.json";
export function getAgeRangeKey(ageMonths: number): string {
  if (ageMonths >= 0 && ageMonths <= 6) return "0-6m";
  if (ageMonths > 6 && ageMonths <= 12) return "7-12m";
  if (ageMonths > 12 && ageMonths <= 24) return "13-24m";
  if (ageMonths > 24 && ageMonths <= 36) return "25-36m";
  if (ageMonths > 36 && ageMonths <= 54) return "37-54m";
  if (ageMonths > 54 && ageMonths <= 84) return "55-84m"; // Assuming max age covered is 84 months
  // Add more ranges if your suggestions cover older ages
  return "55-84m"; // Or a default/fallback key if needed
}


export function getScoreRange(score: number): string {
  if (score >= 130) return ">130";
  if (score >= 110) return "110-129";
  if (score >= 80) return "80-109";
  if (score >= 70) return "70-79";
  return '<70';
}


export function getInterpretationAndSuggestions(domain: Domain, ageMonths: number, score: number): {
  interpretation: string;
  suggestions: string[];
} {
  console.log(domain, ageMonths, score);
  const ageRangeKey = getAgeRangeKey(ageMonths);
  const scoreRange = getScoreRange(score);
  const domainData = pingjia.find(item => item.domain.includes(domain));
  if (!domainData) {
    return {
      interpretation: '',
      suggestions: []
    };
  }
  const classification = domainData.classifications.find(item => item.range === scoreRange);
  const suggestion = classification?.suggestions[ageRangeKey];
  return {
    interpretation: classification?.interpretation || '',
    suggestions: suggestion
  };
}
