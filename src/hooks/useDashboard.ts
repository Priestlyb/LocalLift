import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAuthStore } from "@/store/authStore";

export function useDashboard() {
  const auth = useAuthStore();

  const {
    loading,
    error,
    hasBusiness,
    business,
    subscription,
    analytics,
    recentContent,
    fetchDashboard,
  } = useDashboardStore();

  // Auto fetch when user logs in
  useEffect(() => {
    if (auth.user && auth.token) {
      fetchDashboard();
    }
  }, [auth.user, auth.token]);

  return {
    auth,
    loading,
    error,
    hasBusiness,
    business,
    subscription,
    analytics,
    recentContent,
    refresh: fetchDashboard,
  };
}