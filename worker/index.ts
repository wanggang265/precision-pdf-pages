export interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

const BACKEND_ORIGIN = "https://removepdfpages-workers.gw471210.workers.dev";
const HSTS_VALUE = "max-age=31536000; includeSubDomains; preload";

function isInsecureRequest(request: Request, url: URL): boolean {
  // The URL protocol may be http: when Cloudflare serves the request over HTTP
  // (e.g. Flexible SSL or direct edge hits). x-forwarded-proto is the definitive
  // signal when present.
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedProto) {
    return forwardedProto === "http";
  }
  return url.protocol === "http:";
}

function withHsts(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Strict-Transport-Security", HSTS_VALUE);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1) Force HTTPS for every request (matches root domain and www subdomain).
    if (isInsecureRequest(request, url)) {
      const httpsUrl = new URL(url.toString());
      httpsUrl.protocol = "https:";
      httpsUrl.port = "";
      // 308 preserves method/body, which is safer than 301 for POST/PUT.
      return Response.redirect(httpsUrl.toString(), 308);
    }

    // 2) API proxy to backend Workers.
    if (url.pathname.startsWith('/api/')) {
      const target = `${BACKEND_ORIGIN}${url.pathname}${url.search}`;
      const headers = new Headers(request.headers);
      headers.set('Host', new URL(BACKEND_ORIGIN).host);

      const response = await fetch(target, {
        method: request.method,
        headers,
        body: request.body,
        redirect: 'manual',
      });

      return withHsts(new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      }));
    }

    // 3) Static assets from the Next.js export.
    const assetResponse = await env.ASSETS.fetch(request);
    return withHsts(assetResponse);
  },
};
