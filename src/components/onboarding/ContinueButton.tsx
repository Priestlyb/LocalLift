import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { IconSymbol } from "@/constants/icons/icon-symbol";
import { useTheme } from "@/hooks/useTheme";
import { businessBrandingStyles as styles } from "@/styles/business-branding.styles";

interface ContinueButtonProps {
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  showArrow?: boolean;
  onPress: () => void;
}

export default function ContinueButton({
  title = "Continue",
  disabled = false,
  loading = false,
  showArrow = true,
  onPress,
}: ContinueButtonProps) {
  const theme = useTheme();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled || loading}
        onPress={onPress}
        style={[
          styles.continueButton,
          {
            backgroundColor: disabled || loading ? theme.border : theme.primary,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            <Text style={styles.continueButtonText}>{title}</Text>

            {showArrow && (
              <IconSymbol name="ChevronRightIcon" size={14} color="#FFFFFF" />
            )}
          </>
        )}
      </TouchableOpacity>
    </>
  );
}
