import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { aiInsightCardStyles as styles } from "@/styles/dashboard.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

interface InsightProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  insightTitle?: string;
  insightText?: string;
  recommendations?: string[];
  onActionPress?: () => void;
}

export default function AIInsightCard({
  title = "AI Growth Insight",
  subtitle = "Personalized recommendations",
  badge = "LIVE",
  insightTitle = "Weekend Campaign Opportunity",
  insightText = "Your promotional posts perform better on weekends. Create a Saturday campaign highlighting your best products to potentially increase engagement by up to 35%.",
  recommendations = [
    "Create a weekend sales campaign",
    "Generate a WhatsApp broadcast",
    "Post a customer testimonial",
  ],
  onActionPress,
}: InsightProps) {
  const theme = useTheme();

  const handleAction = () => {
    if (onActionPress) return onActionPress();
    router.push("/(tabs)/create");
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
        <View style={styles.titleRow}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: theme.background,
              },
            ]}
          >
            <IconSymbol name="SparklesIcon" size={18} color={theme.emerald} />
          </View>

          <View>
            <Text
              style={[
                styles.title,
                {
                  color: theme.text,
                },
              ]}
            >
              {title}
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              {subtitle}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color: theme.emerald,
              },
            ]}
          >
            {badge}
          </Text>
        </View>
      </View>

      {/* MAIN INSIGHT */}
      <View
        style={[
          styles.insightCard,
          {
            backgroundColor: theme.background,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.insightTitle,
            {
              color: theme.text,
            },
          ]}
        >
          {insightTitle}
        </Text>

        <Text
          style={[
            styles.insightText,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          {insightText}
        </Text>
      </View>

      {/* RECOMMENDATIONS */}
      <View style={styles.recommendations}>
        <Text
          style={[
            styles.recommendationTitle,
            {
              color: theme.text,
            },
          ]}
        >
          Recommended Actions
        </Text>

        {recommendations.map((item, index) => (
          <View key={index} style={styles.recommendationItem}>
            <IconSymbol name="CheckCircleIcon" size={18} color={theme.emerald} />

            <Text
              style={[
                styles.recommendationText,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>

      {/* ACTION BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.actionButton,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={handleAction}
      >
        <IconSymbol name="SparklesIcon" size={18} color="#FFFFFF" />

        <Text style={styles.actionButtonText}>
          Generate Recommended Content
        </Text>
      </TouchableOpacity>
    </View>
  );
}