import { api } from "@/api/client";
import { useAuthStore } from "@/store/authStore";

export interface Business {
    _id: string;

    owner: string;

    businessName: string;
    category: string;
    description: string;

    targetAudience?: string;
    uniqueSellingPoint?: string;
    brandVoice?: string;

    phone?: string;
    email?: string;

    address?: string;
    city?: string;
    state?: string;
    country?: string;

    website?: string;

    /**
     * Branding
     */
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;

    /**
     * Social Media
     */
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    x?: string;

    createdAt: string;
    updatedAt: string;
}

export interface CreateBusinessPayload {
    businessName: string;
    category: string;

    description?: string;

    targetAudience?: string;
    uniqueSellingPoint?: string;
    brandVoice?: string;

    phone?: string;
    email?: string;

    address?: string;
    city?: string;
    state?: string;
    country?: string;

    website?: string;

    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;

    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    x?: string;
}

export interface UpdateBusinessPayload {
    businessName?: string;
    category?: string;

    description?: string;

    targetAudience?: string;
    uniqueSellingPoint?: string;
    brandVoice?: string;

    phone?: string;
    email?: string;

    address?: string;
    city?: string;
    state?: string;
    country?: string;

    website?: string;

    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;

    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    x?: string;
}

class BusinessApi {
    private getToken(): string | undefined {
        return useAuthStore.getState().token ?? undefined;
    }

    async getBusiness(): Promise<{ business: Business }> {
        return api.get<{ business: Business }>(
            "/api/v1/business",
            this.getToken()
        );
    }

    async createBusiness(
        data: CreateBusinessPayload
    ): Promise<{ business: Business }> {
        return api.post<{ business: Business }>(
            "/api/v1/business",
            data,
            this.getToken()
        );
    }

    async updateBusiness(
        data: UpdateBusinessPayload
    ): Promise<{ business: Business }> {
        return api.put<{ business: Business }>(
            "/api/v1/business",
            data,
            this.getToken()
        );
    }

    async uploadLogo(
        formData: FormData
    ): Promise<{ business: Business }> {
        return api.post<{ business: Business }>(
            "/api/v1/business/logo",
            formData,
            this.getToken()
        );
    }

    async deleteBusiness(): Promise<{ message: string }> {
        return api.delete<{ message: string }>(
            "/api/v1/business",
            this.getToken()
        );
    }
}

export const businessApi = new BusinessApi();