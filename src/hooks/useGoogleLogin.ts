import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useGoogleAuth } from "@/services/googleAuth";

export function useGoogleLogin() {
    const { googleLogin } = useAuth();

    const {
        request,
        response,
        signIn,
    } = useGoogleAuth();

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const login = async () => {
        try {
            setLoading(true);
            setError(null);

            /**
             * Opens Google's authentication UI
             * and returns the ID token.
             */
            const { idToken } =
                await signIn();

            /**
             * Authenticate with your backend.
             */
            await googleLogin(idToken);
        } catch (err: any) {
            setError(
                err?.message ??
                "Google sign-in failed."
            );

            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        request,
        response,
        login,
        loading,
        error,
    };
}