import React from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { IconSymbol } from "@/constants/icons/icon-symbol";
import { useTheme } from "@/hooks/useTheme";
import { businessBrandingStyles as styles } from "@/styles/business-branding.styles";

interface BrandTextAreaProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;

  numberOfLines?: number;
  maxLength?: number;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoCorrect?: boolean;
  editable?: boolean;
}

export default function BrandTextArea({
  label,
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
  maxLength,
  autoCapitalize = "sentences",
  autoCorrect = false,
  editable = true,
}: BrandTextAreaProps) {
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
          styles.textAreaWrapper,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <IconSymbol
          name="FileIcon"
          size={18}
          color={theme.textSecondary}
        />

        <TextInput
          multiline
          textAlignVertical="top"
          numberOfLines={numberOfLines}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={editable}
          maxLength={maxLength}
          style={[
            styles.textArea,
            {
              color: theme.text,
            },
          ]}
        />
      </View>
    </View>
  );
}