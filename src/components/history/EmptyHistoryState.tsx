import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { emptyHistoryStateStyles as styles } from "@/styles/history.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function EmptyHistoryState() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <IconSymbol name="DocumentTextIcon" size={28} color={theme.primary} />
      </View>

      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        No Content Yet
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: theme.textSecondary,
          },
        ]}
      >
        Your AI-generated marketing content will appear here once you start
        creating campaigns, posts, and messages.
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.button,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={() => router.push("/(tabs)/create")}
      >
        <IconSymbol name="SparklesIcon" size={18} color="#FFFFFF" />

        <Text style={styles.buttonText}>Create Your First Content</Text>
      </TouchableOpacity>
    </View>
  );
}
