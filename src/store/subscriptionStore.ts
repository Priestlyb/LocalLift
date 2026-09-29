import { create } from "zustand";

import {
    subscriptionApi,
    Subscription,
    SubscriptionPlan,
    SubscriptionPlanDetails,
    PaystackInitResponse,
} from "@/api/subscriptionApi";

interface SubscriptionState {
    /**
     * Current subscription
     */
    subscription: Subscription | null;

    /**
     * Current plan limits/features
     */
    limits: SubscriptionPlanDetails | null;

    /**
     * Available plans
     */
    plans: SubscriptionPlanDetails[];

    loading: boolean;

    paymentLoading: boolean;

    error: string | null;

    fetchSubscription: () => Promise<void>;

    fetchPlans: () => Promise<void>;

    initializePayment: (
        plan: SubscriptionPlan
    ) => Promise<PaystackInitResponse>;

    verifyPayment: (
        reference: string
    ) => Promise<void>;

    /**
     * Cancel subscription.
     *
     * immediate = false
     * Schedules cancellation at renewal.
     *
     * immediate = true
     * Cancels instantly.
     */
    cancelSubscription: (
        immediate?: boolean
    ) => Promise<void>;

    /**
     * Schedule downgrade or
     * perform immediate upgrade.
     */
    changePlan: (
        plan: SubscriptionPlan
    ) => Promise<void>;

    refreshUsage: () => Promise<void>;

    setUsage: (usage: number) => void;

    updateSubscription: (
        subscription: Subscription
    ) => void;

    clearError: () => void;

    clearSubscription: () => void;
}

export const useSubscriptionStore =
    create<SubscriptionState>((set) => ({
        subscription: null,

        limits: null,

        plans: [],

        loading: false,

        paymentLoading: false,

        error: null,

        /**
         * FETCH CURRENT SUBSCRIPTION
         */
        fetchSubscription: async () => {
            try {
                set({
                    loading: true,
                    error: null,
                });

                const response =
                    await subscriptionApi.getSubscription();

                set({
                    subscription:
                        response.subscription,

                    limits: response.limits,

                    loading: false,
                });
            } catch (error: any) {
                set({
                    loading: false,
                    error:
                        error?.message ??
                        "Failed to fetch subscription",
                });
            }
        },

        /**
         * FETCH AVAILABLE PLANS
         */
        fetchPlans: async () => {
            try {
                set({
                    error: null,
                });

                const plans =
                    await subscriptionApi.getPlans();

                set({
                    plans,
                });
            } catch (error: any) {
                set({
                    error:
                        error?.message ??
                        "Failed to fetch plans",
                });
            }
        },

        /**
         * INITIALIZE PAYMENT
         */
        initializePayment: async (
            plan
        ) => {
            try {
                set({
                    paymentLoading: true,
                    error: null,
                });

                const response =
                    await subscriptionApi.initializePayment(
                        plan
                    );

                set({
                    paymentLoading: false,
                });

                return response;
            } catch (error: any) {
                set({
                    paymentLoading: false,
                    error:
                        error?.message ??
                        "Payment initialization failed",
                });

                throw error;
            }
        },

        /**
         * VERIFY PAYMENT
         */
        verifyPayment: async (
            reference
        ) => {
            try {
                set({
                    loading: true,
                    error: null,
                });

                await subscriptionApi.verifyPayment(
                    reference
                );

                const updated =
                    await subscriptionApi.getSubscription();

                set({
                    subscription:
                        updated.subscription,

                    limits: updated.limits,

                    loading: false,
                });
            } catch (error: any) {
                set({
                    loading: false,
                    error:
                        error?.message ??
                        "Payment verification failed",
                });

                throw error;
            }
        },

        /**
         * CHANGE PLAN
         *
         * Backend decides whether
         * this is an upgrade or
         * scheduled downgrade.
         */
        changePlan: async (
            plan
        ) => {
            try {
                set({
                    loading: true,
                    error: null,
                });

                const response =
                    await subscriptionApi.changePlan(
                        plan
                    );

                set({
                    subscription:
                        response.subscription,

                    limits: response.limits,

                    loading: false,
                });
            } catch (error: any) {
                set({
                    loading: false,
                    error:
                        error?.message ??
                        "Failed to change plan",
                });

                throw error;
            }
        },

        /**
         * CANCEL SUBSCRIPTION
         */
        cancelSubscription: async (
            immediate = false
        ) => {
            try {
                set({
                    loading: true,
                    error: null,
                });

                await subscriptionApi.cancelSubscription(
                    immediate
                );

                const updated =
                    await subscriptionApi.getSubscription();

                set({
                    subscription:
                        updated.subscription,

                    limits: updated.limits,

                    loading: false,
                });
            } catch (error: any) {
                set({
                    loading: false,
                    error:
                        error?.message ??
                        "Failed to cancel subscription",
                });

                throw error;
            }
        },

        /**
         * REFRESH USAGE
         */
        refreshUsage: async () => {
            try {
                const usage =
                    await subscriptionApi.refreshUsage();

                set((state) => {
                    if (!state.subscription) {
                        return state;
                    }

                    return {
                        subscription: {
                            ...state.subscription,
                            usedThisMonth:
                                usage.usedThisMonth,
                            remainingGenerations:
                                usage.remainingGenerations,
                        },
                    };
                });
            } catch (error: any) {
                set({
                    error:
                        error?.message ??
                        "Failed to refresh usage",
                });
            }
        },

        /**
         * UPDATE USAGE LOCALLY
         */
        setUsage: (usage) => {
            set((state) => {
                if (!state.subscription) {
                    return state;
                }

                return {
                    subscription: {
                        ...state.subscription,
                        usedThisMonth: usage,
                    },
                };
            });
        },

        /**
         * REPLACE SUBSCRIPTION
         */
        updateSubscription: (
            subscription
        ) => {
            set({
                subscription,
            });
        },

        /**
         * CLEAR SUBSCRIPTION
         */
        clearSubscription: () => {
            set({
                subscription: null,
                limits: null,
            });
        },

        /**
         * CLEAR ERROR
         */
        clearError: () => {
            set({
                error: null,
            });
        },
    }));