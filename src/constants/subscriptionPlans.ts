import { SubscriptionPlan } from "@/types/subscription";

export interface SubscriptionPlanUI {
    id: SubscriptionPlan;

    /**
     * Used for upgrade/downgrade comparisons.
     */
    level: number;

    /**
     * Display
     */
    title: string;
    name: string;
    subtitle: string;

    /**
     * Pricing
     */
    price: string;

    /**
     * UI
     */
    badge?: string;
    popular?: boolean;

    color: string;
    accent: string;

    /**
     * Icon name used by IconSymbol
     */
    icon: string;

    /**
     * Plan features
     */
    features: string[];
}

export const SUBSCRIPTION_PLANS: Record<
    SubscriptionPlan,
    SubscriptionPlanUI
> = {
    FREE: {
        id: "FREE",
        level: 0,

        title: "Free",
        name: "Free",

        subtitle: "Perfect for getting started",

        price: "₦0",

        badge: "Current",

        popular: false,

        color: "#64748B",
        accent: "#CBD5E1",

        icon: "SparklesIcon",

        features: [
            "Limited AI image generations",
            "Standard resolution exports",
            "Basic AI features",
        ],
    },

    STARTER: {
        id: "STARTER",
        level: 1,

        title: "Starter",
        name: "Starter",

        subtitle: "For creators and small businesses",

        price: "₦5,000 / month",

        badge: "Popular",

        popular: true,

        color: "#2563EB",
        accent: "#DBEAFE",

        icon: "RocketLaunchIcon",

        features: [
            "More AI image generations",
            "Higher export resolution",
            "AI captions",
            "Remove watermark",
        ],
    },

    GROWTH: {
        id: "GROWTH",
        level: 2,

        title: "Growth",
        name: "Growth",

        subtitle: "Designed for growing brands",

        price: "₦10,000 / month",

        badge: "Best Value",

        popular: true,

        color: "#059669",
        accent: "#D1FAE5",

        icon: "ChartBarIcon",

        features: [
            "Large monthly image allowance",
            "High-resolution exports",
            "AI captions",
            "Scheduler",
            "Analytics",
            "Branding removal",
        ],
    },

    PRO: {
        id: "PRO",
        level: 3,

        title: "Pro",
        name: "Pro",

        subtitle: "Everything LocalLift has to offer",

        price: "₦20,000 / month",

        badge: "Premium",

        popular: false,

        color: "#7C3AED",
        accent: "#EDE9FE",

        icon: "StarIcon",

        features: [
            "Unlimited AI image generations",
            "Maximum export resolution",
            "AI captions",
            "Scheduler",
            "Analytics",
            "Team access",
            "API access",
            "Multiple brands",
            "No watermark",
        ],
    },
};

export const PLAN_ORDER: SubscriptionPlan[] = [
    "FREE",
    "STARTER",
    "GROWTH",
    "PRO",
];

export function getPlanIndex(
    plan: SubscriptionPlan
): number {
    return PLAN_ORDER.indexOf(plan);
}

export function isUpgrade(
    current: SubscriptionPlan,
    target: SubscriptionPlan
): boolean {
    return getPlanIndex(target) > getPlanIndex(current);
}

export function isDowngrade(
    current: SubscriptionPlan,
    target: SubscriptionPlan
): boolean {
    return getPlanIndex(target) < getPlanIndex(current);
}

export function isCurrentPlan(
    current: SubscriptionPlan,
    target: SubscriptionPlan
): boolean {
    return current === target;
}