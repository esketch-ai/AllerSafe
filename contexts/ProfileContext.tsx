'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 프로필 데이터의 인터페이스를 정의합니다.
interface ProfileData {
  id: string;
  name: string;
  type: 'self' | 'family' | 'pet';
  relation?: string;
  species?: string;
  allergies: string[];
  dietaryRestrictions: string[];
  religiousRestrictions: string[];
  personalDislikes: string[];
}

// 프로필 컨텍스트의 인터페이스를 정의합니다.
interface ProfileContextType {
  profiles: ProfileData[];
  selectedProfiles: string[];
  toggleProfileSelection: (profileId: string) => void;
  setProfiles: (profiles: ProfileData[]) => void;
}

// 프로필 컨텍스트를 생성합니다.
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// 프로필 데이터를 제공하는 프로바이더 컴포넌트
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
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
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>(['self']);

  const toggleProfileSelection = (profileId: string) => {
    setSelectedProfiles(prev => 
      prev.includes(profileId) 
        ? prev.filter(id => id !== profileId) 
        : [...prev, profileId]
    );
  };

  return (
    <ProfileContext.Provider value={{ profiles, selectedProfiles, toggleProfileSelection, setProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
};

// 프로필 컨텍스트를 사용하기 위한 커스텀 훅
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
