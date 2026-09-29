import React, { memo } from "react";
import {
  View,
  Text,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { SectionHeaderProps } from "@/types/business";

function SectionHeaderComponent({
  title,
  subtitle,
}: SectionHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        marginTop: 24,
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          style={{
            color: theme.textSecondary,
            fontSize: 13,
            lineHeight: 18,
            marginTop: 4,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

export const SectionHeader = memo(SectionHeaderComponent);