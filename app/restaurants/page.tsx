
// app/restaurants/page.tsx

'use client'; // 이 파일이 클라이언트 측에서 렌더링되도록 설정합니다.

// React의 useState 훅을 가져옵니다.
import { useState } from 'react';
// 상단 네비게이션 컴포넌트를 가져옵니다.
import TopNav from '@/components/TopNav';
// 하단 네비게이션 컴포넌트를 가져옵니다.
import BottomNav from '@/components/BottomNav';

// 안전 식당 페이지 컴포넌트
export default function RestaurantsPage() {
  // 선택된 필터를 관리하는 상태
  const [selectedFilter, setSelectedFilter] = useState('all');
  // 선택된 식당을 관리하는 상태 (상세 정보 표시용)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // 필터 데이터를 정의합니다.
  const filters = [
    { id: 'all', name: '전체', count: 24 },
    { id: 'nearby', name: '근처', count: 8 },
    { id: 'certified', name: '인증', count: 12 },
    { id: 'favorite', name: '즐겨찾기', count: 5 },
  ];

  // 식당 목록 데이터를 정의합니다.
  const restaurants = [
    {
      id: 1,
      name: '알레르기 프리 카페',
      category: '카페',
      rating: 4.8,
      reviewCount: 156,
      distance: '0.2km',
      allergyFree: ['견과류', '글루텐'],
      certified: true,
      address: '서울시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      hours: '평일 07:00-22:00 / 주말 08:00-21:00',
      latitude: 37.4979,
      longitude: 127.0276,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4!2d127.0276!3d37.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI5JzUyLjQiTiAxMjfCsDA0JzE5LjAiRQ!5e0!3m2!1sko!2skr!4v1234567890',
      image: 'https://readdy.ai/api/search-image?query=Modern%20clean%20cafe%20interior%2C%20bright%20natural%20lighting%2C%20minimalist%20design%2C%20wooden%20tables%2C%20comfortable%20seating%2C%20coffee%20shop%20atmosphere%2C%20welcoming%20environment%2C%20clean%20white%20walls%2C%20large%20windows%2C%20cozy%20ambiance%2C%20professional%20photography%2C%20high%20quality%2C%20realistic%20style&width=300&height=200&seq=cafe1&orientation=landscape'
    },
    // ... (다른 식당 데이터)
  ];

  // 전화 걸기 핸들러
  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  // 길찾기 핸들러
  const handleDirections = (address) => {
    window.open(`https://maps.google.com/maps?q=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopNav title="안전 식당" showBack={true} />
      
      <main className="pt-16">
        <div className="px-4 pb-4">
          {/* 검색창 */}
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <div className="flex items-center bg-gray-50 rounded-xl p-3">
              <i className="ri-search-line text-gray-400 mr-3"></i>
              <input 
                type="text" 
                placeholder="식당명 또는 지역 검색"
                className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* 필터 버튼 */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {filter.name}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  selectedFilter === filter.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 식당 목록 */}
        <div className="px-4 space-y-4">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="h-48 relative">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover object-top"
                />
                {restaurant.certified && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <i className="ri-verified-badge-line mr-1"></i>
                    인증
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  {restaurant.distance}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
                    <p className="text-sm text-gray-500">{restaurant.category}</p>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-400 mr-1"></i>
                    <span className="font-medium text-gray-900">{restaurant.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({restaurant.reviewCount})</span>
                  </div>
                </div>

                <div className="mb-3 space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-map-pin-line mr-2 text-gray-400"></i>
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-phone-line mr-2 text-gray-400"></i>
                    <span>{restaurant.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-time-line mr-2 text-gray-400"></i>
                    <span>{restaurant.hours}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">알레르기 대응 가능:</p>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.allergyFree.map((allergy, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {allergy} 프리
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <button 
                    onClick={() => handleCall(restaurant.phone)}
                    className="flex items-center justify-center !rounded-button bg-gray-100 text-gray-700 px-3 py-2 text-sm font-medium"
                  >
                    <i className="ri-phone-line mr-1"></i>
                    전화
                  </button>
                  <button 
                    onClick={() => handleDirections(restaurant.address)}
                    className="flex items-center justify-center !rounded-button bg-blue-100 text-blue-700 px-3 py-2 text-sm font-medium"
                  >
                    <i className="ri-navigation-line mr-1"></i>
                    길찾기
                  </button>
                  <button 
                    onClick={() => setSelectedRestaurant(selectedRestaurant === restaurant.id ? null : restaurant.id)}
                    className="flex-1 !rounded-button bg-blue-600 text-white py-2 text-sm font-medium"
                  >
                    {selectedRestaurant === restaurant.id ? '접기' : '상세보기'}
                  </button>
                </div>

                {/* 상세 정보 표시 영역 */}
                {selectedRestaurant === restaurant.id && (
                  <div className="border-t pt-4 mt-4">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">위치</h4>
                      <div className="h-48 rounded-xl overflow-hidden">
                        <iframe
                          src={restaurant.mapUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center mb-2">
                          <i className="ri-store-2-line text-gray-600 mr-2"></i>
                          <span className="text-sm font-medium text-gray-700">매장 정보</span>
                        </div>
                        <p className="text-xs text-gray-600">알레르기 대응 전문</p>
                        <p className="text-xs text-gray-600">별도 조리 공간 운영</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center mb-2">
                          <i className="ri-medal-line text-gray-600 mr-2"></i>
                          <span className="text-sm font-medium text-gray-700">인증 현황</span>
                        </div>
                        <p className="text-xs text-gray-600">{restaurant.certified ? 'AllerSafe 인증' : '인증 준비중'}</p>
                        <p className="text-xs text-gray-600">안전 관리 우수</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 식당 등록 안내 카드 */}
        <div className="px-4 mt-6 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="ri-information-line text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">식당 등록 안내</h4>
                <p className="text-sm text-gray-600 mb-3">
                  알레르기 대응이 가능한 식당을 운영하고 계신가요? 
                  AllerSafe에 등록하여 더 많은 고객을 만나보세요.
                </p>
                <button className="text-sm font-medium text-blue-600 flex items-center">
                  식당 등록하기
                  <i className="ri-arrow-right-line ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
