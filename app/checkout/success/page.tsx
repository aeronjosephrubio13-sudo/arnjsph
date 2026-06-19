import { CheckoutResult } from "@/components/checkout-result"
import { getPaymentsByReference, isPaymentSuccessful } from "@/lib/maya"

export const dynamic = "force-dynamic"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams

  // Never trust the redirect alone — verify the real outcome with Maya.
  let verified = false
  if (ref) {
    try {
      const payments = await getPaymentsByReference(ref)
      verified = isPaymentSuccessful(payments)
    } catch (err) {
      console.error("[v0] Payment verification error:", err)
    }
  }

  if (verified) {
    return (
      <CheckoutResult
        variant="success"
        title="Payment successful"
        message="Thank you! Your payment has been confirmed and a receipt is on its way to your email. Your Maya Business order is now being processed."
        reference={ref}
      />
    )
  }

  return (
    <CheckoutResult
      variant="pending"
      title="Confirming your payment"
      message="We received your return from Maya but couldn't confirm the payment status yet. If you completed the payment, it may take a moment to settle. Please check your email or try again shortly."
      reference={ref}
    />
  )
}
