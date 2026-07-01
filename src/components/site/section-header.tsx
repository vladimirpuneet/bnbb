import type { ReactNode } from "react";
import { Reveal } from "./reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <Reveal>
      <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-3">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
          {title}
        </h2>
        {description && (
          <p
            className={`mt-3 text-muted-foreground text-base sm:text-lg leading-relaxed text-pretty ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
