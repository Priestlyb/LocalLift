import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { getStyles } from "@/styles/forgot-password.styles";

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { loading } = useAuth(); // optional if your backend supports reset

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");

      // ⚠️ Replace this with your real API later if available
      // await authRequestPasswordReset(email);

      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we’ll send you reset instructions
        </Text>

        {!sent ? (
          <>
            <TextInput
              placeholder="Email"
              placeholderTextColor={theme.textSecondary}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.background} />
              ) : (
                <Text style={styles.buttonText}>Send Reset Link</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              If an account exists, a reset link has been sent.
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.replace("/(onboarding)/login")}
            >
              <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          onPress={() => router.replace("/(onboarding)/login")}
        >
          <Text style={styles.link}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}