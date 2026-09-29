import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  ActivityIndicator,
  Image,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";

import Logo from "@/assets/images/icon.png";

export default function Index() {
  const theme = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
        }}
      >
        {/* Logo Circle */}
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Image
            source={Logo}
            style={{
              width: 125,
              height: 125,
              resizeMode: "contain",
            }}
          />
        </View>

        {/* App Name */}
        <Text
          style={{
            fontSize: 30,
            fontWeight: "800",
            color: theme.text,
          }}
        >
          LocalLift
        </Text>

        {/* Tagline */}
        <Text
          style={{
            marginTop: 8,
            color: theme.textSecondary,
            fontSize: 15,
            textAlign: "center",
          }}
        >
          AI Marketing for Local Businesses
        </Text>

        <View style={{ marginTop: 40 }}>
          <ActivityIndicator size={25} color={theme.primary} />
        </View>
      </Animated.View>
    </View>
  );
}
