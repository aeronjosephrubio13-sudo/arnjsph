"use client"

import type React from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PaymentSection } from "@/components/payment-section"
import { startCheckout, type CheckoutState } from "@/app/actions"
import { Lock, AlertCircle } from "lucide-react"

export function CheckoutForm() {
  const [state, formAction] = useActionState<CheckoutState, FormData>(startCheckout, {})

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <Section step={1} title="Contact information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone" className="text-xs font-medium text-muted-foreground">
              Mobile number
            </Label>
            <Input
              id="phone"
              name="phone"
              inputMode="tel"
              placeholder="0917 123 4567"
              autoComplete="tel"
            />
          </div>
        </div>
      </Section>

      <Section step={2} title="Billing details">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="business" className="text-xs font-medium text-muted-foreground">
              Business name
            </Label>
            <Input
              id="business"
              name="business"
              placeholder="Dela Cruz Trading Inc."
              autoComplete="organization"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="address" className="text-xs font-medium text-muted-foreground">
              Billing address
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="Unit, Street, Barangay"
              autoComplete="street-address"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="city" className="text-xs font-medium text-muted-foreground">
                City
              </Label>
              <Input id="city" name="city" placeholder="Makati City" autoComplete="address-level2" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="zip" className="text-xs font-medium text-muted-foreground">
                ZIP code
              </Label>
              <Input id="zip" name="zip" inputMode="numeric" placeholder="1200" autoComplete="postal-code" />
            </div>
          </div>
        </div>
      </Section>

      <Section step={3} title="Payment method">
        <PaymentSection />
      </Section>

      {state?.error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <SubmitButton />
        <p className="text-center text-xs text-muted-foreground">
          By confirming, you agree to Maya Business&apos;{" "}
          <a href="#" className="font-medium text-foreground underline underline-offset-2">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-foreground underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" disabled={pending} className="h-12 w-full text-base font-semibold">
      <Lock className="h-4 w-4" />
      {pending ? "Redirecting to Maya…" : "Pay securely"}
    </Button>
  )
}

function Section({
  step,
  title,
  children,
}: {
  step: number
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {step}
        </span>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  )
}
