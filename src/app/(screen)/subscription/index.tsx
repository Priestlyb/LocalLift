import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function SubscriptionScreen() {
  const theme = useTheme();

  const currentPlan = "Free";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* HEADER */}
        <Text style={{ color: theme.textSecondary, fontSize: 13 }}>
          Subscription
        </Text>

        <Text
          style={{
            color: theme.text,
            fontSize: 22,
            fontWeight: "800",
            marginTop: 4,
          }}
        >
          Manage Your Plan
        </Text>

        {/* CURRENT PLAN CARD */}
        <View
          style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 16,
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text style={{ color: theme.textSecondary, fontSize: 13 }}>
            Current Plan
          </Text>

          <Text
            style={{
              color: theme.text,
              fontSize: 20,
              fontWeight: "800",
              marginTop: 6,
            }}
          >
            {currentPlan}
          </Text>

          <Text
            style={{
              color: theme.textSecondary,
              marginTop: 6,
              fontSize: 13,
              lineHeight: 18,
            }}
          >
            Upgrade to unlock unlimited AI content, analytics, and advanced
            automation tools.
          </Text>
        </View>

        {/* FEATURES PREVIEW */}
        <View style={{ marginTop: 20, gap: 10 }}>
          {[
            "Unlimited AI content generation",
            "Advanced analytics dashboard",
            "Multi-platform scheduling",
            "Priority AI processing",
          ].map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <IconSymbol
                name="CheckCircleIcon"
                size={18}
                color={theme.emerald}
              />
              <Text style={{ color: theme.text }}>{item}</Text>
            </View>
          ))}
        </View>

        {/* UPGRADE BUTTON */}
        <TouchableOpacity
          onPress={() => router.push("/subscription/plans")}
          style={{
            marginTop: 25,
            backgroundColor: theme.primary,
            padding: 14,
            borderRadius: 14,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800" }}>Upgrade Plan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
