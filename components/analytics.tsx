"use client";

import Script from "next/script";

const plausibleScriptUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL || "https://plausible.shipsolo.io/js/pa-ApOoloVAudaJ1rlTWk1oZ.js";
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
const ahrefsId = process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_ID;

function PlausibleScript() {
  return (
    <>
      <Script async src={plausibleScriptUrl} strategy="afterInteractive" />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init()`}
      </Script>
    </>
  );
}

function Ga4Script() {
  if (!gaId) return null;

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}

function ClarityScript() {
  if (!clarityId) return null;

  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");`}
    </Script>
  );
}

function AhrefsScript() {
  if (!ahrefsId) return null;

  return <Script src="https://analytics.ahrefs.com/analytics.js" data-key={ahrefsId} strategy="afterInteractive" />;
}

export function Analytics() {
  return (
    <>
      <PlausibleScript />
      <Ga4Script />
      <ClarityScript />
      <AhrefsScript />
    </>
  );
}
