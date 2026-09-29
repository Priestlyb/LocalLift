import { Platform } from "react-native";

/**
 * LocalLift Design System
 * Central source of truth for colors, spacing, typography and layout.
 */

export const Colors = {
  light: {
    // Brand
    primary: "#2563EB",
    secondary: "#10B981",

    // Backgrounds
    background: "#F8FAFC",
    card: "#FFFFFF",
    surface: "#F1F5F9",

    // Text
    text: "#0F172A",
    textSecondary: "#64748B",

    // UI
    border: "#E2E8F0",

    // Status
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },

  dark: {
    // Brand
    primary: "#3B82F6",
    secondary: "#34D399",

    // Backgrounds
    background: "#020617",
    card: "#0F172A",
    surface: "#1E293B",

    // Text
    text: "#F8FAFC",
    textSecondary: "#94A3B8",

    // UI
    border: "#334155",

    // Status
    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",
  },
} as const;

export type ThemeColor =
  keyof typeof Colors.light &
  keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },

  android: {
    sans: "sans-serif",
    serif: "serif",
    rounded: "sans-serif",
    mono: "monospace",
  },

  web: {
    sans: "system-ui",
    serif: "serif",
    rounded: "system-ui",
    mono: "monospace",
  },

  default: {
    sans: "sans-serif",
    serif: "serif",
    rounded: "sans-serif",
    mono: "monospace",
  },
});

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  full: 999,
} as const;

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  md: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  lg: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

export const BottomTabInset =
  Platform.select({
    ios: 50,
    android: 70,
  }) ?? 0;

export const Layout = {
  maxContentWidth: 1200,
  screenPadding: Spacing.lg,
} as const;