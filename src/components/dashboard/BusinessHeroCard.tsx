import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { useBusiness } from "@/hooks/useBusiness";
import { useSubscription } from "@/hooks/useSubscription";

import { businessHeroCardStyles as styles } from "@/styles/dashboard.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function BusinessHeroCard() {
  const theme = useTheme();

  const { business, loading: businessLoading } = useBusiness();
  const { subscription } = useSubscription();

  const usedGenerations = subscription?.usedThisMonth || 0;

  const totalGenerations = subscription?.monthlyLimit || 20;

  const remainingGenerations =
    subscription?.remainingGenerations || totalGenerations - usedGenerations;

  const progress = useMemo(() => {
    if (!totalGenerations) return 0;
    return Math.min((usedGenerations / totalGenerations) * 100, 100);
  }, [usedGenerations, totalGenerations]);

  const businessName = business?.businessName || "Your Business";
  const businessType =
    business?.category ||
    "Grow your business with AI-powered content generation";

  if (businessLoading) {
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
              styles.businessName,
              {
                color: theme.text,
              },
            ]}
          >
            {businessName}
          </Text>

          <Text
            style={[
              styles.businessType,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            {businessType}
          </Text>
        </View>

        <View
          style={[
            styles.aiBadge,
            {
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
          ]}
        >
          <IconSymbol name="SparklesIcon" size={16} color={theme.primary} />

          <Text
            style={[
              styles.aiBadgeText,
              {
                color: theme.primary,
              },
            ]}
          >
            AI Active
          </Text>
        </View>
      </View>

      {/* DESCRIPTION */}
      <Text
        style={[
          styles.description,
          {
            color: theme.textSecondary,
          },
        ]}
      >
        Generate social media posts, WhatsApp broadcasts, email campaigns, and
        promotional content tailored specifically for {businessName}.
      </Text>

      {/* USAGE */}
      <View style={styles.usageSection}>
        <View style={styles.usageHeader}>
          <Text
            style={[
              styles.usageLabel,
              {
                color: theme.text,
              },
            ]}
          >
            Monthly AI Usage
          </Text>

          <Text
            style={[
              styles.usageValue,
              {
                color: theme.primary,
              },
            ]}
          >
            {usedGenerations}/{totalGenerations}
          </Text>
        </View>

        <View
          style={[
            styles.progressTrack,
            {
              backgroundColor: theme.background,
            },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: progress > 80 ? "#ef4444" : theme.primary,
                width: `${progress}%`,
              },
            ]}
          />
        </View>

        {progress > 80 && (
          <Text
            style={{
              color: "#ef4444",
              fontSize: 12,
              marginTop: 6,
            }}
          >
            Only {remainingGenerations} AI generations remaining
          </Text>
        )}
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.primaryButton,
            {
              backgroundColor: theme.primary,
            },
          ]}
          onPress={() => router.push("/(tabs)/create")}
        >
          <IconSymbol name="PlusCircleIcon" size={18} color="#FFFFFF" />

          <Text style={styles.primaryButtonText}>Create Content</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.secondaryButton,
            {
              borderColor: theme.border,
            },
          ]}
          onPress={() => router.push("/(tabs)/history")}
        >
          <IconSymbol name="HistoryIcon" size={18} color={theme.text} />

          <Text
            style={[
              styles.secondaryButtonText,
              {
                color: theme.text,
              },
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
