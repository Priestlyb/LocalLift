import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useSubscriptionStatus } from "@/hooks/subscription/useSubscriptionStatus";
import {
  clearPaymentReference,
  verifyPayment,
} from "@/services/payment.service";

import { useBusiness } from "@/hooks/useBusiness";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PaymentVerifyingScreen() {
  const theme = useTheme();
  const { token } = useAuth();

  const hasNavigated = useRef(false);
  const hasVerified = useRef(false);

  const { createBusiness } = useBusiness();

  const [verificationError, setVerificationError] = useState("");

  const { reference } = useLocalSearchParams<{
    reference?: string;
  }>();

  const { loading, error, isActive, subscription, refresh } =
    useSubscriptionStatus({
      token: token ?? "",
      enabled: !!token,
      interval: 2000,
    });

  console.log("[Payment Verification] Render");
  console.log("[Payment Verification] Token:", !!token);
  console.log("[Payment Verification] Reference:", reference);

  /**
   * Debug subscription changes
   */
  useEffect(() => {
    console.log("[Payment Verification] Subscription:", subscription);

    console.log("[Payment Verification] isActive:", isActive);

    console.log("[Payment Verification] Loading:", loading);

    console.log("[Payment Verification] Error:", error);
  }, [subscription, isActive, loading, error]);

  /**
   * Verify payment
   */
  useEffect(() => {
    if (!token || !reference) {
      console.log("[Payment Verification] Waiting for token/reference...");
      return;
    }

    if (hasVerified.current) {
      console.log("[Payment Verification] Already verified.");
      return;
    }

    hasVerified.current = true;

    (async () => {
      try {
        console.log("[Payment Verification] Verifying:", reference);

        const result = await verifyPayment(token, reference);

        console.log(
          "[Payment Verification] verifyPayment result:",
          JSON.stringify(result, null, 2),
        );

        console.log("[Payment Verification] Refreshing subscription...");

        await refresh();

        console.log("[Payment Verification] Refresh complete.");
      } catch (err: any) {
        console.log("[Payment Verification] Failed:", err);

        setVerificationError(err?.message ?? "Unable to verify payment.");
      }
    })();
  }, [token, reference, refresh]);

  /**
   * Navigate once active
   */
  useEffect(() => {
    console.log("[Payment Verification] Navigation check:", {
      isActive,
      plan: subscription?.plan,
      status: subscription?.status,
      hasNavigated: hasNavigated.current,
    });

    /**
     * Wait until the paid subscription has been activated.
     * A FREE subscription can also be ACTIVE, so don't navigate yet.
     */
    if (
      !subscription ||
      subscription.status !== "ACTIVE" ||
      subscription.plan === "FREE"
    ) {
      return;
    }

    if (hasNavigated.current) {
      return;
    }

    hasNavigated.current = true;

    (async () => {
      try {
        console.log("[Payment Verification] Clearing payment reference...");

        await clearPaymentReference();

        /**
         * Load onboarding information
         */
        const stored = await AsyncStorage.getItem("onboarding");

        if (!stored) {
          throw new Error("Business onboarding data is missing.");
        }

        const onboarding = JSON.parse(stored);

        console.log(
          "[Payment Verification] Onboarding data:",
          JSON.stringify(onboarding, null, 2),
        );

        console.log("[Payment Verification] Creating business...");

        const business = await createBusiness({
          businessName: onboarding.businessName,

          category: onboarding.category,

          description: onboarding.description,

          targetAudience: onboarding.targetAudience,

          uniqueSellingPoint: onboarding.uniqueSellingPoint,

          brandVoice: onboarding.brandVoice,

          phone: onboarding.phone,

          email: onboarding.email,

          website: onboarding.website,

          address: onboarding.address,

          city: onboarding.city,

          state: onboarding.state,

          country: onboarding.country,

          logo: onboarding.logo ?? "",

          primaryColor: onboarding.primaryColor ?? "#000000",

          secondaryColor: onboarding.secondaryColor ?? "#FFFFFF",

          facebook: onboarding.facebook ?? "",

          instagram: onboarding.instagram ?? "",

          x: onboarding.x ?? "",

          linkedin: onboarding.linkedin ?? "",

          tiktok: onboarding.tiktok ?? "",
        });

        console.log(
          "[Payment Verification] Business created:",
          JSON.stringify(business, null, 2),
        );

        /**
         * Cleanup onboarding data now that it's no longer needed.
         */
        await AsyncStorage.removeItem("onboarding");

        console.log("[Payment Verification] Navigating to dashboard...");

        router.replace("/(tabs)/dashboard");
      } catch (err: any) {
        console.error("[Payment Verification] Business creation failed:", err);

        hasNavigated.current = false;

        setVerificationError(err?.message ?? "Failed to create your business.");
      }
    })();
  }, [subscription, isActive]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.content}>
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          Verifying Payment
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          Please wait while we confirm your subscription.
          {"\n"}
          This usually takes just a few seconds.
        </Text>

        {!!reference && (
          <Text
            style={[
              styles.reference,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Reference: {reference}
          </Text>
        )}

        {loading && (
          <Text
            style={[
              styles.status,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Checking subscription status...
          </Text>
        )}

        {!!verificationError && (
          <Text
            style={[
              styles.error,
              {
                color: "#EF4444",
              },
            ]}
          >
            {verificationError}
          </Text>
        )}

        {!!error && (
          <>
            <Text
              style={[
                styles.error,
                {
                  color: "#EF4444",
                },
              ]}
            >
              {error}
            </Text>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: theme.primary,
                },
              ]}
              onPress={refresh}
            >
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  title: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },

  reference: {
    marginTop: 12,
    fontSize: 13,
    textAlign: "center",
  },

  status: {
    marginTop: 20,
    fontSize: 14,
  },

  error: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 15,
  },

  button: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
