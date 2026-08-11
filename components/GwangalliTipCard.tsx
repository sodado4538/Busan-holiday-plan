'use client';

import React from 'react';
import { Waves, Car, AlertTriangle, MapPin, Sparkles, ParkingCircle } from 'lucide-react';

export default function GwangalliTipCard() {
  const minrakMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent('민락해변공원 공영주차장')}`;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-sky-900 to-slate-900 text-white rounded-2xl p-4 shadow-lg border border-sky-500/30 relative overflow-hidden mb-4 animate-fade-in">
      <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-sky-500/20 rounded-full blur-xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/30 text-sky-200 text-[11px] font-bold border border-sky-400/30">
          <Waves className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
          <span>Day 3 광안리 드라이브 팁</span>
        </div>
        <span className="text-[11px] text-amber-300 font-bold flex items-center gap-1">
          <Car className="w-3.5 h-3.5 text-sky-300" />
          당리동 출발 약 35~40분
        </span>
      </div>

      <h3 className="text-sm font-black text-white tracking-tight mb-1">
        🏖️ 광안리해수욕장 주차 & 이동 핵심 팁
      </h3>
      <p className="text-xs text-sky-100/90 font-medium leading-relaxed mb-3 break-keep">
        일요일 오전 11시 이후 광안리 공영주차장 혼잡도가 높습니다. 민락해변공원 공영주차장이나 식당 주차 지원을 적극 활용하세요!
      </p>

      {/* Parking Tip Alert Box */}
      <div className="bg-amber-500/20 rounded-xl p-2.5 border border-amber-400/40 text-amber-200 text-xs space-y-1.5 mb-3">
        <div className="flex items-start gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <div className="font-medium break-keep">
            <strong className="text-amber-100 font-bold">공영주차장 꿀팁: </strong>
            <span className="underline font-bold text-amber-200">민락해변공원 공영주차장</span>(민락수변로 17)이 백사장 및 카페거리 접근성이 가장 양호합니다.
          </div>
        </div>
        <div className="flex items-start gap-1.5 pt-1 border-t border-amber-400/20 text-[11px] text-amber-100">
          <ParkingCircle className="w-3.5 h-3.5 text-sky-300 shrink-0 mt-0.5" />
          <span className="break-keep">
            <strong>식당 주차 지원: </strong> 디에이블 광안점 이용 시 지하주차장 <strong>2시간 무료 지원</strong>
          </span>
        </div>
      </div>

      {/* Footer Naver Map Link */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-sky-500/20">
        <span className="text-sky-200 font-medium text-[11px] truncate max-w-[210px]">
          📍 민락해변공원 공영주차장
        </span>
        <a
          href={minrakMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] rounded-lg transition shrink-0"
        >
          <MapPin className="w-3 h-3 text-sky-200" />
          <span>네이버 지도</span>
        </a>
      </div>
    </div>
  );
}
