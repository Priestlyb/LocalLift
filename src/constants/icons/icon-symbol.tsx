// IconSymbol.tsx
import React, { ComponentProps } from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

import AntDesignIcon from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Fontisto from "@expo/vector-icons/Fontisto";

/* ======================================================
   ICON MAPS (GROUPED BY ICON FAMILY)
====================================================== */

/* ---------- IONICONS ---------- */
export const IONICONS = {
  BusinessIcon: "business-outline",
  ShieldCheckIcon: "shield-checkmark",
  DocumentTextIcon: "document-text-outline",
  Megaphone: "megaphone-outline",
  TrendingUp: "trending-up",
  SparklesIcon: "sparkles-outline",
  SearchIcon: "search",
  FilterIcon: "options-outline",
  AddPersonIcon: "person-add-outline",
  ProfileIcon: "person-outline",
  HeartIcon: "heart",
  OutlineHeart: "heart-outline",
  EmailIcon: "mail-outline",
  BellIcon: "notifications-outline",
  SettingsIcon: "settings-outline",
  CloseIcon: "close",
  ChevronForwardIcon: "chevron-forward",
  HeartOutline: "heart-outline",
  PersonOutline: "person-outline",
  GlobeOutline: "globe-outline",
  HelpCircleOutline: "help-circle-outline",
  CardOutline: "card-outline",
  LogOutOutline: "log-out-outline",
  TrashOutline: "trash-outline",
} as const satisfies Record<string, ComponentProps<typeof Ionicons>["name"]>;

/* ---------- ANT DESIGN ICONS ---------- */
export const ANT_DESIGN_ICONS = {
  GlobalIcon: "global",
  CameraIcon: "camera",
  PlusCircleIcon: "plus-circle",
  EyeIcon: "eye",
  EyeInvisibleIcon: "eye-invisible",
  LockIcon: "lock",
  UploadIcon: "cloud-upload",
  HomeIcon: "home",
  BarChartIcon: "bar-chart",
  StarIcon: "star",
  UserIcon: "user",
  ChevronRightIcon: "right",
  QuestionCircle: "question-circle",
  ArrowLeftIcon: "arrow-left",
  ShareAltIcon: "share-alt",
  InfoCircleIcon: "info-circle",
  WarningIcon: "warning",
} as const satisfies Record<
  string,
  ComponentProps<typeof AntDesignIcon>["name"]
>;

/* ---------- MATERIAL ICONS ---------- */
export const MATERIAL_ICONS = {
  HistoryIcon: "history",
  OutlineUserIcon: "supervised-user-circle",
  FoodIcon: "food-bank",
  PoolIcon: "pool",
  SpaIcon: "spa",
  RestaurantIcon: "restaurant",
  MapIcon: "map",
} as const satisfies Record<
  string,
  ComponentProps<typeof MaterialIcons>["name"]
>;

/* ---------- MATERIAL COMMUNITY ICONS ---------- */
export const COMMUNITY_ICONS = {
  LightBulbIcon: "lightbulb-on-outline",
  CrownOultlineIcon: "crown-outline",
  handWaveIcon: "hand-wave-outline",
  CashIcon: "cash-multiple",
  BuildingIcon: "office-building-outline",
  GymIcon: "dumbbell",
  DotsHorizontalIcon: "dots-horizontal",
} as const satisfies Record<
  string,
  ComponentProps<typeof MaterialCommunityIcons>["name"]
>;

/* ---------- FONT AWESOME 6 ICONS ---------- */
export const FONT_AWESOME_6_ICONS = {
  CheckCircleIcon: "check-circle",
  EnvelopeIcon: "envelope",
  EllipsisIcon: "ellipsis",
  FileIcon: "file-text",
  ChevronLeft: "chevron-left",
  WrenchIcon: "screwdriver-wrench",
  StoreIcon: "store",
  utensilsIcon: "utensils",
  WalletIcon: "wallet",
  CreditCardIcon: "credit-card",
  LanguageIcon: "language",
  ShieldIcon: "shield-halved",
  UserGroupIcon: "user-group",
  LogoutIcon: "right-from-bracket",
  PersonThroughWindowIcon: "person-through-window",
  UserOutlineIcon: "user",
  LocationDotIcon: "location-dot",
  CircleInfoicon: "circle-info",
  KeyIcon: "key",
  XCircleIcon: "xmark-circle",
} as const satisfies Record<
  string,
  ComponentProps<typeof FontAwesome6>["name"]
>;

/* ---------- OCTICONS ---------- */
export const OCTICONS = {
  ZapIcon: "zap",
  LawIcon: "law",
} as const satisfies Record<string, ComponentProps<typeof Octicons>["name"]>;

/* ---------- FONTISTO ---------- */
export const FONTISTO = {
  PillsIcon: "pills",
  HipChaticon: "hipchat",
} as const satisfies Record<string, ComponentProps<typeof Fontisto>["name"]>;

/* ======================================================
   TYPES
====================================================== */

export type IconName =
  | keyof typeof IONICONS
  | keyof typeof MATERIAL_ICONS
  | keyof typeof COMMUNITY_ICONS
  | keyof typeof ANT_DESIGN_ICONS
  | keyof typeof FONT_AWESOME_6_ICONS
  | keyof typeof OCTICONS
  | keyof typeof FONTISTO;

type IconProps = {
  name: IconName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
};

/* ======================================================
   ICON REGISTRY COMPONENT
====================================================== */

export function IconSymbol({ name, size = 24, color, style }: IconProps) {
  if (name in IONICONS) {
    return (
      <Ionicons
        name={IONICONS[name as keyof typeof IONICONS]}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  if (name in MATERIAL_ICONS) {
    return (
      <MaterialIcons
        name={MATERIAL_ICONS[name as keyof typeof MATERIAL_ICONS]}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  if (name in COMMUNITY_ICONS) {
    return (
      <MaterialCommunityIcons
        name={COMMUNITY_ICONS[name as keyof typeof COMMUNITY_ICONS]}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  if (name in ANT_DESIGN_ICONS) {
    return (
      <AntDesignIcon
        name={ANT_DESIGN_ICONS[name as keyof typeof ANT_DESIGN_ICONS]}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  if (name in FONT_AWESOME_6_ICONS) {
    return (
      <FontAwesome6
        name={FONT_AWESOME_6_ICONS[name as keyof typeof FONT_AWESOME_6_ICONS]}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  if (name in OCTICONS) {
    return (
      <Octicons
        name={OCTICONS[name as keyof typeof OCTICONS]}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  if (name in FONTISTO) {
    return (
      <Fontisto
        name={FONTISTO[name as keyof typeof FONTISTO]}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  // fallback
  return null;
}
