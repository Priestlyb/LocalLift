import { create } from "zustand";
import { dashboardApi, DashboardResponse } from "@/api/dashboardApi";
import { useAuthStore } from "@/store/authStore";

interface DashboardState {
  loading: boolean;
  error: string | null;

  hasBusiness: boolean;
  business: DashboardResponse["business"] | null;
  subscription: DashboardResponse["subscription"] | null;
  analytics: DashboardResponse["analytics"] | null;
  recentContent: any[];

  fetchDashboard: () => Promise<void>;
  clear: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  loading: false,
  error: null,

  hasBusiness: false,
  business: null,
  subscription: null,
  analytics: null,
  recentContent: [],

  fetchDashboard: async () => {
    try {
      set({ loading: true, error: null });

      const token = useAuthStore.getState().token;

      if (!token) {
        throw new Error("No auth token");
      }

      const data = await dashboardApi.getDashboard(token);

      set({
        loading: false,
        hasBusiness: data.hasBusiness,
        business: data.business,
        subscription: data.subscription,
        analytics: data.analytics,
        recentContent: data.recentContent,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || "Failed to load dashboard",
      });
    }
  },

  clear: () =>
    set({
      hasBusiness: false,
      business: null,
      subscription: null,
      analytics: null,
      recentContent: [],
      error: null,
      loading: false,
    }),
}));