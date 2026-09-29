import { api } from "@/api/client";

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

export interface Subscription {
    _id: string;

    user: string;

    /**
     * Current active plan.
     */
    plan: SubscriptionPlan;

    /**
     * Scheduled plan change.
     * Used for downgrades.
     */
    nextPlan: SubscriptionPlan | null;

    /**
     * Whether nextPlan should
     * be applied at renewal.
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
}

export interface SubscriptionLimits {
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

export interface GetSubscriptionResponse {
    subscription: Subscription | null;

    limits: SubscriptionLimits | null;
}

class SubscriptionService {
    /**
     * Get the current user's subscription.
     */
    async getSubscription(
        token: string
    ): Promise<GetSubscriptionResponse> {
        return api.get<GetSubscriptionResponse>(
            "/api/v1/subscription",
            token
        );
    }

    /**
     * Returns whether the subscription
     * is currently active.
     */
    async isSubscriptionActive(
        token: string
    ): Promise<boolean> {
        try {
            const response =
                await this.getSubscription(token);

            return (
                response.subscription?.status ===
                "ACTIVE" &&
                !!response.subscription.expiresAt &&
                new Date(
                    response.subscription.expiresAt
                ) > new Date()
            );
        } catch (error: any) {
            if (
                error?.message
                    ?.toLowerCase()
                    .includes("not found")
            ) {
                return false;
            }

            throw error;
        }
    }

    /**
     * Returns whether a downgrade
     * has been scheduled.
     */
    async hasScheduledPlanChange(
        token: string
    ): Promise<boolean> {
        const response =
            await this.getSubscription(token);

        return (
            response.subscription?.changeAtRenewal ===
            true
        );
    }

    /**
     * Returns the scheduled plan,
     * if one exists.
     */
    async getScheduledPlan(
        token: string
    ): Promise<SubscriptionPlan | null> {
        const response =
            await this.getSubscription(token);

        return (
            response.subscription?.nextPlan ?? null
        );
    }

    /**
     * Returns whether auto-renew
     * is enabled.
     */
    async willAutoRenew(
        token: string
    ): Promise<boolean> {
        const response =
            await this.getSubscription(token);

        return (
            response.subscription?.autoRenew ??
            false
        );
    }
}

export const subscriptionService =
    new SubscriptionService();