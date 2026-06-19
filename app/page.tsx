import { MayaLogo } from "@/components/maya-logo"
import { OrderSummary } from "@/components/order-summary"
import { CheckoutForm } from "@/components/checkout-form"
import { ArrowLeft } from "lucide-react"

export default function CheckoutPage() {
  return (
    <div className="min-h-svh">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <MayaLogo />
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to cart</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="mb-8">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Checkout
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete your purchase securely with Maya Business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <CheckoutForm />
          <OrderSummary />
        </div>
      </main>
    </div>
  )
}
