import { cn } from "@/lib/utils"

export function MayaLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
        m
      </span>
      <div className="flex items-baseline gap-1.5 leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground">maya</span>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Business
        </span>
      </div>
    </div>
  )
}
