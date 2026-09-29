import React, { useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { useDashboard } from "@/hooks/useDashboard";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function AnalyticsScreen() {
  const theme = useTheme();
  const { loading, analytics } = useDashboard();

  // ✅ FIX 1: memoize safeAnalytics (VERY IMPORTANT)
  const safeAnalytics = useMemo(() => {
    return {
      totalGenerations: analytics?.totalGenerations ?? 0,
      monthlyUsage: analytics?.monthlyUsage ?? 0,
      remaining: analytics?.remaining ?? 0,
      limit: analytics?.limit ?? 0,
      usagePercentage: analytics?.usagePercentage ?? 0,
    };
  }, [analytics]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return String(num);
  };

  // ✅ FIX 2: depend on primitives, NOT object
  const usage = safeAnalytics.usagePercentage;
  const totalGen = safeAnalytics.totalGenerations;

  const kpis = useMemo(() => {
    return [
      {
        label: "Total Reach",
        value: formatNumber(totalGen * 120),
        change: `+${usage}%`,
        positive: usage > 50,
        icon: "TrendingUp",
      },
      {
        label: "Engagement Rate",
        value: `${usage}%`,
        change: "+2.1%",
        positive: true,
        icon: "BarChartIcon",
      },
      {
        label: "Content Created",
        value: String(totalGen),
        change: "+6",
        positive: true,
        icon: "PlusCircleIcon",
      },
      {
        label: "Conversion",
        value: `${Math.max(1, Math.round(usage / 10))}%`,
        change: "-0.4%",
        positive: false,
        icon: "TargetIcon",
      },
    ];
  }, [usage, totalGen]);

  const platforms = useMemo(() => {
    return [
      { name: "Instagram", value: Math.min(50, usage + 10) },
      { name: "WhatsApp", value: Math.min(30, usage) },
      { name: "Google", value: Math.max(10, 15 - usage / 2) },
      { name: "Email", value: Math.max(5, 10 - usage / 3) },
    ];
  }, [usage]);

  const topContent = [
    "Weekend Bakery Promo",
    "Flash Sale Campaign",
    "New Product Launch",
  ];

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={theme.primary} size={50} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 55, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* HEADER */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: theme.textSecondary, fontSize: 13 }}>
            Analytics Overview
          </Text>

          <Text
            style={{
              color: theme.text,
              fontSize: 22,
              fontWeight: "800",
              marginTop: 4,
            }}
          >
            Growth Dashboard
          </Text>
        </View>

        {/* KPI GRID */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {kpis.map((item, index) => (
            <View
              key={index}
              style={{
                width: "48%",
                backgroundColor: theme.card,
                borderWidth: 1,
                borderColor: theme.border,
                borderRadius: 16,
                padding: 14,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <IconSymbol
                  name={item.icon as any}
                  size={18}
                  color={theme.primary}
                />

                <Text
                  style={{
                    color: item.positive ? theme.emerald : "#EF4444",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  {item.change}
                </Text>
              </View>

              <Text
                style={{
                  color: theme.text,
                  fontSize: 18,
                  fontWeight: "800",
                  marginTop: 10,
                }}
              >
                {item.value}
              </Text>

              <Text
                style={{
                  color: theme.textSecondary,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* GROWTH CHART */}
        <View
          style={{
            marginTop: 10,
            backgroundColor: theme.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.border,
            padding: 16,
          }}
        >
          <Text
            style={{ color: theme.text, fontWeight: "700", marginBottom: 10 }}
          >
            7-Day Growth Trend
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              height: 120,
              gap: 8,
            }}
          >
            {[40, 55, 30, 70, 85, 60, 90].map((h, i) => (
              <View
                key={i}
                style={{
                  width: 18,
                  height: h,
                  backgroundColor: theme.primary,
                  borderRadius: 6,
                  opacity: 0.9,
                }}
              />
            ))}
          </View>

          <Text
            style={{ color: theme.textSecondary, fontSize: 12, marginTop: 10 }}
          >
            {usage > 20
              ? "+Strong growth this week"
              : "Stable performance this week"}
          </Text>
        </View>

        {/* PLATFORM BREAKDOWN */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: theme.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.border,
            padding: 16,
          }}
        >
          <Text
            style={{ color: theme.text, fontWeight: "700", marginBottom: 12 }}
          >
            Platform Performance
          </Text>

          {platforms.map((p, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: theme.textSecondary }}>{p.name}</Text>
                <Text style={{ color: theme.text, fontWeight: "600" }}>
                  {Math.round(p.value)}%
                </Text>
              </View>

              <View
                style={{
                  height: 6,
                  backgroundColor: theme.background,
                  borderRadius: 10,
                  marginTop: 6,
                }}
              >
                <View
                  style={{
                    width: `${p.value}%`,
                    height: 6,
                    backgroundColor: theme.primary,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* TOP CONTENT */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: theme.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.border,
            padding: 16,
          }}
        >
          <Text
            style={{ color: theme.text, fontWeight: "700", marginBottom: 10 }}
          >
            Top Performing Content
          </Text>

          {topContent.map((item, i) => (
            <View
              key={i}
              style={{
                paddingVertical: 10,
                borderBottomWidth: i !== topContent.length - 1 ? 1 : 0,
                borderBottomColor: theme.border,
              }}
            >
              <Text style={{ color: theme.text }}>{item}</Text>
            </View>
          ))}
        </View>

        {/* INSIGHT */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: theme.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.border,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <IconSymbol name="LightBulbIcon" size={18} color={theme.emerald} />
            <Text style={{ color: theme.text, fontWeight: "700" }}>
              AI Insight
            </Text>
          </View>

          <Text style={{ color: theme.textSecondary, lineHeight: 20 }}>
            {usage > 20
              ? "Your engagement is rising. Focus on scaling high-performing content."
              : "Your engagement is stable. Experiment with new content formats to improve reach."}
          </Text>
        </View>

        {/* CTA */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: theme.primary,
            borderRadius: 16,
            padding: 16,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>
            Unlock Advanced Analytics
          </Text>

          <Text style={{ color: "#E0E7FF", marginTop: 6, fontSize: 13 }}>
            Get deeper insights, competitor tracking & AI predictions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
