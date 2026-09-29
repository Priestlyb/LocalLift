export type PaymentProvider =
  | "KORA"
  | "PAYSTACK";

export type PaymentPlan =
  | "STARTER"
  | "GROWTH"
  | "PRO";

export interface InitializePaymentDto {
  email: string;
  amount: number;
  reference: string;
}

export interface InitializePaymentResponse {
  authorizationUrl: string;
  reference: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  reference: string;
  amount: number;
  status: string;
}