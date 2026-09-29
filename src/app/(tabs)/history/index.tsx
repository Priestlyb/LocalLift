import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { useContent } from "@/hooks/useContent";

import HistoryHeader from "@/components/history/HistoryHeader";
import HistorySearch from "@/components/history/HistorySearch";
import HistoryFilters from "@/components/history/HistoryFilters";
import ContentHistoryCard from "@/components/history/ContentHistoryCard";
import EmptyHistoryState from "@/components/history/EmptyHistoryState";

import { historyStyles as styles } from "@/styles/history.styles";

type FilterType =
  | "all"
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "google"
  | "email";

export default function HistoryScreen() {
  const theme = useTheme();

  const { history, loadHistory } = useContent();

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        await loadHistory();
      } catch (error) {
        console.log("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter = filter === "all" ? true : item.platform === filter;

      return matchesSearch && matchesFilter;
    });
  }, [history, search, filter]);

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={{
            color: theme.textSecondary,
            marginTop: 12,
          }}
        >
          Loading history...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HistoryHeader />

        <HistorySearch value={search} onChangeText={setSearch} />

        <HistoryFilters
          selected={filter}
          onSelect={(value: FilterType) => setFilter(value)}
        />

        {filteredHistory.length === 0 ? (
          <EmptyHistoryState />
        ) : (
          filteredHistory.map((item) => (
            <ContentHistoryCard
              key={item.id}
              id={item.id}
              title={item.title}
              type={item.platform}
              time={formatDate(item.createdAt)}
            />
          ))
        )}

        <View
          style={{
            height: 30,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function formatDate(dateString: string) {
  const now = new Date();

  const date = new Date(dateString);

  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 1000 / 60);

  const hours = Math.floor(minutes / 60);

  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return date.toLocaleDateString();
}
