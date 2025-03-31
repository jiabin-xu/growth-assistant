import { View, Text, Form, Input, Button, Picker } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";

export default function Assessment() {
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const genderOptions = ["男", "女"];

  const handleSubmit = (e) => {
    const { name } = e.detail.value;
    if (!name || !birthDate || !gender) {
      // TODO: 显示错误提示
      return;
    }

    // 保存基本信息到本地存储
    const assessmentInfo = {
      name,
      birthDate,
      gender,
      startTime: new Date().toISOString(),
      id: Date.now().toString(),
    };

    try {
      const existingData = Taro.getStorageSync("assessments") || [];
      existingData.push(assessmentInfo);
      Taro.setStorageSync("assessments", existingData);

      // 跳转到测试页面
      Taro.navigateTo({
        url: `/pages/testing/index?id=${assessmentInfo.id}`,
      });
    } catch (e) {
      console.error("保存评估信息失败:", e);
    }
  };

  return (
    <View className="assessment">
      <View className="header">
        <Text className="title">基本信息</Text>
        <Text className="subtitle">请填写儿童的基本信息</Text>
      </View>

      <Form onSubmit={handleSubmit}>
        <View className="form-group">
          <Text className="label">姓名</Text>
          <Input
            name="name"
            className="input"
            placeholder="请输入儿童姓名"
            placeholderClass="input-placeholder"
          />
        </View>

        <View className="form-group">
          <Text className="label">出生日期</Text>
          <Picker
            mode="date"
            onChange={(e) => setBirthDate(e.detail.value)}
            className="picker"
          >
            <View className="picker-value">
              {birthDate || "请选择出生日期"}
            </View>
          </Picker>
        </View>

        <View className="form-group">
          <Text className="label">性别</Text>
          <Picker
            mode="selector"
            range={genderOptions}
            onChange={(e) => setGender(genderOptions[e.detail.value])}
            className="picker"
          >
            <View className="picker-value">{gender || "请选择性别"}</View>
          </Picker>
        </View>

        <Button className="submit-btn" formType="submit">
          开始评估
        </Button>
      </Form>
    </View>
  );
}
