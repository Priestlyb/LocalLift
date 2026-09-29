import { create } from "zustand";

interface BusinessOnboardingData {
    category: string;

    businessName: string;
    description: string;
    targetAudience: string;
    uniqueSellingPoint: string;
    brandVoice: string;

    phone: string;
    email: string;
    website: string;

    address: string;
    city: string;
    state: string;
    country: string;

    logo?: string;

    primaryColor: string;
    secondaryColor: string;

    facebook: string;
    instagram: string;
    x: string;
    linkedin: string;
    tiktok: string;

    setData: (
        data: Partial<BusinessOnboardingData>
    ) => void;

    reset: () => void;
}

export const useOnboardingStore =
    create<BusinessOnboardingData>((set) => ({
        category: "",

        businessName: "",
        description: "",
        targetAudience: "",
        uniqueSellingPoint: "",
        brandVoice: "",

        phone: "",
        email: "",
        website: "",

        address: "",
        city: "",
        state: "",
        country: "Nigeria",

        logo: undefined,

        primaryColor: "#000000",
        secondaryColor: "#FFFFFF",

        facebook: "",
        instagram: "",
        x: "",
        linkedin: "",
        tiktok: "",


        setData: (data) =>
            set((state) => {
                const changed = Object.entries(data).some(
                    ([key, value]) =>
                        state[key as keyof BusinessOnboardingData] !== value
                );

                if (!changed) {
                    return state;
                }

                return {
                    ...state,
                    ...data,
                };
            }),


        reset: () =>
            set((state) => {
                const initialState = {
                    category: "",

                    businessName: "",
                    description: "",
                    targetAudience: "",
                    uniqueSellingPoint: "",
                    brandVoice: "",

                    phone: "",
                    email: "",
                    website: "",

                    address: "",
                    city: "",
                    state: "",
                    country: "Nigeria",

                    logo: undefined,

                    primaryColor: "#000000",
                    secondaryColor: "#FFFFFF",

                    facebook: "",
                    instagram: "",
                    x: "",
                    linkedin: "",
                    tiktok: "",
                };

                const changed = Object.entries(initialState).some(
                    ([key, value]) =>
                        state[key as keyof BusinessOnboardingData] !== value
                );

                if (!changed) {
                    return state;
                }

                return {
                    ...initialState,
                    setData: state.setData,
                    reset: state.reset,
                };
            }),
    }));