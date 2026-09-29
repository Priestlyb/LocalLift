export type SubscriptionPlan =
  | "FREE"
  | "STARTER"
  | "GROWTH"
  | "PRO";

export interface Subscription {
  id: string;

  plan: SubscriptionPlan;

  status:
    | "active"
    | "inactive"
    | "expired"
    | "cancelled";

  monthlyGenerationLimit: number;
  generationsUsed: number;

  expiresAt?: string;

  createdAt: string;
  updatedAt: string;
}