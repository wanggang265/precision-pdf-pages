"use client";

import * as pdfjs from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const documentCache = new Map<string, Promise<PDFDocumentProxy>>();

export function getCachedDocument(arrayBuffer: ArrayBuffer, cacheKey: string): Promise<PDFDocumentProxy> {
  const existing = documentCache.get(cacheKey);
  if (existing) return existing;

  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const promise = loadingTask.promise;
  documentCache.set(cacheKey, promise);

  promise.catch(() => {
    documentCache.delete(cacheKey);
  });

  return promise;
}

export function clearDocumentCache(cacheKey?: string) {
  if (cacheKey) {
    documentCache.delete(cacheKey);
  } else {
    documentCache.clear();
  }
}

export type { PDFDocumentProxy };
export { pdfjs };
