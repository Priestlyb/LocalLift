import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Share,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { IconSymbol } from "@/constants/icons/icon-symbol";

import { useContent } from "@/hooks/useContent";

export default function ContentResultScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();

  const { currentContent, loadContent } = useContent();

  const [loading, setLoading] = useState(true);

  const [viewMode, setViewMode] = useState<"formatted" | "raw">("formatted");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        await loadContent(id as string);
      } catch (error) {
        console.log("Failed to load content", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleShare = async () => {
    if (!currentContent) return;

    try {
      await Share.share({
        message: currentContent.content,
      });
    } catch (error) {
      console.log("Share error", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={{
            color: theme.textSecondary,
            marginTop: 12,
          }}
        >
          Loading content...
        </Text>
      </SafeAreaView>
    );
  }

  if (!currentContent) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
          padding: 20,
        }}
      >
        <IconSymbol
          name="DocumentTextIcon"
          size={48}
          color={theme.textSecondary}
        />

        <Text
          style={{
            color: theme.text,
            fontSize: 18,
            fontWeight: "700",
            marginTop: 16,
          }}
        >
          Content Not Found
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/history")}
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: theme.primary,
            }}
          >
            Return to History
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const hashtags = currentContent.hashtags?.join(" ") ?? "";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: theme.textSecondary,
              fontSize: 13,
            }}
          >
            AI Generated Content
          </Text>

          <Text
            style={{
              color: theme.text,
              fontSize: 24,
              fontWeight: "700",
              marginTop: 4,
            }}
          >
            {currentContent.title}
          </Text>

          <Text
            style={{
              color: theme.primary,
              marginTop: 6,
              fontSize: 13,
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {currentContent.platform}
          </Text>
        </View>

        {/* VIEW TOGGLE */}

        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 4,
            borderWidth: 1,
            borderColor: theme.border,
            marginBottom: 20,
          }}
        >
          {["formatted", "raw"].map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => setViewMode(mode as "formatted" | "raw")}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor:
                  viewMode === mode ? theme.primary : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: viewMode === mode ? "#FFFFFF" : theme.textSecondary,
                  fontWeight: "600",
                }}
              >
                {mode === "formatted" ? "Formatted" : "Raw Output"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTENT */}

        <View
          style={{
            backgroundColor: theme.card,
            borderRadius: 18,
            padding: 18,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          {viewMode === "raw" ? (
            <Text
              style={{
                color: theme.text,
                lineHeight: 24,
              }}
            >
              {currentContent.content}
            </Text>
          ) : (
            <>
              <Text
                style={{
                  color: theme.text,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 10,
                }}
              >
                Content
              </Text>

              <Text
                style={{
                  color: theme.textSecondary,
                  lineHeight: 24,
                  marginBottom: 20,
                }}
              >
                {currentContent.content}
              </Text>

              {!!hashtags && (
                <>
                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 16,
                      fontWeight: "700",
                      marginBottom: 10,
                    }}
                  >
                    Hashtags
                  </Text>

                  <Text
                    style={{
                      color: theme.primary,
                      lineHeight: 22,
                    }}
                  >
                    {hashtags}
                  </Text>
                </>
              )}
            </>
          )}
        </View>

        {/* CONTENT METADATA */}

        <View
          style={{
            marginTop: 20,
            backgroundColor: theme.card,
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontWeight: "700",
              marginBottom: 10,
            }}
          >
            Content Details
          </Text>

          <Text
            style={{
              color: theme.textSecondary,
            }}
          >
            Generated:
          </Text>

          <Text
            style={{
              color: theme.text,
              marginTop: 4,
            }}
          >
            {new Date(currentContent.createdAt).toLocaleString()}
          </Text>
        </View>

        {/* ACTIONS */}

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={handleShare}
            style={{
              flex: 1,
              backgroundColor: theme.primary,
              padding: 16,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <IconSymbol name="ShareAltIcon" size={18} color="#FFFFFF" />

            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "700",
                marginLeft: 8,
              }}
            >
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/create")}
            style={{
              flex: 1,
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              padding: 16,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <IconSymbol name="SparklesIcon" size={18} color={theme.emerald} />

            <Text
              style={{
                color: theme.text,
                fontWeight: "700",
                marginLeft: 8,
              }}
            >
              Generate New
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/history")}
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: theme.textSecondary,
            }}
          >
            Back to History
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
