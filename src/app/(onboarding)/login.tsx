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

import { useAuth } from "@/hooks/useAuth";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { useTheme } from "@/hooks/useTheme";
import { getStyles } from "@/styles/login.styles";

export default function LoginScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { login, getHomeRoute } = useAuth();

  const { login: googleLogin, loading: googleLoading } = useGoogleLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await login(email.trim().toLowerCase(), password);

      router.replace(getHomeRoute() as any);
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");

      await googleLogin();

      router.replace(getHomeRoute() as any);
    } catch (err: any) {
      setError(err?.message ?? "Google sign-in failed");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>

        <Text style={styles.subtitle}>Login to continue to LocalLift</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.textSecondary}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => router.push("/(onboarding)/forgot-password")}
          >
            <Text
              style={[
                styles.link,
                {
                  alignSelf: "flex-end",
                  marginBottom: 16,
                },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {!!error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.background} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                marginTop: 14,
                backgroundColor: theme.card,
                borderWidth: 1,
                borderColor: theme.border,
              },
            ]}
            disabled={googleLoading}
            onPress={handleGoogleLogin}
          >
            {googleLoading ? (
              <ActivityIndicator color={theme.text} />
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: theme.text,
                  },
                ]}
              >
                Continue with Google
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(onboarding)/business-category")}
          >
            <Text style={styles.link}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
