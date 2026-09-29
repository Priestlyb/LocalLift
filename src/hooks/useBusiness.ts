import { useBusinessStore } from "@/store/businessStore";

import type {
    Business,
    CreateBusinessPayload,
    UpdateBusinessPayload,
} from "@/api/businessApi";

export function useBusiness() {
    const business = useBusinessStore((state) => state.business);

    const loading = useBusinessStore((state) => state.loading);

    const error = useBusinessStore((state) => state.error);

    /**
     * Tracks whether we've attempted to fetch the business.
     * Useful for route guards.
     */
    const initialized = useBusinessStore(
        (state) => state.initialized
    );

    const fetchBusiness = async () => {
        return useBusinessStore.getState().fetchBusiness();
    };

    const createBusiness = async (
        data: CreateBusinessPayload
    ): Promise<Business> => {
        return useBusinessStore.getState().createBusiness(data);
    };

    const updateBusiness = async (
        data: UpdateBusinessPayload
    ): Promise<Business> => {
        return useBusinessStore.getState().updateBusiness(data);
    };

    const uploadLogo = async (
        formData: FormData
    ): Promise<Business> => {
        return useBusinessStore
            .getState()
            .uploadLogo(formData);
    };

    const deleteBusiness = async () => {
        return useBusinessStore
            .getState()
            .deleteBusiness();
    };

    const clearBusiness = () => {
        useBusinessStore
            .getState()
            .clearBusiness();
    };

    const clearError = () => {
        useBusinessStore
            .getState()
            .clearError();
    };

    return {
        business,
        loading,
        error,
        initialized,

        fetchBusiness,
        createBusiness,
        updateBusiness,
        uploadLogo,
        deleteBusiness,
        clearBusiness,
        clearError,
    };
}