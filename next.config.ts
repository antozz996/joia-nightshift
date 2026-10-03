import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://cdn.sanity.io https://www.facebook.com",
  "media-src 'self' blob: https://cdn.sanity.io",
  "connect-src 'self' https://cdn.sanity.io https://*.google-analytics.com https://www.google-analytics.com https://region1.google-analytics.com https://www.facebook.com https://graph.facebook.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/en/:path*",
        headers: [
          {
            key: "Content-Language",
            value: "en-GB",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
