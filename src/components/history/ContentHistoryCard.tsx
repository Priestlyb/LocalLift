import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { contentHistoryCardStyles as styles } from "@/styles/history.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

type Props = {
  id?: string;
  title: string;
  type: "instagram" | "facebook" | "whatsapp" | "google" | "email";
  time: string;
  preview?: string;
};

export default function ContentHistoryCard({
  id = "1",
  title,
  type,
  time,
  preview,
}: Props) {
  const theme = useTheme();

  const getTypeColor = () => {
    switch (type) {
      case "instagram":
        return theme.primary;
      case "whatsapp":
        return theme.emerald;
      case "google":
        return theme.primary;
      case "email":
        return theme.emerald;
      default:
        return theme.primary;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "instagram":
        return "Instagram Post";
      case "whatsapp":
        return "WhatsApp Message";
      case "google":
        return "Google Update";
      case "email":
        return "Email Campaign";
      default:
        return "Content";
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`/content/result/${id}`)}
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
            <IconSymbol
              name="DocumentTextIcon"
              size={18}
              color={getTypeColor()}
            />
          </View>

          <View style={styles.titleBlock}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.text,
                },
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>

            <Text
              style={[
                styles.type,
                {
                  color: getTypeColor(),
                },
              ]}
            >
              {getTypeLabel()}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.time,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          {time}
        </Text>
      </View>

      {/* PREVIEW */}
      {preview && (
        <Text
          numberOfLines={2}
          style={[
            styles.preview,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          {preview}
        </Text>
      )}

      {/* ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
          ]}
          onPress={() => router.push(`/content/result/${id}`)}
        >
          <IconSymbol name="EyeIcon" size={16} color={theme.primary} />
          <Text style={[styles.actionText, { color: theme.text }]}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
          ]}
          onPress={() => router.push("/(tabs)/create")}
        >
          <IconSymbol name="SparklesIcon" size={16} color={theme.emerald} />
          <Text style={[styles.actionText, { color: theme.text }]}>
            Regenerate
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
