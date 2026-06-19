export type LineItem = {
  name: string
  detail: string
  qty: number
  price: number
  image: string
}

export const items: LineItem[] = [
  {
    name: "Pro Plan — Annual",
    detail: "Maya Business Manager subscription",
    qty: 1,
    price: 8400,
    image: "/product-subscription-card.png",
  },
  {
    name: "Hardware POS Terminal",
    detail: "Android smart terminal · 1 unit",
    qty: 1,
    price: 6990,
    image: "/product-pos-terminal.png",
  },
]

export const DISCOUNT = 1500
export const VAT_RATE = 0.12

export function computeTotals(lineItems: LineItem[] = items) {
  const subtotal = lineItems.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = DISCOUNT
  const vat = (subtotal - discount) * VAT_RATE
  const total = subtotal - discount + vat
  // Round to 2 decimals to avoid floating point drift before sending to Maya.
  return {
    subtotal: round2(subtotal),
    discount: round2(discount),
    vat: round2(vat),
    total: round2(total),
  }
}

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export const peso = (n: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(n)
