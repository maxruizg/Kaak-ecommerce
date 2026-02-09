/**
 * PayCode Payment Gateway Stub
 *
 * This module provides a well-defined interface for the PayCode payment gateway.
 * The actual implementation will be completed when PayCode documentation arrives.
 * For now, all payments return simulated success responses.
 */

export interface PayCodePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed" | "refunded";
  customerEmail: string;
  metadata?: Record<string, string>;
  createdAt: Date;
}

export interface PayCodeCreatePaymentParams {
  amount: number;
  currency?: string;
  customerEmail: string;
  customerName: string;
  description: string;
  metadata?: Record<string, string>;
}

export interface PayCodeRefundParams {
  paymentIntentId: string;
  amount?: number;
  reason?: string;
}

export async function createPaymentIntent(
  params: PayCodeCreatePaymentParams
): Promise<PayCodePaymentIntent> {
  // STUB: Replace with actual PayCode API call when docs arrive
  console.log("[PayCode Stub] Creating payment intent:", params);

  return {
    id: `pc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    amount: params.amount,
    currency: params.currency || "MXN",
    status: "completed",
    customerEmail: params.customerEmail,
    metadata: params.metadata,
    createdAt: new Date(),
  };
}

export async function getPaymentStatus(paymentIntentId: string): Promise<PayCodePaymentIntent> {
  // STUB: Replace with actual PayCode API call
  console.log("[PayCode Stub] Getting payment status:", paymentIntentId);

  return {
    id: paymentIntentId,
    amount: 0,
    currency: "MXN",
    status: "completed",
    customerEmail: "",
    createdAt: new Date(),
  };
}

export async function refundPayment(
  params: PayCodeRefundParams
): Promise<PayCodePaymentIntent> {
  // STUB: Replace with actual PayCode API call
  console.log("[PayCode Stub] Refunding payment:", params);

  return {
    id: params.paymentIntentId,
    amount: params.amount || 0,
    currency: "MXN",
    status: "refunded",
    customerEmail: "",
    createdAt: new Date(),
  };
}

/**
 * Verify a PayCode webhook signature
 * STUB: Implement when webhook docs arrive
 */
export function verifyWebhookSignature(
  _payload: string,
  _signature: string
): boolean {
  console.log("[PayCode Stub] Verifying webhook signature");
  return true;
}
