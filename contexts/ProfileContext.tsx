'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  addProfile: (profile: Omit<ProfileData, 'id'>) => Promise<void>;
  updateProfile: (profile: ProfileData) => Promise<void>;
  deleteProfile: (profileId: string) => Promise<void>;
}

// 프로필 컨텍스트를 생성합니다.
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// 프로필 데이터를 제공하는 프로바이더 컴포넌트
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

  // 프로필 로드
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const res = await fetch('/api/profiles');
        const data = await res.json();
        setProfiles(data);
        // 기본적으로 첫 번째 프로필을 선택
        if (data.length > 0) {
          setSelectedProfiles([data[0].id]);
        }
      } catch (error) {
        console.error('Failed to load profiles:', error);
      }
    };
    loadProfiles();
  }, []);

  const toggleProfileSelection = (profileId: string) => {
    setSelectedProfiles(prev => 
      prev.includes(profileId) 
        ? prev.filter(id => id !== profileId) 
        : [...prev, profileId]
    );
  };

  const addProfile = async (profile: Omit<ProfileData, 'id'>) => {
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      const newProfile = await res.json();
      setProfiles(prev => [...prev, newProfile]);
    } catch (error) {
      console.error('Failed to add profile:', error);
    }
  };

  const updateProfile = async (profile: ProfileData) => {
    try {
      const res = await fetch('/api/profiles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      const updatedProfile = await res.json();
      setProfiles(prev => prev.map(p => (p.id === updatedProfile.id ? updatedProfile : p)));
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const deleteProfile = async (profileId: string) => {
    try {
      await fetch(`/api/profiles?id=${profileId}`, {
        method: 'DELETE',
      });
      setProfiles(prev => prev.filter(p => p.id !== profileId));
      setSelectedProfiles(prev => prev.filter(id => id !== profileId));
    } catch (error) {
      console.error('Failed to delete profile:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profiles, selectedProfiles, toggleProfileSelection, addProfile, updateProfile, deleteProfile }}>
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
