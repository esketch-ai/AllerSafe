// app/layout.tsx

// Next.js에서 메타데이터 타입을 가져옵니다.
import type { Metadata } from "next";
// next/font/google에서 Geist, Geist_Mono, Pacifico 폰트를 가져옵니다.
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
// 전역 CSS 파일을 가져옵니다.
import "./globals.css";
import { ProfileProvider } from "@/contexts/ProfileContext";

// Pacifico 폰트를 설정합니다.
const pacifico = Pacifico({
  weight: '400', // 폰트 두께
  subsets: ['latin'], // 사용할 문자 집합
  display: 'swap', // 폰트 로딩 전략
  variable: '--font-pacifico', // CSS 변수 이름
})

// Geist Sans 폰트를 설정합니다.
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS 변수 이름
  subsets: ["latin"], // 사용할 문자 집합
});

// Geist Mono 폰트를 설정합니다.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // CSS 변수 이름
  subsets: ["latin"], // 사용할 문자 집합
});

// 페이지의 메타데이터를 설정합니다.
export const metadata: Metadata = {
  title: "AllerSafe - 알레르기 안전 관리", // 페이지 제목
  description: "안전한 식품 선택을 위한 알레르기 관리 앱", // 페이지 설명
};

// 루트 레이아웃 컴포넌트
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTML 문서의 언어를 'en'으로 설정하고, 서버-클라이언트 하이드레이션 불일치 경고를 억제합니다.
    <html lang="en" suppressHydrationWarning={true}>
      {/* body 태그에 폰트 변수와 antialiased 클래스를 적용합니다. */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <ProfileProvider>{children}</ProfileProvider>
      </body>
    </html>
  );
}