import { useSubscriptionStore } from "@/store/subscriptionStore";

import type {
    SubscriptionPlan,
    Subscription,
    SubscriptionPlanDetails,
    PaystackInitResponse,
} from "@/api/subscriptionApi";

export function useSubscription() {
    const subscription = useSubscriptionStore(
        (state) => state.subscription
    );

    const limits = useSubscriptionStore(
        (state) => state.limits
    );

    const plans = useSubscriptionStore(
        (state) => state.plans
    );

    const loading = useSubscriptionStore(
        (state) => state.loading
    );

    const paymentLoading = useSubscriptionStore(
        (state) => state.paymentLoading
    );

    const error = useSubscriptionStore(
        (state) => state.error
    );

    const fetchSubscription = async () => {
        return useSubscriptionStore
            .getState()
            .fetchSubscription();
    };

    const fetchPlans = async () => {
        return useSubscriptionStore
            .getState()
            .fetchPlans();
    };

    const initializePayment = async (
        plan: SubscriptionPlan
    ): Promise<PaystackInitResponse> => {
        return useSubscriptionStore
            .getState()
            .initializePayment(plan);
    };

    const verifyPayment = async (
        reference: string
    ) => {
        return useSubscriptionStore
            .getState()
            .verifyPayment(reference);
    };

    /**
     * Cancel subscription.
     * Pass true to cancel immediately,
     * or false (default) to cancel at
     * the end of the billing period.
     */
    const cancelSubscription = async (
        immediate = false
    ) => {
        return useSubscriptionStore
            .getState()
            .cancelSubscription(immediate);
    };

    /**
     * Upgrade or downgrade subscription.
     *
     * Backend behavior:
     * - Upgrades happen immediately.
     * - Downgrades are scheduled for renewal.
     */
    const changePlan = async (
        plan: SubscriptionPlan
    ) => {
        return useSubscriptionStore
            .getState()
            .changePlan(plan);
    };

    /**
     * Refresh usage counters.
     */
    const refreshUsage = async () => {
        return useSubscriptionStore
            .getState()
            .refreshUsage();
    };

    /**
     * Update local usage count.
     */
    const setUsage = (usage: number) => {
        useSubscriptionStore
            .getState()
            .setUsage(usage);
    };

    const updateSubscription = (
        subscription: Subscription
    ) => {
        return useSubscriptionStore
            .getState()
            .updateSubscription(subscription);
    };

    const clearError = () => {
        useSubscriptionStore
            .getState()
            .clearError();
    };

    const clearSubscription = () => {
        useSubscriptionStore
            .getState()
            .clearSubscription();
    };

    return {
        /**
         * Current subscription
         */
        subscription,

        /**
         * Current plan limits/features
         */
        limits,

        /**
         * Available plans
         */
        plans,

        /**
         * Loading states
         */
        loading,

        paymentLoading,

        /**
         * Error state
         */
        error,

        /**
         * Fetch subscription
         */
        fetchSubscription,

        /**
         * Fetch available plans
         */
        fetchPlans,

        /**
         * Initialize payment
         */
        initializePayment,

        /**
         * Verify completed payment
         */
        verifyPayment,

        /**
         * Upgrade/downgrade plan
         */
        changePlan,

        /**
         * Cancel subscription
         */
        cancelSubscription,

        /**
         * Refresh usage from server
         */
        refreshUsage,

        /**
         * Update local usage
         */
        setUsage,

        /**
         * Replace subscription in store
         */
        updateSubscription,

        /**
         * Clear subscription state
         */
        clearSubscription,

        /**
         * Clear error state
         */
        clearError,
    };
}