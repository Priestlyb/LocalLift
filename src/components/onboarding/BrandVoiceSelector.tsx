import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { businessBrandingStyles as styles } from "@/styles/business-branding.styles";

interface BrandVoiceSelectorProps {
  voices: string[];
  value: string;
  onChange: (voice: string) => void;
}

export default function BrandVoiceSelector({
  voices,
  value,
  onChange,
}: BrandVoiceSelectorProps) {
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
        Brand Voice
      </Text>

      <View style={styles.voiceGrid}>
        {voices.map((voice) => {
          const selected = value === voice;

          return (
            <TouchableOpacity
              key={voice}
              activeOpacity={0.8}
              onPress={() => onChange(voice)}
              style={[
                styles.voiceChip,
                {
                  backgroundColor: theme.card,
                  borderColor: selected
                    ? theme.primary
                    : theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.voiceText,
                  {
                    color: selected
                      ? theme.primary
                      : theme.text,
                  },
                ]}
              >
                {voice}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}