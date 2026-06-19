// Server-only Maya (PayMaya) Checkout API client.
// Docs: https://developers.maya.ph  |  API host: https://pg.maya.ph
import "server-only"

const API_BASE = "https://pg.maya.ph"

function authHeader(key: string) {
  // Maya uses HTTP Basic auth: the key is the username, password is empty.
  const token = Buffer.from(`${key}:`).toString("base64")
  return `Basic ${token}`
}

function requireKeys() {
  const publicKey = process.env.MAYA_PUBLIC_KEY
  const secretKey = process.env.MAYA_SECRET_KEY
  if (!publicKey || !secretKey) {
    throw new Error(
      "Missing Maya API keys. Set MAYA_PUBLIC_KEY and MAYA_SECRET_KEY in your environment variables.",
    )
  }
  return { publicKey, secretKey }
}

export type CreateCheckoutInput = {
  totalAmount: number
  requestReferenceNumber: string
  buyer: {
    firstName?: string
    lastName?: string
    contact?: { email?: string; phone?: string }
  }
  items: { name: string; quantity: number; amount: number; totalAmount: number }[]
  redirectUrl: { success: string; failure: string; cancel: string }
  metadata?: Record<string, unknown>
}

export type CreateCheckoutResult = {
  checkoutId: string
  redirectUrl: string
}

// Creates a Maya hosted checkout using the PUBLIC key.
export async function createCheckout(
  input: CreateCheckoutInput,
): Promise<CreateCheckoutResult> {
  const { publicKey } = requireKeys()

  const body = {
    totalAmount: { value: input.totalAmount, currency: "PHP" },
    buyer: {
      firstName: input.buyer.firstName,
      lastName: input.buyer.lastName,
      contact: input.buyer.contact,
    },
    items: input.items.map((i) => ({
      name: i.name,
      quantity: String(i.quantity),
      amount: { value: i.amount },
      totalAmount: { value: i.totalAmount },
    })),
    redirectUrl: input.redirectUrl,
    requestReferenceNumber: input.requestReferenceNumber,
    metadata: input.metadata ?? {},
  }

  const res = await fetch(`${API_BASE}/checkout/v1/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(publicKey),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Maya checkout creation failed (${res.status}): ${text}`)
  }

  return (await res.json()) as CreateCheckoutResult
}

export type CheckoutStatus = {
  id: string
  paymentStatus: string
  status?: string
  totalAmount?: { value: string; currency: string }
  requestReferenceNumber?: string
}

export type Payment = {
  id: string
  status: string // e.g. PAYMENT_SUCCESS, PAYMENT_FAILED, AUTH_FAILED
  paymentStatus?: string
  amount?: { value: string; currency: string }
  requestReferenceNumber?: string
}

// Looks up payments for a given request reference number using the SECRET key.
// Used on the return pages to verify the real payment outcome server-side,
// rather than trusting the redirect URL the buyer landed on.
export async function getPaymentsByReference(
  requestReferenceNumber: string,
): Promise<Payment[]> {
  const { secretKey } = requireKeys()

  const res = await fetch(
    `${API_BASE}/payments/v1/payment-rfns/${encodeURIComponent(requestReferenceNumber)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(secretKey),
      },
      cache: "no-store",
    },
  )

  // Maya returns 404 when no payment exists yet for the reference.
  if (res.status === 404) return []

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Maya payment lookup failed (${res.status}): ${text}`)
  }

  const data = (await res.json()) as Payment[]
  return Array.isArray(data) ? data : []
}

export function isPaymentSuccessful(payments: Payment[]) {
  return payments.some(
    (p) => p.status === "PAYMENT_SUCCESS" || p.paymentStatus === "PAYMENT_SUCCESS",
  )
}
