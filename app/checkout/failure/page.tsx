import { CheckoutResult } from "@/components/checkout-result"

export const dynamic = "force-dynamic"

export default async function FailurePage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams
  return (
    <CheckoutResult
      variant="failure"
      title="Payment failed"
      message="Your payment couldn't be completed. No charge was made. Please go back to checkout and try again with another payment method."
      reference={ref}
    />
  )
}
