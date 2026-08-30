/**
 * Vercel Serverless Function Entry Point for TanStack Start SSR
 *
 * This adapter bridges incoming Vercel / Node.js HTTP requests (IncomingMessage)
 * to the Web Standard Fetch API Request/Response model consumed by TanStack Start's
 * Nitro/SSR server runtime bundle (dist/server/server.js).
 *
 * Static assets (/assets, /images, /favicon.ico) are served directly by Vercel CDN
 * via vercel.json, while dynamic pages and routes are processed here.
 */

import type { IncomingMessage, ServerResponse } from "node:http";
// @ts-ignore - The dist output is generated during `npm run build`
import server from "../dist/server/server.js";

export const config = {
  runtime: "nodejs",
};

export default async function handler(
  req: IncomingMessage & { url: string },
  res: ServerResponse,
) {
  try {
    // 1. Reconstruct full request URL from forwarded headers or host
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const url = new URL(req.url, `${protocol}://${host}`);

    // 2. Convert Node.js IncomingHttpHeaders to Web Standard Headers
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          for (const v of value) headers.append(key, v);
        } else {
          headers.set(key, value);
        }
      }
    }

    const method = req.method || "GET";
    const hasBody = method !== "GET" && method !== "HEAD";

    // 3. Construct Web Standard Request instance
    const request = new Request(url.toString(), {
      method,
      headers,
      body: hasBody ? (req as any) : undefined,
      // @ts-ignore - duplex mode required for Node streaming request bodies
      duplex: "half",
    });

    // 4. Delegate request to TanStack Start SSR runtime
    const response = await server.fetch(request);

    // 5. Transfer HTTP status and response headers to ServerResponse
    res.statusCode = response.status;
    response.headers.forEach((val: string, key: string) => {
      res.setHeader(key, val);
    });

    // 6. Stream SSR response chunks back to the client
    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error: any) {
    console.error("Vercel Serverless SSR Error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end(`Internal Server Error: ${error?.message || error}`);
  }
}
