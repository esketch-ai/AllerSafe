// eslint.config.mjs

// Node.js의 'path' 모듈에서 dirname 함수를 가져옵니다.
import { dirname } from "path";
// Node.js의 'url' 모듈에서 fileURLToPath 함수를 가져옵니다.
import { fileURLToPath } from "url";
// ESLint의 FlatCompat을 사용하여 기존 .eslintrc 형식의 설정을 새로운 플랫 설정 형식과 호환되도록 합니다.
import { FlatCompat } from "@eslint/eslintrc";

// 현재 파일의 URL을 파일 경로로 변환합니다.
const __filename = fileURLToPath(import.meta.url);
// 현재 파일이 위치한 디렉토리의 경로를 얻습니다.
const __dirname = dirname(__filename);

// FlatCompat 인스턴스를 생성합니다. 기본 디렉토리를 현재 디렉토리로 설정합니다.
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ESLint 설정을 정의합니다.
const eslintConfig = [
  // Next.js의 핵심 웹 바이탈 및 타입스크립트 관련 기본 ESLint 설정을 확장합니다.
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // 특정 규칙을 설정합니다.
    rules: {
      // TypeScript에서 'any' 타입을 명시적으로 사용하는 것을 허용합니다. (규칙 비활성화)
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];

// 설정을 기본 내보내기로 export합니다.
export default eslintConfig;
