import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { useAcceptStaffInvitation } from "@/hooks/user/useAcceptStaffInvitation";
import { Colors } from "@/constants/colors";

type Theme = typeof Colors.light;

export default function AcceptStaffInvitation() {
  const theme = useTheme();

  const params = useLocalSearchParams<{
    token?: string | string[];
  }>();

  const token = useMemo(() => {
    if (Array.isArray(params.token)) {
      return params.token[0]?.trim() ?? "";
    }

    return params.token?.trim() ?? "";
  }, [params.token]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const {
    mutate: acceptInvitation,
    isPending,
  } = useAcceptStaffInvitation();

  const handleAcceptInvitation = () => {
    if (!token) {
      Alert.alert(
        "Invalid Invitation",
        "This invitation link is invalid or incomplete.",
      );
      return;
    }

    if (!password) {
      Alert.alert(
        "Validation",
        "Please enter a password.",
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Validation",
        "Password must be at least 8 characters long.",
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Validation",
        "Passwords do not match.",
      );
      return;
    }

    acceptInvitation(
      {
        token,
        password,
      },
      {
        onSuccess: (response) => {
          Alert.alert(
            "Invitation Accepted",
            response.message ||
              "Your staff account has been created successfully.",
            [
              {
                text: "Continue",
                onPress: () => {
                  /**
                   * The backend returns the JWT here.
                   *
                   * If your auth store already has a login/setAuth
                   * method, save response.token and response.user there
                   * before navigating.
                   */
                  router.replace("/");
                },
              },
            ],
          );

          setPassword("");
          setConfirmPassword("");
        },

        onError: (error: Error) => {
          Alert.alert(
            "Unable to Accept Invitation",
            error.message ||
              "This invitation could not be accepted.",
          );
        },
      },
    );
  };

  const styles = createStyles(theme);

  if (!token) {
    return (
      <View style={styles.container}>
        <View style={styles.invalidContainer}>
          <Text style={styles.invalidTitle}>
            Invalid Invitation
          </Text>

          <Text style={styles.invalidMessage}>
            This staff invitation link is missing a
            valid invitation token.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Go Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            Accept Invitation
          </Text>

          <Text style={styles.subtitle}>
            Create a password to activate your staff
            account.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={
              theme.textSecondary
            }
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isPending}
            textContentType="newPassword"
            autoComplete="password-new"
            returnKeyType="next"
          />

          <Text style={styles.helperText}>
            Password must be at least 8 characters.
          </Text>

          <Text style={styles.label}>
            Confirm Password
          </Text>

          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor={
              theme.textSecondary
            }
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isPending}
            textContentType="newPassword"
            autoComplete="password-new"
            returnKeyType="done"
            onSubmitEditing={
              handleAcceptInvitation
            }
          />

          <TouchableOpacity
            style={[
              styles.button,
              isPending &&
                styles.buttonDisabled,
            ]}
            disabled={isPending}
            onPress={handleAcceptInvitation}
            activeOpacity={0.8}
          >
            {isPending ? (
              <ActivityIndicator
                color="#FFFFFF"
              />
            ) : (
              <Text style={styles.buttonText}>
                Accept Invitation
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    content: {
      flexGrow: 1,
      padding: 20,
      paddingTop: 90,
      paddingBottom: 40,
      justifyContent: "center",
    },

    header: {
      marginBottom: 30,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.text,
    },

    subtitle: {
      marginTop: 8,
      color: theme.textSecondary,
      fontSize: 15,
      lineHeight: 22,
    },

    form: {
      gap: 14,
    },

    label: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 18,
      color: theme.text,
      fontSize: 16,
    },

    helperText: {
      marginTop: -6,
      color: theme.textSecondary,
      fontSize: 13,
    },

    button: {
      marginTop: 20,
      height: 55,
      borderRadius: 12,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },

    buttonDisabled: {
      opacity: 0.6,
    },

    buttonText: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 16,
    },

    invalidContainer: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },

    invalidTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 10,
    },

    invalidMessage: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.textSecondary,
      marginBottom: 30,
    },
  });