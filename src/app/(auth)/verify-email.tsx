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
import { getStyles } from "@/styles/verify-email.styles";

export default function VerifyEmailScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { loading } = useAuth();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    try {
      setError("");

      if (!token || !password) {
        setError("All fields are required");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // 🔴 Replace with real API later
      // await resetPassword({ token, password });

      setSuccess(true);

      setTimeout(() => {
        router.replace("/(onboarding)/login");
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "Reset failed");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your reset code and new password
        </Text>

        {!success ? (
          <>
            <TextInput
              placeholder="Reset Token / Code"
              placeholderTextColor={theme.textSecondary}
              value={token}
              onChangeText={setToken}
              style={styles.input}
              autoCapitalize="none"
            />

            <TextInput
              placeholder="New Password"
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />

            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={theme.textSecondary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleReset}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.background} />
              ) : (
                <Text style={styles.buttonText}>Reset Password</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              Password updated successfully 🎉
            </Text>
            <Text style={styles.successSubText}>
              Redirecting to login...
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={() => router.replace("/(onboarding)/login")}>
          <Text style={styles.link}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}