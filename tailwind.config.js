// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind CSS를 적용할 파일 경로를 설정합니다.
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  // Tailwind CSS 테마를 확장합니다.
  theme: {
    extend: {},
  },
  // Tailwind CSS 플러그인을 설정합니다.
  plugins: [],
}

