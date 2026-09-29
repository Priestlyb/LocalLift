import { storage, STORAGE_KEYS } from "./storage";

import { User } from "@/types/auth";
import { Business } from "@/types/business";
import { Subscription } from "@/types/subscription";

export const storageHelpers = {
    saveToken(token: string) {
        return storage.set(
            STORAGE_KEYS.AUTH_TOKEN,
            token
        );
    },

    getToken() {
        return storage.get<string>(
            STORAGE_KEYS.AUTH_TOKEN
        );
    },

    saveUser(user: User) {
        return storage.set(
            STORAGE_KEYS.USER,
            user
        );
    },

    getUser() {
        return storage.get<User>(
            STORAGE_KEYS.USER
        );
    },

    saveBusiness(business: Business) {
        return storage.set(
            STORAGE_KEYS.BUSINESS,
            business
        );
    },

    getBusiness() {
        return storage.get<Business>(
            STORAGE_KEYS.BUSINESS
        );
    },

    saveSubscription(
        subscription: Subscription
    ) {
        return storage.set(
            STORAGE_KEYS.SUBSCRIPTION,
            subscription
        );
    },

    getSubscription() {
        return storage.get<Subscription>(
            STORAGE_KEYS.SUBSCRIPTION
        );
    },

    setOnboardingCompleted() {
        return storage.set(
            STORAGE_KEYS.ONBOARDING_COMPLETED,
            true
        );
    },

    getOnboardingCompleted() {
        return storage.get<boolean>(
            STORAGE_KEYS.ONBOARDING_COMPLETED
        );
    },

    async logout() {
        await storage.multiRemove([
            STORAGE_KEYS.AUTH_TOKEN,
            STORAGE_KEYS.USER,
            STORAGE_KEYS.BUSINESS,
            STORAGE_KEYS.SUBSCRIPTION,
        ]);
    },
};