"use client"

import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Tag } from "lucide-react"
import { items, computeTotals, peso } from "@/lib/order"

export function OrderSummary() {
  const { subtotal, discount, vat, total } = computeTotals(items)

  return (
    <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Order summary
      </h2>

      <ul className="mt-5 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.name} className="flex gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
                {item.qty}
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
              <p className="truncate text-xs text-muted-foreground">{item.detail}</p>
              <p className="mt-auto text-sm font-semibold text-foreground">
                {peso(item.price)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <Separator className="my-5" />

      <form
        className="flex items-center gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative flex-1">
          <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Promo code"
            placeholder="Promo code"
            defaultValue="MAYA1500"
            className="pl-9"
          />
        </div>
        <Button type="submit" variant="secondary" className="shrink-0">
          Apply
        </Button>
      </form>

      <Separator className="my-5" />

      <dl className="flex flex-col gap-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium text-foreground">{peso(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Discount (MAYA1500)</dt>
          <dd className="font-medium text-primary">−{peso(discount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">VAT (12%)</dt>
          <dd className="font-medium text-foreground">{peso(vat)}</dd>
        </div>
      </dl>

      <Separator className="my-5" />

      <div className="flex items-end justify-between">
        <span className="text-sm font-medium text-foreground">Total due</span>
        <span className="text-2xl font-bold tracking-tight text-foreground">
          {peso(total)}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-accent px-3 py-2.5 text-xs text-accent-foreground">
        <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
        <span>Payments are encrypted and secured by Maya Business.</span>
      </div>
    </aside>
  )
}
