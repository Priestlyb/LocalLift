import { api } from "@/api/client";

export interface DashboardResponse {
  hasBusiness: boolean;
  business: {
    id: string;
    businessName: string;
    category: string;
    description: string;
    city: string;
    state: string;
    country: string;
    logo: string;
  };
  subscription: {
    plan: string;
    status: string;
    expiresAt: string | null;
  };
  analytics: {
    totalGenerations: number;
    monthlyUsage: number;
    remaining: number;
    limit: number;
    usagePercentage: number;
  };
  recentContent: any[];
}

export const dashboardApi = {
  getDashboard: async (token: string) => {
    return api.get<DashboardResponse>(
      "/api/v1/analytics/dashboard",
      token
    );
  },
};