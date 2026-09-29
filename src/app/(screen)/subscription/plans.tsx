import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { useSubscription } from "@/hooks/useSubscription";

import { SUBSCRIPTION_PLANS } from "@/constants/subscriptionPlans";
import type { SubscriptionPlanUI } from "@/constants/subscriptionPlans";

import { subscriptionStyles as styles } from "@/styles/subscription.styles";

import { IconSymbol } from "@/constants/icons/icon-symbol";

import { upgradeSubscriptionPayment } from "@/services/payment.service";

import { useAuthStore } from "@/store/authStore";

export default function PlansScreen() {
  const theme = useTheme();

  const token = useAuthStore((state) => state.token);

  const { subscription, changePlan, loading } = useSubscription();

  /**
   * A plan is only considered the current plan
   * when the subscription is actually ACTIVE.
   *
   * This is important because an expired GROWTH
   * subscription should allow the user to renew
   * GROWTH again.
   */
  const isSubscriptionActive =
    subscription?.status === "ACTIVE" &&
    (!subscription?.expiresAt || new Date(subscription.expiresAt) > new Date());

  /**
   * Current active plan.
   *
   * If the subscription has expired/cancelled,
   * treat the user as being on FREE for the
   * purpose of selecting a plan.
   */
  const currentPlan: SubscriptionPlanUI["id"] = isSubscriptionActive
    ? (subscription?.plan ?? "FREE")
    : "FREE";

  /**
   * The user's previous paid plan.
   *
   * This is useful for displaying "Renew Plan"
   * when an expired subscription is shown.
   */
  const expiredPlan =
    !isSubscriptionActive && subscription?.plan && subscription.plan !== "FREE"
      ? subscription.plan
      : null;

  /**
   * Whether the subscription is expired.
   */
  const isExpired = subscription?.status === "EXPIRED";

  /**
   * Handle selecting a plan.
   */
  const handleSelectPlan = async (plan: SubscriptionPlanUI) => {
    /**
     * If the subscription is active and
     * the user selects the same plan,
     * don't allow another selection.
     */
    if (isSubscriptionActive && plan.id === currentPlan) {
      Alert.alert("Current Plan", "You're already using this plan.");

      return;
    }

    try {
      /**
       * RENEW EXPIRED PLAN
       *
       * If the user's previous paid plan
       * has expired and they select that
       * same plan again, start payment.
       */
      const isRenewal = isExpired && expiredPlan === plan.id;

      if (isRenewal) {
        if (!token) {
          Alert.alert("Authentication Error", "Please sign in again.");

          return;
        }

        const payment = await upgradeSubscriptionPayment(token, plan.id);

        router.push({
          pathname: "/(screen)/payments/payment",
          params: {
            paymentUrl: payment.authorizationUrl,
          },
        });

        return;
      }

      /**
       * If the user currently has no active
       * paid subscription, selecting any
       * paid plan requires payment.
       *
       * This includes:
       * - FREE → STARTER
       * - FREE → GROWTH
       * - FREE → PRO
       * - EXPIRED → any paid plan
       * - CANCELLED → any paid plan
       */
      if (!isSubscriptionActive && plan.id !== "FREE") {
        if (!token) {
          Alert.alert("Authentication Error", "Please sign in again.");

          return;
        }

        const payment = await upgradeSubscriptionPayment(token, plan.id);

        router.push({
          pathname: "/(screen)/payments/payment",
          params: {
            paymentUrl: payment.authorizationUrl,
          },
        });

        return;
      }

      /**
       * FREE
       *
       * If the user selects FREE while
       * they have an active paid subscription,
       * schedule a downgrade.
       */
      if (isSubscriptionActive && plan.id === "FREE") {
        await changePlan(plan.id);

        Alert.alert(
          "Success",
          "Your plan change has been scheduled for your next billing cycle.",
        );

        router.back();

        return;
      }

      /**
       * UPGRADE
       *
       * Requires payment.
       */
      if (plan.level > SUBSCRIPTION_PLANS[currentPlan].level) {
        if (!token) {
          Alert.alert("Authentication Error", "Please sign in again.");

          return;
        }

        const payment = await upgradeSubscriptionPayment(token, plan.id);

        router.push({
          pathname: "/(screen)/payments/payment",
          params: {
            paymentUrl: payment.authorizationUrl,
          },
        });

        return;
      }

      /**
       * DOWNGRADE
       *
       * Schedule the downgrade for the
       * next billing cycle.
       */
      await changePlan(plan.id);

      Alert.alert(
        "Success",
        "Your plan change has been scheduled for your next billing cycle.",
      );

      router.back();
    } catch (error: any) {
      console.log("[PLAN ERROR]", error);

      console.log("[PLAN ERROR RESPONSE]", error?.response?.data);

      Alert.alert(
        "Error",
        error?.response?.data?.message ??
          error?.message ??
          "Failed to continue.",
      );
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
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
          >
            Choose a Plan
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            {isExpired
              ? "Your previous subscription has expired. Renew your plan or choose a new one."
              : "Upgrade instantly or schedule a downgrade for your next billing cycle."}
          </Text>
        </View>

        {Object.values(SUBSCRIPTION_PLANS).map((plan) => {
          /**
           * Only an ACTIVE subscription can
           * make a plan the current plan.
           */
          const isCurrent = isSubscriptionActive && currentPlan === plan.id;

          /**
           * This is the plan that the user
           * previously had before it expired.
           */
          const isRenewal = isExpired && expiredPlan === plan.id;

          /**
           * FREE is not a paid renewal.
           */
          const isFreePlan = plan.id === "FREE";

          /**
           * Determine button text.
           */
          let buttonText = "Select Plan";

          if (isCurrent) {
            buttonText = "Current Plan";
          } else if (isRenewal) {
            buttonText = "Renew Plan";
          }

          return (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                {
                  backgroundColor: theme.card,
                  borderColor: isCurrent
                    ? theme.primary
                    : isRenewal
                      ? theme.primary
                      : theme.border,
                },
              ]}
            >
              {plan.popular && (
                <Text
                  style={[
                    styles.badge,
                    {
                      color: theme.primary,
                    },
                  ]}
                >
                  Most Popular
                </Text>
              )}

              <Text
                style={[
                  styles.planName,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {plan.name}
              </Text>

              <Text
                style={[
                  styles.price,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {plan.price}
              </Text>

              <View style={styles.features}>
                {plan.features.map((feature) => (
                  <View key={feature} style={styles.featureItem}>
                    <IconSymbol
                      name="CheckCircleIcon"
                      size={16}
                      color={theme.primary}
                    />

                    <Text
                      style={[
                        styles.featureText,
                        {
                          color: theme.textSecondary,
                        },
                      ]}
                    >
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                disabled={loading || isCurrent}
                activeOpacity={0.85}
                onPress={() => handleSelectPlan(plan)}
                style={[
                  styles.selectButton,
                  {
                    backgroundColor: isCurrent ? theme.border : theme.primary,
                  },
                ]}
              >
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
