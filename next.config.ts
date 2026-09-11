import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // reemplaza por el dominio real de tu WordPress
        hostname: "tu-wordpress.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
