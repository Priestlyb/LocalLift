import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface AcceptStaffInvitationPayload {
    token: string;
    password: string;
}

export interface AcceptStaffInvitationResponse {
    success: boolean;
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        owner: string;
    };
    token: string;
}

const acceptStaffInvitation = async (
    payload: AcceptStaffInvitationPayload
): Promise<AcceptStaffInvitationResponse> => {
    return api.post<AcceptStaffInvitationResponse>(
        "auth/staff/accept-invitation",
        payload
    );
};

export const useAcceptStaffInvitation = () => {
    return useMutation({
        mutationFn: acceptStaffInvitation,
    });
};