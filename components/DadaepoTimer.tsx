'use client';

import React from 'react';
import { Sun, Waves, Clock, AlertTriangle, MapPin } from 'lucide-react';

export default function DadaepoTimer() {
  const mapUrl = `https://map.naver.com/v5/search/${encodeURIComponent('다대포 꿈의 낙조분수')}`;

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-2xl p-4 shadow-lg border border-purple-500/30 relative overflow-hidden mb-4">
      <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-[11px] font-bold border border-purple-400/30">
          <Waves className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
          <span>Day 2 메인 하이라이트</span>
        </div>
        <span className="text-[11px] text-amber-300 font-bold flex items-center gap-1">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          일몰 19:15 / 분수 20:00
        </span>
      </div>

      <h3 className="text-sm font-black text-white tracking-tight mb-1">
        🌊 다대포 꿈의 낙조분수 & 일몰 관람 팁
      </h3>
      <p className="text-xs text-purple-100/90 font-medium leading-relaxed mb-3">
        세계 최대 규모 바닥분수 쇼! 음악과 함께 펼쳐지는 화려한 조명 연출을 감상해보세요.
      </p>

      {/* Parking Advice Warning Box */}
      <div className="bg-amber-500/20 rounded-xl p-2.5 border border-amber-400/40 text-amber-200 text-xs flex items-start gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
        <div className="font-medium">
          <strong className="text-amber-100 font-bold">주차 핵심 팁: </strong>
          20시 공연 시작 전 주차난이 심각합니다. <strong>19:30 전 입차</strong>를 강력 추천합니다!
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-purple-500/20">
        <span className="text-purple-200 font-medium">📍 다대포 해변공원 주차장</span>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] rounded-lg transition"
        >
          <MapPin className="w-3 h-3 text-cyan-300" />
          <span>네이버 지도</span>
        </a>
      </div>
    </div>
  );
}
