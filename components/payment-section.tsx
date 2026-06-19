"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CreditCard, Wallet, QrCode, Landmark, ShieldCheck } from "lucide-react"

type Method = "card" | "wallet" | "qrph" | "bank"

const methods: { id: Method; label: string; desc: string; icon: typeof CreditCard }[] = [
  { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, JCB", icon: CreditCard },
  { id: "wallet", label: "Maya Wallet", desc: "Pay with your balance", icon: Wallet },
  { id: "qrph", label: "QR Ph", desc: "Scan to pay", icon: QrCode },
  { id: "bank", label: "Online Banking", desc: "BPI, BDO, UnionBank +", icon: Landmark },
]

export function PaymentSection() {
  const [method, setMethod] = useState<Method>("card")

  return (
    <div className="flex flex-col gap-4">
      {/* Preferred method is passed along to Maya's hosted page; actual
          payment credentials are collected securely on Maya, never here. */}
      <input type="hidden" name="preferredMethod" value={method} />
      <div
        role="radiogroup"
        aria-label="Payment method"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {methods.map((m) => {
          const active = method === m.id
          const Icon = m.icon
          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setMethod(m.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors",
                active
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border hover:border-primary/50",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-sm font-medium text-foreground">{m.label}</span>
                <span className="truncate text-xs text-muted-foreground">{m.desc}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-1 flex items-start gap-3 rounded-xl border border-dashed border-border bg-muted/40 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          {
            "For your security, payment details are entered on Maya's encrypted, PCI-compliant page. After you tap "
          }
          <span className="font-medium text-foreground">Pay securely</span>
          {", you'll be redirected to Maya to complete your "}
          <span className="font-medium text-foreground">{methodLabel(method)}</span>
          {" payment, then returned here to confirm."}
        </p>
      </div>
    </div>
  )
}

function methodLabel(method: Method) {
  return methods.find((m) => m.id === method)?.label ?? "card"
}
