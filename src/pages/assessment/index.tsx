import { View, Text, Form, Input, Button, Picker } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { useShare } from "../../hooks/useShare";
import "./index.scss";

interface FormData {
  name: string;
  height: string;
  weight: string;
}

export default function Assessment() {
  // 添加分享功能
  useShare("填写宝宝信息 - 萌宝成长小助手");

  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    height: "",
    weight: "",
  });
  const genderOptions = ["男", "女"];

  const handleInput = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    const { name, height, weight } = formData;
    if (!name || !birthDate || !gender || !height || !weight) {
      Taro.showToast({
        title: "请填写完整信息",
        icon: "error",
      });
      return;
    }

    // 保存基本信息到本地存储
    const assessmentInfo = {
      ...formData,
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
      Taro.showToast({
        title: "保存信息失败",
        icon: "error",
      });
    }
  };

  return (
    <View className="assessment">
      <View className="header">
        <Text className="title">基本信息</Text>
        <Text className="subtitle">请填写宝宝的基本信息</Text>
      </View>

      <Form onSubmit={handleSubmit}>
        <View className="form-content">
          <View className="form-section">
            <Text className="section-title">个人信息</Text>
            <View className="form-group">
              <Text className="label required">姓名</Text>
              <Input
                value={formData.name}
                onInput={(e) => handleInput("name", e.detail.value)}
                className="input"
                placeholder="请输入儿童姓名"
                placeholderClass="input-placeholder"
              />
            </View>

            <View className="form-row">
              <View className="form-group">
                <Text className="label required">性别</Text>
                <Picker
                  mode="selector"
                  range={genderOptions}
                  onChange={(e) => setGender(genderOptions[e.detail.value])}
                  className="picker"
                >
                  <View className="picker-value">{gender || "请选择"}</View>
                </Picker>
              </View>

              <View className="form-group">
                <Text className="label required">出生日期</Text>
                <Picker
                  mode="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.detail.value)}
                  className="picker"
                >
                  <View className="picker-value">{birthDate || "请选择"}</View>
                </Picker>
              </View>
            </View>
          </View>

          <View className="form-section">
            <Text className="section-title">身体数据</Text>
            <View className="form-row">
              <View className="form-group">
                <Text className="label required">身高</Text>
                <View className="input-with-unit">
                  <Input
                    type="digit"
                    value={formData.height}
                    onInput={(e) => handleInput("height", e.detail.value)}
                    className="input"
                    placeholder="请输入"
                    placeholderClass="input-placeholder"
                  />
                  <Text className="unit">cm</Text>
                </View>
              </View>

              <View className="form-group">
                <Text className="label required">体重</Text>
                <View className="input-with-unit">
                  <Input
                    type="digit"
                    value={formData.weight}
                    onInput={(e) => handleInput("weight", e.detail.value)}
                    className="input"
                    placeholder="请输入"
                    placeholderClass="input-placeholder"
                  />
                  <Text className="unit">kg</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Button className="submit-btn" formType="submit">
          开始评估
        </Button>
      </Form>
    </View>
  );
}
