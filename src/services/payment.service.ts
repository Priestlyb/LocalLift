import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "@/api/client";

export const SUBSCRIPTION_PLAN_KEY = "subscription_plan";
export const PAYMENT_REFERENCE_KEY = "payment_reference";

export type PaymentProvider = "PAYSTACK";

export type SubscriptionPlan =
  | "STARTER"
  | "GROWTH"
  | "PRO";

export type UpgradeSubscriptionPlan =
  | "FREE"
  | "STARTER"
  | "GROWTH"
  | "PRO";

export interface StoredPlan {
  provider: PaymentProvider;
  plan: SubscriptionPlan;
}

export interface InitializePaymentResponse {
  success: boolean;
  provider: PaymentProvider;
  plan: SubscriptionPlan;
  reference: string;
  authorizationUrl: string;
  message?: string;
}

export interface StartSubscriptionPaymentResult {
  provider: PaymentProvider;
  plan: SubscriptionPlan;
  reference: string;
  authorizationUrl: string;
}

/**
 * Registration payment flow.
 *
 * Uses the plan previously stored in AsyncStorage.
 */
export async function startSubscriptionPayment(
  token: string
): Promise<StartSubscriptionPaymentResult> {
  try {
    const stored = await AsyncStorage.getItem(
      SUBSCRIPTION_PLAN_KEY
    );

    if (!stored) {
      throw new Error(
        "No subscription plan selected."
      );
    }

    const parsed: StoredPlan =
      JSON.parse(stored);

    if (
      !parsed.provider ||
      !parsed.plan
    ) {
      throw new Error(
        "Invalid subscription plan."
      );
    }

    const response =
      await api.post<InitializePaymentResponse>(
        "/api/v1/payments/initialize",
        {
          provider: parsed.provider,
          plan: parsed.plan,
        },
        token
      );

    console.log(
      "[PaymentService] Initialize Payment Response:",
      response
    );

    if (!response.success) {
      throw new Error(
        response.message ??
        "Failed to initialize payment."
      );
    }

    if (!response.authorizationUrl) {
      throw new Error(
        "Payment URL not returned by server."
      );
    }

    await AsyncStorage.setItem(
      PAYMENT_REFERENCE_KEY,
      response.reference
    );

    return {
      provider: response.provider,
      plan: response.plan,
      reference: response.reference,
      authorizationUrl:
        response.authorizationUrl,
    };
  } catch (error: any) {
    console.log(
      "[PaymentService] Error:",
      error?.message ?? error
    );

    throw error;
  }
}

/**
 * Upgrade payment flow.
 *
 * Uses the plan supplied by the caller instead of
 * reading it from AsyncStorage.
 */
export async function upgradeSubscriptionPayment(
  token: string,
  plan: UpgradeSubscriptionPlan,
  provider: PaymentProvider = "PAYSTACK"
): Promise<StartSubscriptionPaymentResult> {
  try {
    const response =
      await api.post<InitializePaymentResponse>(
        "/api/v1/payments/initialize",
        {
          provider,
          plan,
        },
        token
      );

    console.log(
      "[PaymentService] Upgrade Payment Response:",
      response
    );

    if (!response.success) {
      throw new Error(
        response.message ??
        "Failed to initialize payment."
      );
    }

    if (!response.authorizationUrl) {
      throw new Error(
        "Payment URL not returned by server."
      );
    }

    await AsyncStorage.setItem(
      PAYMENT_REFERENCE_KEY,
      response.reference
    );

    return {
      provider: response.provider,
      plan: response.plan,
      reference: response.reference,
      authorizationUrl:
        response.authorizationUrl,
    };
  } catch (error: any) {
    console.log(
      "[PaymentService] Upgrade Payment Error:",
      error?.message ?? error
    );

    throw error;
  }
}

export interface VerifyPaymentResponse {
  success: boolean;
  payment: {
    reference: string;
    status: string;
    paidAt?: string;
  };
  verification: {
    success: boolean;
    status: string;
    reference: string;
    amount: number;
    paidAt?: string;
  };
}

export async function verifyPayment(
  token: string,
  reference: string
): Promise<VerifyPaymentResponse> {
  try {
    const response =
      await api.get<VerifyPaymentResponse>(
        `/api/v1/payments/verify/${reference}`,
        token
      );

    console.log(
      "[PaymentService] Verify Payment Response:",
      response
    );

    return response;
  } catch (error: any) {
    console.log(
      "[PaymentService] Verify Payment Error:",
      error?.message ?? error
    );

    throw error;
  }
}

/**
 * Returns the cached payment reference.
 */
export async function getPaymentReference() {
  return AsyncStorage.getItem(
    PAYMENT_REFERENCE_KEY
  );
}

/**
 * Clears the cached payment reference.
 */
export async function clearPaymentReference() {
  await AsyncStorage.removeItem(
    PAYMENT_REFERENCE_KEY
  );
}