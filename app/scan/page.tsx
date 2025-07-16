'use client';

import { useState } from 'react';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import { useProfile } from '@/contexts/ProfileContext';

export default function ScanPage() {
  const { profiles, selectedProfiles } = useProfile();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const productAllergens = ['밀', '달걀', '우유', '초콜릿'];
      const analysis = selectedProfiles.map(profileId => {
        const profile = profiles.find(p => p.id === profileId);
        if (!profile) return null;

        const triggeredAllergens = profile.allergies.filter(allergen => productAllergens.includes(allergen));
        return {
          profileName: profile.name,
          status: triggeredAllergens.length > 0 ? 'danger' : 'safe',
          triggeredAllergens,
        };
      }).filter(Boolean);

      setIsScanning(false);
      setScanResult({
        productName: '오리온 초코파이',
        barcode: '8801117123456',
        ingredients: ['밀가루', '설탕', '식용유지', '달걀', '우유', '코코아분말', '베이킹파우더', '초콜릿'],
        analysis,
      });
    }, 2000);
  };

  const resetScan = () => {
    setScanResult(null);
    setIsScanning(false);
  };

  if (scanResult) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <TopNav title="스캔 결과" showBack={true} />
        
        <main className="pt-16 px-4">
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{scanResult.productName}</h2>
              <p className="text-sm text-gray-500">바코드: {scanResult.barcode}</p>
            </div>

            <div className="space-y-4 mb-6">
              {scanResult.analysis.map((result: any, index: number) => (
                <div key={index} className={`p-4 rounded-xl border ${
                  result.status === 'safe' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
                }`}>
                  <div className="flex items-center mb-2">
                    <i className={`${result.status === 'safe' ? 'ri-shield-check-line text-green-600' : 'ri-alert-line text-red-600'} mr-2`}></i>
                    <span className={`font-semibold ${result.status === 'safe' ? 'text-green-800' : 'text-red-800'}`}>
                      {result.profileName}: {result.status === 'safe' ? '안전' : '위험'}
                    </span>
                  </div>
                  <p className={`text-sm ${result.status === 'safe' ? 'text-green-700' : 'text-red-700'}`}>
                    {result.status === 'safe'
                      ? `등록된 알레르기 성분이 포함되어 있지 않습니다.`
                      : `알레르기 유발 성분: ${result.triggeredAllergens.join(', ')}`}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">전체 성분</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {scanResult.ingredients.join(', ')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={resetScan}
              className="!rounded-button bg-gray-100 text-gray-700 py-3 font-medium"
            >
              다시 스캔
            </button>
            <button className="!rounded-button bg-blue-600 text-white py-3 font-medium">
              기록 저장
            </button>
          </div>
        </main>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopNav title="바코드 스캔" showBack={true} />
      
      <main className="pt-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">식품 바코드를 스캔하세요</h2>
          <p className="text-gray-600">알레르기 성분을 즉시 확인할 수 있습니다</p>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="aspect-square bg-gray-900 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
            {isScanning ? (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white">스캔 중...</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 border-4 border-white rounded-2xl mb-4 flex items-center justify-center">
                  <i className="ri-qr-code-line text-white text-4xl"></i>
                </div>
                <p className="text-white">바코드를 화면 중앙에 맞춰주세요</p>
              </div>
            )}
            
            <div className="absolute inset-0 border-4 border-transparent">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white rounded-xl"></div>
            </div>
          </div>

          <button 
            onClick={handleScan}
            disabled={isScanning}
            className="!rounded-button w-full bg-blue-600 text-white py-4 font-semibold disabled:bg-gray-400"
          >
            {isScanning ? '스캔 중...' : '스캔 시작'}
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">스캔 도움말</h3>
          <div className="space-y-2">
            <div className="flex items-start">
              <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
              <p className="text-sm text-gray-700">바코드가 선명하게 보이도록 해주세요</p>
            </div>
            <div className="flex items-start">
              <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
              <p className="text-sm text-gray-700">충분한 조명이 있는 곳에서 스캔하세요</p>
            </div>
            <div className="flex items-start">
              <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
              <p className="text-sm text-gray-700">손을 안정적으로 유지해주세요</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
