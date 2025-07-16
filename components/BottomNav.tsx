// components/BottomNav.tsx

'use client'; // 이 파일이 클라이언트 측에서 렌더링되도록 설정합니다.

// Next.js의 Link 컴포넌트와 usePathname 훅을 가져옵니다.
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 하단 네비게이션 컴포넌트
export default function BottomNav() {
  // 현재 경로를 가져옵니다.
  const pathname = usePathname();

  // 네비게이션 아이템 데이터를 정의합니다.
  const navItems = [
    { href: '/', icon: 'ri-home-5-line', label: '홈' },
    { href: '/scan', icon: 'ri-scan-line', label: '스캔' },
    { href: '/restaurants', icon: 'ri-restaurant-line', label: '식당' },
    { href: '/profile', icon: 'ri-user-line', label: '프로필' },
  ];

  return (
    // 화면 하단에 고정된 네비게이션 바
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 grid grid-cols-4 py-2 z-50">
      {/* 네비게이션 아이템들을 렌더링합니다. */}
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center py-2">
          <div className={`w-6 h-6 flex items-center justify-center mb-1 ${
            pathname === item.href ? 'text-blue-600' : 'text-gray-400'
          }`}>
            <i className={`${item.icon} text-lg`}></i>
          </div>
          <span className={`text-xs ${
            pathname === item.href ? 'text-blue-600 font-medium' : 'text-gray-400'
          }`}>
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
