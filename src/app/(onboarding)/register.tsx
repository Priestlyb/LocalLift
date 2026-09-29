import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { registerStyles as styles } from "@/styles/register.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function RegisterScreen() {
  const theme = useTheme();
  const { sendRegistrationOtp, loading, error } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [localError, setLocalError] = useState("");

  const isValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword &&
    acceptedTerms;

  const handleRegister = async () => {
    if (!isValid || loading) return;

    try {
      setLocalError("");

      await sendRegistrationOtp({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      router.push({
        pathname: "/(onboarding)/verify-registration",
        params: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
        },
      });
    } catch (err: any) {
      console.log(err);

      setLocalError(err?.message ?? "Unable to send verification code.");
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
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

          {/* Progress */}
          <View style={styles.progressWrapper}>
            <View
              style={[styles.progressTrack, { backgroundColor: theme.border }]}
            >
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: theme.primary },
                ]}
              />
            </View>

            <Text style={[styles.progressText, { color: theme.textSecondary }]}>
              Step 3 of 3
            </Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.heading, { color: theme.text }]}>
              Create your account
            </Text>

            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              Your business profile is ready. Create an account to save your AI
              workspace.
            </Text>
          </View>

          {/* Name */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.text }]}>Full Name</Text>

            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <IconSymbol
                name="UserIcon"
                size={18}
                color={theme.textSecondary}
              />

              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your full name"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text }]}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.text }]}>
              Email Address
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
              <IconSymbol
                name="EmailIcon"
                size={18}
                color={theme.textSecondary}
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="you@example.com"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text }]}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.text }]}>Password</Text>

            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <IconSymbol
                name="LockIcon"
                size={18}
                color={theme.textSecondary}
              />

              <TextInput
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholder="Create password"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text }]}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <IconSymbol
                  name={showPassword ? "EyeInvisibleIcon" : "EyeIcon"}
                  size={18}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.text }]}>
              Confirm Password
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
              <IconSymbol
                name="LockIcon"
                size={18}
                color={theme.textSecondary}
              />

              <TextInput
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm password"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text }]}
              />

              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <IconSymbol
                  name={showConfirmPassword ? "EyeInvisibleIcon" : "EyeIcon"}
                  size={18}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: acceptedTerms ? theme.primary : theme.border,
                  backgroundColor: acceptedTerms
                    ? theme.primary
                    : "transparent",
                },
              ]}
            >
              {acceptedTerms && (
                <IconSymbol name="CheckCircleIcon" size={14} color="#fff" />
              )}
            </View>

            <Text style={[styles.termsText, { color: theme.textSecondary }]}>
              I agree to the Terms & Privacy Policy
            </Text>
          </TouchableOpacity>

          {/* Errors */}
          {!!error && (
            <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
          )}

          {!!localError && (
            <Text style={{ color: "red", marginTop: 10 }}>{localError}</Text>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            disabled={!isValid || loading}
            onPress={handleRegister}
            style={[
              styles.continueButton,
              {
                backgroundColor:
                  isValid && !loading ? theme.primary : theme.border,
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
                <Text style={styles.continueButtonText}>Create Account</Text>
                <IconSymbol name="ChevronForwardIcon" size={18} color="#fff" />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(onboarding)/login")}>
            <Text style={[styles.loginText, { color: theme.primary }]}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
