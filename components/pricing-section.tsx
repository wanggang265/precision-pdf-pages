"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://removepdfpages-workers.gw471210.workers.dev";
const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true";

const packages = [
  {
    id: "starter",
    name: "Starter Pack",
    price: "$4.99",
    credits: 50,
    description: "A small credit pack for occasional larger PDF jobs.",
    popular: false,
  },
  {
    id: "standard",
    name: "Standard Pack",
    price: "$9.99",
    credits: 150,
    description: "Our best-value pack for regular PDF page removal jobs.",
    popular: true,
  },
  {
    id: "large",
    name: "Large Pack",
    price: "$24.99",
    credits: 500,
    description: "A larger credit pack for frequent or heavy PDF processing.",
    popular: false,
  },
];

export function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (packageId: string) => {
    if (!PAYMENTS_ENABLED) {
      alert("Payment is temporarily paused while Creem verification is pending. Please check back in a few days.");
      return;
    }

    setLoading(packageId);
    try {
      const res = await fetch(`${API_BASE}/api/creem/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package_id: packageId }),
      });
      const data = await res.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        const detail = data.detail ? `\n\n${data.detail}` : "";
        alert(`${data.error || "Failed to create checkout."}${detail}`);
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition hover:shadow-[0_16px_48px_rgba(15,23,42,0.1)] ${
              pkg.popular ? "border-blue-300 ring-1 ring-blue-300" : "border-slate-200"
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
                Most popular
              </div>
            )}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{pkg.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">{pkg.price}</span>
                <span className="text-sm text-slate-500">one-time</span>
              </div>
            </div>
            <p className="mb-4 text-sm text-slate-600">{pkg.description}</p>
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <span className="font-semibold">{pkg.credits}</span> credits
            </div>
            <button
              onClick={() => handleCheckout(pkg.id)}
              disabled={loading === pkg.id || !PAYMENTS_ENABLED}
              className={`mt-auto w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                pkg.popular
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {loading === pkg.id ? "Loading…" : PAYMENTS_ENABLED ? "Buy now" : "Payment pending"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
