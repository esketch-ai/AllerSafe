// app/info/page.tsx

'use client'; // 이 파일이 클라이언트 측에서 렌더링되도록 설정합니다.

// React의 useState 훅을 가져옵니다.
import { useState } from 'react';
// 상단 네비게이션 컴포넌트를 가져옵니다.
import TopNav from '@/components/TopNav';
// 하단 네비게이션 컴포넌트를 가져옵니다.
import BottomNav from '@/components/BottomNav';

// 알레르기 정보 페이지 컴포넌트
export default function InfoPage() {
  // 활성 카테고리를 관리하는 상태
  const [activeCategory, setActiveCategory] = useState('common');

  // 카테고리 데이터를 정의합니다.
  const categories = [
    { id: 'common', name: '일반 알레르기', icon: 'ri-heart-pulse-line' },
    { id: 'food', name: '식품 알레르기', icon: 'ri-restaurant-line' },
    { id: 'tips', name: '관리 팁', icon: 'ri-lightbulb-line' },
  ];

  // 알레르기 정보 데이터를 정의합니다.
  const allergyInfo = {
    common: [
      {
        title: '알레르기란?',
        content: '면역 체계가 특정 물질에 과민하게 반응하는 것으로, 일반적으로 무해한 물질을 해로운 것으로 인식하여 발생합니다.',
        icon: 'ri-question-line',
        color: 'bg-blue-100 text-blue-600'
      },
      {
        title: '알레르기 유형',
        content: '식품 알레르기, 환경 알레르기, 약물 알레르기, 접촉성 알레르기 등 다양한 유형이 있습니다.',
        icon: 'ri-list-check',
        color: 'bg-green-100 text-green-600'
      },
      {
        title: '증상 인식',
        content: '두드러기, 가려움, 호흡곤란, 소화불량 등의 증상이 나타날 수 있으며, 심한 경우 아나필락시스가 발생할 수 있습니다.',
        icon: 'ri-eye-line',
        color: 'bg-orange-100 text-orange-600'
      },
    ],
    food: [
      {
        title: '주요 식품 알레르겐',
        content: '우유, 달걀, 견과류, 갑각류, 생선, 콩, 밀, 조개류가 가장 흔한 8대 식품 알레르겐입니다.',
        icon: 'ri-apple-line',
        color: 'bg-red-100 text-red-600'
      },
      {
        title: '식품 라벨 읽기',
        content: '성분표를 꼼꼼히 확인하고, "함유될 수 있음" 표시도 주의깊게 살펴보세요.',
        icon: 'ri-file-text-line',
        color: 'bg-yellow-100 text-yellow-600'
      },
      {
        title: '교차 오염 주의',
        content: '같은 시설에서 생산된 제품이라도 알레르겐이 혼입될 수 있으니 주의하세요.',
        icon: 'ri-alert-line',
        color: 'bg-orange-100 text-orange-600'
      },
    ],
    tips: [
      {
        title: '외식시 주의사항',
        content: '메뉴 주문 전 직원에게 알레르기 정보를 알리고, 재료와 조리법을 확인하세요.',
        icon: 'ri-restaurant-line',
        color: 'bg-purple-100 text-purple-600'
      },
      {
        title: '응급키트 준비',
        content: '에피펜, 항히스타민제 등을 항상 휴대하고, 사용법을 숙지하세요.',
        icon: 'ri-first-aid-kit-line',
        color: 'bg-red-100 text-red-600'
      },
      {
        title: '정기 검진',
        content: '알레르기 전문의와 정기적으로 상담하여 알레르기 상태를 점검하세요.',
        icon: 'ri-calendar-check-line',
        color: 'bg-blue-100 text-blue-600'
      },
    ],
  };

  return (
    // 전체 화면을 차지하고 하단 네비게이션 공간을 확보합니다.
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 상단 네비게이션을 렌더링합니다. */}
      <TopNav title="알레르기 정보" showBack={true} />
      
      {/* 메인 콘텐츠 영역 */}
      <main className="pt-16 px-4">
        {/* 정보 페이지 헤더 카드 */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <i className="ri-book-open-line text-2xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold">알레르기 가이드</h2>
              <p className="text-indigo-100 text-sm">안전한 생활을 위한 필수 정보</p>
            </div>
          </div>
        </div>

        {/* 카테고리 탭 메뉴 */}
        <div className="flex bg-white rounded-2xl p-1 mb-6 shadow-sm border border-gray-100 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium whitespace-nowrap flex items-center justify-center ${
                activeCategory === category.id ? 'bg-blue-600 text-white' : 'text-gray-600'
              }`}
            >
              <i className={`${category.icon} mr-2`}></i>
              {category.name}
            </button>
          ))}
        </div>

        {/* 선택된 카테고리의 정보 목록 */}
        <div className="space-y-4">
          {allergyInfo[activeCategory as keyof typeof allergyInfo].map((info, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                  <i className={`${info.icon} text-xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{info.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 정보 및 액션 카드 */}
        <div className="mt-8 space-y-4">
          {/* 전문가 상담 카드 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="ri-phone-line text-green-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">전문가 상담</h4>
                <p className="text-sm text-gray-600 mb-3">
                  알레르기 전문의와 1:1 상담을 통해 
                  개인 맞춤형 관리 방법을 상담받으세요.
                </p>
                <button className="!rounded-button bg-green-600 text-white px-4 py-2 text-sm font-medium">
                  상담 예약하기
                </button>
              </div>
            </div>
          </div>

          {/* 커뮤니티 카드 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="ri-group-line text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">커뮤니티</h4>
                <p className="text-sm text-gray-600 mb-3">
                  같은 알레르기를 가진 사람들과 
                  경험을 공유하고 정보를 나누세요.
                </p>
                <button className="!rounded-button bg-blue-600 text-white px-4 py-2 text-sm font-medium">
                  커뮤니티 참여
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 하단 네비게이션을 렌더링합니다. */}
      <BottomNav />
    </div>
  );
}
