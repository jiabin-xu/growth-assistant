# 宝宝成长记录小程序数据结构设计

## 数据模型设计

### 1. 用户信息 (User)

```json
{
  "id": "用户唯一ID",
  "openId": "微信OpenID",
  "nickName": "微信昵称",
  "avatarUrl": "头像URL",
  "gender": 1, // 1: 男, 2: 女
  "createdAt": "2023-05-01T12:00:00Z",
  "updatedAt": "2023-05-01T12:00:00Z"
}
```

### 2. 宝宝信息 (Baby)

```json
{
  "id": "宝宝唯一ID",
  "userId": "关联的用户ID",
  "name": "宝宝姓名",
  "gender": 1, // 1: 男, 2: 女
  "birthDate": "2022-03-10",
  "avatarUrl": "头像URL",
  "birthHeight": 50.0, // 出生身高(cm)
  "birthWeight": 3.5, // 出生体重(kg)
  "createdAt": "2023-05-01T12:00:00Z",
  "updatedAt": "2023-05-01T12:00:00Z"
}
```

### 3. 身高记录 (HeightRecord)

```json
{
  "id": "记录唯一ID",
  "babyId": "关联的宝宝ID",
  "date": "2023-05-10",
  "height": 80.0, // 身高(cm)
  "percentile": 75, // 百分位数
  "environment": "午后", // 测量环境: 晨起/午后/睡前
  "remarks": "饭后测量", // 备注信息
  "imageUrl": "测量照片URL", // 可选
  "createdAt": "2023-05-10T14:30:00Z",
  "updatedAt": "2023-05-10T14:30:00Z"
}
```

### 4. 体重记录 (WeightRecord)

```json
{
  "id": "记录唯一ID",
  "babyId": "关联的宝宝ID",
  "date": "2023-05-10",
  "weight": 12.0, // 体重(kg)
  "percentile": 60, // 百分位数
  "environment": "午后", // 测量环境: 晨起/午后/睡前
  "remarks": "饭后测量", // 备注信息
  "imageUrl": "测量照片URL", // 可选
  "createdAt": "2023-05-10T14:30:00Z",
  "updatedAt": "2023-05-10T14:30:00Z"
}
```

### 5. 其他指标记录 (OtherIndexRecord)

```json
{
  "id": "记录唯一ID",
  "babyId": "关联的宝宝ID",
  "date": "2023-05-10",
  "type": "headCircumference", // 指标类型: headCircumference(头围)/chestCircumference(胸围)等
  "value": 46.0, // 测量值
  "unit": "cm", // 单位
  "percentile": 65, // 百分位数，可选
  "remarks": "测量备注", // 备注信息
  "createdAt": "2023-05-10T14:30:00Z",
  "updatedAt": "2023-05-10T14:30:00Z"
}
```

### 6. 发育评估 (GrowthAssessment)

```json
{
  "id": "评估唯一ID",
  "babyId": "关联的宝宝ID",
  "date": "2023-05-20",
  "heightAssessment": {
    "height": 80.0,
    "ageInMonths": 14,
    "percentile": 75,
    "status": "normal", // normal(正常)/low(偏低)/high(偏高)
    "trend": "normal", // normal(正常)/slow(缓慢)/fast(快速)
    "description": "高于75%同龄儿童，正常发育范围"
  },
  "weightAssessment": {
    "weight": 12.0,
    "ageInMonths": 14,
    "percentile": 60,
    "status": "normal",
    "trend": "normal",
    "description": "高于60%同龄儿童，正常发育范围"
  },
  "bmiAssessment": {
    "bmi": 18.75,
    "status": "normal", // underweight(偏瘦)/normal(正常)/overweight(偏胖)/obese(肥胖)
    "description": "BMI处于标准范围内"
  },
  "overallAssessment": "发育正常，符合年龄段标准发育特征",
  "suggestions": [
    "均衡饮食，保证蛋白质摄入",
    "保证充足睡眠，建议每天11-12小时",
    "适当户外活动，每天1小时以上"
  ],
  "createdAt": "2023-05-20T10:15:00Z",
  "updatedAt": "2023-05-20T10:15:00Z"
}
```

### 7. 成长标准 (GrowthStandard)

```json
{
  "id": "标准唯一ID",
  "gender": 1, // 1: 男, 2: 女
  "ageInMonths": 14, // 月龄
  "heightStandard": {
    "p3": 71.8, // 第3百分位
    "p15": 74.1, // 第15百分位
    "p50": 77.5, // 第50百分位(中位数)
    "p85": 80.9, // 第85百分位
    "p97": 83.2 // 第97百分位
  },
  "weightStandard": {
    "p3": 8.9,
    "p15": 9.6,
    "p50": 10.6,
    "p85": 11.6,
    "p97": 12.3
  },
  "bmiStandard": {
    "p3": 14.5,
    "p15": 15.3,
    "p50": 16.4,
    "p85": 17.4,
    "p97": 18.2
  },
  "source": "WHO", // 数据来源: WHO/中国卫健委
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

### 8. 育儿知识 (ParentingKnowledge)

```json
{
  "id": "知识文章唯一ID",
  "title": "宝宝身高体重发育规律",
  "coverUrl": "封面图URL",
  "summary": "了解0-3岁宝宝正常发育指标和规律",
  "content": "文章HTML内容",
  "ageRanges": ["0-1岁", "1-3岁"], // 适用年龄段
  "categories": ["发育指标", "健康成长"], // 分类标签
  "readCount": 2500, // 阅读量
  "likeCount": 500, // 点赞数
  "createdAt": "2023-04-01T09:00:00Z",
  "updatedAt": "2023-04-01T09:00:00Z"
}
```

### 9. 常见问题 (FAQ)

```json
{
  "id": "问题唯一ID",
  "question": "孩子身高增长缓慢怎么办?",
  "answer": "孩子身高增长缓慢可能有多种原因...(详细回答)",
  "ageRanges": ["0-1岁", "1-3岁", "3-6岁"], // 适用年龄段
  "categories": ["身高发育", "营养健康"], // 分类标签
  "readCount": 1500, // 阅读量
  "helpfulCount": 320, // 有帮助数量
  "createdAt": "2023-04-10T11:20:00Z",
  "updatedAt": "2023-04-10T11:20:00Z"
}
```

### 10. 用户收藏 (Favorite)

```json
{
  "id": "收藏唯一ID",
  "userId": "关联的用户ID",
  "targetId": "收藏内容ID",
  "targetType": "article", // article(文章)/faq(问答)
  "createdAt": "2023-05-15T16:40:00Z"
}
```

## 数据关系图

```
User (用户) 1 ---< Baby (宝宝) 1 ---< HeightRecord (身高记录)
                               |
                               +---< WeightRecord (体重记录)
                               |
                               +---< OtherIndexRecord (其他指标记录)
                               |
                               +---< GrowthAssessment (发育评估)

User (用户) 1 ---< Favorite (收藏) >--- ParentingKnowledge (育儿知识)
                                |
                                +--- FAQ (常见问题)

GrowthAssessment (发育评估) >--- GrowthStandard (成长标准)
```

## 云数据库设计

微信小程序可以使用微信云开发提供的云数据库功能，将上述数据模型映射为云数据库的集合（Collection）：

1. users - 用户信息集合
2. babies - 宝宝信息集合
3. height_records - 身高记录集合
4. weight_records - 体重记录集合
5. other_index_records - 其他指标记录集合
6. growth_assessments - 发育评估集合
7. growth_standards - 成长标准集合
8. parenting_knowledge - 育儿知识集合
9. faqs - 常见问题集合
10. favorites - 用户收藏集合

## 索引设计

为提高查询效率，需要在以下字段上建立索引：

1. babies 集合：userId
2. height_records 集合：babyId, date
3. weight_records 集合：babyId, date
4. other_index_records 集合：babyId, date, type
5. growth_assessments 集合：babyId, date
6. growth_standards 集合：gender, ageInMonths
7. parenting_knowledge 集合：ageRanges, categories
8. faqs 集合：ageRanges, categories
9. favorites 集合：userId, targetType, targetId
