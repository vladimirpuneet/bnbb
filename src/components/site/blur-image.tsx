"use client";

import { useState, useCallback, type ImgHTMLAttributes } from "react";
import { blurPlaceholders } from "@/lib/blur-placeholders";
import { imageDimensions } from "@/lib/image-dimensions";
import { cn } from "@/lib/utils";

interface BlurImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** The key in blurPlaceholders (e.g. "img-01" or "host"). If not provided, derived from src. */
  blurKey?: string;
  className?: string;
  /** Extra class applied to the wrapper span */
  wrapperClassName?: string;
}

/**
 * Image with a base64 blur-up placeholder shown while the full image loads.
 * The placeholder is a 20×20 JPEG stretched to fill the container, with a
 * blur filter — it fades out once the real image has loaded.
 *
 * Also sets width/height attributes from image-dimensions.ts to prevent
 * Cumulative Layout Shift (CLS).
 *
 * Usage:
 *   <BlurImage src="/images/img-01.jpeg" alt="Living room" blurKey="img-01" />
 */
export function BlurImage({
  src,
  alt,
  blurKey,
  className,
  wrapperClassName,
  ...rest
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Derive blur key from src: "/images/img-01.jpeg" → "img-01"
  const key =
    blurKey ??
    src
      .split("/")
      .pop()
      ?.replace(/\.(jpeg|jpg|png|webp)$/i, "") ??
    "";
  const placeholder = blurPlaceholders[key];
  const dims = imageDimensions[key];

  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <span
      className={cn("relative block overflow-hidden", wrapperClassName)}
      style={placeholder ? { backgroundImage: `url(${placeholder})` } : undefined}
      aria-hidden={loaded ? "true" : undefined}
    >
      {/* Placeholder layer — blurred, fades out when image loads */}
      {placeholder && (
        <span
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out",
            loaded ? "opacity-0" : "opacity-100",
          )}
          style={{ backgroundImage: `url(${placeholder})`, filter: "blur(20px)", transform: "scale(1.1)" }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        width={dims?.width}
        height={dims?.height}
        className={cn(
          "relative transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        {...rest}
      />
    </span>
  );
}

