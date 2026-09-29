import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { ChipSelectorProps } from "@/types/business";

function ChipSelectorComponent({
  options,
  value,
  field,
  activeColor,
  onChange,
}: ChipSelectorProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      {options.map((option) => {
        const isActive = option === value;

        return (
          <TouchableOpacity
            key={option}
            activeOpacity={0.8}
            onPress={() => onChange(field, option)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: isActive ? activeColor : theme.card,
              borderWidth: 1,
              borderColor: isActive ? activeColor : theme.border,
            }}
          >
            <Text
              style={{
                color: isActive ? "#FFFFFF" : theme.text,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export const ChipSelector = memo(ChipSelectorComponent);
