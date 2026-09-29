import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface StaffInvitePayload {
    name: string;
    email: string;
}

export interface StaffInviteResponse {
    success: boolean;
    message: string;
    invitation: {
        id: string;
        name: string;
        email: string;
        expiresAt: string;
    };
}

const inviteStaff = async (
    payload: StaffInvitePayload
): Promise<StaffInviteResponse> => {
    return api.post<StaffInviteResponse>(
        "/api/v1/auth/staff/invite",
        payload
    );
};

export const useStaffInvite = () => {
    return useMutation({
        mutationFn: inviteStaff,
    });
};