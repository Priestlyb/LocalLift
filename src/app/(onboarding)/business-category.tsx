import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { businessCategories } from "@/constants/mockData/businessCategories";
import { businessCategoryStyles as styles } from "@/styles/business-category.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";
import { useOnboardingStore } from "@/store/onboardingStore";

const categories = businessCategories;

export default function BusinessCategoryScreen() {
  const theme = useTheme();

  const setData = useOnboardingStore((state) => state.setData);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const handleContinue = () => {
    if (!selectedCategory) return;

    setData({
      category: selectedCategory,
    });

    router.push("/(onboarding)/business-branding");
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="ChevronLeft" size={22} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View
            style={[
              styles.progressTrack,
              {
                backgroundColor: theme.border,
              },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: theme.primary,
                },
              ]}
            />
          </View>

          <Text
            style={[
              styles.progressText,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Step 1 of 3
          </Text>
        </View>

        <View style={styles.header}>
          <Text
            style={[
              styles.heading,
              {
                color: theme.text,
              },
            ]}
          >
            What type of business do you run?
          </Text>

          <Text
            style={[
              styles.subheading,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            This helps the app local lift your business and generate marketing
            content tailored to your industry.
          </Text>
        </View>

        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <IconSymbol name="SearchIcon" size={18} color={theme.textSecondary} />

          <TextInput
            placeholder="Search categories..."
            placeholderTextColor={theme.textSecondary}
            value={search}
            onChangeText={setSearch}
            style={[
              styles.searchInput,
              {
                color: theme.text,
              },
            ]}
          />
        </View>

        <View style={styles.categoriesContainer}>
          {filteredCategories.map((category) => {
            const { iconName } = category;

            const selected = selectedCategory === category.id;

            return (
              <TouchableOpacity
                key={category.id}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(category.id)}
                style={[
                  styles.categoryCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: selected ? theme.primary : theme.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: selected
                        ? theme.primary
                        : theme.background,
                    },
                  ]}
                >
                  <IconSymbol
                    name={iconName}
                    size={22}
                    color={selected ? "#FFFFFF" : theme.primary}
                  />
                </View>

                <View style={styles.categoryInfo}>
                  <Text
                    style={[
                      styles.categoryTitle,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    {category.title}
                  </Text>

                  <Text
                    style={[
                      styles.categorySubtitle,
                      {
                        color: theme.textSecondary,
                      },
                    ]}
                  >
                    AI content optimized for this industry
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!selectedCategory}
          onPress={handleContinue}
          style={[
            styles.continueButton,
            {
              backgroundColor: selectedCategory ? theme.primary : theme.border,
            },
          ]}
        >
          <Text style={styles.continueButtonText}>Continue</Text>

          <IconSymbol name="ChevronRightIcon" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
