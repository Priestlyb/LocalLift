import React, { memo } from "react";

import { View, Text, TouchableOpacity } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { ColorPreviewProps } from "@/types/business";

function ColorPreviewComponent({ label, color }: ColorPreviewProps) {
  const theme = useTheme();

  /**
   * Clean the supplied color.
   */
  const normalizedColor = color?.trim() ?? "";

  /**
   * Only use a valid HEX value as the
   * background color.
   */
  const isValidColor = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(
    normalizedColor,
  );

  const displayColor = isValidColor ? normalizedColor : theme.card;

  /**
   * Display value.
   */
  const displayValue = isValidColor ? normalizedColor.toUpperCase() : "Not set";

  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      {/* Label */}

      <Text
        style={{
          color: theme.text,
          marginBottom: 8,
          fontWeight: "600",
          fontSize: 14,
        }}
      >
        {label}
      </Text>

      {/* Preview */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.card,
        }}
      >
        {/* Color Circle */}

        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: displayColor,
            borderWidth: 1,
            borderColor: theme.border,
            marginRight: 12,
          }}
        />

        {/* Color Information */}

        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            {displayValue}
          </Text>

          <Text
            style={{
              color: theme.textSecondary,
              fontSize: 12,
              marginTop: 2,
            }}
          >
            {isValidColor ? "Brand color" : "No color selected"}
          </Text>
        </View>

        {/* Color Indicator */}

        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: displayColor,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        />
      </View>
    </View>
  );
}

export const ColorPreview = memo(ColorPreviewComponent);
