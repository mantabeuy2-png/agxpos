export type PlanType = 'standar' | 'pro' | 'premium';

export type BillingCycle = '1m' | '3m' | '6m' | '12m';

export interface UserSession {
  id: string;
  name: string;
  storeName: string;
  email: string;
  plan: PlanType;
  trialExpiresAt: string;
  token: string;
  createdAt: string;
}

export interface RegisterPayload {
  name: string;
  storeName: string;
  email: string;
  password: string;
  targetPlan: PlanType;
  agreedToTerms: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  session?: UserSession;
  error?: string;
  errors?: Record<string, string>;
}

export interface PricingPlan {
  id: PlanType;
  name: string;
  monthlyBasePrice: number;
  branches: number;
  popular?: boolean;
  tagline: string;
}
