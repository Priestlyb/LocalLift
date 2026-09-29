import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { createStyles as styles } from "@/styles/create.styles";

import { useBusinessStore } from "@/store/businessStore";
import { useGenerateContent } from "@/hooks/contents/useGenerateContent";
import { useAuth } from "@/hooks/useAuth";

type Platform = "instagram" | "facebook" | "whatsapp" | "google" | "email";

type Goal = "promotion" | "announcement" | "engagement" | "awareness";

export default function CreateScreen() {
  const theme = useTheme();

  const { business } = useBusinessStore();

  const { token } = useAuth();

  const { mutateAsync: generateContent, isPending: isGenerating } =
    useGenerateContent(token);

  const [platform, setPlatform] = useState<Platform>("instagram");

  const [goal, setGoal] = useState<Goal>("promotion");

  const [prompt, setPrompt] = useState("");

  const platformMap = {
    instagram: "Instagram",
    facebook: "Facebook",
    whatsapp: "WhatsApp",
    google: "Google",
    email: "Email",
  } as const;

  const handleGenerate = async () => {
    if (!prompt.trim() || !business) return;

    try {
      const result = await generateContent({
        businessId: business._id,
        type: "SOCIAL_POST",
        platform: platformMap[platform],
        tone: business.brandVoice ?? "Friendly",
        audience: business.targetAudience ?? "General audience",
        productName: business.businessName,
        details: `Goal: ${goal}\n\n${prompt}`,
      });

      console.log("[Generated Content]", result);

      // Update this depending on your API response.
      // Example:
      // router.push(`/content/result/${result.id}`);
    } catch (error) {
      console.log("Content generation failed:", error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
          >
            AI Content Generator
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Turn one business idea into professional marketing content.
          </Text>
        </View>

        {/* PLATFORM */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Platform
          </Text>

          <View style={styles.optionsContainer}>
            {["instagram", "facebook", "whatsapp", "google", "email"].map(
              (item) => {
                const active = platform === item;

                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setPlatform(item as Platform)}
                    style={[
                      styles.optionChip,
                      {
                        backgroundColor: active ? theme.primary : theme.card,
                        borderColor: active ? theme.primary : theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: active ? "#fff" : theme.text,
                        fontWeight: "600",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </View>

        {/* GOAL */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Goal
          </Text>

          <View style={styles.optionsContainer}>
            {["promotion", "announcement", "engagement", "awareness"].map(
              (item) => {
                const active = goal === item;

                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setGoal(item as Goal)}
                    style={[
                      styles.optionChip,
                      {
                        backgroundColor: active ? theme.emerald : theme.card,
                        borderColor: active ? theme.emerald : theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: active ? "#fff" : theme.text,
                        fontWeight: "600",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </View>

        {/* PROMPT */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.text,
              },
            ]}
          >
            What do you want to promote?
          </Text>

          <TextInput
            value={prompt}
            onChangeText={setPrompt}
            multiline
            placeholder="Example: Weekend bakery discount. Buy one loaf and get one free."
            placeholderTextColor={theme.textSecondary}
            style={[
              styles.promptInput,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />
        </View>

        {/* BUSINESS CONTEXT */}
        {business && (
          <View
            style={[
              styles.contextCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text
              style={{
                color: theme.text,
                fontWeight: "700",
              }}
            >
              AI Context
            </Text>

            <Text
              style={{
                color: theme.textSecondary,
                marginTop: 6,
              }}
            >
              {business.businessName}
            </Text>

            <Text
              style={{
                color: theme.textSecondary,
              }}
            >
              {business.category}
            </Text>

            <Text
              style={{
                color: theme.textSecondary,
              }}
            >
              Brand Voice: {business.brandVoice ?? "Friendly"}
            </Text>
          </View>
        )}

        {/* GENERATE BUTTON */}
        <TouchableOpacity
          disabled={isGenerating}
          onPress={handleGenerate}
          style={[
            styles.generateButton,
            {
              backgroundColor: theme.primary,
              opacity: isGenerating ? 0.7 : 1,
            },
          ]}
        >
          {isGenerating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.generateButtonText}>Generate Content</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
