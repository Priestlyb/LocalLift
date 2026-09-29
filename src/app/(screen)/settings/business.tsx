import React, { useState } from "react";

import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
  View,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { useBusinessSettings } from "@/hooks/business/useBusinessSettings";

import { BusinessInfoSection } from "@/components/business-settings/BusinessInfoSection";
import { LocationSection } from "@/components/business-settings/LocationSection";
import { ContactSection } from "@/components/business-settings/ContactSection";
import { BrandSection } from "@/components/business-settings/BrandSection";
import { SocialSection } from "@/components/business-settings/SocialSection";
import { AIImpactCard } from "@/components/business-settings/AIImpactCard";

export default function BusinessSettingsScreen() {
  const theme = useTheme();

  const {
    business,
    loading,
    saving,
    categories,
    toneOptions,
    updateField,
    saveBusiness,
  } = useBusinessSettings();

  /**
   * Password confirmation modal
   */
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  /**
   * Open password confirmation modal
   */
  const handleSave = () => {
    setPasswordError("");
    setCurrentPassword("");
    setPasswordModalVisible(true);
  };

  /**
   * Confirm password and save business
   */
  const handleConfirmSave = async () => {
    if (!currentPassword.trim()) {
      setPasswordError("Please enter your current password.");

      return;
    }

    try {
      setPasswordError("");

      await saveBusiness(currentPassword);

      /**
       * Password is no longer needed after
       * the request has completed.
       */
      setCurrentPassword("");

      setPasswordModalVisible(false);

      console.log("Business updated successfully.");
    } catch (error: any) {
      console.error("[SAVE BUSINESS ERROR]", error);

      setPasswordError(error?.message || "Unable to update business.");
    }
  };

  /**
   * Close password modal
   */
  const handleClosePasswordModal = () => {
    if (saving) return;

    setPasswordModalVisible(false);
    setCurrentPassword("");
    setPasswordError("");
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: 55,
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <BusinessInfoSection
            business={business}
            updateField={updateField}
            categories={categories}
            toneOptions={toneOptions}
          />

          <LocationSection business={business} updateField={updateField} />

          <ContactSection business={business} updateField={updateField} />

          <BrandSection business={business} updateField={updateField} />

          <SocialSection business={business} updateField={updateField} />

          <TouchableOpacity
            disabled={saving}
            onPress={handleSave}
            style={{
              marginTop: 30,
              backgroundColor: theme.primary,
              paddingVertical: 15,
              borderRadius: 14,
              alignItems: "center",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "800",
                  fontSize: 16,
                }}
              >
                Save Business Profile
              </Text>
            )}
          </TouchableOpacity>

          <AIImpactCard />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Password Confirmation Modal */}
      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleClosePasswordModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.background,
              borderRadius: 20,
              padding: 24,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 21,
                fontWeight: "800",
                marginBottom: 8,
              }}
            >
              Confirm Changes
            </Text>

            <Text
              style={{
                color: theme.text,
                opacity: 0.7,
                fontSize: 14,
                lineHeight: 21,
                marginBottom: 20,
              }}
            >
              For your security, enter your current password to save your
              business changes.
            </Text>

            <TextInput
              value={currentPassword}
              onChangeText={(value) => {
                setCurrentPassword(value);
                setPasswordError("");
              }}
              placeholder="Current password"
              placeholderTextColor={theme.text + "80"}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!saving}
              style={{
                borderWidth: 1,
                borderColor: passwordError ? "#DC2626" : theme.text + "25",
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 13,
                color: theme.text,
                fontSize: 15,
                marginBottom: 8,
              }}
            />

            {passwordError ? (
              <Text
                style={{
                  color: "#DC2626",
                  fontSize: 13,
                  marginBottom: 12,
                }}
              >
                {passwordError}
              </Text>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                disabled={saving}
                onPress={handleClosePasswordModal}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: theme.text + "12",
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

              <TouchableOpacity
                disabled={saving}
                onPress={handleConfirmSave}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: theme.primary,
                  opacity: saving ? 0.6 : 1,
                }}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "800",
                    }}
                  >
                    Confirm & Save
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
