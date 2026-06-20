type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: EventProps }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, props?: EventProps) {
  if (typeof window === "undefined") return;

  if (window.plausible) {
    window.plausible(name, { props });
  }

  if (window.gtag) {
    window.gtag("event", name, props || {});
  }
}
