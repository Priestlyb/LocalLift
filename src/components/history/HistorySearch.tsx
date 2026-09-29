import React from "react";
import { View, TextInput } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { historySearchStyles as styles } from "@/styles/history.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function HistorySearch({ value, onChangeText }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <IconSymbol
        name="SearchIcon"
        size={18}
        color={theme.textSecondary}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search content, campaigns, platforms..."
        placeholderTextColor={theme.textSecondary}
        style={[
          styles.input,
          {
            color: theme.text,
          },
        ]}
      />

      {/* optional future: voice / filter shortcut */}
      <View style={styles.rightIcon}>
        <IconSymbol
          name="FilterIcon"
          size={18}
          color={theme.primary}
        />
      </View>
    </View>
  );
}
