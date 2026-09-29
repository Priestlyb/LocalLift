import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { IconSymbol } from "@/constants/icons/icon-symbol";
import { useTheme } from "@/hooks/useTheme";
import { businessBrandingStyles as styles } from "@/styles/business-branding.styles";

interface LogoUploaderProps {
  value?: string;
  onChange: (uri?: string) => void;
}

export default function LogoUploader({
  value,
  onChange,
}: LogoUploaderProps) {
  const theme = useTheme();

  const pickLogo = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

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
        Logo (Optional)
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={pickLogo}
        style={[
          styles.uploadCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        {value ? (
          <>
            <Image
              source={{ uri: value }}
              resizeMode="cover"
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                marginBottom: 16,
              }}
            />

            <Text
              style={[
                styles.uploadText,
                {
                  color: theme.text,
                },
              ]}
            >
              Logo Selected
            </Text>

            <Text
              style={[
                styles.uploadSubtext,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              Tap to change logo
            </Text>
          </>
        ) : (
          <>
            <IconSymbol
              name="UploadIcon"
              size={28}
              color={theme.primary}
            />

            <Text
              style={[
                styles.uploadText,
                {
                  color: theme.text,
                },
              ]}
            >
              Upload Business Logo
            </Text>

            <Text
              style={[
                styles.uploadSubtext,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              PNG, JPG or WEBP up to 5MB
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}