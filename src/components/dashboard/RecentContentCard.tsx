import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { useContent } from "@/hooks/useContent";

import { recentContentCardStyles as styles } from "@/styles/dashboard.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function RecentContentCard() {
  const theme = useTheme();
  const { history, loading } = useContent();

  const recentContent = useMemo(() => {
    if (!history || history.length === 0) return [];

    return history
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        title: item.title,
        type: formatType(item.platform),
        date: formatDate(item.createdAt),
      }));
  }, [history]);

  function formatType(platform: string) {
    switch (platform) {
      case "instagram":
        return "Instagram Post";
      case "whatsapp":
        return "WhatsApp Broadcast";
      case "google":
        return "Google Business Update";
      case "email":
        return "Email Campaign";
      default:
        return "AI Content";
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    if (diff < 172800) return "Yesterday";
    return `${Math.floor(diff / 86400)} days ago`;
  }

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
            Recent Content
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Your latest AI-generated content
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/history")}
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

      {/* EMPTY STATE */}
      {recentContent.length === 0 ? (
        <View
          style={{
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme.textSecondary,
              marginBottom: 10,
            }}
          >
            No content yet
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/create")}
            style={{
              backgroundColor: theme.primary,
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Create Your First Content
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        recentContent.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={[
              styles.contentCard,
              {
                backgroundColor: theme.background,
                borderColor: theme.border,
              },
            ]}
            onPress={() =>
              router.push(`/content/result/${item.id}`)
            }
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: theme.card,
                },
              ]}
            >
              <IconSymbol
                name="FileIcon"
                size={18}
                color={theme.primary}
              />
            </View>

            <View style={styles.contentInfo}>
              <Text
                style={[
                  styles.contentTitle,
                  {
                    color: theme.text,
                  },
                ]}
                numberOfLines={1}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  styles.contentType,
                  {
                    color: theme.textSecondary,
                  },
                ]}
              >
                {item.type}
              </Text>
            </View>

            <View style={styles.metaContainer}>
              <Text
                style={[
                  styles.contentDate,
                  {
                    color: theme.textSecondary,
                  },
                ]}
              >
                {item.date}
              </Text>

              <IconSymbol
                name="ChevronRightIcon"
                size={16}
                color={theme.textSecondary}
              />
            </View>
          </TouchableOpacity>
        ))
      )}

      {/* CTA */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.createButton,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={() => router.push("/(tabs)/create")}
      >
        <IconSymbol
          name="PlusCircleIcon"
          size={18}
          color="#FFFFFF"
        />

        <Text style={styles.createButtonText}>
          Create New Content
        </Text>
      </TouchableOpacity>
    </View>
  );
}