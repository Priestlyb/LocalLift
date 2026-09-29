import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { dashboardHeaderStyles as styles } from "@/styles/dashboard.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function DashboardHeader() {
  const theme = useTheme();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.greetingRow}>
          <Text
            style={[
              styles.greeting,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Welcome back
          </Text>

          <IconSymbol
            name="handWaveIcon"
            size={16}
            color={theme.textSecondary}
          />
        </View>

        <Text
          style={[
            styles.businessName,
            {
              color: theme.text,
            },
          ]}
        >
          Priestly Bakery
        </Text>

        <Text
          style={[
            styles.date,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          {today}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.notificationButton,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <IconSymbol name="BellIcon" size={20} color={theme.primary} />

        <View
          style={[
            styles.notificationDot,
            {
              backgroundColor: theme.emerald,
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}
