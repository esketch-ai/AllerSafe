
"""'use client';

import Link from 'next/link';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import { useProfile } from '@/contexts/ProfileContext';

export default function Home() {
  const { profiles, selectedProfiles, toggleProfileSelection } = useProfile();

  const allergyStats = [
    { name: '안전', count: 234, color: 'bg-green-500', desc: '섭취 가능한 제품' },
    { name: '주의', count: 12, color: 'bg-yellow-500', desc: '신중히 확인 필요' },
    { name: '위험', count: 3, color: 'bg-red-500', desc: '섭취 금지 제품' },
  ];

  const quickActions = [
    { 
      icon: 'ri-scan-line', 
      title: '바코드 스캔', 
      desc: '식품 안전성 확인',
      href: '/scan',
      bg: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20barcode%20scanner%2C%20modern%20scanning%20device%2C%20clean%20white%20background%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20blue%20and%20white%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=scan&orientation=squarish'
    },
    { 
      icon: 'ri-restaurant-line', 
      title: '안전 식당', 
      desc: '알레르기 대응 식당',
      href: '/restaurants',
      bg: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20restaurant%20building%2C%20modern%20cafe%20storefront%2C%20clean%20white%20background%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20orange%20and%20white%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=restaurant&orientation=squarish'
    },
    { 
      icon: 'ri-heart-pulse-line', 
      title: '응급 도움', 
      desc: '알레르기 응급상황',
      href: '/emergency',
      bg: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20medical%20cross%2C%20emergency%20medical%20symbol%2C%20clean%20white%20background%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20red%20and%20white%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=emergency&orientation=squarish'
    },
    { 
      icon: 'ri-book-open-line', 
      title: '알레르기 정보', 
      desc: '상세 정보 확인',
      href: '/info',
      bg: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20open%20book%2C%20educational%20book%20with%20pages%2C%20clean%20white%20background%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20green%20and%20white%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=info&orientation=squarish'
    },
  ];

  const selectedProfileNames = selectedProfiles.map(id => profiles.find(p => p.id === id)?.name).filter(Boolean).join(', ');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopNav title="AllerSafe" showMenu={true} />
      
      <main className="pt-16 px-4">
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">프로필 선택</h3>
          <div className="flex flex-wrap gap-2">
            {profiles.map(profile => (
              <button 
                key={profile.id} 
                onClick={() => toggleProfileSelection(profile.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedProfiles.includes(profile.id) 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                {profile.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <i className="ri-shield-check-line text-3xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold">안녕하세요, {selectedProfileNames.length > 20 ? selectedProfileNames.substring(0, 20) + '...' : selectedProfileNames}님</h2>
              <p className="text-blue-100 text-sm">오늘도 안전한 하루 되세요</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">내 스캔 기록 요약</h3>
            <p className="text-blue-100 text-sm mb-4">지금까지 총 {allergyStats.reduce((sum, stat) => sum + stat.count, 0)}개 제품을 검사했어요</p>
          </div>
          
          <div className="space-y-3">
            {allergyStats.map((stat, index) => (
              <div key={index} className="bg-white/15 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-5 h-5 ${stat.color} rounded-full mr-3 flex-shrink-0`}></div>
                  <div>
                    <div className="text-lg font-bold">{stat.name}</div>
                    <div className="text-xs text-blue-100 opacity-80">{stat.desc}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{stat.count}개</div>
                  <div className="text-xs text-blue-100 opacity-80">
                    {Math.round((stat.count / allergyStats.reduce((sum, s) => sum + s.count, 0)) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 실행</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="w-16 h-16 mb-3 rounded-xl overflow-hidden">
                  <img 
                    src={action.bg} 
                    alt={action.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                <p className="text-sm text-gray-500">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">최근 스캔 기록</h3>
            <Link href="/history" className="text-sm text-blue-600">전체보기</Link>
          </div>
          
          <div className="space-y-3">
            {[
              { name: '오리온 초코파이', time: '2분 전', status: 'safe', icon: 'ri-check-line' },
              { name: '롯데 아몬드 과자', time: '1시간 전', status: 'warning', icon: 'ri-error-warning-line' },
              { name: '해태 감자칩', time: '3시간 전', status: 'safe', icon: 'ri-check-line' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    item.status === 'safe' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    <i className={`${item.icon} text-sm`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <i className="ri-alert-line text-orange-600"></i>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">알레르기 주의사항</h4>
              <p className="text-sm text-gray-600 mb-3">
                새로운 식품을 섭취하기 전에는 반드시 성분을 확인하세요. 
                의심스러운 증상이 나타나면 즉시 의료진에게 연락하세요.
              </p>
              <Link href="/emergency" className="inline-flex items-center text-sm font-medium text-orange-600">
                응급상황 대처법 보기
                <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
""
