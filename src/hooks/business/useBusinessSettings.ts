// hooks/useBusinessSettings.ts

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { api } from "@/api/client";

import { useBusinessStore } from "@/store/businessStore";

import {
    BusinessForm,
    BusinessField,
} from "@/types/business";

const initialBusiness: BusinessForm = {
    name: "",
    category: "",
    description: "",

    address: "",
    city: "",
    state: "",
    country: "",

    phone: "",
    email: "",
    website: "",

    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
    x: "",

    audience: "",
    tone: "",
    uniqueSellingPoint: "",

    primaryColor: "",
    secondaryColor: "",
    logo: "",
};

/**
 * Available business categories
 */
const categories = [
    "Restaurant",
    "Beauty Salon",
    "Retail Store",
    "Real Estate",
    "Fitness Center",
    "Service Business",
    "Pharmacy",
    "Other",
];

/**
 * Available brand tones
 */
const toneOptions = [
    "Professional",
    "Friendly",
    "Luxury",
    "Playful",
    "Bold",
    "Minimal",
];

export function useBusinessSettings() {
    const businessFromStore = useBusinessStore(
        (state) => state.business
    );

    const fetchBusiness = useBusinessStore(
        (state) => state.fetchBusiness
    );

    const [business, setBusiness] =
        useState<BusinessForm>(initialBusiness);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    /**
     * Fetch business from backend/store
     */
    useEffect(() => {
        const loadBusiness = async () => {
            try {
                setLoading(true);

                await fetchBusiness();
            } catch (error) {
                console.error(
                    "[FETCH BUSINESS ERROR]",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadBusiness();
    }, [fetchBusiness]);

    /**
     * Sync store -> local form state
     */
    useEffect(() => {
        if (!businessFromStore) return;

        setBusiness({
            name:
                businessFromStore.businessName ??
                "",

            category:
                businessFromStore.category ??
                "",

            description:
                businessFromStore.description ??
                "",

            address:
                businessFromStore.address ??
                "",

            city:
                businessFromStore.city ??
                "",

            state:
                businessFromStore.state ??
                "",

            country:
                businessFromStore.country ??
                "",

            phone:
                businessFromStore.phone ??
                "",

            email:
                businessFromStore.email ??
                "",

            website:
                businessFromStore.website ??
                "",

            facebook:
                businessFromStore.facebook ??
                "",

            instagram:
                businessFromStore.instagram ??
                "",

            linkedin:
                businessFromStore.linkedin ??
                "",

            tiktok:
                businessFromStore.tiktok ??
                "",

            x:
                businessFromStore.x ??
                "",

            audience:
                businessFromStore.targetAudience ??
                "",

            tone:
                businessFromStore.brandVoice ??
                "",

            uniqueSellingPoint:
                businessFromStore.uniqueSellingPoint ??
                "",

            primaryColor:
                businessFromStore.primaryColor ??
                "",

            secondaryColor:
                businessFromStore.secondaryColor ??
                "",

            logo:
                businessFromStore.logo ??
                "",
        });
    }, [businessFromStore]);

    /**
     * Update a single field
     */
    const updateField = useCallback(
        (
            field: BusinessField,
            value: string
        ) => {
            setBusiness((prev) => ({
                ...prev,
                [field]: value,
            }));
        },
        []
    );

    /**
     * Save business
     *
     * Requires the user's current password.
     *
     * Flow:
     *
     * FormData
     *    ↓
     * API
     *    ↓
     * Backend password verification
     *    ↓
     * Logo → Cloudflare R2
     *    ↓
     * Logo URL → MongoDB
     */
    const saveBusiness = useCallback(
        async (currentPassword: string) => {
            try {
                /**
                 * Validate password locally
                 */
                if (!currentPassword.trim()) {
                    throw new Error(
                        "Current password is required."
                    );
                }

                setSaving(true);

                const formData =
                    new FormData();

                /**
                 * Password verification
                 */
                formData.append(
                    "currentPassword",
                    currentPassword
                );

                /**
                 * Basic Business Information
                 */
                formData.append(
                    "businessName",
                    business.name
                );

                formData.append(
                    "category",
                    business.category
                );

                formData.append(
                    "description",
                    business.description
                );

                /**
                 * Address
                 */
                formData.append(
                    "address",
                    business.address
                );

                formData.append(
                    "city",
                    business.city
                );

                formData.append(
                    "state",
                    business.state
                );

                formData.append(
                    "country",
                    business.country
                );

                /**
                 * Contact
                 */
                formData.append(
                    "phone",
                    business.phone
                );

                formData.append(
                    "email",
                    business.email
                );

                formData.append(
                    "website",
                    business.website
                );

                /**
                 * Social Media
                 */
                formData.append(
                    "facebook",
                    business.facebook
                );

                formData.append(
                    "instagram",
                    business.instagram
                );

                formData.append(
                    "linkedin",
                    business.linkedin
                );

                formData.append(
                    "tiktok",
                    business.tiktok
                );

                formData.append(
                    "x",
                    business.x
                );

                /**
                 * AI / Marketing Context
                 */
                formData.append(
                    "targetAudience",
                    business.audience
                );

                formData.append(
                    "brandVoice",
                    business.tone
                );

                formData.append(
                    "uniqueSellingPoint",
                    business.uniqueSellingPoint
                );

                /**
                 * Branding
                 */
                formData.append(
                    "primaryColor",
                    business.primaryColor
                );

                formData.append(
                    "secondaryColor",
                    business.secondaryColor
                );

                /**
                 * Logo
                 *
                 * Existing logo:
                 * https://...
                 *
                 * Don't upload it again.
                 *
                 * New logo:
                 * file://...
                 * content://...
                 *
                 * Upload it to the backend.
                 */
                if (
                    business.logo &&
                    !business.logo.startsWith(
                        "http://"
                    ) &&
                    !business.logo.startsWith(
                        "https://"
                    )
                ) {
                    /**
                     * Determine file extension/type
                     * when possible.
                     */
                    const extension =
                        business.logo
                            .split(".")
                            .pop()
                            ?.toLowerCase() ||
                        "jpg";

                    let mimeType =
                        "image/jpeg";

                    if (
                        extension === "png"
                    ) {
                        mimeType =
                            "image/png";
                    } else if (
                        extension === "webp"
                    ) {
                        mimeType =
                            "image/webp";
                    } else if (
                        extension === "heic"
                    ) {
                        mimeType =
                            "image/heic";
                    }

                    formData.append(
                        "logo",
                        {
                            uri: business.logo,
                            name: `business-logo.${extension}`,
                            type: mimeType,
                        } as any
                    );
                }

                /**
                 * Send multipart/form-data.
                 *
                 * IMPORTANT:
                 *
                 * Do NOT manually set
                 * Content-Type here.
                 *
                 * Your api client uses fetch()
                 * and automatically allows fetch
                 * to generate:
                 *
                 * multipart/form-data;
                 * boundary=...
                 */
                const response =
                    await api.put(
                        "/business",
                        formData
                    );

                console.log(
                    "[UPDATE BUSINESS RESPONSE]",
                    response
                );

                /**
                 * Refresh business store.
                 *
                 * This ensures the new R2 logo URL
                 * and other updated business data
                 * are immediately available.
                 */
                await fetchBusiness();

                return response;
            } catch (error: any) {
                console.error(
                    "[UPDATE BUSINESS ERROR]",
                    error
                );

                /**
                 * Your custom API client throws:
                 *
                 * new Error(message)
                 *
                 * so error.message is what we
                 * should use here.
                 */
                const message =
                    error?.message ||
                    "Failed to update business.";

                throw new Error(message);
            } finally {
                setSaving(false);
            }
        },
        [
            business,
            fetchBusiness,
        ]
    );

    /**
     * Reset business form
     */
    const resetBusiness = useCallback(() => {
        setBusiness(initialBusiness);
    }, []);

    return {
        business,
        loading,
        saving,

        categories,
        toneOptions,

        updateField,
        saveBusiness,
        resetBusiness,
    };
}