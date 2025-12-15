import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// 1. PWAの設定
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // swcMinify: true,  <-- ❌ これを削除！（Next.jsの標準機能になったので不要）
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

// 2. Next.js本体の設定
const nextConfig: NextConfig = {
  /* ここに他の設定があれば書く */
};

// 3. PWA設定でラップしてエクスポート
export default withPWA(nextConfig);