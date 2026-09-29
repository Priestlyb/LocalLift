import React, { memo } from "react";
import { View, Text } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { IconSymbol } from "@/constants/icons/icon-symbol";

function AIImpactCardComponent() {
  const theme = useTheme();

  return (
    <View
      style={{
        marginTop: 24,
        marginBottom: 30,
        padding: 16,
        borderRadius: 16,
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <IconSymbol name="LightBulbIcon" size={18} color={theme.emerald} />

        <Text
          style={{
            marginLeft: 8,
            color: theme.text,
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          AI Impact
        </Text>
      </View>

      <Text
        style={{
          color: theme.textSecondary,
          fontSize: 14,
          lineHeight: 22,
        }}
      >
        This profile helps personalize your AI-generated captions, promotions,
        marketing campaigns, product recommendations, customer targeting, and
        overall brand voice throughout the app.
      </Text>
    </View>
  );
}

export const AIImpactCard = memo(AIImpactCardComponent);
