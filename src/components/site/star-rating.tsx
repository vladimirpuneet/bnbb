import { Icon } from "./icon";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
  className?: string;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function StarRating({
  rating,
  size = "md",
  showValue = true,
  count,
  className,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];
  const cls = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {stars.map((s) => {
          const fillPct = Math.max(0, Math.min(1, rating - (s - 1))) * 100;
          return (
            <span key={s} className="relative inline-block">
              <Icon name="star" className={cn(cls, "text-amber-500/30")} />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPct}%` }}
              >
                <Icon name="star" className={cn(cls, "text-amber-500 fill-amber-500")} />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="font-semibold text-foreground/90 text-sm tabular-nums">
          {rating.toFixed(1)}
        </span>
      )}
      {typeof count === "number" && (
        <span className="text-sm text-muted-foreground">· {count} reviews</span>
      )}
    </div>
  );
}
