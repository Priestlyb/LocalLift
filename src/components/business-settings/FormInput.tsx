import React, { memo } from "react";
import {
  View,
  Text,
  TextInput,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { FormInputProps } from "@/types/business";

function FormInputComponent({
  label,
  field,
  value,
  placeholder,
  onChange,
  multiline = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
}: FormInputProps) {
  const theme = useTheme();

  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          color: theme.text,
          marginBottom: 6,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        onChangeText={(text) => onChange(field, text)}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          padding: 12,
          borderRadius: 12,
          color: theme.text,
          ...(multiline && {
            height: 120,
            textAlignVertical: "top",
          }),
        }}
      />
    </View>
  );
}

export const FormInput = memo(FormInputComponent);