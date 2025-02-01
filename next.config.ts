import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

// استخدام createNextIntlPlugin لاستيراد التكوين الخاص بـ i18n
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// تصدير التكوين النهائي
export default withNextIntl(nextConfig);