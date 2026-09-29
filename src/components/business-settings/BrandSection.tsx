import React, { memo, useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import ColorPicker from "react-native-wheel-color-picker";

import { useTheme } from "@/hooks/useTheme";

import { BusinessSectionProps } from "@/types/business";

import { SectionHeader } from "@/components/business-settings/SectionHeader";
import { FormInput } from "@/components/business-settings/FormInput";
import { ColorPreview } from "@/components/business-settings/ColorPreview";

type ColorType = "primaryColor" | "secondaryColor";

/**
 * Default brand colors.
 */
const DEFAULT_BRAND_COLORS: Record<ColorType, string> = {
  primaryColor: "#2563EB",
  secondaryColor: "#FFFFFF",
};

function BrandSectionComponent({
  business,
  updateField,
}: BusinessSectionProps) {
  const theme = useTheme();

  /**
   * Logo picker state.
   */
  const [pickingImage, setPickingImage] = useState(false);

  /**
   * Color picker state.
   */
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const [activeColor, setActiveColor] = useState<ColorType>("primaryColor");

  /**
   * Color currently being edited inside
   * the picker.
   */
  const [selectedColor, setSelectedColor] = useState<string>(
    DEFAULT_BRAND_COLORS.primaryColor,
  );

  /**
   * Color before opening the picker.
   *
   * This allows Cancel to restore the
   * original color.
   */
  const [originalColor, setOriginalColor] = useState<string>(
    DEFAULT_BRAND_COLORS.primaryColor,
  );

  /**
   * =========================================================
   * LOGO PICKER
   * =========================================================
   */

  const handlePickLogo = async () => {
    try {
      setPickingImage(true);

      /**
       * Request photo library permission.
       */
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow photo library access to select your business logo.",
        );

        return;
      }

      /**
       * Open image picker.
       */
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      /**
       * User cancelled.
       */
      if (result.canceled) {
        return;
      }

      const asset = result.assets?.[0];

      if (!asset?.uri) {
        return;
      }

      /**
       * Store local URI.
       *
       * saveBusiness() will detect that this
       * is a local URI and upload it through
       * multipart/form-data.
       */
      updateField("logo", asset.uri);

      console.log("[BUSINESS LOGO SELECTED]", asset);
    } catch (error) {
      console.error("[IMAGE PICKER ERROR]", error);

      Alert.alert("Image Picker Error", "Unable to select the business logo.");
    } finally {
      setPickingImage(false);
    }
  };

  /**
   * Remove selected logo.
   */
  const handleRemoveLogo = () => {
    updateField("logo", "");
  };

  /**
   * =========================================================
   * COLOR PICKER
   * =========================================================
   */

  /**
   * Open the color picker for either
   * primary or secondary color.
   */
  const openColorPicker = (colorType: ColorType) => {
    const currentColor =
      colorType === "primaryColor"
        ? business.primaryColor
        : business.secondaryColor;

    const fallback = DEFAULT_BRAND_COLORS[colorType];

    /**
     * Use the current business color
     * if it is valid.
     */
    const colorToUse = isValidHexColor(currentColor)
      ? normalizeHex(currentColor)
      : fallback;

    setActiveColor(colorType);

    /**
     * Keep the original value so Cancel
     * doesn't accidentally modify the form.
     */
    setOriginalColor(colorToUse);

    /**
     * Set picker starting color.
     */
    setSelectedColor(colorToUse);

    setColorPickerVisible(true);
  };

  /**
   * Handle live color changes from
   * react-native-wheel-color-picker.
   */
  const handleColorChange = (color: string) => {
    if (!color) {
      return;
    }

    setSelectedColor(normalizeHex(color));
  };

  /**
   * Confirm selected color.
   */
  const handleColorConfirm = () => {
    updateField(activeColor, normalizeHex(selectedColor));

    setColorPickerVisible(false);
  };

  /**
   * Cancel color picker.
   */
  const handleColorCancel = () => {
    /**
     * Restore the original picker value.
     *
     * We don't actually need to call
     * updateField because changes were
     * only stored locally in selectedColor.
     */
    setSelectedColor(originalColor);

    setColorPickerVisible(false);
  };

  /**
   * Reset selected color to the
   * default brand color.
   */
  const handleResetColor = () => {
    const defaultColor = DEFAULT_BRAND_COLORS[activeColor];

    setSelectedColor(defaultColor);
  };

  return (
    <>
      {/* ===================================================== */}
      {/* BRAND SECTION */}
      {/* ===================================================== */}

      <SectionHeader
        title="Brand"
        subtitle="Your brand identity and visual appearance."
      />

      {/* ===================================================== */}
      {/* PRIMARY COLOR */}
      {/* ===================================================== */}

      <FormInput
        label="Primary Color"
        field="primaryColor"
        value={business.primaryColor}
        placeholder={DEFAULT_BRAND_COLORS.primaryColor}
        autoCapitalize="characters"
        onChange={updateField}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => openColorPicker("primaryColor")}
      >
        <ColorPreview
          label="Primary Color Preview"
          color={business.primaryColor}
        />
      </TouchableOpacity>

      {/* ===================================================== */}
      {/* SECONDARY COLOR */}
      {/* ===================================================== */}

      <FormInput
        label="Secondary Color"
        field="secondaryColor"
        value={business.secondaryColor}
        placeholder={DEFAULT_BRAND_COLORS.secondaryColor}
        autoCapitalize="characters"
        onChange={updateField}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => openColorPicker("secondaryColor")}
      >
        <ColorPreview
          label="Secondary Color Preview"
          color={business.secondaryColor}
        />
      </TouchableOpacity>

      {/* ===================================================== */}
      {/* BUSINESS LOGO */}
      {/* ===================================================== */}

      <Text
        style={{
          color: theme.text,
          fontSize: 14,
          fontWeight: "700",
          marginBottom: 8,
        }}
      >
        Business Logo
      </Text>

      <TouchableOpacity
        onPress={handlePickLogo}
        disabled={pickingImage}
        activeOpacity={0.8}
        style={{
          height: 150,
          borderRadius: 16,
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: theme.border,
          backgroundColor: theme.card,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          opacity: pickingImage ? 0.6 : 1,
        }}
      >
        {business.logo ? (
          <Image
            source={{
              uri: business.logo,
            }}
            resizeMode="contain"
            style={{
              width: "80%",
              height: "80%",
            }}
          />
        ) : (
          <>
            <Text
              style={{
                color: theme.primary,
                fontSize: 16,
                fontWeight: "800",
                marginBottom: 6,
              }}
            >
              {pickingImage ? "Opening Gallery..." : "Select Logo"}
            </Text>

            <Text
              style={{
                color: theme.text,
                opacity: 0.6,
                fontSize: 13,
              }}
            >
              Tap to choose an image
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* ===================================================== */}
      {/* LOGO ACTIONS */}
      {/* ===================================================== */}

      {business.logo ? (
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            onPress={handlePickLogo}
            disabled={pickingImage}
            style={{
              flex: 1,
              backgroundColor: theme.primary,
              paddingVertical: 13,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "800",
              }}
            >
              Change Logo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRemoveLogo}
            disabled={pickingImage}
            style={{
              flex: 1,
              backgroundColor: theme.text + "12",
              paddingVertical: 13,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontWeight: "800",
              }}
            >
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* ===================================================== */}
      {/* LOGO PREVIEW */}
      {/* ===================================================== */}

      {business.logo.trim().length > 0 && (
        <View
          style={{
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            Logo Preview
          </Text>

          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 16,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.card,
            }}
          >
            <Image
              source={{
                uri: business.logo,
              }}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        </View>
      )}

      {/* ===================================================== */}
      {/* COLOR PICKER MODAL */}
      {/* ===================================================== */}

      <Modal
        visible={colorPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={handleColorCancel}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.65)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Pressable
            onPress={handleColorCancel}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          <View
            style={{
              backgroundColor: theme.background,
              borderRadius: 22,
              padding: 20,
              maxHeight: "90%",
            }}
          >
            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <Text
              style={{
                color: theme.text,
                fontSize: 20,
                fontWeight: "800",
                marginBottom: 5,
              }}
            >
              {activeColor === "primaryColor"
                ? "Primary Color"
                : "Secondary Color"}
            </Text>

            <Text
              style={{
                color: theme.text,
                opacity: 0.6,
                fontSize: 14,
                marginBottom: 20,
              }}
            >
              Choose your brand color.
            </Text>

            {/* ================================================= */}
            {/* COLOR PICKER */}
            {/* ================================================= */}

            <View
              style={{
                width: "100%",
                height: 300,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ColorPicker
                color={selectedColor}
                onColorChange={handleColorChange}
                thumbSize={32}
                sliderSize={28}
                noSnap
                row={false}
                swatches
                swatchesLast
                swatchesOnly={false}
                discrete={false}
                gapSize={10}
              />
            </View>

            {/* ================================================= */}
            {/* SELECTED COLOR */}
            {/* ================================================= */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              {/* Color preview */}

              <View
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 14,
                  backgroundColor: selectedColor,
                  borderWidth: 1,
                  borderColor: theme.border,
                  marginRight: 12,
                }}
              />

              {/* Color information */}

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "700",
                    fontSize: 14,
                  }}
                >
                  Selected Color
                </Text>

                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: 13,
                    marginTop: 3,
                    fontWeight: "600",
                  }}
                >
                  {selectedColor.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* ================================================= */}
            {/* RESET */}
            {/* ================================================= */}

            <TouchableOpacity
              onPress={handleResetColor}
              activeOpacity={0.8}
              style={{
                marginBottom: 12,
                paddingVertical: 11,
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: theme.text + "10",
              }}
            >
              <Text
                style={{
                  color: theme.text,
                  fontSize: 13,
                  fontWeight: "700",
                }}
              >
                Reset to Default
              </Text>
            </TouchableOpacity>

            {/* ================================================= */}
            {/* ACTIONS */}
            {/* ================================================= */}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              {/* Cancel */}

              <TouchableOpacity
                onPress={handleColorCancel}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: theme.text + "12",
                }}
              >
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "700",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              {/* Confirm */}

              <TouchableOpacity
                onPress={handleColorConfirm}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: theme.primary,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                  }}
                >
                  Use Color
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

/**
 * =========================================================
 * HEX VALIDATION
 * =========================================================
 */

function isValidHexColor(color: string): boolean {
  return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(color.trim());
}

/**
 * =========================================================
 * NORMALIZE HEX
 * =========================================================
 *
 * Converts:
 *
 * #fff     -> #FFFFFF
 * #ff6600  -> #FF6600
 */

function normalizeHex(color: string): string {
  const value = color.trim();

  if (/^#[0-9A-Fa-f]{3}$/.test(value)) {
    return (
      "#" +
      value
        .slice(1)
        .split("")
        .map((char) => char + char)
        .join("")
        .toUpperCase()
    );
  }

  return value.toUpperCase();
}

export const BrandSection = memo(BrandSectionComponent);
