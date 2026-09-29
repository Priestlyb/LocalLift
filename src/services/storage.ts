import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
    AUTH_TOKEN: "locallift_auth_token",
    USER: "locallift_user",
    BUSINESS: "locallift_business",
    SUBSCRIPTION: "locallift_subscription",
    ONBOARDING_COMPLETED: "locallift_onboarding_completed",
    THEME: "locallift_theme",
} as const;

export const storage = {
    async set<T>(key: string, value: T): Promise<void> {
        try {
            await AsyncStorage.setItem(
                key,
                JSON.stringify(value)
            );
        } catch (error) {
            console.log("Storage set error:", error);
            throw error;
        }
    },

    async get<T>(key: string): Promise<T | null> {
        try {
            const value = await AsyncStorage.getItem(key);

            if (!value) {
                return null;
            }

            return JSON.parse(value) as T;
        } catch (error) {
            console.log("Storage get error:", error);
            return null;
        }
    },

    async remove(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log("Storage remove error:", error);
            throw error;
        }
    },

    async clear(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log("Storage clear error:", error);
            throw error;
        }
    },

    async multiRemove(keys: string[]): Promise<void> {
        try {
            await Promise.all(
                keys.map((key) => AsyncStorage.removeItem(key))
            );
        } catch (error) {
            console.log("Storage multi remove error:", error);
            throw error;
        }
    },
};