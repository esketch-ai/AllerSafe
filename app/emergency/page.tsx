// app/emergency/page.tsx

'use client'; // 이 파일이 클라이언트 측에서 렌더링되도록 설정합니다.

// React의 useState 훅을 가져옵니다.
import { useState } from 'react';
// 상단 네비게이션 컴포넌트를 가져옵니다.
import TopNav from '@/components/TopNav';
// 하단 네비게이션 컴포넌트를 가져옵니다.
import BottomNav from '@/components/BottomNav';

// 응급 상황 페이지 컴포넌트
export default function EmergencyPage() {
  // 활성 탭을 관리하는 상태
  const [activeTab, setActiveTab] = useState('emergency');

  // 비상 연락처 데이터를 정의합니다.
  const emergencyContacts = [
    { name: '119 (응급실)', number: '119', type: 'emergency', icon: 'ri-phone-line' },
    { name: '가족 - 엄마', number: '010-1234-5678', type: 'family', icon: 'ri-user-heart-line' },
    { name: '주치의', number: '02-123-4567', type: 'doctor', icon: 'ri-stethoscope-line' },
  ];

  // 응급 조치 단계 데이터를 정의합니다.
  const emergencySteps = [
    {
      step: 1,
      title: '즉시 119에 신고',
      desc: '알레르기 쇼크라고 명확히 알려주세요',
      icon: 'ri-phone-line',
      color: 'bg-red-500'
    },
    {
      step: 2,
      title: '에피펜 사용',
      desc: '에피펜이 있다면 허벅지에 주사하세요',
      icon: 'ri-syringe-line',
      color: 'bg-orange-500'
    },
    {
      step: 3,
      title: '안전한 자세 유지',
      desc: '의식이 있으면 앉은 자세, 없으면 옆으로 눕히세요',
      icon: 'ri-user-line',
      color: 'bg-blue-500'
    },
    {
      step: 4,
      title: '응급실 이동',
      desc: '증상이 호전되어도 반드시 병원에 가세요',
      icon: 'ri-hospital-line',
      color: 'bg-green-500'
    },
  ];

  // 알레르기 증상 데이터를 정의합니다.
  const symptoms = [
    { name: '두드러기', severity: 'mild', icon: 'ri-skin-line' },
    { name: '호흡곤란', severity: 'severe', icon: 'ri-lungs-line' },
    { name: '구토/설사', severity: 'moderate', icon: 'ri-stomach-line' },
    { name: '혈압저하', severity: 'severe', icon: 'ri-heart-pulse-line' },
    { name: '의식잃음', severity: 'severe', icon: 'ri-brain-line' },
    { name: '부종', severity: 'moderate', icon: 'ri-drop-line' },
  ];

  // 증상의 심각도에 따라 색상을 반환하는 함수
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'moderate': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'severe': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    // 전체 화면을 차지하고 하단 네비게이션 공간을 확보합니다.
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 상단 네비게이션을 렌더링합니다. */}
      <TopNav title="응급 상황" showBack={true} />
      
      {/* 메인 콘텐츠 영역 */}
      <main className="pt-16 px-4">
        {/* 119 신고 카드 */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <i className="ri-alarm-warning-line text-2xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold">응급상황 대응</h2>
              <p className="text-red-100 text-sm">알레르기 쇼크 발생시 즉시 행동하세요</p>
            </div>
          </div>
          
          <button className="w-full bg-white text-red-600 py-4 rounded-xl font-bold text-lg">
            <i className="ri-phone-line mr-2"></i>119 즉시 신고
          </button>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex bg-white rounded-2xl p-1 mb-6 shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium ${
              activeTab === 'emergency' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            응급처치
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium ${
              activeTab === 'symptoms' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            증상 확인
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium ${
              activeTab === 'contacts' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            연락처
          </button>
        </div>

        {/* 응급처치 탭 콘텐츠 */}
        {activeTab === 'emergency' && (
          <div className="space-y-4">
            {emergencySteps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start">
                  <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                    <i className={`${step.icon} text-white text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium mr-2">
                        {step.step}단계
                      </span>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 증상 확인 탭 콘텐츠 */}
        {activeTab === 'symptoms' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">알레르기 반응 증상</h3>
              <div className="grid grid-cols-2 gap-3">
                {symptoms.map((symptom, index) => (
                  <div key={index} className={`p-3 rounded-xl border ${getSeverityColor(symptom.severity)}`}>
                    <div className="flex items-center mb-2">
                      <i className={`${symptom.icon} mr-2`}></i>
                      <span className="font-medium text-sm">{symptom.name}</span>
                    </div>
                    <div className="text-xs opacity-75">
                      {symptom.severity === 'mild' && '경미'}
                      {symptom.severity === 'moderate' && '중등도'}
                      {symptom.severity === 'severe' && '심각'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 주의사항 카드 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-100">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="ri-alert-line text-yellow-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">주의사항</h4>
                  <p className="text-sm text-gray-600">
                    호흡곤란, 의식잃음, 혈압저하 등 심각한 증상이 나타나면 
                    즉시 119에 신고하고 응급실로 이동하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 연락처 탭 콘텐츠 */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                      contact.type === 'emergency' ? 'bg-red-100 text-red-600' :
                      contact.type === 'family' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <i className={`${contact.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.number}</p>
                    </div>
                  </div>
                  <button className="!rounded-button bg-green-600 text-white px-4 py-2 text-sm font-medium">
                    <i className="ri-phone-line mr-1"></i>
                    전화
                  </button>
                </div>
              </div>
            ))}

            {/* 연락처 추가 버튼 */}
            <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <i className="ri-add-line text-blue-600 mr-2"></i>
              <span className="text-blue-600 font-medium">연락처 추가</span>
            </button>
          </div>
        )}
      </main>

      {/* 하단 네비게이션을 렌더링합니다. */}
      <BottomNav />
    </div>
  );
}
