"use client";

import { useEffect, useRef, useState } from "react";
import { getCachedDocument } from "./pdf-cache";

type PdfThumbnailProps = {
  file: File;
  pageNumber: number;
  cacheKey?: string;
  width?: number;
  className?: string;
};

export function PdfThumbnail({ file, pageNumber, cacheKey, width = 140, className }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsLoading(true);
    setError(false);

    const render = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await getCachedDocument(arrayBuffer, cacheKey || file.name);
        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({ scale: 1 });
        const scale = width / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(scaledViewport.width * dpr);
        canvas.height = Math.floor(scaledViewport.height * dpr);
        canvas.style.width = `${scaledViewport.width}px`;
        canvas.style.height = `${scaledViewport.height}px`;

        ctx.scale(dpr, dpr);

        await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;

        if (!cancelled) {
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setIsLoading(false);
          setError(true);
        }
      }
    };

    render();

    return () => {
      cancelled = true;
    };
  }, [file, pageNumber, cacheKey, width]);

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center ${className || ""}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-100">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-100 text-[10px] font-medium text-slate-400">
          Preview unavailable
        </div>
      )}
      <canvas ref={canvasRef} className={`rounded-lg ${isLoading || error ? "invisible" : "visible"}`} />
    </div>
  );
}
