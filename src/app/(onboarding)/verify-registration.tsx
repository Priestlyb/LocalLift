import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { startSubscriptionPayment } from "@/services/payment.service";
import { registerStyles as styles } from "@/styles/register.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function verifyRegistrationOtpScreen() {
  const theme = useTheme();

  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const { verifyRegistrationOtp, resendRegistrationOtp, loading, error } =
    useAuth();

  const [otp, setOtp] = useState("");

  const [seconds, setSeconds] = useState(60);

  const [resending, setResending] = useState(false);

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleVerify = async () => {
    if (otp.length !== 6 || loading) return;

    try {
      setLocalError("");

      await verifyRegistrationOtp({
        email,
        otp,
      });

      /**
       * Auth token should now exist
       */
      const token = useAuthStore.getState().token;

      if (!token) {
        throw new Error("Unable to authenticate user.");
      }

      /**
       * Initialize subscription payment
       */
      const payment = await startSubscriptionPayment(token);

      router.replace({
        pathname: "/payments/payment",
        params: {
          paymentUrl: payment.authorizationUrl,
          reference: payment.reference,
        },
      });
    } catch (err: any) {
      console.log(err);

      setLocalError(err?.message ?? "Verification failed.");
    }
  };

  const handleResend = async () => {
    if (seconds > 0 || resending) return;

    try {
      setResending(true);
      setLocalError("");

      await resendRegistrationOtp(email);

      setSeconds(60);
    } catch (err: any) {
      setLocalError(err?.message ?? "Unable to resend verification code.");
    } finally {
      setResending(false);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="ChevronLeft" size={22} color={theme.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text
              style={[
                styles.heading,
                {
                  color: theme.text,
                },
              ]}
            >
              Verify your email
            </Text>

            <Text
              style={[
                styles.subheading,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              Enter the 6-digit code sent to
            </Text>

            <Text
              style={{
                color: theme.primary,
                marginTop: 6,
                fontWeight: "600",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {email}
            </Text>
          </View>

          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                {
                  color: theme.text,
                },
              ]}
            >
              Verification Code
            </Text>

            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <TextInput
                value={otp}
                onChangeText={(value) => setOtp(value.replace(/\D/g, ""))}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="000000"
                placeholderTextColor={theme.textSecondary}
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    fontSize: 24,
                    letterSpacing: 10,
                    textAlign: "center",
                  },
                ]}
              />
            </View>
          </View>

          {!!error && (
            <Text
              style={{
                color: "red",
                marginTop: 10,
              }}
            >
              {error}
            </Text>
          )}

          {!!localError && (
            <Text
              style={{
                color: "red",
                marginTop: 10,
              }}
            >
              {localError}
            </Text>
          )}

          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginTop: 30,
            }}
            disabled={seconds > 0 || resending}
            onPress={handleResend}
          >
            {resending ? (
              <ActivityIndicator color={theme.primary} />
            ) : (
              <Text
                style={{
                  color: seconds > 0 ? theme.textSecondary : theme.primary,
                  fontWeight: "600",
                }}
              >
                {seconds > 0 ? `Resend Code (${seconds}s)` : "Resend Code"}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            disabled={otp.length !== 6 || loading}
            onPress={handleVerify}
            style={[
              styles.continueButton,
              {
                backgroundColor:
                  otp.length === 6 && !loading ? theme.primary : theme.border,

                flexDirection: "row",

                justifyContent: "center",

                alignItems: "center",

                gap: 8,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.continueButtonText}>Verify Email</Text>

                <IconSymbol name="ChevronForwardIcon" size={18} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
