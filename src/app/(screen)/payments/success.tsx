import { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";

export default function PaymentSuccessScreen() {
  const theme = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/payment/verifying");
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={{
            marginTop: 20,
            color: theme.text,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Payment received
        </Text>

        <Text
          style={{
            marginTop: 8,
            textAlign: "center",
            color: theme.textSecondary,
          }}
        >
          Verifying your subscription...
        </Text>
      </View>
    </SafeAreaView>
  );
}
