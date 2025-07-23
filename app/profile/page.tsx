// app/profile/page.tsx

'use client'; // 이 파일이 클라이언트 측에서 렌더링되도록 설정합니다.

// React의 useState 훅을 가져옵니다.
import { useState } from 'react';
// 상단 네비게이션 컴포넌트를 가져옵니다.
import TopNav from '@/components/TopNav';
// 하단 네비게이션 컴포넌트를 가져옵니다.
import BottomNav from '@/components/BottomNav';

// 프로필 데이터의 인터페이스를 정의합니다.
interface ProfileData {
  id: string; // 프로필 고유 ID
  name: string; // 이름
  type: 'self' | 'family' | 'pet'; // 프로필 타입 (본인, 가족, 반려동물)
  relation?: string; // 가족 관계
  species?: string; // 반려동물 종류
  allergies: string[]; // 알레르기 목록
  dietaryRestrictions: string[]; // 식이 제한 목록
  religiousRestrictions: string[]; // 종교적 제한 목록
  personalDislikes: string[]; // 개인적 거부 음식 목록
}

// 개별 프로필 카드를 렌더링하는 컴포넌트
const ProfileCard = ({ profile, setEditingProfile, setEditType, getFieldLabel }: { 
  profile: ProfileData; 
  setEditingProfile: (id: string | null) => void; 
  setEditType: (type: 'allergies' | 'dietary' | 'religious' | 'personal' | null) => void;
  getFieldLabel: (type: 'allergies' | 'dietary' | 'religious' | 'personal') => string;
}) => (
  <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mr-3 ${
          profile.type === 'self' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
            profile.type === 'family' ? 'bg-gradient-to-br from-green-500 to-green-600' :
              'bg-gradient-to-br from-orange-500 to-orange-600'
        }`}>
          {profile.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{profile.name}</h3>
          <p className="text-sm text-gray-500">
            {profile.relation || profile.species || '본인'}
          </p>
        </div>
      </div>
    </div>

    <div className="space-y-3">
      {(['allergies', 'dietary', 'religious', 'personal'] as const).map((type) => (
        <div key={type} className="border-t border-gray-50 pt-3 first:border-t-0 first:pt-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <i className={`${type === 'allergies' ? 'ri-alert-line text-red-500' :
                type === 'dietary' ? 'ri-leaf-line text-green-500' :
                  type === 'religious' ? 'ri-church-line text-purple-500' :
                    'ri-close-circle-line text-orange-500'
              } mr-2`}></i>
              {getFieldLabel(type)}
            </h4>
            <button
              onClick={() => {
                setEditingProfile(profile.id);
                setEditType(type);
              }}
              className="text-blue-600 text-xs font-medium"
            >
              편집
            </button>
          </div>

          <div className="flex flex-wrap gap-1">
            {(profile[type] as string[] || []).map((item: string) => (
              <span key={item} className={`px-2 py-1 rounded-full text-xs border ${
                type === 'allergies' ? 'bg-red-50 text-red-700 border-red-200' :
                  type === 'dietary' ? 'bg-green-50 text-green-700 border-green-200' :
                    type === 'religious' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      'bg-orange-50 text-orange-700 border-orange-200'
              }`}>
                {item}
              </span>
            ))}
            {(profile[type] as string[] || []).length === 0 && (
              <span className="text-xs text-gray-400">없음</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 프로필 관리 페이지 컴포넌트
export default function ProfilePage() {
  // 활성 탭을 관리하는 상태 ('self', 'family', 'pet')
  const [activeTab, setActiveTab] = useState('self');
  // 현재 편집 중인 프로필의 ID를 관리하는 상태
  const [editingProfile, setEditingProfile] = useState<string | null>(null);
  // 현재 편집 중인 필드 타입을 관리하는 상태
  const [editType, setEditType] = useState<'allergies' | 'dietary' | 'religious' | 'personal' | null>(null);

  // 프로필 목록을 관리하는 상태
  const [profiles, setProfiles] = useState<ProfileData[]>([
    {
      id: 'self',
      name: '김민수',
      type: 'self',
      allergies: ['견과류', '갑각류'],
      dietaryRestrictions: ['비건'],
      religiousRestrictions: ['돼지고기', '소고기'],
      personalDislikes: ['매운맛', '생선류']
    },
    {
      id: 'family1',
      name: '이지영',
      type: 'family',
      relation: '배우자',
      allergies: ['우유', '달걀'],
      dietaryRestrictions: ['글루텐프리'],
      religiousRestrictions: [],
      personalDislikes: ['양파', '마늘']
    },
    {
      id: 'family2',
      name: '김도현',
      type: 'family',
      relation: '자녀',
      allergies: ['견과류'],
      dietaryRestrictions: [],
      religiousRestrictions: [],
      personalDislikes: ['브로콜리', '당근']
    },
    {
      id: 'family3',
      name: '김서윤',
      type: 'family',
      relation: '자녀',
      allergies: [],
      dietaryRestrictions: [],
      religiousRestrictions: [],
      personalDislikes: ['토마토']
    },
    {
      id: 'family4',
      name: '김영희',
      type: 'family',
      relation: '어머니',
      allergies: ['콩'],
      dietaryRestrictions: ['저나트륨'],
      religiousRestrictions: ['돼지고기'],
      personalDislikes: []
    },
    {
      id: 'pet1',
      name: '몽이',
      type: 'pet',
      species: '강아지',
      allergies: ['초콜릿', '포도'],
      dietaryRestrictions: ['저지방'],
      religiousRestrictions: [],
      personalDislikes: ['양파', '마늘']
    },
    {
      id: 'pet2',
      name: '나비',
      type: 'pet',
      species: '고양이',
      allergies: ['우유'],
      dietaryRestrictions: [],
      religiousRestrictions: [],
      personalDislikes: ['생선']
    },
    {
      id: 'pet3',
      name: '코코',
      type: 'pet',
      species: '햄스터',
      allergies: [],
      dietaryRestrictions: [],
      religiousRestrictions: [],
      personalDislikes: ['감귤류']
    },
    {
      id: 'pet4',
      name: '루비',
      type: 'pet',
      species: '앵무새',
      allergies: ['아보카도'],
      dietaryRestrictions: [],
      religiousRestrictions: [],
      personalDislikes: []
    }
  ]);

  // 일반적인 알레르기 항목 목록
  const commonAllergies = [
    '견과류', '갑각류', '우유', '달걀', '밀', '콩', '생선', '조개류',
    '토마토', '딸기', '복숭아', '키위', '바나나', '초콜릿', '꿀', '포도'
  ];

  // 식이 제한 옵션 목록
  const dietaryOptions = [
    '비건', '베지테리언', '글루텐프리', '무당', '저나트륨', '저지방',
    '케토', '팔레오', '할랄', '코셔', '저탄수화물'
  ];

  // 종교적 제한 옵션 목록
  const religiousOptions = [
    '돼지고기', '소고기', '양고기', '닭고기', '생선', '해산물',
    '알코올', '카페인', '젤라틴', '동물성 원료'
  ];

  // 개인적 거부 옵션 목록
  const personalOptions = [
    '매운맛', '단맛', '신맛', '쓴맛', '짠맛', '양파', '마늘',
    '생강', '고수', '브로콜리', '당근', '버섯', '감귤류'
  ];

  // 활성 탭에 따라 프로필 목록을 필터링하는 함수
  const getFilteredProfiles = () => {
    switch (activeTab) {
      case 'self':
        return profiles.filter(p => p.type === 'self');
      case 'family':
        return profiles.filter(p => p.type === 'family');
      case 'pet':
        return profiles.filter(p => p.type === 'pet');
      default:
        return profiles;
    }
  };

  // 특정 프로필의 필드를 업데이트하는 함수
  const updateProfile = (profileId: string, field: string, value: string[]) => {
    setProfiles(profiles.map(p =>
      p.id === profileId ? { ...p, [field]: value } : p
    ));
  };

  // 항목을 선택/해제하는 함수
  const toggleItem = (profileId: string, field: string, item: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return;

    const currentItems = profile[field as keyof ProfileData] as string[];
    const newItems = currentItems.includes(item)
      ? currentItems.filter(i => i !== item)
      : [...currentItems, item];

    updateProfile(profileId, field, newItems);
  };

  // 편집 타입에 맞는 옵션 목록을 반환하는 함수
  const getOptionsForType = (type: 'allergies' | 'dietary' | 'religious' | 'personal') => {
    switch (type) {
      case 'allergies':
        return commonAllergies;
      case 'dietary':
        return dietaryOptions;
      case 'religious':
        return religiousOptions;
      case 'personal':
        return personalOptions;
      default:
        return [];
    }
  };

  // 편집 타입에 맞는 레이블을 반환하는 함수
  const getFieldLabel = (type: 'allergies' | 'dietary' | 'religious' | 'personal') => {
    switch (type) {
      case 'allergies':
        return '알레르기';
      case 'dietary':
        return '식이 제한';
      case 'religious':
        return '종교적 제한';
      case 'personal':
        return '개인적 거부';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopNav title="프로필 관리" showMenu={true} />

      <main className="pt-16 px-4">
        <div className="flex bg-white rounded-2xl p-1 mb-4 shadow-sm border border-gray-100">
          {[
            { key: 'self', label: '본인', icon: 'ri-user-line' },
            { key: 'family', label: '가족', icon: 'ri-group-line' },
            { key: 'pet', label: '반려동물', icon: 'ri-heart-line' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {activeTab === 'self' ? '본인 정보' :
              activeTab === 'family' ? '가족 정보' : '반려동물 정보'}
          </h2>
          <p className="text-sm text-gray-600">
            {activeTab === 'self' ? '내 알레르기와 식이 제한사항을 관리하세요' :
              activeTab === 'family' ? '가족의 알레르기와 식이 제한사항을 관리하세요' :
                '반려동물의 금지 음식과 제한사항을 관리하세요'}
          </p>
        </div>

        {getFilteredProfiles().map((profile) => (
          <ProfileCard 
            key={profile.id} 
            profile={profile} 
            setEditingProfile={setEditingProfile} 
            setEditType={setEditType} 
            getFieldLabel={getFieldLabel} 
          />
        ))}

        {editingProfile && editType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {getFieldLabel(editType)} 편집
                  </h3>
                  <button
                    onClick={() => {
                      setEditingProfile(null);
                      setEditType(null);
                    }}
                    className="text-blue-600 font-medium"
                  >
                    완료
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {profiles.find(p => p.id === editingProfile)?.name}
                </p>
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {getOptionsForType(editType).map((option) => {
                    const profile = profiles.find(p => p.id === editingProfile);
                    const isSelected = profile && (profile[editType] as string[] || []).includes(option);

                    return (
                      <button
                        key={option}
                        onClick={() => toggleItem(editingProfile, editType, option)}
                        className={`px-3 py-2 rounded-full text-sm border ${
                          isSelected
                            ? editType === 'allergies' ? 'bg-red-100 text-red-700 border-red-200' :
                              editType === 'dietary' ? 'bg-green-100 text-green-700 border-green-200' :
                                editType === 'religious' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                  'bg-orange-100 text-orange-700 border-orange-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 mb-6">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <i className="ri-shield-check-line text-blue-600"></i>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">가족 안전 관리</h4>
              <p className="text-sm text-gray-600 mb-3">
                등록된 모든 프로필의 제한사항이 제품 스캔 시 자동으로 확인됩니다.
                가족과 반려동물 모두 안전하게 보호하세요.
              </p>
              <div className="flex items-center text-xs text-blue-600">
                <i className="ri-information-line mr-1"></i>
                총 {profiles.length}개 프로필 관리 중
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}