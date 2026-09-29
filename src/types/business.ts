// types/business.ts

import {
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native";

/**
 * BUSINESS FORM
 */
export type BusinessForm = {
  name: string;
  category: string;
  description: string;

  address: string;
  city: string;
  state: string;
  country: string;

  phone: string;
  email: string;
  website: string;

  facebook: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  x: string;

  audience: string;
  tone: string;
  uniqueSellingPoint: string;

  primaryColor: string;
  secondaryColor: string;
  logo: string;
};

export interface BusinessInfoSectionProps
  extends BusinessSectionProps {
  categories: string[];
  toneOptions: string[];
}

/**
 * COMMON FIELD TYPE
 */
export type BusinessField = keyof BusinessForm;

/**
 * SHARED FORM INPUT PROPS
 */
export interface FormInputProps {
  label: string;
  field: BusinessField;
  value: string;
  placeholder: string;

  onChange: (
    field: BusinessField,
    value: string
  ) => void;

  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
}

/**
 * CHIP SELECTOR PROPS
 */
export interface ChipSelectorProps {
  options: string[];
  value: string;
  field: BusinessField;
  activeColor: string;

  onChange: (
    field: BusinessField,
    value: string
  ) => void;
}

/**
 * SECTION HEADER PROPS
 */
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * COLOR PREVIEW PROPS
 */
export interface ColorPreviewProps {
  label: string;
  color: string;
}

/**
 * COMMON SECTION PROPS
 *
 * Used by:
 * - BusinessInfoSection
 * - LocationSection
 * - ContactSection
 * - BrandSection
 * - SocialSection
 */
export interface BusinessSectionProps {
  business: BusinessForm;

  updateField: (
    field: BusinessField,
    value: string
  ) => void;
}