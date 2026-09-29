import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { IconSymbol } from "@/constants/icons/icon-symbol";

type Platform = "instagram" | "whatsapp" | "google" | "email";

export default function ContentPreviewScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();

  const [platform, setPlatform] = useState<Platform>("instagram");

  const content = {
    title: "Weekend Bakery Promotion",

    instagram: {
      caption:
        "Freshly baked goodness is here! 🥐✨\n\nEnjoy 20% off all pastries this weekend only.\n\n#Bakery #FreshBread #WeekendDeals #LocalBusiness",
    },

    whatsapp:
      "🥐 Weekend Bakery Promo!\n\nGet 20% OFF all pastries this weekend only.\n\nVisit us today before Sunday closes!",

    google:
      "We’re excited to announce a weekend discount on all fresh pastries! Visit us in-store and enjoy 20% off all bakery items.",

    email: {
      subject: "Weekend Special: 20% Off All Pastries",
      body: "Hello valued customer,\n\nWe’re excited to offer you 20% off all pastries this weekend only!\n\nVisit us in-store before Sunday to enjoy this limited-time offer.\n\nThank you for your support!",
    },
  };

  const platforms: {
    key: Platform;
    label: string;
    icon: string;
  }[] = [
    { key: "instagram", label: "Instagram", icon: "CameraIcon" },
    { key: "whatsapp", label: "WhatsApp", icon: "ChatBubbleIcon" },
    { key: "google", label: "Google", icon: "GlobeAltIcon" },
    { key: "email", label: "Email", icon: "EnvelopeIcon" },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* HEADER */}
        <Text
          style={{
            color: theme.textSecondary,
            fontSize: 13,
          }}
        >
          Content Preview
        </Text>

        <Text
          style={{
            color: theme.text,
            fontSize: 20,
            fontWeight: "700",
            marginTop: 4,
          }}
        >
          {content.title}
        </Text>

        {/* PLATFORM SWITCHER */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            {platforms.map((p) => {
              const isActive = platform === p.key;

              return (
                <TouchableOpacity
                  key={p.key}
                  onPress={() => setPlatform(p.key)}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 999,
                    backgroundColor: isActive ? theme.primary : theme.card,
                    borderWidth: 1,
                    borderColor: isActive ? theme.primary : theme.border,
                  }}
                >
                  <Text
                    style={{
                      color: isActive ? "#fff" : theme.text,
                      fontWeight: "600",
                      fontSize: 13,
                    }}
                  >
                    {p.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* PREVIEW CARD */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: theme.card,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: theme.border,
            padding: 16,
          }}
        >
          {/* Instagram */}
          {platform === "instagram" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <IconSymbol name="CameraIcon" size={18} color={theme.primary} />
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "700",
                  }}
                >
                  Instagram Post
                </Text>
              </View>

              <Text style={{ color: theme.textSecondary, lineHeight: 20 }}>
                {content.instagram.caption}
              </Text>
            </View>
          )}

          {/* WhatsApp */}
          {platform === "whatsapp" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <IconSymbol
                  name="HipChaticon"
                  size={18}
                  color={theme.emerald}
                />
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "700",
                  }}
                >
                  WhatsApp Message
                </Text>
              </View>

              <Text style={{ color: theme.textSecondary, lineHeight: 20 }}>
                {content.whatsapp}
              </Text>
            </View>
          )}

          {/* Google */}
          {platform === "google" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <IconSymbol name="GlobalIcon" size={18} color={theme.primary} />
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "700",
                  }}
                >
                  Google Business Post
                </Text>
              </View>

              <Text style={{ color: theme.textSecondary, lineHeight: 20 }}>
                {content.google}
              </Text>
            </View>
          )}

          {/* Email */}
          {platform === "email" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <IconSymbol
                  name="EnvelopeIcon"
                  size={18}
                  color={theme.primary}
                />
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "700",
                  }}
                >
                  Email Campaign
                </Text>
              </View>

              <Text
                style={{
                  color: theme.text,
                  fontWeight: "700",
                  marginBottom: 6,
                }}
              >
                Subject: {content.email.subject}
              </Text>

              <Text style={{ color: theme.textSecondary, lineHeight: 20 }}>
                {content.email.body}
              </Text>
            </View>
          )}
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
            onPress={() => router.push("/(tabs)/create")}
            style={{
              flex: 1,
              backgroundColor: theme.primary,
              padding: 14,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
              }}
            >
              Edit Content
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/history")}
            style={{
              flex: 1,
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              padding: 14,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontWeight: "700",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
