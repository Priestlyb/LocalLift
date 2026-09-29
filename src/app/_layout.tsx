import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { useColorScheme, View, ActivityIndicator } from "react-native";
import AppProviders from "@/providers/AppProviders";

import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useBusiness } from "@/hooks/useBusiness";
import { useSubscription } from "@/hooks/useSubscription";

/**
 * ROUTE GROUPS
 */
const AUTH_GROUP = "(auth)";
const ONBOARDING_GROUP = "(onboarding)";
const TABS_GROUP = "(tabs)";
const SCREEN_GROUP = "(screen)";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  const router = useRouter();
  const segments = useSegments();

  const { user, initializing, restoreSession } = useAuth();
  const { business, initialized, fetchBusiness } = useBusiness();
  const { fetchSubscription } = useSubscription();

  const [appReady, setAppReady] = useState(false);

  /**
   * BOOTSTRAP AUTH SESSION
   */
  useEffect(() => {
    const init = async () => {
      await restoreSession();
      setAppReady(true);
    };

    init();
  }, [restoreSession]);

  /**
   * LOAD BUSINESS + SUBSCRIPTION
   */
  useEffect(() => {
    if (!user) return;

    fetchBusiness();
    fetchSubscription();
  }, [user, fetchBusiness, fetchSubscription]);

  /**
   * ROUTE GUARD
   */
  useEffect(() => {
    if (!appReady || initializing) return;

    const group = segments[0];

    const inAuth = group === AUTH_GROUP;
    const inOnboarding = group === ONBOARDING_GROUP;
    const inTabs = group === TABS_GROUP;
    const inScreen = group === SCREEN_GROUP;

    /**
     * -----------------------------------
     * NOT LOGGED IN
     * -----------------------------------
     */
    if (!user) {
      if (inOnboarding || inAuth) return;

      router.replace("/(onboarding)/welcome");
      return;
    }

    /**
     * -----------------------------------
     * WAIT FOR BUSINESS FETCH
     * -----------------------------------
     */
    if (!initialized) return;

    /**
     * -----------------------------------
     * LOGGED IN BUT NO BUSINESS
     * -----------------------------------
     */
    if (!business) {
      if (inScreen) return;

      if (!inOnboarding) {
        router.replace("/(onboarding)/welcome");
      }

      return;
    }

    /**
     * -----------------------------------
     * LOGGED IN + BUSINESS EXISTS
     * -----------------------------------
     */
    if (inScreen) return;

    if (inAuth || inOnboarding) {
      router.replace("/(tabs)/dashboard");
      return;
    }

    if (!inTabs) {
      router.replace("/(tabs)/dashboard");
      return;
    }
  }, [user, business, initialized, appReady, initializing, segments, router]);

  /**
   * LOADING
   */
  if (!appReady || initializing || (user && !initialized)) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={50} color={theme.primary} />
      </View>
    );
  }

  return (
    <AppProviders>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </AppProviders>
  );
}
