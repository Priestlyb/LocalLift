import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

import { useTheme } from "@/hooks/useTheme";
import { settingsStyles as styles } from "@/styles/settings.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";
import type { IconName } from "@/constants/icons/icon-symbol";

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  iconName: IconName;
  route?: any;
  danger?: boolean;
}

export default function SettingsScreen() {
  const theme = useTheme();
  const { logout } = useAuth();

  const settings: SettingItem[] = [
    {
      id: "profile",
      title: "Profile",
      subtitle: "Update your personal information",
      iconName: "ProfileIcon",
      route: "/(screen)/settings/profile",
    },
    {
      id: "Business Details",
      title: "Business Details",
      subtitle: "Update your business information",
      iconName: "BusinessIcon",
      route: "/(screen)/settings/business",
    },
    {
      id: "Invite Staff",
      title: "Invite Staff",
      subtitle: "Invite your team and start working together.",
      iconName: "AddPersonIcon",
      route: "/(screen)/settings/InviteStaff",
    },
    {
      id: "notifications",
      title: "Notifications",
      subtitle: "Control alerts and updates",
      iconName: "BellIcon",
      route: "/(screen)/settings/notifications",
    },
    {
      id: "help",
      title: "Help & Support",
      subtitle: "Get assistance or report issues",
      iconName: "HelpCircleOutline",
      route: "/(screen)/settings/help",
    },
    {
      id: "logout",
      title: "Log Out",
      subtitle: "Sign out of your account",
      iconName: "LogOutOutline",
      danger: true,
    },
  ];

  const handlePress = async (item: SettingItem) => {
    if (item.id === "logout") {
      try {
        await logout();

        router.replace("/(onboarding)/welcome");
      } catch (error) {
        console.log("Logout failed", error);
      }

      return;
    }

    if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Settings</Text>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Manage your account and preferences
          </Text>
        </View>

        {/* SETTINGS LIST */}
        <View style={styles.list}>
          {settings.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handlePress(item)}
              style={[
                styles.item,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: theme.background,
                  },
                ]}
              >
                <IconSymbol
                  name={item.iconName}
                  size={20}
                  color={item.danger ? "#EF4444" : theme.primary}
                />
              </View>

              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.itemTitle,
                    {
                      color: item.danger ? "#EF4444" : theme.text,
                    },
                  ]}
                >
                  {item.title}
                </Text>

                {!!item.subtitle && (
                  <Text
                    style={[
                      styles.itemSubtitle,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
