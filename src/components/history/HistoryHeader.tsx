import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { historyHeaderStyles as styles } from "@/styles/history.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function HistoryHeader() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* LEFT TEXT SECTION */}
      <View>
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          Content History
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          All your AI-generated marketing content in one place
        </Text>
      </View>

      {/* ACTION BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.actionButton,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
        onPress={() => {
          // future: bulk actions or export
          console.log("History actions pressed");
        }}
      >
        <IconSymbol
          name="EllipsisIcon"
          size={18}
          color={theme.primary}
        />
      </TouchableOpacity>
    </View>
  );
}
