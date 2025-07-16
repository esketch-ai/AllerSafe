// next.config.ts

// Next.js 설정을 위한 타입을 가져옵니다.
import type { NextConfig } from "next";

// Next.js 설정을 정의합니다.
const nextConfig: NextConfig = {
  // 정적 HTML로 내보내는 옵션을 활성화합니다.
  output: "export",
  // 이미지 최적화 기능을 비활성화합니다.
  images: {
    unoptimized: true,
  },
  // 타입스크립트 관련 설정을 정의합니다.
  typescript: {
    // 빌드 시 타입 에러를 무시하지 않도록 주석 처리합니다.
    // ignoreBuildErrors: true,
  },
};

// 설정을 기본 내보내기로 export합니다.
export default nextConfig;
