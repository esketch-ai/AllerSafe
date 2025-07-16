// postcss.config.mjs

// PostCSS 설정을 정의합니다.
const config = {
  plugins: {
    // Tailwind CSS를 PostCSS 플러그인으로 사용합니다.
    tailwindcss: {},
    // 브라우저 접두사를 자동으로 추가해주는 Autoprefixer를 사용합니다.
    autoprefixer: {},
  }
}

// 설정을 기본 내보내기로 export합니다.
export default config;
