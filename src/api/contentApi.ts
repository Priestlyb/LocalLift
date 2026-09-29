import { api } from "@/api/client";

import {
    GenerateContentPayload,
    GeneratedContent,
    ContentHistoryItem,
} from "@/types/content";

class ContentApi {
    /**
     * Generate new AI content
     */
    async generateContent(
        payload: GenerateContentPayload
    ): Promise<GeneratedContent> {
        return api.post<GeneratedContent>(
            "/content/generate",
            payload
        );
    }

    /**
     * Fetch a single generated content item
     */
    async getContent(
        id: string
    ): Promise<GeneratedContent> {
        return api.get<GeneratedContent>(
            `/content/${id}`
        );
    }

    /**
     * Fetch user's content history
     */
    async getHistory(): Promise<
        ContentHistoryItem[]
    > {
        return api.get<ContentHistoryItem[]>(
            "/content/history"
        );
    }

    /**
     * Delete content
     */
    async deleteContent(
        id: string
    ): Promise<void> {
        return api.delete<void>(
            `/content/${id}`
        );
    }

    /**
     * Regenerate content
     */
    async regenerateContent(
        id: string
    ): Promise<GeneratedContent> {
        return api.post<GeneratedContent>(
            `/content/${id}/regenerate`
        );
    }

    /**
     * Duplicate content
     */
    async duplicateContent(
        id: string
    ): Promise<GeneratedContent> {
        return api.post<GeneratedContent>(
            `/content/${id}/duplicate`
        );
    }

    /**
     * Save edited content
     */
    async updateContent(
        id: string,
        content: Partial<GeneratedContent>
    ): Promise<GeneratedContent> {
        return api.put<GeneratedContent>(
            `/content/${id}`,
            content
        );
    }

    /**
     * Mark content as favorite
     */
    async toggleFavorite(
        id: string
    ): Promise<GeneratedContent> {
        return api.patch<GeneratedContent>(
            `/content/${id}/favorite`
        );
    }
}

export const contentApi =
    new ContentApi();
