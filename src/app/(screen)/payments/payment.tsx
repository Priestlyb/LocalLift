import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const CALLBACK_URL =
  "https://local-lift-backend.onrender.com/api/v1/payments/callback";

export default function PaymentScreen() {
  const router = useRouter();

  const hasNavigated = useRef(false);

  const { paymentUrl } = useLocalSearchParams<{
    paymentUrl: string;
  }>();

  const navigateToVerification = (paymentReference: string) => {
    if (hasNavigated.current) {
      return;
    }

    hasNavigated.current = true;

    router.replace({
      pathname: "/(screen)/payments/verifying",
      params: {
        reference: paymentReference,
      },
    });
  };

  const handleNavigation = (url: string) => {
    console.log("[Payment WebView] URL:", url);

    if (!url.startsWith(CALLBACK_URL)) {
      return false;
    }

    console.log("[Payment WebView] Callback reached.");

    try {
      const parsedUrl = new URL(url);

      const reference =
        parsedUrl.searchParams.get("reference") ??
        parsedUrl.searchParams.get("trxref");

      if (!reference) {
        console.log("[Payment WebView] No payment reference found.");

        return false;
      }

      console.log("[Payment WebView] Reference:", reference);

      navigateToVerification(reference);

      return true;
    } catch (error) {
      console.log("[Payment WebView] Failed to parse callback URL:", error);

      return false;
    }
  };

  if (!paymentUrl) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: paymentUrl,
        }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        onNavigationStateChange={(navState) => {
          handleNavigation(navState.url);
        }}
        onShouldStartLoadWithRequest={(request) => {
          if (handleNavigation(request.url)) {
            return false;
          }

          return true;
        }}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
