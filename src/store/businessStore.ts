import { create } from "zustand";

import {
  businessApi,
  Business,
  CreateBusinessPayload,
  UpdateBusinessPayload,
} from "@/api/businessApi";

interface BusinessState {
  business: Business | null;

  /**
   * IMPORTANT: tracks first fetch attempt
   */
  initialized: boolean;

  loading: boolean;

  error: string | null;

  fetchBusiness: () => Promise<void>;

  createBusiness: (
    data: CreateBusinessPayload
  ) => Promise<Business>;

  updateBusiness: (
    data: UpdateBusinessPayload
  ) => Promise<Business>;

  uploadLogo: (
    formData: FormData
  ) => Promise<Business>;

  deleteBusiness: () => Promise<void>;

  clearBusiness: () => void;

  clearError: () => void;
}

export const useBusinessStore =
  create<BusinessState>((set) => ({
    business: null,

    initialized: false,

    loading: false,

    error: null,

    fetchBusiness: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const res =
          await businessApi.getBusiness();

        //console.log("Business Details", res)

        set({
          business: res.business ?? null,
          loading: false,
          initialized: true,
        });
      } catch (error: any) {
        set({
          loading: false,
          initialized: true, // IMPORTANT even on 404
          business: null,
          error:
            error?.message ||
            "Failed to load business",
        });
      }
    },

    createBusiness: async (data: CreateBusinessPayload) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const res =
          await businessApi.createBusiness(data);

        set({
          business: res.business,
          loading: false,
        });

        return res.business;
      } catch (error: any) {
        set({
          loading: false,
          error:
            error?.message ||
            "Failed to create business",
        });

        throw error;
      }
    },

    updateBusiness: async (data) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const res =
          await businessApi.updateBusiness(
            data
          );

        set({
          business: res.business,
          loading: false,
        });

        return res.business;
      } catch (error: any) {
        set({
          loading: false,
          error:
            error?.message ||
            "Failed to update business",
        });

        throw error;
      }
    },

    uploadLogo: async (logoUrl) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const res =
          await businessApi.uploadLogo(
            logoUrl
          );

        set({
          business: res.business,
          loading: false,
        });

        return res.business;
      } catch (error: any) {
        set({
          loading: false,
          error:
            error?.message ||
            "Failed to upload logo",
        });

        throw error;
      }
    },

    deleteBusiness: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        await businessApi.deleteBusiness();

        set({
          business: null,
          loading: false,
        });
      } catch (error: any) {
        set({
          loading: false,
          error:
            error?.message ||
            "Failed to delete business",
        });

        throw error;
      }
    },

    clearBusiness: () => {
      set({
        business: null,
        initialized: false,
      });
    },

    clearError: () => {
      set({ error: null });
    },
  }));