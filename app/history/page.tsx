// app/history/page.tsx

'use client'; // 이 파일이 클라이언트 측에서 렌더링되도록 설정합니다.

// React의 useState 훅을 가져옵니다.
import { useState } from 'react';
// 상단 네비게이션 컴포넌트를 가져옵니다.
import TopNav from '@/components/TopNav';
// 하단 네비게이션 컴포넌트를 가져옵니다.
import BottomNav from '@/components/BottomNav';

// 스캔 기록 페이지 컴포넌트
export default function HistoryPage() {
  // 선택된 필터를 관리하는 상태
  const [selectedFilter, setSelectedFilter] = useState('all');

  // 필터 데이터를 정의합니다.
  const filters = [
    { id: 'all', name: '전체', count: 47 },
    { id: 'safe', name: '안전', count: 41 },
    { id: 'warning', name: '주의', count: 5 },
    { id: 'danger', name: '위험', count: 1 },
  ];

  // 스캔 기록 데이터를 정의합니다.
  const scanHistory = [
    {
      id: 1,
      productName: '오리온 초코파이',
      barcode: '8801117123456',
      status: 'safe',
      date: '2024-01-15',
      time: '14:30',
      allergens: ['밀', '달걀', '우유'],
      safetyScore: 85,
      image: 'https://readdy.ai/api/search-image?query=Chocolate%20pie%20snack%20package%2C%20Korean%20snack%20food%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20realistic%20style%2C%20high%20detail%20quality%2C%20professional%20lighting%2C%20single%20product%20focus%2C%20modern%20packaging%20design&width=80&height=80&seq=choco1&orientation=squarish'
    },
    {
      id: 2,
      productName: '롯데 아몬드 과자',
      barcode: '8801062123789',
      status: 'warning',
      date: '2024-01-15',
      time: '12:15',
      allergens: ['견과류', '밀', '우유'],
      safetyScore: 45,
      image: 'https://readdy.ai/api/search-image?query=Almond%20cookie%20snack%20package%2C%20Korean%20snack%20food%20with%20nuts%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20realistic%20style%2C%20high%20detail%20quality%2C%20professional%20lighting%2C%20single%20product%20focus%2C%20modern%20packaging%20design&width=80&height=80&seq=almond1&orientation=squarish'
    },
    {
      id: 3,
      productName: '해태 감자칩',
      barcode: '8801019123456',
      status: 'safe',
      date: '2024-01-14',
      time: '18:45',
      allergens: ['없음'],
      safetyScore: 95,
      image: 'https://readdy.ai/api/search-image?query=Potato%20chips%20snack%20package%2C%20Korean%20snack%20food%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20realistic%20style%2C%20high%20detail%20quality%2C%20professional%20lighting%2C%20single%20product%20focus%2C%20modern%20packaging%20design&width=80&height=80&seq=potato1&orientation=squarish'
    },
    {
      id: 4,
      productName: '농심 새우깡',
      barcode: '8801043123456',
      status: 'safe',
      date: '2024-01-14',
      time: '16:20',
      allergens: ['갑각류'],
      safetyScore: 80,
      image: 'https://readdy.ai/api/search-image?query=Shrimp%20crackers%20snack%20package%2C%20Korean%20snack%20food%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20realistic%20style%2C%20high%20detail%20quality%2C%20professional%20lighting%2C%20single%20product%20focus%2C%20modern%20packaging%20design&width=80&height=80&seq=shrimp1&orientation=squarish'
    },
    {
      id: 5,
      productName: '크라운 버터와플',
      barcode: '8801111123456',
      status: 'danger',
      date: '2024-01-13',
      time: '10:30',
      allergens: ['견과류', '밀', '달걀', '우유'],
      safetyScore: 20,
      image: 'https://readdy.ai/api/search-image?query=Butter%20waffle%20snack%20package%2C%20Korean%20snack%20food%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20realistic%20style%2C%20high%20detail%20quality%2C%20professional%20lighting%2C%20single%20product%20focus%2C%20modern%20packaging%20design&width=80&height=80&seq=waffle1&orientation=squarish'
    },
  ];

  // 상태에 따라 색상을 반환하는 함수
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-600';
      case 'warning': return 'bg-yellow-100 text-yellow-600';
      case 'danger': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // 상태에 따라 아이콘을 반환하는 함수
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return 'ri-check-line';
      case 'warning': return 'ri-error-warning-line';
      case 'danger': return 'ri-close-line';
      default: return 'ri-question-line';
    }
  };

  // 상태에 따라 텍스트를 반환하는 함수
  const getStatusText = (status: string) => {
    switch (status) {
      case 'safe': return '안전';
      case 'warning': return '주의';
      case 'danger': return '위험';
      default: return '알수없음';
    }
  };

  // 선택된 필터에 따라 기록을 필터링합니다.
  const filteredHistory = selectedFilter === 'all' 
    ? scanHistory 
    : scanHistory.filter(item => item.status === selectedFilter);

  return (
    // 전체 화면을 차지하고 하단 네비게이션 공간을 확보합니다.
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 상단 네비게이션을 렌더링합니다. */}
      <TopNav title="스캔 기록" showBack={true} />
      
      {/* 메인 콘텐츠 영역 */}
      <main className="pt-16 px-4">
        {/* 전체 스캔 기록 요약 카드 */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">전체 스캔 기록</h2>
            <span className="text-sm text-gray-500">총 {scanHistory.length}개</span>
          </div>
          
          {/* 스캔 기록 통계 */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="text-xl font-bold text-green-600">41</div>
              <div className="text-xs text-green-600">안전</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-xl">
              <div className="text-xl font-bold text-yellow-600">5</div>
              <div className="text-xs text-yellow-600">주의</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <div className="text-xl font-bold text-red-600">1</div>
              <div className="text-xs text-red-600">위험</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <div className="text-xl font-bold text-blue-600">85</div>
              <div className="text-xs text-blue-600">평균점수</div>
            </div>
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

        {/* 스캔 기록 목록 */}
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl mr-4 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.productName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.productName}</h3>
                      <p className="text-xs text-gray-500">{item.date} {item.time}</p>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-full flex items-center ${getStatusColor(item.status)}`}>
                      <i className={`${getStatusIcon(item.status)} mr-1 text-xs`}></i>
                      <span className="text-xs font-medium">{getStatusText(item.status)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">알레르겐:</span>
                      <span className="text-xs text-gray-700">
                        {item.allergens.join(', ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.safetyScore >= 80 ? 'bg-green-500' : 
                            item.safetyScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${item.safetyScore}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{item.safetyScore}</span>
                    </div>
                  </div>
                </div>
                
                <button className="ml-2 w-8 h-8 flex items-center justify-center">
                  <i className="ri-arrow-right-s-line text-gray-400"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 필터링된 기록이 없을 때 표시되는 메시지 */}
        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-scan-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">기록이 없습니다</h3>
            <p className="text-gray-500 mb-4">첫 번째 제품을 스캔해보세요</p>
            <button className="!rounded-button bg-blue-600 text-white px-6 py-3 font-medium">
              바코드 스캔하기
            </button>
          </div>
        )}
      </main>

      {/* 하단 네비게이션을 렌더링합니다. */}
      <BottomNav />
    </div>
  );
}
