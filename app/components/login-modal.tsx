"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Global singleton flag so Google init only happens once per page load
let googleInitDone = false;

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicError, setMagicError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(true);
  const [googleError, setGoogleError] = useState("");
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const googleInitStarted = useRef(false);

  const handleGoogleCredentialResponse = useCallback(
    async (response: { credential?: string }) => {
      const idToken = response.credential;
      if (!idToken) return;
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Google login failed");
        // Refresh page to pick up auth state (or call onAuthSuccess)
        window.location.reload();
      } catch (err: any) {
        setGoogleError(err.message || "Google login failed");
      }
    },
    [],
  );

  // Initialize Google Identity Services once
  useEffect(() => {
    if (!isOpen || googleInitDone || googleInitStarted.current) return;
    googleInitStarted.current = true;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setGoogleLoading(false);
      setGoogleError("Google Sign-In is not configured.");
      return;
    }

    const init = () => {
      if (typeof window === "undefined" || !(window as any).google?.accounts?.id) {
        setGoogleLoading(false);
        setGoogleError("Google script failed to load.");
        return;
      }
      const google = (window as any).google;
      // Defensive: catch initialize failures (deleted_client, etc.)
      try {
        google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
        });
        googleInitDone = true;
      } catch (err: any) {
        console.error("Google init error:", err);
        setGoogleError("Google Sign-In config error: " + (err?.message || "Invalid client_id (deleted_client?)"));
        setGoogleLoading(false);
        return;
      }

      if (googleButtonRef.current) {
        try {
          google.accounts.id.renderButton(googleButtonRef.current, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "pill",
          });
          setGoogleLoading(false);
        } catch (e) {
          setGoogleError("Failed to render Google button.");
          setGoogleLoading(false);
        }
      } else {
        setGoogleLoading(false);
      }
    };

    // If script already loaded, init immediately; otherwise load it
    if ((window as any).google?.accounts?.id) {
      init();
    } else {
      const existing = document.getElementById("google-identity-script");
      if (!existing) {
        const script = document.createElement("script");
        script.id = "google-identity-script";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = init;
        script.onerror = () => {
          setGoogleError("Google script failed to load.");
          setGoogleLoading(false);
        };
        document.body.appendChild(script);
      } else {
        existing.addEventListener("load", init);
      }
    }
  }, [isOpen, handleGoogleCredentialResponse]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setMagicError("");
    if (!email || !email.includes("@")) {
      setMagicError("Please enter a valid email.");
      return;
    }
    setMagicLoading(true);
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send link.");
      setMagicLinkSent(true);
    } catch (err: any) {
      setMagicError(err.message || "Failed to send link.");
    } finally {
      setMagicLoading(false);
    }
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setMagicLinkSent(false);
      setMagicError("");
      setGoogleError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5L5 15M5 5l10 10" />
          </svg>
        </button>

        <h2 className="mb-1 text-lg font-semibold text-slate-900">Sign in</h2>
        <p className="mb-6 text-sm text-slate-500">Continue with Google or your email.</p>

        {/* Google Sign-In */}
        <div className="mb-5">
          {googleLoading ? (
            <div className="flex h-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-500">
              <svg className="mr-2 h-4 w-4 animate-spin text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading Google Sign-In...
            </div>
          ) : googleError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {googleError}
            </div>
          ) : (
            <div ref={googleButtonRef} className="flex justify-center" />
          )}
        </div>

        {/* Divider */}
        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-slate-400">or</span>
          </div>
        </div>

        {/* Magic Link */}
        {magicLinkSent ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Check your email — a magic link has been sent to <strong>{email}</strong>.
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-3">
            <div>
              <label htmlFor="magic-email" className="mb-1 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="magic-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
            {magicError && (
              <div className="text-sm text-red-600">{magicError}</div>
            )}
            <button
              type="submit"
              disabled={magicLoading}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {magicLoading ? "Sending..." : "Send Magic Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
