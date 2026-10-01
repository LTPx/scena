import type { MetadataRoute } from "next";
import { SITE_URL } from "./_services/seo";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NEXT_PUBLIC_ENV === "production";

  if (!isProd) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
