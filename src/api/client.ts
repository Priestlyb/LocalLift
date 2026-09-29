import { useAuthStore } from "@/store/authStore";

/**
 * ==========================================
 * API CONFIGURATION
 * ==========================================
 */

const API_URL =
    process.env.EXPO_PUBLIC_API_URL?.trim();

/**
 * Fail early if the API URL is not configured.
 *
 * Do not silently construct requests such as:
 *
 * undefined/auth/login
 */
if (!API_URL) {
    console.error(
        "[API] EXPO_PUBLIC_API_URL is not configured."
    );
}

/**
 * Remove trailing slashes so endpoints can
 * consistently begin with "/".
 *
 * Example:
 *
 * https://api.example.com/
 *
 * becomes:
 *
 * https://api.example.com
 */
const BASE_URL =
    API_URL?.replace(/\/+$/, "") ?? "";

/**
 * Default request timeout.
 *
 * 30 seconds is long enough for normal API
 * requests while preventing requests from
 * hanging indefinitely.
 */
const DEFAULT_TIMEOUT_MS = 30_000;

/**
 * ==========================================
 * TYPES
 * ==========================================
 */

export type ApiOptions =
    Omit<RequestInit, "headers"> & {
        /**
         * Optional explicit access token.
         *
         * Normally the token is taken from
         * authStore.
         */
        token?: string;

        /**
         * Optional request headers.
         */
        headers?: HeadersInit;

        /**
         * Optional request timeout.
         */
        timeoutMs?: number;
    };

/**
 * ==========================================
 * API ERROR
 * ==========================================
 *
 * A structured error makes it easier for
 * hooks/components to handle status codes.
 */

export class ApiError
    extends Error {

    readonly status: number;
    readonly code?: string;

    constructor(
        message: string,
        status: number,
        code?: string
    ) {
        super(message);

        this.name = "ApiError";
        this.status = status;
        this.code = code;

        /**
         * Required for proper instanceof
         * behavior in some JS environments.
         */
        Object.setPrototypeOf(
            this,
            ApiError.prototype
        );
    }
}

/**
 * ==========================================
 * AUTH SESSION
 * ==========================================
 */

/**
 * Clear the locally stored authentication
 * session.
 *
 * IMPORTANT:
 *
 * We only call this when the server explicitly
 * tells us that authentication is invalid
 * through a 401 response.
 */
const clearAuthSession = async () => {
    try {
        const {
            clearSession,
        } = useAuthStore.getState();

        await clearSession();
    } catch (error) {
        /**
         * Do not expose sensitive authentication
         * information in logs.
         */
        console.error(
            "[AUTH] Failed to clear authentication session."
        );
    }
};

/**
 * ==========================================
 * ENDPOINT NORMALIZATION
 * ==========================================
 */

/**
 * Normalize an API endpoint.
 *
 * Accept:
 *
 * auth/login
 *
 * /auth/login
 *
 * Reject:
 *
 * https://evil.example.com
 *
 * This API client is intended to communicate
 * only with the configured backend.
 */
const normalizeEndpoint = (
    endpoint: string
): string => {

    if (
        typeof endpoint !== "string"
    ) {
        throw new ApiError(
            "Invalid API endpoint.",
            0
        );
    }

    const trimmed =
        endpoint.trim();

    if (!trimmed) {
        throw new ApiError(
            "API endpoint is required.",
            0
        );
    }

    /**
     * Prevent absolute URLs.
     *
     * We want:
     *
     * /auth/login
     *
     * rather than:
     *
     * https://example.com/auth/login
     */
    if (
        /^https?:\/\//i.test(trimmed) ||
        trimmed.startsWith("//")
    ) {
        throw new ApiError(
            "Absolute API URLs are not allowed.",
            0
        );
    }

    /**
     * Ensure exactly one leading slash.
     */
    return `/${trimmed.replace(/^\/+/, "")}`;
};

/**
 * ==========================================
 * REQUEST URL
 * ==========================================
 */

const buildRequestUrl = (
    endpoint: string
): string => {

    if (!BASE_URL) {
        throw new ApiError(
            "API URL is not configured.",
            0
        );
    }

    return `${BASE_URL}${normalizeEndpoint(endpoint)}`;
};

/**
 * ==========================================
 * FORM DATA DETECTION
 * ==========================================
 */

const isFormDataBody = (
    body: unknown
): body is FormData => {

    return (
        typeof FormData !== "undefined" &&
        body instanceof FormData
    );
};

/**
 * ==========================================
 * REQUEST BODY
 * ==========================================
 */

const serializeBody = (
    body: unknown
): BodyInit | undefined => {

    if (
        body === undefined ||
        body === null
    ) {
        return undefined;
    }

    /**
     * FormData must be passed directly.
     *
     * fetch() automatically creates the correct
     * multipart/form-data boundary.
     */
    if (
        isFormDataBody(body)
    ) {
        return body;
    }

    /**
     * Strings can already be valid bodies.
     */
    if (
        typeof body === "string"
    ) {
        return body;
    }

    /**
     * JSON objects.
     */
    return JSON.stringify(body);
};

/**
 * ==========================================
 * RESPONSE PARSING
 * ==========================================
 */

type ParsedResponse =
    | Record<string, any>
    | unknown[]
    | string
    | null;

/**
 * Parse a response safely.
 *
 * Some backend/proxy errors may return:
 *
 * - JSON
 * - plain text
 * - empty body
 */
const parseResponse = async (
    response: Response
): Promise<ParsedResponse> => {

    const contentType =
        response.headers.get(
            "content-type"
        ) ?? "";

    if (
        contentType
            .toLowerCase()
            .includes("application/json")
    ) {
        try {
            return await response.json();
        } catch {
            /**
             * The server claimed JSON but sent
             * invalid JSON.
             */
            return null;
        }
    }

    try {
        return await response.text();
    } catch {
        return null;
    }
};

/**
 * ==========================================
 * ERROR MESSAGE
 * ==========================================
 */

const getErrorMessage = (
    data: ParsedResponse
): string => {

    if (
        data &&
        typeof data === "object" &&
        !Array.isArray(data)
    ) {
        const record =
            data as Record<
                string,
                unknown
            >;

        if (
            typeof record.message ===
            "string" &&
            record.message.trim()
        ) {
            return record.message.trim();
        }

        if (
            typeof record.error ===
            "string" &&
            record.error.trim()
        ) {
            return record.error.trim();
        }
    }

    if (
        typeof data === "string" &&
        data.trim()
    ) {
        return data.trim();
    }

    return "Something went wrong.";
};

/**
 * ==========================================
 * REQUEST
 * ==========================================
 */

async function request<T>(
    endpoint: string,
    options: ApiOptions = {}
): Promise<T> {
    const {
        token: explicitToken,
        timeoutMs = DEFAULT_TIMEOUT_MS,
        headers: providedHeaders,
        body,
        signal,
        ...fetchOptions
    } = options;

    /**
     * ==========================================
     * AUTH TOKEN
     * ==========================================
     */

    const authToken =
        explicitToken ??
        useAuthStore.getState().token;

    /**
     * ==========================================
     * REQUEST URL
     * ==========================================
     */

    const url =
        buildRequestUrl(endpoint);

    /**
     * ==========================================
     * BODY TYPE
     * ==========================================
     */

    const isFormData =
        isFormDataBody(body);

    /**
     * ==========================================
     * HEADERS
     * ==========================================
     */

    const headers =
        new Headers(providedHeaders);

    if (!headers.has("Accept")) {
        headers.set(
            "Accept",
            "application/json"
        );
    }

    /**
     * Never manually set multipart/form-data.
     *
     * fetch() generates the correct boundary
     * automatically for FormData.
     */
    if (
        !isFormData &&
        !headers.has("Content-Type")
    ) {
        headers.set(
            "Content-Type",
            "application/json"
        );
    }

    /**
     * Always control the Authorization header
     * ourselves.
     */
    if (authToken) {
        headers.set(
            "Authorization",
            `Bearer ${authToken}`
        );
    } else {
        headers.delete(
            "Authorization"
        );
    }

    /**
     * ==========================================
     * HTTP METHOD
     * ==========================================
     */

    const method =
        (
            fetchOptions.method ??
            "GET"
        ).toUpperCase();

    /**
     * GET and HEAD requests should not
     * contain request bodies.
     */
    const bodyAllowed =
        method !== "GET" &&
        method !== "HEAD";

    /**
     * IMPORTANT:
     *
     * Explicitly type the result as BodyInit.
     *
     * This prevents:
     *
     * Type 'unknown' is not assignable to
     * type 'BodyInit | null | undefined'
     */
    const requestBody: BodyInit | null =
        bodyAllowed
            ? serializeBody(body) ?? null
            : null;

    /**
     * ==========================================
     * ABORT CONTROLLER
     * ==========================================
     */

    const controller =
        new AbortController();

    let timeoutId:
        ReturnType<typeof setTimeout> |
        undefined;

    const handleExternalAbort =
        () => {
            controller.abort();
        };

    if (signal) {
        if (signal.aborted) {
            controller.abort();
        } else {
            signal.addEventListener(
                "abort",
                handleExternalAbort,
                {
                    once: true,
                }
            );
        }
    }

    /**
     * ==========================================
     * TIMEOUT
     * ==========================================
     */

    timeoutId =
        setTimeout(
            () => {
                controller.abort();
            },
            timeoutMs
        );

    /**
     * ==========================================
     * NETWORK REQUEST
     * ==========================================
     */

    let response: Response;

    try {
        response =
            await fetch(
                url,
                {
                    ...fetchOptions,

                    method,

                    headers,

                    /**
                     * Explicitly typed as:
                     *
                     * BodyInit | null
                     */
                    body: requestBody,

                    signal:
                        controller.signal,
                }
            );
    } catch (error) {
        if (signal) {
            signal.removeEventListener(
                "abort",
                handleExternalAbort
            );
        }

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        /**
         * Request timeout / cancellation.
         */
        if (
            error instanceof DOMException &&
            error.name === "AbortError"
        ) {
            throw new ApiError(
                "The request was cancelled or timed out.",
                0
            );
        }

        /**
         * Do not expose low-level network
         * implementation details.
         */
        throw new ApiError(
            "Unable to connect to the server.",
            0
        );
    }

    /**
     * ==========================================
     * CLEANUP
     * ==========================================
     */

    if (signal) {
        signal.removeEventListener(
            "abort",
            handleExternalAbort
        );
    }

    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    /**
     * ==========================================
     * PARSE RESPONSE
     * ==========================================
     */

    const data =
        await parseResponse(response);

    /**
     * ==========================================
     * API ERROR
     * ==========================================
     */

    if (!response.ok) {
        const message =
            getErrorMessage(data);

        /**
         * Never log:
         *
         * - JWTs
         * - Authorization headers
         * - passwords
         * - OTPs
         * - invitation tokens
         * - full response bodies
         */

        if (
            response.status >= 500
        ) {
            console.error(
                "[API] Server error:",
                response.status
            );
        } else if (
            response.status === 401
        ) {
            console.warn(
                "[API] Authentication failed."
            );
        }

        /**
         * Any 401 means the local authentication
         * session should no longer be trusted.
         */
        if (
            response.status === 401
        ) {
            await clearAuthSession();
        }

        throw new ApiError(
            message,
            response.status
        );
    }

    /**
     * ==========================================
     * SUCCESS
     * ==========================================
     */

    return data as T;
}

/**
 * ==========================================
 * API CLIENT
 * ==========================================
 */

export const api = {

    /**
     * ==========================================
     * GET
     * ==========================================
     */
    get<T>(
        endpoint: string,
        token?: string
    ): Promise<T> {

        return request<T>(
            endpoint,
            {
                method: "GET",
                token,
            }
        );
    },

    /**
     * ==========================================
     * POST
     * ==========================================
     *
     * Supports:
     *
     * - JSON objects
     * - FormData
     * - strings
     * - other valid BodyInit values
     */
    post<T>(
        endpoint: string,
        body?: unknown,
        token?: string
    ): Promise<T> {

        const isFormData =
            typeof FormData !== "undefined" &&
            body instanceof FormData;

        return request<T>(
            endpoint,
            {
                method: "POST",

                body:
                    body === undefined ||
                        body === null
                        ? undefined
                        : isFormData
                            ? body
                            : JSON.stringify(body),

                token,
            }
        );
    },

    /**
     * ==========================================
     * PUT
     * ==========================================
     */
    put<T>(
        endpoint: string,
        body?: unknown,
        token?: string
    ): Promise<T> {

        const isFormData =
            typeof FormData !== "undefined" &&
            body instanceof FormData;

        return request<T>(
            endpoint,
            {
                method: "PUT",

                body:
                    body === undefined ||
                        body === null
                        ? undefined
                        : isFormData
                            ? body
                            : JSON.stringify(body),

                token,
            }
        );
    },

    /**
     * ==========================================
     * PATCH
     * ==========================================
     */
    patch<T>(
        endpoint: string,
        body?: unknown,
        token?: string
    ): Promise<T> {

        const isFormData =
            typeof FormData !== "undefined" &&
            body instanceof FormData;

        return request<T>(
            endpoint,
            {
                method: "PATCH",

                body:
                    body === undefined ||
                        body === null
                        ? undefined
                        : isFormData
                            ? body
                            : JSON.stringify(body),

                token,
            }
        );
    },

    /**
     * ==========================================
     * DELETE
     * ==========================================
     */
    delete<T>(
        endpoint: string,
        token?: string
    ): Promise<T> {

        return request<T>(
            endpoint,
            {
                method: "DELETE",
                token,
            }
        );
    },
};

/**
 * ==========================================
 * BACKWARD COMPATIBILITY
 * ==========================================
 *
 * Existing code can continue using:
 *
 * apiFetch("/auth/profile", {
 *     method: "GET"
 * });
 */
export async function apiFetch<T>(
    endpoint: string,
    options?: ApiOptions
): Promise<T> {

    return request<T>(
        endpoint,
        options
    );
}