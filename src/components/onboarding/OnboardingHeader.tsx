import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { businessBrandingStyles as styles } from "@/styles/business-branding.styles";

interface OnboardingHeaderProps {
  title: string;
  subtitle: string;
}

export default function OnboardingHeader({
  title,
  subtitle,
}: OnboardingHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.header}>
      <Text
        style={[
          styles.heading,
          {
            color: theme.text,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.subheading,
          {
            color: theme.textSecondary,
          },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
}