import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { businessBrandingStyles as styles } from "@/styles/business-branding.styles";

interface AITipCardProps {
  title: string;
  description: string;
}

export default function AITipCard({
  title,
  description,
}: AITipCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.aiTipCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <Text
        style={[
          styles.aiTipTitle,
          {
            color: theme.primary,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.aiTipText,
          {
            color: theme.textSecondary,
          },
        ]}
      >
        {description}
      </Text>
    </View>
  );
}
