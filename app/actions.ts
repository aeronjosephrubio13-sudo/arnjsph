"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { createCheckout } from "@/lib/maya"
import { items, computeTotals } from "@/lib/order"

async function getBaseUrl() {
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  const proto = h.get("x-forwarded-proto") ?? "https"
  return `${proto}://${host}`
}

export type CheckoutState = { error?: string }

export async function startCheckout(
  _prev: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const email = String(formData.get("email") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const businessName = String(formData.get("business") ?? "").trim()

  if (!email) {
    return { error: "Please enter your email address to continue." }
  }

  const totals = computeTotals(items)
  const baseUrl = await getBaseUrl()
  // Unique reference for this attempt — used to reconcile the payment later.
  const ref = `MB-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

  let redirectUrl: string
  try {
    const result = await createCheckout({
      totalAmount: totals.total,
      requestReferenceNumber: ref,
      buyer: {
        firstName: businessName || undefined,
        contact: { email, phone: phone || undefined },
      },
      items: items.map((i) => ({
        name: i.name,
        quantity: i.qty,
        amount: i.price,
        totalAmount: i.price * i.qty,
      })),
      redirectUrl: {
        success: `${baseUrl}/checkout/success?ref=${ref}`,
        failure: `${baseUrl}/checkout/failure?ref=${ref}`,
        cancel: `${baseUrl}/checkout/cancel?ref=${ref}`,
      },
      metadata: { businessName },
    })
    redirectUrl = result.redirectUrl
  } catch (err) {
    console.error("[v0] Maya checkout error:", err)
    return {
      error:
        "We couldn't start your payment. Please check your details and try again.",
    }
  }

  // Send the buyer to Maya's secure hosted payment page.
  redirect(redirectUrl)
}
