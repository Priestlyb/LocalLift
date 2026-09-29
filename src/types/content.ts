export type ContentType = "SOCIAL_POST";

export type Platform =
    | "Instagram"
    | "Facebook"
    | "WhatsApp"
    | "Google"
    | "Email";

export type Tone = string;

export interface GenerateContentRequest {
    businessId: string;
    type: ContentType;
    platform: Platform;
    tone: Tone;
    audience: string;
    productName: string;
    details: string;
}

export interface GenerateContentResponse {
    content: string;
}