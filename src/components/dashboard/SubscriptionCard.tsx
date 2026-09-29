import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { subscriptionCardStyles as styles } from "@/styles/dashboard.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

interface SubscriptionCardProps {
  plan?: string;
  usedGenerations?: number;
  totalGenerations?: number;
  onManagePress?: () => void;
}

export default function SubscriptionCard({
  plan = "Starter",
  usedGenerations = 8,
  totalGenerations = 20,
  onManagePress,
}: SubscriptionCardProps) {
  const theme = useTheme();

  const usagePercentage =
    totalGenerations > 0
      ? (usedGenerations / totalGenerations) * 100
      : 0;

  const remaining = totalGenerations - usedGenerations;

  const handleManage = () => {
    if (onManagePress) return onManagePress();
    router.push("/(tabs)/subscription");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
          >
            Subscription
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Manage your LocalLift plan
          </Text>
        </View>

        <View
          style={[
            styles.planBadge,
            {
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
          ]}
        >
          <IconSymbol
            name="CrownOultlineIcon"
            size={16}
            color={theme.primary}
          />

          <Text
            style={[
              styles.planBadgeText,
              {
                color: theme.primary,
              },
            ]}
          >
            {plan}
          </Text>
        </View>
      </View>

      {/* PLAN INFO */}
      <View
        style={[
          styles.planCard,
          {
            backgroundColor: theme.background,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.planRow}>
          <Text
            style={[
              styles.planLabel,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Current Plan
          </Text>

          <Text
            style={[
              styles.planValue,
              {
                color: theme.text,
              },
            ]}
          >
            {plan}
          </Text>
        </View>

        <View style={styles.planRow}>
          <Text
            style={[
              styles.planLabel,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            AI Generations
          </Text>

          <Text
            style={[
              styles.planValue,
              {
                color: theme.primary,
              },
            ]}
          >
            {usedGenerations}/{totalGenerations}
          </Text>
        </View>

        {/* PROGRESS BAR */}
        <View
          style={[
            styles.progressTrack,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: theme.primary,
                width: `${usagePercentage}%`,
              },
            ]}
          />
        </View>

        <Text
          style={[
            styles.usageText,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          {remaining} AI generations remaining this month.
        </Text>
      </View>

      {/* BENEFITS */}
      <View
        style={[
          styles.benefitCard,
          {
            backgroundColor: theme.background,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.benefitHeader}>
          <IconSymbol
            name="SparklesIcon"
            size={18}
            color={theme.emerald}
          />

          <Text
            style={[
              styles.benefitTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Upgrade Benefits
          </Text>
        </View>

        <Text style={[styles.benefitItem, { color: theme.textSecondary }]}>
          • Unlimited content generation
        </Text>

        <Text style={[styles.benefitItem, { color: theme.textSecondary }]}>
          • Advanced analytics
        </Text>

        <Text style={[styles.benefitItem, { color: theme.textSecondary }]}>
          • Campaign scheduling
        </Text>

        <Text style={[styles.benefitItem, { color: theme.textSecondary }]}>
          • Premium AI templates
        </Text>
      </View>

      {/* ACTION */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.upgradeButton,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={handleManage}
      >
        <Text style={styles.upgradeButtonText}>
          Manage Subscription
        </Text>
      </TouchableOpacity>
    </View>
  );
}