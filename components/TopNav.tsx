// components/TopNav.tsx

'use client'; // 이 파일이 클라이언트 측에서 렌더링되도록 설정합니다.

// Next.js의 Link 컴포넌트를 가져옵니다.
import Link from 'next/link';

// TopNav 컴포넌트의 props 인터페이스를 정의합니다.
interface TopNavProps {
  title: string; // 제목
  showBack?: boolean; // 뒤로가기 버튼 표시 여부
  showMenu?: boolean; // 메뉴 버튼 표시 여부
}

// 상단 네비게이션 컴포넌트
export default function TopNav({ title, showBack = false, showMenu = false }: TopNavProps) {
  return (
    // 화면 상단에 고정된 헤더
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-50">
      <div className="flex items-center">
        {/* 뒤로가기 버튼 (showBack이 true일 때만 표시) */}
        {showBack && (
          <Link href="/" className="w-8 h-8 flex items-center justify-center mr-2">
            <i className="ri-arrow-left-line text-lg text-gray-700"></i>
          </Link>
        )}
        {/* 페이지 제목 */}
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
      
      {/* 메뉴 버튼 (showMenu가 true일 때만 표시) */}
      {showMenu && (
        <button className="w-8 h-8 flex items-center justify-center">
          <i className="ri-more-2-line text-lg text-gray-700"></i>
        </button>
      )}
    </header>
  );
}
