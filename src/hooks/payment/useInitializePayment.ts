import { useState } from "react";

import { api } from "@/api/client";

export type PaymentProvider = "PAYSTACK";

export type SubscriptionPlan = "STARTER" | "GROWTH" | "PRO";

export interface InitializePaymentRequest {
  provider: PaymentProvider;
  plan: SubscriptionPlan;
}

export interface InitializePaymentResponse {
  success: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

/**
 * Pure API hook:
 * Only responsible for calling backend
 */
export function useInitializePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = async (
    payload: InitializePaymentRequest,
    token?: string
  ): Promise<InitializePaymentResponse> => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post<InitializePaymentResponse>(
        "/api/v1/payments/initialize",
        payload,
        token
      );

      return response;
    } catch (err: any) {
      const message =
        err?.message || "Failed to initialize payment";

      setError(message);

      console.log("[useInitializePayment] Error:", message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    initializePayment,
    loading,
    error,
  };
}