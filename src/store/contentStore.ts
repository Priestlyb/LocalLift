import { create } from "zustand";

import { contentApi } from "@/api/contentApi";
import { useSubscriptionStore } from "@/store/subscriptionStore";

import type {
    GenerateContentPayload,
    GeneratedContent,
    ContentHistoryItem,
} from "@/types/content";

interface ContentState {
    currentContent: GeneratedContent | null;

    history: ContentHistoryItem[];

    loading: boolean;

    historyLoading: boolean;

    error: string | null;

    generateContent: (
        payload: GenerateContentPayload
    ) => Promise<GeneratedContent>;

    getContent: (
        id: string
    ) => Promise<GeneratedContent>;

    fetchHistory: () => Promise<void>;

    regenerateContent: (
        id: string
    ) => Promise<GeneratedContent>;

    deleteContent: (
        id: string
    ) => Promise<void>;

    duplicateContent: (
        id: string
    ) => Promise<GeneratedContent>;

    toggleFavorite: (
        id: string
    ) => Promise<void>;

    clearCurrentContent: () => void;

    clearError: () => void;
}

export const useContentStore =
    create<ContentState>((set, get) => ({
        currentContent: null,

        history: [],

        loading: false,

        historyLoading: false,

        error: null,

        /**
         * GENERATE CONTENT
         */
        generateContent: async (
            payload: GenerateContentPayload
        ) => {
            try {
                set({
                    loading: true,
                    error: null,
                });

                const subscriptionStore =
                    useSubscriptionStore.getState();

                const subscription =
                    subscriptionStore.subscription;

                /**
                 * PLAN LIMIT ENFORCEMENT
                 */
                if (
                    subscription &&
                    subscription.monthlyLimit > 0 &&
                    subscription.usedThisMonth >=
                    subscription.monthlyLimit
                ) {
                    throw new Error(
                        "You have reached your monthly AI generation limit. Upgrade your plan to continue."
                    );
                }

                const content =
                    await contentApi.generateContent(
                        payload
                    );

                /**
                 * INCREMENT USAGE LOCALLY
                 */
                if (subscription) {
                    subscriptionStore.setUsage(
                        subscription.usedThisMonth + 1
                    );
                }

                set({
                    currentContent: content,
                    loading: false,
                });

                return content;
            } catch (error: any) {
                set({
                    loading: false,
                    error:
                        error?.message ||
                        "Failed to generate content",
                });

                throw error;
            }
        },

        /**
         * GET CONTENT
         */
        getContent: async (id: string) => {
            try {
                set({
                    loading: true,
                    error: null,
                });

                const content =
                    await contentApi.getContent(id);

                set({
                    currentContent: content,
                    loading: false,
                });

                return content;
            } catch (error: any) {
                set({
                    loading: false,
                    error:
                        error?.message ||
                        "Failed to fetch content",
                });

                throw error;
            }
        },

        /**
         * HISTORY
         */
        fetchHistory: async () => {
            try {
                set({
                    historyLoading: true,
                    error: null,
                });

                const history =
                    await contentApi.getHistory();

                set({
                    history,
                    historyLoading: false,
                });
            } catch (error: any) {
                set({
                    historyLoading: false,
                    error:
                        error?.message ||
                        "Failed to fetch history",
                });
            }
        },

        /**
         * REGENERATE
         */
        regenerateContent: async (
            id: string
        ) => {
            try {
                set({
                    loading: true,
                    error: null,
                });

                const subscriptionStore =
                    useSubscriptionStore.getState();

                const subscription =
                    subscriptionStore.subscription;

                if (
                    subscription &&
                    subscription.monthlyLimit > 0 &&
                    subscription.usedThisMonth >=
                    subscription.monthlyLimit
                ) {
                    throw new Error(
                        "Monthly AI generation limit reached."
                    );
                }

                const content =
                    await contentApi.regenerateContent(
                        id
                    );

                if (subscription) {
                    subscriptionStore.setUsage(
                        subscription.usedThisMonth + 1
                    );
                }

                set({
                    currentContent: content,
                    loading: false,
                });

                return content;
            } catch (error: any) {
                set({
                    loading: false,
                    error:
                        error?.message ||
                        "Failed to regenerate content",
                });

                throw error;
            }
        },

        /**
         * DELETE
         */
        deleteContent: async (
            id: string
        ) => {
            try {
                await contentApi.deleteContent(id);

                set((state) => ({
                    history: state.history.filter(
                        (item) => item.id !== id
                    ),
                }));
            } catch (error: any) {
                set({
                    error:
                        error?.message ||
                        "Failed to delete content",
                });

                throw error;
            }
        },

        /**
         * DUPLICATE
         */
        duplicateContent: async (
            id: string
        ) => {
            try {
                const content =
                    await contentApi.duplicateContent(
                        id
                    );

                set((state) => ({
                    history: [
                        content as any,
                        ...state.history,
                    ],
                }));

                return content;
            } catch (error: any) {
                set({
                    error:
                        error?.message ||
                        "Failed to duplicate content",
                });

                throw error;
            }
        },

        /**
         * FAVORITE
         */
        toggleFavorite: async (
            id: string
        ) => {
            try {
                await contentApi.toggleFavorite(id);

                await get().fetchHistory();
            } catch (error: any) {
                set({
                    error:
                        error?.message ||
                        "Failed to update favorite",
                });
            }
        },

        clearCurrentContent: () => {
            set({
                currentContent: null,
            });
        },

        clearError: () => {
            set({
                error: null,
            });
        },
    }));