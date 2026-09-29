import { useContentStore } from "@/store/contentStore";

import type {
    GenerateContentPayload,
    GeneratedContent,
} from "@/types/content";

export function useContent() {
    const currentContent = useContentStore(
        (state) => state.currentContent
    );

    const history = useContentStore(
        (state) => state.history
    );

    const loading = useContentStore(
        (state) => state.loading
    );

    const historyLoading = useContentStore(
        (state) => state.historyLoading
    );

    const error = useContentStore(
        (state) => state.error
    );

    const generateContent = async (
        payload: GenerateContentPayload
    ): Promise<GeneratedContent> => {
        return useContentStore
            .getState()
            .generateContent(payload);
    };

    const getContent = async (
        id: string
    ): Promise<GeneratedContent> => {
        return useContentStore
            .getState()
            .getContent(id);
    };

    const fetchHistory = async () => {
        return useContentStore
            .getState()
            .fetchHistory();
    };

    const regenerateContent = async (
        id: string
    ): Promise<GeneratedContent> => {
        return useContentStore
            .getState()
            .regenerateContent(id);
    };

    const deleteContent = async (
        id: string
    ) => {
        return useContentStore
            .getState()
            .deleteContent(id);
    };

    const duplicateContent = async (
        id: string
    ) => {
        return useContentStore
            .getState()
            .duplicateContent(id);
    };

    const toggleFavorite = async (
        id: string
    ) => {
        return useContentStore
            .getState()
            .toggleFavorite(id);
    };

    const clearCurrentContent = () => {
        useContentStore
            .getState()
            .clearCurrentContent();
    };

    const clearError = () => {
        useContentStore
            .getState()
            .clearError();
    };

    return {
        currentContent,

        history,

        loading,

        historyLoading,

        error,

        generateContent,

        getContent,

        fetchHistory,

        regenerateContent,

        deleteContent,

        duplicateContent,

        toggleFavorite,

        clearCurrentContent,

        clearError,
    };
}