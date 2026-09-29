import { useCallback, useEffect, useRef, useState } from "react";

import {
    subscriptionService,
    Subscription,
} from "@/services/subscription.service";

interface UseSubscriptionStatusOptions {
    token: string;
    enabled?: boolean;
    interval?: number;
}

export function useSubscriptionStatus({
    token,
    enabled = true,
    interval = 2000,
}: UseSubscriptionStatusOptions) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [loading, setLoading] = useState(enabled);
    const [subscription, setSubscription] =
        useState<Subscription | null>(null);

    const [isActive, setIsActive] = useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const stopPolling = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const checkSubscription =
        useCallback(async () => {
            if (!token) {
                return;
            }

            try {
                const response =
                    await subscriptionService.getSubscription(
                        token
                    );

                setSubscription(
                    response.subscription ?? null
                );

                const active =
                    response.subscription?.status ===
                    "ACTIVE";

                setIsActive(active);

                if (active) {
                    stopPolling();
                }

                setError(null);
            } catch (err: any) {
                // Treat "not found" as still waiting
                if (
                    err?.message
                        ?.toLowerCase()
                        .includes("not found")
                ) {
                    setSubscription(null);
                    setIsActive(false);
                    return;
                }

                setError(
                    err?.message ??
                    "Failed to fetch subscription."
                );
            } finally {
                setLoading(false);
            }
        }, [token, stopPolling]);

    const refresh = useCallback(async () => {
        setLoading(true);
        await checkSubscription();
    }, [checkSubscription]);

    useEffect(() => {
        if (!enabled || !token) {
            return;
        }

        checkSubscription();

        timerRef.current = setInterval(() => {
            checkSubscription();
        }, interval);

        return () => {
            stopPolling();
        };
    }, [
        enabled,
        token,
        interval,
        checkSubscription,
        stopPolling,
    ]);

    return {
        loading,
        subscription,
        isActive,
        error,
        refresh,
        stopPolling,
    };
}