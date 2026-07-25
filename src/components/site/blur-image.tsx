"use client";

import { useState, useCallback, useRef, useEffect, type ImgHTMLAttributes } from "react";
import { blurPlaceholders } from "@/lib/blur-placeholders";
import { imageDimensions } from "@/lib/image-dimensions";
import { cn } from "@/lib/utils";

interface BlurImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  blurKey?: string;
  className?: string;
  wrapperClassName?: string;
}

export function BlurImage({
  src,
  alt,
  blurKey,
  className,
  wrapperClassName,
  ...rest
}: BlurImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

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

  // Handle already-cached images: onLoad may fire before React attaches the handler
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <span
      className={cn("relative block overflow-hidden", wrapperClassName)}
      style={placeholder ? { backgroundImage: `url(${placeholder})` } : undefined}
      aria-hidden={loaded ? "true" : undefined}
    >
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
        ref={imgRef}
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

