import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Logo from "@/assets/images/icon.png";
import { IconSymbol } from "@/constants/icons/icon-symbol";
import { useTheme } from "@/hooks/useTheme";
import { welcomeStyles as styles } from "@/styles/welcome.styles";

const SUBSCRIPTION_PLAN_KEY = "subscription_plan";

const plans = [
  {
    id: "BEGINNER",
    title: "Beginner",
    price: "Free",
    desc: "Basic content generation for small businesses starting out.",
  },
  {
    id: "STARTER",
    title: "Starter",
    price: "₦5,000 / month",
    desc: "Unlimited AI content, templates, and campaign scheduling.",
    featured: true,
  },
  {
    id: "GROWTH",
    title: "Growth",
    price: "₦10,000 / month",
    desc: "Unlimited AI content, templates, and campaign scheduling.",
    featured: true,
  },
  {
    id: "PRO",
    title: "Pro",
    price: "₦20,000 / month",
    desc: "Team access, analytics, and advanced automation tools.",
  },
];

export default function WelcomeScreen() {
  const theme = useTheme();

  const [selectedPlan, setSelectedPlan] = useState("BEGINNER");

  const handleSelectPlan = async (plan: string) => {
    try {
      await AsyncStorage.setItem(
        SUBSCRIPTION_PLAN_KEY,
        JSON.stringify({
          provider: "PAYSTACK",
          plan,
        }),
      );

      setSelectedPlan(plan);
    } catch (error) {
      console.log("Failed to save selected plan", error);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <View
            style={[
              styles.logoCircle,
              {
                backgroundColor: theme.card,
              },
            ]}
          >
            <Image source={Logo} style={styles.logo} />
          </View>

          <Text
            style={[
              styles.brandName,
              {
                color: theme.text,
              },
            ]}
          >
            LocalLift
          </Text>

          <Text
            style={[
              styles.tagline,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            AI Growth Engine for Local Businesses
          </Text>
        </View>

        <View style={styles.heroSection}>
          <View style={styles.iconRow}>
            <IconSymbol name={"SparklesIcon"} size={22} color={theme.emerald} />
            <IconSymbol name={"TrendingUp"} size={22} color={theme.primary} />
          </View>

          <Text
            style={[
              styles.heading,
              {
                color: theme.text,
              },
            ]}
          >
            Turn One Business Update Into a Full Marketing Campaign
          </Text>

          <Text
            style={[
              styles.subheading,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Create Instagram posts, WhatsApp broadcasts, flyers, emails, and
            Google updates in seconds using AI built for local businesses.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.text,
              },
            ]}
          >
            What You Can Do
          </Text>

          {[
            {
              icon: (
                <IconSymbol name="Megaphone" size={18} color={theme.primary} />
              ),
              text: "Generate marketing content instantly",
            },
            {
              icon: (
                <IconSymbol name="CashIcon" size={18} color={theme.emerald} />
              ),
              text: "Turn offers into multi-platform campaigns",
            },
            {
              icon: (
                <IconSymbol
                  name="BarChartIcon"
                  size={18}
                  color={theme.primary}
                />
              ),
              text: "Track engagement & performance insights",
            },
            {
              icon: (
                <IconSymbol
                  name="OutlineUserIcon"
                  size={18}
                  color={theme.emerald}
                />
              ),
              text: "Built for SMEs, shops, salons & restaurants",
            },
          ].map((item, index) => (
            <View
              key={index}
              style={[
                styles.featureCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              {item.icon}

              <Text
                style={[
                  styles.featureText,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item.text}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.previewCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.previewTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Example AI Output
          </Text>

          {[
            "Instagram Post Caption + Hashtags",
            "WhatsApp Broadcast Message",
            "Google Business Update",
            "Email Campaign Copy",
          ].map((item) => (
            <View
              key={item}
              style={[
                styles.previewItem,
                {
                  backgroundColor:
                    theme.background === "#020617" ? "#1E293B" : "#F1F5F9",
                },
              ]}
            >
              <Text
                style={[
                  styles.previewLabel,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.plansSection}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Choose Your Plan
          </Text>

          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <TouchableOpacity
                key={plan.id}
                activeOpacity={0.85}
                onPress={() => handleSelectPlan(plan.id)}
                style={[
                  styles.planCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: isSelected ? theme.primary : theme.border,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.planTitle,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  {plan.title}
                </Text>

                <Text
                  style={[
                    styles.planPrice,
                    {
                      color: theme.primary,
                    },
                  ]}
                >
                  {plan.price}
                </Text>

                <Text
                  style={[
                    styles.planDesc,
                    {
                      color: theme.textSecondary,
                    },
                  ]}
                >
                  {plan.desc}
                </Text>

                {isSelected && (
                  <Text
                    style={{
                      marginTop: 10,
                      color: theme.primary,
                      fontWeight: "700",
                    }}
                  >
                    ✓ Selected
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              {
                backgroundColor: theme.primary,
              },
            ]}
            onPress={() => router.push("/(onboarding)/business-category")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(onboarding)/login")}>
            <Text
              style={[
                styles.loginText,
                {
                  color: theme.primary,
                },
              ]}
            >
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
