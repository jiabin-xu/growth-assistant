import { Domain } from "../constants";
import { DomainAnalysis } from "../types/assessment";
import { getInterpretationAndSuggestions } from "./evaluate";



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

  // 计算该领域的发展商数
  const domainDQ = Math.round((mentalAge / actualAgeMonths) * 100);

  // 根据该领域的DQ值确定发展状态
  let developmentStatus = "delayed";
  if (domainDQ >= 130) developmentStatus = "excellent";
  else if (domainDQ >= 110) developmentStatus = "good";
  else if (domainDQ >= 90) developmentStatus = "normal";
  else if (domainDQ >= 80) developmentStatus = "attention";

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
