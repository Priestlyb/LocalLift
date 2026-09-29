import { api } from "@/api/client";
import {
    GenerateContentRequest,
    GenerateContentResponse,
} from "@/types/content";

export const generateContent = (
    body: GenerateContentRequest,
    token?: string
) => {
    return api.post<GenerateContentResponse>(
        "/api/v1/content/generate",
        body,
        token
    );
};