import { useMutation } from "@tanstack/react-query";

import { generateContent } from "@/api/content";
import { GenerateContentRequest } from "@/types/content";

export function useGenerateContent(token?: string | null) {
    return useMutation({
        mutationFn: (payload: GenerateContentRequest) =>
            generateContent(payload, token ?? undefined),

        onError: (error: Error) => {
            console.log("[useGenerateContent] Error:", error.message);
        },
    });
}