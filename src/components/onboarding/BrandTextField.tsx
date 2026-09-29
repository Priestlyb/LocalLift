
import React from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { IconSymbol } from "@/constants/icons/icon-symbol";
import { useTheme } from "@/hooks/useTheme";
import { businessBrandingStyles as styles } from "@/styles/business-branding.styles";

interface BrandTextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon: string;

  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoCorrect?: boolean;
  editable?: boolean;
  secureTextEntry?: boolean;
  maxLength?: number;
}

export default function BrandTextField({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = false,
  editable = true,
  secureTextEntry = false,
  maxLength,
}: BrandTextFieldProps) {
  const theme = useTheme();

  return (
    <View style={styles.field}>
      <Text
        style={[
          styles.label,
          {
            color: theme.text,
          },
        ]}
      >
        {label}
      </Text>

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <IconSymbol
          name={icon as any}
          size={18}
          color={theme.textSecondary}
        />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={editable}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          style={[
            styles.input,
            {
              color: theme.text,
            },
          ]}
        />
      </View>
    </View>
  );
}
