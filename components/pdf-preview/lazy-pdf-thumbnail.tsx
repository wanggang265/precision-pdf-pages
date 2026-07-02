"use client";

import { useEffect, useRef, useState } from "react";
import { PdfThumbnail } from "./pdf-thumbnail";

type LazyPdfThumbnailProps = {
  file: File;
  pageNumber: number;
  cacheKey?: string;
  width?: number;
  className?: string;
  rootMargin?: string;
};

export function LazyPdfThumbnail({
  file,
  pageNumber,
  cacheKey,
  width = 140,
  className,
  rootMargin = "200px",
}: LazyPdfThumbnailProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || hasBeenVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasBeenVisible(true);
          }
        });
      },
      { rootMargin }
    );

    observer.observe(element);

    // Force a synchronous check in case the element is already in viewport
    // but the observer callback has not fired yet (common after hydration).
    const rect = element.getBoundingClientRect();
    const inViewport =
      rect.top < window.innerHeight + parseInt(rootMargin, 10) &&
      rect.bottom > -parseInt(rootMargin, 10) &&
      rect.width > 0 &&
      rect.height > 0;
    if (inViewport) {
      setIsVisible(true);
      setHasBeenVisible(true);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasBeenVisible, rootMargin]);

  return (
    <div ref={wrapperRef} className={className}>
      {hasBeenVisible || isVisible ? (
        <PdfThumbnail file={file} pageNumber={pageNumber} cacheKey={cacheKey} width={width} className="h-full w-full" />
      ) : (
        <div className="h-full w-full animate-pulse rounded-lg bg-slate-100" />
      )}
    </div>
  );
}
