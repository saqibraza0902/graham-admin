/* eslint-disable @next/next/no-img-element */
import { cn } from "@/utils/styles";
import * as React from "react";
export interface ImageWithFallbackProps {
  className?: string;
  src?: string;
  fallbackSrc?: string;
  alt: string;
}

function ImageWithFallback({
  className,
  src,
  fallbackSrc = "/assets/images/4.png",
  alt,
  ...rest
}: React.HTMLAttributes<HTMLImageElement> & ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = React.useState(src || fallbackSrc);
  const onError = ({ currentTarget }: React.SyntheticEvent) => {
    (currentTarget as HTMLImageElement).onerror = null;
    setCurrentSrc(fallbackSrc);
  };

  return (
    <img
      className={cn(`object-cover ${className}`)}
      src={currentSrc}
      onError={onError}
      alt={alt}
      {...rest}
    />
  );
}

export default ImageWithFallback;
