import React, { useState } from "react";
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

import { useTheme } from "@/hooks/useTheme";
import { useStaffInvite } from "@/hooks/user/useStaffInvite";
import { Colors } from "@/constants/colors";

type Theme = typeof Colors.light;

export default function InviteStaff() {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate: inviteStaff, isPending } = useStaffInvite();

  const handleInvite = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      Alert.alert("Validation", "Please enter the staff member's name.");
      return;
    }

    if (!trimmedEmail) {
      Alert.alert("Validation", "Please enter an email address.");
      return;
    }

    inviteStaff(
      {
        name: trimmedName,
        email: trimmedEmail,
      },
      {
        onSuccess: (response) => {
          Alert.alert(
            "Invitation Sent",
            response.message ||
              "The staff invitation has been sent successfully.",
          );

          setName("");
          setEmail("");
        },

        onError: (error: Error) => {
          Alert.alert(
            "Invite Failed",
            error.message || "Unable to send staff invitation.",
          );
        },
      },
    );
  };

  const styles = createStyles(theme);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Invite Staff</Text>

        <Text style={styles.subtitle}>
          Send an invitation to a staff member. They will create their password
          when they accept the invitation.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="John Staff"
            placeholderTextColor={theme.textSecondary}
            style={styles.input}
            autoCapitalize="words"
            autoCorrect={false}
            editable={!isPending}
            returnKeyType="next"
          />

          <Text style={styles.label}>Email</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="john@example.com"
            placeholderTextColor={theme.textSecondary}
            style={styles.input}
            editable={!isPending}
            returnKeyType="done"
            onSubmitEditing={handleInvite}
          />

          <TouchableOpacity
            style={[styles.button, isPending && styles.buttonDisabled]}
            disabled={isPending}
            onPress={handleInvite}
            activeOpacity={0.8}
          >
            {isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Invite Staff</Text>
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
      paddingTop: 55,
      backgroundColor: theme.background,
    },

    content: {
      padding: 20,
      paddingTop: 40,
      paddingBottom: 40,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.text,
    },

    subtitle: {
      marginTop: 6,
      marginBottom: 30,
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
      paddingVertical: 20,
      color: theme.text,
      fontSize: 16,
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
  });
