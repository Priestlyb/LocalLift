import { Tabs } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,

        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="BarChartIcon" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="subscription/index"
        options={{
          title: "Plans",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="CreditCardIcon" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create/index"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="PlusCircleIcon" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="history/index"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="HistoryIcon" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="SettingsIcon" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
