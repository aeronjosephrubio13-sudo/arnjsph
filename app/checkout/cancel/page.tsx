import { CheckoutResult } from "@/components/checkout-result"

export const dynamic = "force-dynamic"

export default async function CancelPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams
  return (
    <CheckoutResult
      variant="pending"
      title="Payment cancelled"
      message="You cancelled the payment before it was completed. No charge was made. You can return to checkout whenever you're ready."
      reference={ref}
    />
  )
}
