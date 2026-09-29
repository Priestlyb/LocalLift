import { useAuthStore } from "@/store/authStore";

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface VerifyRegistrationData {
    email: string;
    otp: string;
}

export function useAuth() {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);

    const loading = useAuthStore((state) => state.loading);
    const initializing = useAuthStore((state) => state.initializing);
    const error = useAuthStore((state) => state.error);

    const isAdmin = useAuthStore(
        (state) => state.isAdmin
    );

    const isCustomer = useAuthStore(
        (state) => state.isCustomer
    );

    const isStaff = useAuthStore(
        (state) => state.isStaff
    );

    const getHomeRoute = useAuthStore(
        (state) => state.getHomeRoute
    );

    /**
     * Email & Password Login
     */
    const login = async (
        email: string,
        password: string
    ) => {
        return useAuthStore
            .getState()
            .login(email, password);
    };

    /**
     * Send registration OTP
     */
    const sendRegistrationOtp = async (
        data: RegisterData
    ) => {
        return useAuthStore
            .getState()
            .sendRegistrationOtp(data);
    };

    /**
     * Verify registration OTP
     */
    const verifyRegistrationOtp = async (
        data: VerifyRegistrationData
    ) => {
        return useAuthStore
            .getState()
            .verifyRegistrationOtp(
                data.email,
                data.otp
            );
    };

    /**
     * Resend registration OTP
     */
    const resendRegistrationOtp =
        async (email: string) => {
            return useAuthStore
                .getState()
                .resendRegistrationOtp(email);
        };

    /**
     * Google Sign-In
     */
    const googleLogin = async (
        idToken: string
    ) => {
        return useAuthStore
            .getState()
            .googleLogin(idToken);
    };

    /**
     * Logout
     */
    const logout = async () => {
        return useAuthStore
            .getState()
            .logout();
    };

    /**
     * Restore saved session
     */
    const restoreSession = async () => {
        return useAuthStore
            .getState()
            .restoreSession();
    };

    /**
     * Clear auth errors
     */
    const clearError = () => {
        useAuthStore
            .getState()
            .clearError();
    };

    return {
        user,
        token,

        loading,
        initializing,
        error,

        isAdmin,
        isCustomer,
        isStaff,
        getHomeRoute,

        login,

        sendRegistrationOtp,
        verifyRegistrationOtp,
        resendRegistrationOtp,
        googleLogin,

        logout,
        restoreSession,
        clearError,
    };
}