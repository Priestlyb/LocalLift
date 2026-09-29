import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/store/authStore";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function ProfileScreen() {
  const theme = useTheme();

  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const loading = useAuthStore((state) => state.loading);
  const refreshProfile = useAuthStore((state) => state.refreshProfile);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
  });

  /**
   * Password verification modal
   */
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");

  const [saving, setSaving] = useState(false);

  /**
   * SYNC STORE → LOCAL STATE
   */
  useEffect(() => {
    if (!user) return;

    setProfile({
      fullName: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "",
    });
  }, [user]);

  /**
   * UPDATE FIELD
   */
  const updateField = (key: keyof typeof profile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * OPEN PASSWORD VERIFICATION MODAL
   *
   * Called when the user presses Save Profile.
   */
  const handleSave = () => {
    const name = profile.fullName.trim();
    const email = profile.email.trim().toLowerCase();

    /**
     * Validate profile fields first.
     */
    if (!name) {
      Alert.alert("Missing Name", "Please enter your full name.");
      return;
    }

    if (!email) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }

    /**
     * Clear any previous password.
     */
    setCurrentPassword("");

    /**
     * Open verification modal.
     */
    setPasswordModalVisible(true);
  };

  /**
   * CANCEL PASSWORD VERIFICATION
   */
  const handleCancelPasswordVerification = () => {
    if (saving || loading) return;

    setCurrentPassword("");
    setPasswordModalVisible(false);
  };

  /**
   * CONFIRM PASSWORD + UPDATE PROFILE
   */
  const handleConfirmUpdate = async () => {
    const name = profile.fullName.trim();
    const email = profile.email.trim().toLowerCase();
    const password = currentPassword.trim();

    if (!password) {
      Alert.alert("Password Required", "Please enter your current password.");
      return;
    }

    try {
      setSaving(true);

      await updateProfile({
        name,
        email,
        currentPassword: password,
      });

      /**
       * Refresh profile from backend.
       */
      await refreshProfile();

      /**
       * Clear sensitive password data.
       */
      setCurrentPassword("");

      /**
       * Close modal.
       */
      setPasswordModalVisible(false);

      Alert.alert(
        "Profile Updated",
        "Your profile has been updated successfully.",
      );

      console.log("Profile updated successfully");
    } catch (err: any) {
      console.log("Profile update failed", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to update your profile. Please try again.";

      Alert.alert("Update Failed", message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  const isSaving = saving || loading;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 55,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <Text
          style={{
            color: theme.textSecondary,
            fontSize: 13,
          }}
        >
          Account Profile
        </Text>

        <Text
          style={{
            color: theme.text,
            fontSize: 22,
            fontWeight: "800",
            marginTop: 4,
          }}
        >
          Personal Information
        </Text>

        {/* AVATAR */}
        <View
          style={{
            alignItems: "center",
            marginTop: 25,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconSymbol name="UserIcon" size={34} color={theme.primary} />
          </View>

          <TouchableOpacity
            style={{
              marginTop: 10,
            }}
            disabled={isSaving}
          >
            <Text
              style={{
                color: theme.primary,
                fontWeight: "700",
                fontSize: 13,
              }}
            >
              Change Logo Picture
            </Text>
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <View
          style={{
            gap: 14,
          }}
        >
          {/* FULL NAME */}
          <View>
            <Text
              style={{
                color: theme.text,
                marginBottom: 6,
              }}
            >
              Full Name
            </Text>

            <TextInput
              placeholder="John Doe"
              placeholderTextColor={theme.textSecondary}
              value={profile.fullName}
              onChangeText={(value) => updateField("fullName", value)}
              autoCapitalize="words"
              editable={!isSaving}
              style={{
                backgroundColor: theme.card,
                borderWidth: 1,
                borderColor: theme.border,
                padding: 12,
                borderRadius: 12,
                color: theme.text,
              }}
            />
          </View>

          {/* EMAIL */}
          <View>
            <Text
              style={{
                color: theme.text,
                marginBottom: 6,
              }}
            >
              Email Address
            </Text>

            <TextInput
              placeholder="example@email.com"
              placeholderTextColor={theme.textSecondary}
              value={profile.email}
              onChangeText={(value) => updateField("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isSaving}
              style={{
                backgroundColor: theme.card,
                borderWidth: 1,
                borderColor: theme.border,
                padding: 12,
                borderRadius: 12,
                color: theme.text,
              }}
            />
          </View>
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={isSaving}
          activeOpacity={0.8}
          style={{
            marginTop: 25,
            backgroundColor: theme.primary,
            padding: 14,
            borderRadius: 14,
            alignItems: "center",
            opacity: isSaving ? 0.6 : 1,
          }}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={{
                color: "#fff",
                fontWeight: "800",
              }}
            >
              Save Profile
            </Text>
          )}
        </TouchableOpacity>

        {/* INFO BOX */}
        <View
          style={{
            marginTop: 20,
            padding: 14,
            borderRadius: 14,
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <IconSymbol
              name="ShieldCheckIcon"
              size={18}
              color={theme.emerald}
            />

            <Text
              style={{
                color: theme.text,
                fontWeight: "700",
              }}
            >
              Privacy Notice
            </Text>
          </View>

          <Text
            style={{
              color: theme.textSecondary,
              marginTop: 6,
              fontSize: 13,
              lineHeight: 18,
            }}
          >
            Your personal information is used only to personalize your
            experience and improve AI-generated content across LocalLift.
          </Text>
        </View>
      </ScrollView>

      {/* ====================================================== */}
      {/* PASSWORD VERIFICATION MODAL */}
      {/* ====================================================== */}

      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelPasswordVerification}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.55)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 20,
              padding: 22,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            {/* MODAL ICON */}
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: theme.background,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginBottom: 14,
              }}
            >
              <IconSymbol
                name="ShieldCheckIcon"
                size={26}
                color={theme.primary}
              />
            </View>

            {/* TITLE */}
            <Text
              style={{
                color: theme.text,
                fontSize: 20,
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              Verify Your Identity
            </Text>

            {/* DESCRIPTION */}
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: 13,
                lineHeight: 19,
                textAlign: "center",
                marginTop: 8,
                marginBottom: 20,
              }}
            >
              For your security, please enter your current password to confirm
              these profile changes.
            </Text>

            {/* PASSWORD INPUT */}
            <Text
              style={{
                color: theme.text,
                fontSize: 13,
                fontWeight: "600",
                marginBottom: 7,
              }}
            >
              Current Password
            </Text>

            <TextInput
              placeholder="Enter your current password"
              placeholderTextColor={theme.textSecondary}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isSaving}
              autoFocus
              style={{
                backgroundColor: theme.background,
                borderWidth: 1,
                borderColor: theme.border,
                padding: 13,
                borderRadius: 12,
                color: theme.text,
              }}
            />

            {/* BUTTONS */}
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
              }}
            >
              {/* CANCEL */}
              <TouchableOpacity
                onPress={handleCancelPasswordVerification}
                disabled={isSaving}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  padding: 13,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.border,
                  alignItems: "center",
                  opacity: isSaving ? 0.5 : 1,
                }}
              >
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "700",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              {/* CONFIRM */}
              <TouchableOpacity
                onPress={handleConfirmUpdate}
                disabled={isSaving || !currentPassword.trim()}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  padding: 13,
                  borderRadius: 12,
                  backgroundColor: theme.primary,
                  alignItems: "center",
                  opacity: isSaving || !currentPassword.trim() ? 0.5 : 1,
                }}
              >
                {isSaving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "800",
                    }}
                  >
                    Confirm Update
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
