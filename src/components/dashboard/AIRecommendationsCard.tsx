import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { aiRecommendationsCardStyles as styles } from "@/styles/dashboard.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";
import type { IconName } from "@/constants/icons/icon-symbol";

interface recommendations {
  title: string;
  description: string;
  iconName: IconName;
}

export default function AIRecommendationsCard() {
  const theme = useTheme();

  const recommendations: recommendations[] = [
    {
      title: "Weekend Promotion",
      description:
        "Create a promotional campaign for your best-selling products this weekend.",
      iconName: "Megaphone",
    },
    {
      title: "Customer Testimonial",
      description:
        "Turn recent customer feedback into engaging social content.",
      iconName: "OutlineUserIcon",
    },
    {
      title: "WhatsApp Broadcast",
      description:
        "Send a targeted message to customers about your latest offers.",
      iconName: "HipChaticon",
    },
  ];

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
            Recommended For You
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            AI-powered content suggestions
          </Text>
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
          <IconSymbol name="SparklesIcon" size={14} color={theme.emerald} />

          <Text
            style={[
              styles.badgeText,
              {
                color: theme.emerald,
              },
            ]}
          >
            AI
          </Text>
        </View>
      </View>

      {recommendations.map((item) => (
        <TouchableOpacity
          key={item.title}
          activeOpacity={0.8}
          style={[
            styles.recommendationCard,
            {
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
          ]}
          onPress={() => router.push("/(tabs)/create")}
        >
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: theme.card,
              },
            ]}
          >
            <IconSymbol name={item.iconName} size={18} color={theme.primary} />
          </View>

          <View style={styles.content}>
            <Text
              style={[
                styles.recommendationTitle,
                {
                  color: theme.text,
                },
              ]}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.recommendationDescription,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              {item.description}
            </Text>
          </View>

          <IconSymbol
            name="ChevronRightIcon"
            size={16}
            color={theme.textSecondary}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.generateButton,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={() => router.push("/(tabs)/create")}
      >
        <IconSymbol name="SparklesIcon" size={18} color="#FFFFFF" />

        <Text style={styles.generateButtonText}>Generate Content Ideas</Text>
      </TouchableOpacity>
    </View>
  );
}
