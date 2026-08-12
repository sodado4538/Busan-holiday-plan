'use client';

import React from 'react';
import { Sparkles, Clock, MapPin, AlertCircle, Eye } from 'lucide-react';

export default function DadaepoTimer() {
  const droneMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent('민락회타운 앞 백사장')}`;

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 text-white rounded-2xl p-4 shadow-xl border border-indigo-500/30 relative overflow-hidden mb-4 animate-fade-in">
      {/* Glow effect background */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[11px] font-bold border border-indigo-400/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Day 2 토요일 메인 하이라이트</span>
        </div>
        <span className="text-[11px] text-amber-300 font-bold flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          매주 토요일 20:00 정시
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-black text-white tracking-tight mb-1 flex items-center gap-1.5">
        🎆 광안리 M 드론라이트쇼 (광복절 1,100대 특별전)
      </h3>
      <p className="text-xs text-slate-300 font-medium leading-relaxed mb-3 break-keep">
        약 1,100대의 드론이 광안대교 밤하늘을 수놓는 숭고한 광복절 12분 무료 특별 공연!
      </p>

      {/* Tip alert box */}
      <div className="bg-blue-950/60 rounded-xl p-2.5 border border-sky-500/30 text-sky-200 text-xs space-y-1 mb-3">
        <div className="flex items-start gap-1.5">
          <Eye className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <div className="font-medium break-keep">
            <strong className="text-white font-bold">최고 관람 명당: </strong>
            <span className="underline font-bold text-amber-200">민락회타운 앞 백사장</span>에 19:40분까지 도착하시면 가장 정면에서 입체적으로 감상하실 수 있습니다.
          </div>
        </div>
        <div className="flex items-start gap-1.5 pt-1 border-t border-sky-500/20 text-[11px] text-slate-300">
          <AlertCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
          <span className="break-keep">
            16:30 이른 저녁 식사 후 노을 산책을 즐기다가 여유롭게 명당 자리로 이동하세요!
          </span>
        </div>
      </div>

      {/* Footer Naver Map Link */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-indigo-500/20">
        <span className="text-slate-300 font-medium text-[11px] truncate max-w-[210px]">
          📍 관람 명당: 민락회타운 앞 백사장
        </span>
        <a
          href={droneMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] rounded-lg transition shrink-0"
        >
          <MapPin className="w-3 h-3 text-indigo-200" />
          <span>명당 지도</span>
        </a>
      </div>
    </div>
  );
}
