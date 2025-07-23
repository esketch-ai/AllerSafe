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
const ProfileCard = ({ profile, setEditingProfile, setEditType, getFieldLabel, deleteProfile }: { 
  profile: ProfileData; 
  setEditingProfile: (id: string | null) => void; 
  setEditType: (type: 'allergies' | 'dietary' | 'religious' | 'personal' | null) => void;
  getFieldLabel: (type: 'allergies' | 'dietary' | 'religious' | 'personal') => string;
  deleteProfile: (profileId: string) => Promise<void>;
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
      <div className="flex space-x-2">
        <button
          onClick={() => setEditingProfile(profile.id)}
          className="text-blue-600 text-sm font-medium"
        >
          편집
        </button>
        {profile.type !== 'self' && (
          <button
            onClick={() => deleteProfile(profile.id)}
            className="text-red-600 text-sm font-medium"
          >
            삭제
          </button>
        )}
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
  const { profiles, addProfile, updateProfile, deleteProfile } = useProfile();
  const [activeTab, setActiveTab] = useState('self');
  const [editingProfile, setEditingProfile] = useState<string | null>(null);
  const [editType, setEditType] = useState<'allergies' | 'dietary' | 'religious' | 'personal' | null>(null);
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [newProfileData, setNewProfileData] = useState<Omit<ProfileData, 'id' | 'allergies' | 'dietaryRestrictions' | 'religiousRestrictions' | 'personalDislikes'>>({
    name: '',
    type: 'family',
    relation: '',
    species: '',
  });
  const [newProfileAllergies, setNewProfileAllergies] = useState<string[]>([]);
  const [newProfileDietary, setNewProfileDietary] = useState<string[]>([]);
  const [newProfileReligious, setNewProfileReligious] = useState<string[]>([]);
  const [newProfilePersonal, setNewProfilePersonal] = useState<string[]>([]);

  useEffect(() => {
    if (editingProfile) {
      const profileToEdit = profiles.find(p => p.id === editingProfile);
      if (profileToEdit) {
        setNewProfileData({
          name: profileToEdit.name,
          type: profileToEdit.type,
          relation: profileToEdit.relation || '',
          species: profileToEdit.species || '',
        });
        setNewProfileAllergies(profileToEdit.allergies);
        setNewProfileDietary(profileToEdit.dietaryRestrictions);
        setNewProfileReligious(profileToEdit.religiousRestrictions);
        setNewProfilePersonal(profileToEdit.personalDislikes);
        setShowAddProfileModal(true); // 편집 모드일 때 모달 열기
      }
    } else {
      // 편집 모드 종료 시 폼 초기화
      setNewProfileData({ name: '', type: 'family', relation: '', species: '' });
      setNewProfileAllergies([]);
      setNewProfileDietary([]);
      setNewProfileReligious([]);
      setNewProfilePersonal([]);
    }
  }, [editingProfile, profiles]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profileToSave = {
      ...newProfileData,
      allergies: newProfileAllergies,
      dietaryRestrictions: newProfileDietary,
      religiousRestrictions: newProfileReligious,
      personalDislikes: newProfilePersonal,
    };

    if (editingProfile) {
      // Update existing profile
      await updateProfile({ ...profileToSave, id: editingProfile } as ProfileData);
    } else {
      // Add new profile
      await addProfile(profileToSave as Omit<ProfileData, 'id'>);
    }

    // Close modal and reset form
    setShowAddProfileModal(false);
    setEditingProfile(null);
    setEditType(null);
    setNewProfileData({ name: '', type: 'family', relation: '', species: '' });
    setNewProfileAllergies([]);
    setNewProfileDietary([]);
    setNewProfileReligious([]);
    setNewProfilePersonal([]);
  };

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

  // 항목을 선택/해제하는 함수
  const toggleItem = (profileId: string, field: string, item: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) {
      console.error(`Profile with ID ${profileId} not found.`);
      return;
    }

    let currentItems: string[];
    const profileField = profile[field as keyof ProfileData];

    if (Array.isArray(profileField)) {
      currentItems = profileField as string[];
    } else {
      console.warn(`Field "${field}" on profile "${profileId}" is not an array. Initializing as empty.`);
      currentItems = [];
    }

    const newItems = currentItems.includes(item)
      ? currentItems.filter(i => i !== item)
      : [...currentItems, item];

    updateProfile({ ...profile, [field]: newItems });
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
          {activeTab !== 'self' && (
            <button
              onClick={() => setShowAddProfileModal(true)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center text-sm font-medium shadow-md hover:bg-blue-700 transition-colors"
            >
              <i className="ri-add-line mr-2"></i>
              새 {activeTab === 'family' ? '가족' : '반려동물'} 프로필 추가
            </button>
          )}
        </div>

        {getFilteredProfiles().map((profile) => (
          <ProfileCard 
            key={profile.id} 
            profile={profile} 
            setEditingProfile={setEditingProfile} 
            setEditType={setEditType} 
            getFieldLabel={getFieldLabel} 
            deleteProfile={deleteProfile}
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

      {/* 프로필 추가/편집 모달 */}
      {(showAddProfileModal || editingProfile) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingProfile ? '프로필 편집' : '새 프로필 추가'}
            </h3>
            <form onSubmit={handleProfileSubmit}>
              <div className="mb-4">
                <label htmlFor="profileName" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  id="profileName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProfileData.name}
                  onChange={(e) => setNewProfileData({ ...newProfileData, name: e.target.value })}
                  required
                />
              </div>

              {/* 타입 선택 (추가 시에만) */}
              {!editingProfile && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">유형</label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setNewProfileData({ ...newProfileData, type: 'family', relation: '', species: '' })}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        newProfileData.type === 'family' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      가족
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewProfileData({ ...newProfileData, type: 'pet', relation: '', species: '' })}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        newProfileData.type === 'pet' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      반려동물
                    </button>
                  </div>
                </div>
              )}

              {/* 가족 관계 또는 반려동물 종류 */}
              {newProfileData.type === 'family' && (
                <div className="mb-4">
                  <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">관계</label>
                  <input
                    type="text"
                    id="relation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProfileData.relation || ''}
                    onChange={(e) => setNewProfileData({ ...newProfileData, relation: e.target.value })}
                  />
                </div>
              )}
              {newProfileData.type === 'pet' && (
                <div className="mb-4">
                  <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">종류</label>
                  <input
                    type="text"
                    id="species"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProfileData.species || ''}
                    onChange={(e) => setNewProfileData({ ...newProfileData, species: e.target.value })}
                  />
                </div>
              )}

              {/* 알레르기, 식이 제한 등 입력 필드 */}
              <div className="mb-4">
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">알레르기 (쉼표로 구분)</label>
                <input
                  type="text"
                  id="allergies"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProfileAllergies.join(', ')}
                  onChange={(e) => setNewProfileAllergies(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">식이 제한 (쉼표로 구분)</label>
                <input
                  type="text"
                  id="dietaryRestrictions"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProfileDietary.join(', ')}
                  onChange={(e) => setNewProfileDietary(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="religiousRestrictions" className="block text-sm font-medium text-gray-700 mb-1">종교적 제한 (쉼표로 구분)</label>
                <input
                  type="text"
                  id="religiousRestrictions"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProfileReligious.join(', ')}
                  onChange={(e) => setNewProfileReligious(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="personalDislikes" className="block text-sm font-medium text-gray-700 mb-1">개인적 거부 (쉼표로 구분)</label>
                <input
                  type="text"
                  id="personalDislikes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProfilePersonal.join(', ')}
                  onChange={(e) => setNewProfilePersonal(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProfileModal(false);
                    setEditingProfile(null);
                    setEditType(null);
                    // Reset form fields
                    setNewProfileData({ name: '', type: 'family', relation: '', species: '' });
                    setNewProfileAllergies([]);
                    setNewProfileDietary([]);
                    setNewProfileReligious([]);
                    setNewProfilePersonal([]);
                  }}
                  className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
                >
                  {editingProfile ? '저장' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}