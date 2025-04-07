import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { InterpretationCardProps } from "../../types/assessment";
import { getStatusDisplay } from "../../utils/statusUtils";
import "./interpretation.scss";

export const InterpretationCard: React.FC<InterpretationCardProps> = ({ domainAnalysis }) => {
  return (
    <View className="interpretation-card">
      <Text className="card-title">能力解读与发展建议</Text>
      {domainAnalysis.length > 0 && (
        <Swiper
          className="domain-swiper"
          indicatorDots
          indicatorColor="rgba(0, 0, 0, .3)"
          indicatorActiveColor="#3498db"
          circular
        >
          {domainAnalysis.map((analysis) => (
            <SwiperItem key={analysis.domain} className="domain-swiper-item">
              <View className="domain-interpretation">
                <View className="domain-header">
                  <Text className="domain-title">{analysis.domain}</Text>
                  <View className="domain-status">
                    <Text className="domain-age">
                      发展水平：{analysis.mentalAge}个月
                    </Text>
                    <Text className={`status-tag ${analysis.developmentStatus}`}>
                      {getStatusDisplay(analysis.developmentStatus)}
                    </Text>
                  </View>
                </View>
                <View className="domain-content">
                  {analysis.interpretation && analysis.interpretation.length > 0 && (
                    <View className="domain-status">
                      <Text className="subtitle">发展表现</Text>
                      <Text className="description">{analysis.interpretation}</Text>
                    </View>
                  )}
                  <View className="suggestions">
                    <Text className="subtitle">发展建议</Text>
                    <View className="suggestion-list">
                      {analysis.suggestions?.map((suggestion, index) => (
                        <View key={index} className="suggestion-item">
                          <Text className="suggestion-dot">•</Text>
                          <Text className="suggestion-text">{suggestion}</Text>
                        </View>
                      ))}
                      {analysis.customSuggestions?.map((suggestion, index) => (
                        <View key={`custom-${index}`} className="suggestion-item">
                          <Text className="suggestion-dot">•</Text>
                          <Text className="suggestion-text">{suggestion}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      )}
    </View>
  );
}; 