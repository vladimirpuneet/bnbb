import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  variant?: "wave" | "mountains" | "curve";
  color?: "primary" | "secondary" | "background";
  flip?: boolean;
}

/**
 * Decorative SVG section divider — adds a visual transition between
 * sections with alternating backgrounds. Renders a subtle wave, mountain,
 * or curve silhouette.
 */
export function SectionDivider({
  className,
  variant = "wave",
  color = "background",
  flip = false,
}: SectionDividerProps) {
  const colorClass =
    color === "primary"
      ? "text-primary"
      : color === "secondary"
        ? "text-secondary/40"
        : "text-background";

  return (
    <div
      className={cn(
        "pointer-events-none select-none -my-px overflow-hidden leading-[0]",
        flip && "rotate-180",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className={cn("h-8 sm:h-12 w-full", colorClass)}
        fill="currentColor"
      >
        {variant === "wave" && (
          <path d="M0,20 C150,40 300,0 450,15 C600,30 750,5 900,15 C1050,25 1150,10 1200,15 L1200,40 L0,40 Z" />
        )}
        {variant === "mountains" && (
          <path d="M0,40 L0,20 L100,8 L200,18 L300,5 L400,15 L500,2 L600,12 L700,6 L800,16 L900,4 L1000,14 L1100,8 L1200,18 L1200,40 Z" />
        )}
        {variant === "curve" && (
          <path d="M0,40 L0,20 Q300,5 600,15 T1200,12 L1200,40 Z" />
        )}
      </svg>
    </div>
  );
}
