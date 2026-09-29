import { api } from "@/api/client";

/**
 * Subscription Plans
 */
export type SubscriptionPlan =
  | "FREE"
  | "STARTER"
  | "GROWTH"
  | "PRO";

export type SubscriptionStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELLED"
  | "PENDING"
  | "PAST_DUE";

/**
 * Current Subscription
 */
export interface Subscription {
  _id: string;

  user: string;

  plan: SubscriptionPlan;

  /**
   * Scheduled plan that will become active
   * at the end of the current billing cycle.
   */
  nextPlan: SubscriptionPlan | null;

  /**
   * Whether a scheduled plan change exists.
   */
  changeAtRenewal: boolean;

  status: SubscriptionStatus;

  startsAt: string;

  expiresAt: string | null;

  cancelledAt: string | null;

  durationMonths: number;

  autoRenew: boolean;

  lastPaymentReference: string | null;

  createdAt: string;

  updatedAt: string;

  __v?: number;

  /**
   * Usage values.
   */
  usedThisMonth?: number;

  remainingGenerations?: number;
}

/**
 * Plan Details
 */
export interface SubscriptionPlanDetails {
  id: SubscriptionPlan;

  name: string;

  price: number;

  durationMonths: number;

  limits: {
    imageGenerations: number;

    maxResolution: string;

    [key: string]: any;
  };

  features: {
    watermark: boolean;

    branding: boolean;

    aiCaptions: boolean;

    scheduler: boolean;

    analytics: boolean;

    teamAccess: boolean;

    apiAccess: boolean;

    multipleBrands: boolean;

    [key: string]: boolean;
  };

  priority: string;
}

/**
 * Current subscription response
 */
export interface SubscriptionResponse {
  success?: boolean;

  subscription: Subscription | null;

  limits: SubscriptionPlanDetails | null;
}

/**
 * Initialize payment response
 */
export interface PaystackInitResponse {
  success: boolean;

  provider: string;

  plan: SubscriptionPlan;

  reference: string;

  authorizationUrl: string;

  message?: string;

  /**
   * Returned when a downgrade is scheduled.
   */
  scheduled?: boolean;

  subscription?: Subscription;
}

/**
 * Verify payment response
 */
export interface VerifyPaymentResponse {
  success: boolean;

  payment: any;

  subscription: Subscription;

  verification: any;
}

/**
 * Cancel subscription response
 */
export interface CancelSubscriptionResponse {
  success: boolean;

  message: string;

  subscription: Subscription;
}

/**
 * Usage response
 *
 * NOTE:
 * Your backend doesn't expose this endpoint yet.
 */
export interface UsageResponse {
  usedThisMonth: number;

  remainingGenerations: number;
}

/**
 * Subscription API
 */
class SubscriptionApi {
  /**
   * Get current subscription
   */
  async getSubscription(
    token?: string
  ): Promise<SubscriptionResponse> {
    return api.get<SubscriptionResponse>(
      "/api/v1/subscription",
      token
    );
  }

  /**
   * Available plans
   *
   * Backend endpoint not implemented yet.
   */
  async getPlans(
    token?: string
  ): Promise<SubscriptionPlanDetails[]> {
    return api.get<SubscriptionPlanDetails[]>(
      "/api/v1/subscription/plans",
      token
    );
  }

  /**
   * Initialize payment
   *
   * Also schedules downgrades automatically.
   */
  async initializePayment(
    plan: SubscriptionPlan,
    token?: string
  ): Promise<PaystackInitResponse> {
    return api.post<PaystackInitResponse>(
      "/api/v1/payments/initialize",
      {
        provider: "PAYSTACK",
        plan,
      },
      token
    );
  }

  /**
   * Verify completed payment
   */
  async verifyPayment(
    reference: string,
    token?: string
  ): Promise<VerifyPaymentResponse> {
    return api.get<VerifyPaymentResponse>(
      `/api/v1/payment/verify/${reference}`,
      token
    );
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(
    immediate = false,
    token?: string
  ): Promise<CancelSubscriptionResponse> {
    return api.post<CancelSubscriptionResponse>(
      "/api/v1/subscription/cancel",
      {
        immediate,
      },
      token
    );
  }

  /**
   * Refresh usage
   *
   * Backend endpoint not implemented yet.
   */
  async refreshUsage(
    token?: string
  ): Promise<UsageResponse> {
    return api.get<UsageResponse>(
      "/api/v1/subscription/usage",
      token
    );
  }

  /**
   * Upgrade or downgrade plan.
   *
   * This uses the initialize payment endpoint because
   * your backend already handles:
   *
   * • upgrades → payment flow
   * • downgrades → scheduled automatically
   */
  async changePlan(
    plan: SubscriptionPlan,
    token?: string
  ): Promise<PaystackInitResponse> {
    return api.post<PaystackInitResponse>(
      "/api/v1/payments/initialize",
      {
        provider: "PAYSTACK",
        plan,
      },
      token
    );
  }
}

export const subscriptionApi = new SubscriptionApi();