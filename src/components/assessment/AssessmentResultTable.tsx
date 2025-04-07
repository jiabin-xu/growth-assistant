import { View, Text } from "@tarojs/components";
import { AssessmentResultTableProps } from "../../types/assessment";
import { getStatusDisplay } from "../../utils/statusUtils";
import "./assessment-table.scss";

export const AssessmentResultTable: React.FC<AssessmentResultTableProps> = ({
  dqClassification,
  totalMentalAge,
  domainAnalysis,
}) => {
  return (
    <View className="score-card">
      <Text className="score-card-title">发育评估结果</Text>
      
      <View className="score-table">
        <View className="score-table-header">
          <View className="score-table-cell name">能区</View>
          <View className="score-table-cell status">状态</View>
          <View className="score-table-cell age">发育年龄</View>
        </View>
        
        <View className="score-table-row total">
          <View className="score-table-cell name">总体发育</View>
          <View className="score-table-cell status">
            <Text className={`status-tag`}>{dqClassification || "暂无结果"}</Text>
          </View>
          <View className="score-table-cell age">{totalMentalAge || "暂无"}个月</View>
        </View>
        
        {domainAnalysis.length > 0 && domainAnalysis.map((domain) => (
          <View key={domain.domain} className="score-table-row">
            <View className="score-table-cell name">{domain.domain}</View>
            <View className="score-table-cell status">
              <Text className={`status-tag ${domain.developmentStatus}`}>
                {getStatusDisplay(domain.developmentStatus)}
              </Text>
            </View>
            <View className="score-table-cell age">{domain.mentalAge}个月</View>
          </View>
        ))}
      </View>
    </View>
  );
}; 