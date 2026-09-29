import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";
import {
  IconSymbol,
  IconName,
} from "@/constants/icons/icon-symbol";

type FeedbackModalProps = {
  visible: boolean;
  title: string;
  message: string;

  buttonText?: string;
  secondaryButtonText?: string;
  dangerButtonText?: string;

  onClose: () => void;
  onSecondaryPress?: () => void;
  onDangerPress?: () => void;

  type?: "error" | "success" | "warning" | "info";
};

export default function FeedbackModal({
  visible,
  title,
  message,
  buttonText = "Okay",
  secondaryButtonText,
  dangerButtonText,
  onClose,
  onSecondaryPress,
  onDangerPress,
  type = "error",
}: FeedbackModalProps) {
  const theme = useTheme();

  /**
   * Icon based on notification type.
   */
  const iconName: IconName =
    type === "success"
      ? "CheckCircleIcon"
      : type === "warning"
        ? "QuestionCircle"
        : type === "info"
          ? "InfoCircleIcon"
          : "XCircleIcon";

  /**
   * Accent color based on notification type.
   */
  const iconColor =
    type === "success"
      ? theme.emerald
      : type === "error"
        ? "#DC2626"
        : type === "warning"
          ? "#F59E0B"
          : theme.primary;

  const hasActions =
    !!secondaryButtonText ||
    !!dangerButtonText ||
    !!buttonText;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.notification,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          {/* TOP ROW */}
          <View style={styles.topRow}>
            {/* ICON */}
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: `${iconColor}18`,
                },
              ]}
            >
              <IconSymbol
                name={iconName}
                size={24}
                color={iconColor}
              />
            </View>

            {/* CONTENT */}
            <View style={styles.content}>
              <Text
                numberOfLines={2}
                style={[
                  styles.title,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {title}
              </Text>

              <Text
                style={[
                  styles.message,
                  {
                    color: theme.textSecondary,
                  },
                ]}
              >
                {message}
              </Text>
            </View>

            {/* CLOSE */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              style={[
                styles.closeButton,
                {
                  backgroundColor: theme.background,
                },
              ]}
            >
              <IconSymbol
                name="CloseIcon"
                size={16}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {/* ACTIONS */}
          {hasActions && (
            <View style={styles.actions}>
              {/* SECONDARY */}
              {secondaryButtonText && onSecondaryPress && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onSecondaryPress}
                  style={[
                    styles.secondaryButton,
                    {
                      backgroundColor: theme.background,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.secondaryButtonText,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    {secondaryButtonText}
                  </Text>
                </TouchableOpacity>
              )}

              {/* DANGER */}
              {dangerButtonText && onDangerPress && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onDangerPress}
                  style={styles.dangerButton}
                >
                  <Text style={styles.actionText}>
                    {dangerButtonText}
                  </Text>
                </TouchableOpacity>
              )}

              {/* PRIMARY */}
              {buttonText && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onClose}
                  style={[
                    styles.primaryButton,
                    {
                      backgroundColor: theme.primary,
                    },
                  ]}
                >
                  <Text style={styles.actionText}>
                    {buttonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },

  notification: {
    width: "100%",
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,

    elevation: 8,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
    paddingRight: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 21,
  },

  message: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },

  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },

  primaryButton: {
    flex: 1,
    minHeight: 42,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButton: {
    flex: 1,
    minHeight: 42,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  dangerButton: {
    flex: 1,
    minHeight: 42,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC2626",
  },

  actionText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  secondaryButtonText: {
    fontSize: 13,
    fontWeight: "700",
  },
});