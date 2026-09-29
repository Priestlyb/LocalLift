import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { quickActionsStyles as styles } from "@/styles/dashboard.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";
import type { IconName } from "@/constants/icons/icon-symbol";
import { Href } from "expo-router";

interface actions {
  title: string;
  subtitle: string;
  iconName: IconName;
  color: string;
  route: Href;
}

export default function QuickActions() {
  const theme = useTheme();

  const actions: actions[] = [
    {
      title: "Create Content",
      subtitle: "Generate new marketing content",
      iconName: "PlusCircleIcon",
      color: theme.primary,
      route: "/(tabs)/create" as const,
    },
    {
      title: "Content History",
      subtitle: "View previous AI generations",
      iconName: "HistoryIcon",
      color: theme.emerald,
      route: "/(tabs)/history" as const,
    },
    {
      title: "Analytics",
      subtitle: "Track business performance",
      iconName: "BarChartIcon",
      color: theme.primary,
      route: "/(screen)/analytics/index" as const,
    },
    {
      title: "Subscription",
      subtitle: "Manage your plan",
      iconName: "CreditCardIcon",
      color: theme.emerald,
      route: "/(tabs)/subscription" as const,
    },
  ];

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.text,
          },
        ]}
      >
        Quick Actions
      </Text>

      <View style={styles.grid}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.title}
            activeOpacity={0.8}
            style={[
              styles.actionCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            onPress={() => router.push(action.route)}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: theme.background,
                },
              ]}
            >
              <IconSymbol
                name={action.iconName}
                size={20}
                color={action.color}
              />
            </View>

            <Text
              style={[
                styles.actionTitle,
                {
                  color: theme.text,
                },
              ]}
            >
              {action.title}
            </Text>

            <Text
              style={[
                styles.actionSubtitle,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              {action.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
