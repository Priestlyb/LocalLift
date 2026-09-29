import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api, apiFetch } from "@/api/client";
import { useBusinessStore } from "@/store/businessStore";

/**
 * USER MODEL
 */
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: "ADMIN" | "CUSTOMER" | "CUSTOMER_STAFF";
}

/**
 * Registration
 */
export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

/**
 * Login response
 */
interface AuthResponse {
    token: string;
    user: User;
}

/**
 * Profile response
 */
interface ProfileResponse {
    user: {
        _id: string;
        name: string;
        email: string;
        phone?: string;
        role: User["role"];
    };
}

/**
 * Generic API message response
 */
interface MessageResponse {
    message: string;
}

/**
 * AUTH STATE
 */
interface AuthState {
    /**
     * STATE
     */
    user: User | null;
    token: string | null;

    loading: boolean;
    initializing: boolean;
    error: string | null;

    /**
     * AUTH
     */
    login: (
        email: string,
        password: string
    ) => Promise<void>;

    googleLogin: (
        idToken: string
    ) => Promise<void>;

    /**
     * Registration OTP Flow
     */
    sendRegistrationOtp: (
        data: RegisterData
    ) => Promise<void>;

    verifyRegistrationOtp: (
        email: string,
        otp: string
    ) => Promise<void>;

    resendRegistrationOtp: (
        email: string
    ) => Promise<void>;

    /**
     * Password Reset Flow
     */
    forgotPassword: (
        email: string
    ) => Promise<void>;

    verifyResetOtp: (
        email: string,
        otp: string
    ) => Promise<void>;

    resetPassword: (
        email: string,
        otp: string,
        password: string
    ) => Promise<void>;

    /**
     * PROFILE
     */
    fetchProfile: () => Promise<void>;

    refreshProfile: () => Promise<void>;

    updateProfile: (data: {
        name: string;
        email: string;
        currentPassword: string;
    }) => Promise<void>;

    /**
     * SESSION
     */
    restoreSession: () => Promise<void>;

    logout: () => Promise<void>;

    clearSession: () => Promise<void>;

    clearError: () => void;

    /**
     * ROLE HELPERS
     */
    isAdmin: () => boolean;

    isCustomer: () => boolean;

    isStaff: () => boolean;

    getHomeRoute: () => string;
}

const TOKEN_KEY = "locallift_auth_token";
const USER_KEY = "locallift_user";

export const useAuthStore = create<AuthState>((set, get) => ({
    /**
     * INITIAL STATE
     */
    user: null,
    token: null,

    loading: false,
    initializing: true,
    error: null,

    /**
     * ROLE HELPERS
     */
    isAdmin: () => get().user?.role === "ADMIN",

    isCustomer: () => get().user?.role === "CUSTOMER",

    isStaff: () => get().user?.role === "CUSTOMER_STAFF",

    getHomeRoute: () => {
        switch (get().user?.role) {
            case "ADMIN":
                return "/admin";

            case "CUSTOMER_STAFF":
                return "/staff/(tabs)/dashboard";

            case "CUSTOMER":
            default:
                return "/(tabs)/dashboard";
        }
    },

    /**
     * LOGIN
     */
    login: async (email: string, password: string) => {
        try {
            set({
                loading: true,
                error: null,
            });

            const response = await apiFetch<AuthResponse>(
                "/api/v1/auth/login",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: email.trim().toLowerCase(),
                        password,
                    }),
                }
            );

            const { token, user } = response;

            await AsyncStorage.setItem(
                TOKEN_KEY,
                token
            );

            await AsyncStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            set({
                token,
                user,
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.message ??
                    "Login failed.",
            });

            throw error;
        }
    },

    /**
     * GOOGLE LOGIN
     */
    googleLogin: async (
        idToken: string
    ) => {
        try {
            set({
                loading: true,
                error: null,
            });

            const response =
                await apiFetch<AuthResponse>(
                    "/api/v1/auth/google",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            idToken,
                        }),
                    }
                );

            const { token, user } =
                response;

            await AsyncStorage.setItem(
                TOKEN_KEY,
                token
            );

            await AsyncStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            set({
                token,
                user,
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.message ??
                    "Google sign-in failed.",
            });

            throw error;
        }
    },

    /**
 * SEND REGISTRATION OTP
 */
    sendRegistrationOtp: async (data) => {
        try {
            set({
                loading: true,
                error: null,
            });

            await apiFetch<MessageResponse>(
                "/api/v1/auth/register/send-otp",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: data.name.trim(),
                        email: data.email
                            .trim()
                            .toLowerCase(),
                        password: data.password,
                    }),
                }
            );

            set({
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.message ??
                    "Unable to send verification code.",
            });

            throw error;
        }
    },

    /**
     * VERIFY REGISTRATION OTP
     *
     * Creates the account,
     * logs the user in,
     * stores the JWT.
     */
    verifyRegistrationOtp: async (
        email,
        otp
    ) => {
        try {
            set({
                loading: true,
                error: null,
            });

            const response =
                await apiFetch<AuthResponse>(
                    "/api/v1/auth/register/verify",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: email
                                .trim()
                                .toLowerCase(),
                            otp: otp.trim(),
                        }),
                    }
                );

            const { token, user } =
                response;

            await AsyncStorage.setItem(
                TOKEN_KEY,
                token
            );

            await AsyncStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            set({
                token,
                user,
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.message ??
                    "Verification failed.",
            });

            throw error;
        }
    },

    /**
     * RESEND REGISTRATION OTP
     */
    resendRegistrationOtp: async (
        email
    ) => {
        try {
            set({
                loading: true,
                error: null,
            });

            await apiFetch<MessageResponse>(
                "/api/v1/auth/register/resend-otp",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: email
                            .trim()
                            .toLowerCase(),
                    }),
                }
            );

            set({
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.message ??
                    "Unable to resend verification code.",
            });

            throw error;
        }
    },

    /**
 * FORGOT PASSWORD
 *
 * Sends a password reset OTP.
 */
    forgotPassword: async (email) => {
        try {
            set({
                loading: true,
                error: null,
            });

            await apiFetch<MessageResponse>(
                "/api/v1/auth/password/forgot",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: email
                            .trim()
                            .toLowerCase(),
                    }),
                }
            );

            set({
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.message ??
                    "Unable to send password reset code.",
            });

            throw error;
        }
    },

    /**
     * VERIFY RESET OTP
     *
     * Verifies that the reset code is valid.
     */
    verifyResetOtp: async (
        email,
        otp
    ) => {
        try {
            set({
                loading: true,
                error: null,
            });

            await apiFetch<MessageResponse>(
                "api/v1/auth/password/verify-otp",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: email
                            .trim()
                            .toLowerCase(),
                        otp: otp.trim(),
                    }),
                }
            );

            set({
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.message ??
                    "Invalid verification code.",
            });

            throw error;
        }
    },

    /**
     * RESET PASSWORD
     *
     * Changes the user's password after OTP verification.
     */
    resetPassword: async (
        email,
        otp,
        password
    ) => {
        try {
            set({
                loading: true,
                error: null,
            });

            await apiFetch<MessageResponse>(
                "api/v1/auth/password/reset",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: email
                            .trim()
                            .toLowerCase(),
                        otp: otp.trim(),
                        password,
                    }),
                }
            );

            set({
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.message ??
                    "Password reset failed.",
            });

            throw error;
        }
    },

    /**
 * FETCH PROFILE
 */
    fetchProfile: async () => {
        try {
            const token = get().token;

            if (!token) {
                throw new Error("No authentication token.");
            }

            const response =
                await api.get<ProfileResponse>(
                    "/api/v1/auth/profile",
                    token
                );

            const user: User = {
                id: response.user._id,
                name: response.user.name,
                email: response.user.email,
                phone: response.user.phone,
                role: response.user.role,
            };

            await AsyncStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            set({
                user,
            });
        } catch (error) {
            throw error;
        }
    },

    /**
 * UPDATE PROFILE
 *
 * Updates the authenticated user's profile.
 *
 * The backend requires the user's current
 * password to authorize the change.
 */
    updateProfile: async (data) => {
        try {
            const token = get().token;

            if (!token) {
                throw new Error(
                    "No authentication token."
                );
            }

            set({
                loading: true,
                error: null,
            });

            const response =
                await apiFetch<ProfileResponse>(
                    "/api/v1/auth/profile",
                    {
                        method: "PUT",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },

                        body: JSON.stringify({
                            name: data.name
                                .trim(),

                            email: data.email
                                .trim()
                                .toLowerCase(),

                            currentPassword:
                                data.currentPassword,
                        }),
                    }
                );

            const user: User = {
                id: response.user._id,
                name: response.user.name,
                email: response.user.email,
                phone: response.user.phone,
                role: response.user.role,
            };

            /**
             * Keep cached user data in sync.
             */
            await AsyncStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            set({
                user,
                loading: false,
                error: null,
            });
        } catch (error: any) {
            const message =
                error?.message ??
                "Profile update failed.";

            set({
                loading: false,
                error: message,
            });

            throw error;
        }
    },

    /**
     * REFRESH PROFILE
     */
    refreshProfile: async () => {
        try {
            const token = get().token;

            if (!token) return;

            const response =
                await api.get<ProfileResponse>(
                    "/api/v1/auth/profile",
                    token
                );

            //console.log("User Profile", response)

            const user: User = {
                id: response.user._id,
                name: response.user.name,
                email: response.user.email,
                phone: response.user.phone,
                role: response.user.role,
            };

            await AsyncStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            set({
                user,
            });
        } catch (error) {
            console.log(
                "[AUTH] Refresh profile failed",
                error
            );
        }
    },

    /**
     * RESTORE SESSION
     */
    restoreSession: async () => {
        try {
            set({
                initializing: true,
            });

            const token =
                await AsyncStorage.getItem(
                    TOKEN_KEY
                );

            const cachedUser =
                await AsyncStorage.getItem(
                    USER_KEY
                );

            if (!token || !cachedUser) {
                set({
                    user: null,
                    token: null,
                    initializing: false,
                });

                return;
            }

            set({
                token,
                user: JSON.parse(cachedUser),
                initializing: false,
            });

            // Refresh user from API
            get().refreshProfile();
        } catch {
            set({
                user: null,
                token: null,
                initializing: false,
            });
        }
    },


    /**
 * CLEAR LOCAL SESSION
 *
 * Used when backend invalidates the account/token.
 * Does not call the API.
 */
    clearSession: async () => {
        try {
            await AsyncStorage.multiRemove([
                TOKEN_KEY,
                USER_KEY,
            ]);

            useBusinessStore
                .getState()
                .clearBusiness();

            set({
                user: null,
                token: null,
                error: null,
            });

            console.log("[AUTH] Local session cleared");

        } catch (error) {
            console.log(
                "[AUTH] Failed clearing session",
                error
            );
        }
    },

    /**
     * LOGOUT
     */
    logout: async () => {
        try {
            const token = get().token;

            if (token) {
                try {
                    await apiFetch<MessageResponse>(
                        "/api/v1/auth/logout",
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                } catch {
                    // Ignore server logout errors.
                }
            }

            await AsyncStorage.multiRemove([
                TOKEN_KEY,
                USER_KEY,
            ]);

            useBusinessStore
                .getState()
                .clearBusiness();

            set({
                user: null,
                token: null,
                error: null,
            });
        } catch {
            set({
                error: "Logout failed.",
            });
        }
    },

    /**
     * CLEAR ERROR
     */
    clearError: () =>
        set({
            error: null,
        }),
}));