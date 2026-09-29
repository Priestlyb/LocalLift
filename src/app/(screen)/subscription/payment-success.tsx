import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function PaymentSuccess() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: theme.card,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <IconSymbol name="CheckCircleIcon" size={40} color={theme.emerald} />
      </View>

      <Text
        style={{
          color: theme.text,
          fontSize: 22,
          fontWeight: "800",
          textAlign: "center",
        }}
      >
        Payment Successful
      </Text>

      <Text
        style={{
          color: theme.textSecondary,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        You now have full access to LocalLift Pro features.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/(tabs)/dashboard")}
        style={{
          marginTop: 25,
          backgroundColor: theme.primary,
          padding: 14,
          borderRadius: 14,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "800" }}>
          Go to Dashboard
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
