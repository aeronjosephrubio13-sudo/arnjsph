import Link from "next/link"
import { MayaLogo } from "@/components/maya-logo"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Clock, ArrowLeft } from "lucide-react"

type Variant = "success" | "failure" | "pending"

const config: Record<
  Variant,
  { icon: typeof CheckCircle2; iconClass: string; ringClass: string }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-primary",
    ringClass: "bg-primary/10",
  },
  failure: {
    icon: XCircle,
    iconClass: "text-destructive",
    ringClass: "bg-destructive/10",
  },
  pending: {
    icon: Clock,
    iconClass: "text-muted-foreground",
    ringClass: "bg-muted",
  },
}

export function CheckoutResult({
  variant,
  title,
  message,
  reference,
}: {
  variant: Variant
  title: string
  message: string
  reference?: string
}) {
  const { icon: Icon, iconClass, ringClass } = config[variant]

  return (
    <div className="min-h-svh">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6">
          <MayaLogo />
        </div>
      </header>

      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center sm:px-6">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full ${ringClass}`}>
          <Icon className={`h-9 w-9 ${iconClass}`} aria-hidden="true" />
        </div>

        <h1 className="mt-6 text-balance text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{message}</p>

        {reference && (
          <p className="mt-4 rounded-lg bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
            Ref: {reference}
          </p>
        )}

        <Button asChild size="lg" className="mt-8 w-full font-semibold">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to checkout
          </Link>
        </Button>
      </main>
    </div>
  )
}
