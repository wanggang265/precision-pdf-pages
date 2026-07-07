const plausibleScriptUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL || "https://plausible.shipsolo.io/js/pa-ApOoloVAudaJ1rlTWk1oZ.js";
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
const ahrefsId = process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_ID;

function PlausibleScript() {
  if (!plausibleScriptUrl) return null;

  return (
    <>
      <script async src={plausibleScriptUrl} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`,
        }}
      />
    </>
  );
}

function Ga4Script() {
  if (!gaId) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${gaId}', { anonymize_ip: true });`,
        }}
      />
    </>
  );
}

function ClarityScript() {
  if (!clarityId) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`,
      }}
    />
  );
}

function AhrefsScript() {
  if (!ahrefsId) return null;

  return <script src="https://analytics.ahrefs.com/analytics.js" data-key={ahrefsId} async />;
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
