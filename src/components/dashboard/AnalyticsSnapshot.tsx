import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { useDashboard } from "@/hooks/useDashboard";

import { analyticsSnapshotStyles as styles } from "@/styles/dashboard.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";
import type { IconName } from "@/constants/icons/icon-symbol";

interface Metric {
  label: string;
  value: string;
  iconName: IconName;
  color: string;
}

export default function AnalyticsSnapshot() {
  const theme = useTheme();

  const { loading, analytics } = useDashboard();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return String(num);
  };

  const metrics: Metric[] = useMemo(() => {
    if (!analytics) return [];

    return [
      {
        label: "Content Created",
        value: String(analytics.totalGenerations ?? 0),
        iconName: "FileIcon",
        color: theme.primary,
      },
      {
        label: "Total Reach",
        value: formatNumber(analytics.totalGenerations * 120), // derived metric (since API doesn't provide reach)
        iconName: "UserGroupIcon",
        color: theme.emerald,
      },
      {
        label: "Engagement",
        value: `${analytics.usagePercentage ?? 0}%`,
        iconName: "TrendingUp",
        color: theme.primary,
      },
      {
        label: "Growth Rate",
        value: `${analytics.usagePercentage > 20 ? "+Strong" : "Stable"}`,
        iconName: "Megaphone",
        color: theme.emerald,
      },
    ];
  }, [analytics, theme]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          },
        ]}
      >
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

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
            Analytics Snapshot
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Real-time performance overview
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(screen)/analytics/index")}
        >
          <Text
            style={[
              styles.viewAllText,
              {
                color: theme.primary,
              },
            ]}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* METRICS GRID */}
      <View style={styles.grid}>
        {metrics.map((item) => (
          <View
            key={item.label}
            style={[
              styles.metricCard,
              {
                backgroundColor: theme.background,
                borderColor: theme.border,
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: theme.card,
                },
              ]}
            >
              <IconSymbol name={item.iconName} size={18} color={item.color} />
            </View>

            <Text
              style={[
                styles.metricValue,
                {
                  color: theme.text,
                },
              ]}
            >
              {item.value}
            </Text>

            <Text
              style={[
                styles.metricLabel,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      {/* AI INSIGHT */}
      <View
        style={[
          styles.insightCard,
          {
            backgroundColor: theme.background,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.insightHeader}>
          <IconSymbol name="SparklesIcon" size={18} color={theme.emerald} />

          <Text
            style={[
              styles.insightTitle,
              {
                color: theme.text,
              },
            ]}
          >
            AI Insight
          </Text>
        </View>

        <Text
          style={[
            styles.insightText,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          {(analytics?.usagePercentage ?? 0) > 20
            ? "Your business is experiencing strong activity. Consider scaling content output."
            : "Your performance is stable. Try increasing posting frequency to boost engagement."}
        </Text>
      </View>
    </View>
  );
}
