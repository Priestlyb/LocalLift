
import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { businessBrandingStyles as styles } from "@/styles/business-branding.styles";

interface ProgressHeaderProps {
  step: number;
  totalSteps: number;
}

export default function ProgressHeader({
  step,
  totalSteps,
}: ProgressHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.progressWrapper}>
      <View
        style={[
          styles.progressTrack,
          {
            backgroundColor: theme.border,
          },
        ]}
      >
        <View
          style={{
            flex: step,
          }}
        >
          <View
            style={[
              styles.progressFill,
              {
                flex: 1,
                backgroundColor: theme.primary,
              },
            ]}
          />
        </View>

        <View
          style={{
            flex: Math.max(totalSteps - step, 0),
          }}
        />
      </View>

      <Text
        style={[
          styles.progressText,
          {
            color: theme.textSecondary,
          },
        ]}
      >
        Step {step} of {totalSteps}
      </Text>
    </View>
  );
}
