import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { useDashboard } from "@/hooks/useDashboard";
import { useSubscription } from "@/hooks/useSubscription";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BusinessHeroCard from "@/components/dashboard/BusinessHeroCard";
import AnalyticsSnapshot from "@/components/dashboard/AnalyticsSnapshot";
import QuickActions from "@/components/dashboard/QuickActions";
import AIInsightCard from "@/components/dashboard/AIInsightCard";
import AIRecommendationsCard from "@/components/dashboard/AIRecommendationsCard";
import RecentContentCard from "@/components/dashboard/RecentContentCard";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";

import { dashboardStyles as styles } from "@/styles/dashboard.styles";

export default function DashboardScreen() {
  const theme = useTheme();

  const { auth } = useDashboard();

  const { subscription, limits, fetchSubscription, refreshUsage } =
    useSubscription();

  const [usedGenerations, setUsedGenerations] = useState(0);

  /**
   * Fetch subscription and usage data.
   */
  useEffect(() => {
    if (!auth?.user) {
      return;
    }

    const loadSubscriptionData = async () => {
      try {
        const subscriptionResponse = await fetchSubscription();

        console.log("💳 SUBSCRIPTION RESPONSE:", subscriptionResponse);

        const usageResponse = await refreshUsage();

        console.log("📊 USAGE RESPONSE:", usageResponse);
      } catch (error) {
        console.error("❌ Failed to load subscription data:", error);
      }
    };

    loadSubscriptionData();
  }, [auth?.user]);

  /**
   * Log the actual subscription data.
   
  useEffect(() => {
    console.log("========== SUBSCRIPTION DATA ==========");

    console.log("💳 Subscription:", subscription);

    console.log("📋 Plan limits:", limits);

    console.log("🏷️ Current plan:", subscription?.plan ?? "FREE");

    console.log("📦 Subscription status:", subscription?.status);

    console.log("📅 Starts:", subscription?.startsAt);

    console.log("📅 Expires:", subscription?.expiresAt);

    console.log("🔢 Generation limit:", limits?.limits?.imageGenerations ?? 0);

    console.log("=======================================");
  }, [subscription, limits]);
  */

  if (!auth?.user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

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
        contentContainerStyle={styles.content}
      >
        <DashboardHeader />

        <BusinessHeroCard />

        <AnalyticsSnapshot />

        <QuickActions />

        <AIInsightCard />

        <AIRecommendationsCard />

        <RecentContentCard />

        <SubscriptionCard
          plan={subscription?.plan ?? "FREE"}
          usedGenerations={usedGenerations}
          totalGenerations={limits?.limits?.imageGenerations ?? 0}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
