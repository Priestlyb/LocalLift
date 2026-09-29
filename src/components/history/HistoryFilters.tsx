import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { historyFiltersStyles as styles } from "@/styles/history.styles";

export type FilterType =
  | "all"
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "google"
  | "email";

interface Props {
  selected: FilterType;
  onSelect: (value: FilterType) => void;
}

export default function HistoryFilters({ selected, onSelect }: Props) {
  const theme = useTheme();

  const filters: FilterType[] = [
    "all",
    "instagram",
    "facebook",
    "whatsapp",
    "google",
    "email",
  ];

  return (
    <View style={styles.container}>
      {filters.map((item) => {
        const active = selected === item;

        return (
          <TouchableOpacity
            key={item}
            onPress={() => onSelect(item)}
            style={[
              styles.filterChip,
              {
                backgroundColor: active ? theme.primary : theme.card,
                borderColor: active ? theme.primary : theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: active ? "#FFFFFF" : theme.text,
                },
              ]}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
