'use client';

import React, { useMemo, useState } from 'react';
import { TripInfo } from '@/types/itinerary';
import { Calendar, Home, Target, Share2, Check, Sparkles, MapPin } from 'lucide-react';

interface HeaderProps {
  trip: TripInfo;
}

export default function Header({ trip }: HeaderProps) {
  const [copied, setCopied] = useState(false);

  // Calculate D-Day dynamically based on start date (2026-08-14)
  const dDayBadge = useMemo(() => {
    const today = new Date();
    // Normalize to YYYY-MM-DD
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const start = new Date('2026-08-14');
    const end = new Date('2026-08-17');
    const now = new Date(todayStr);

    const diffTime = start.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return { label: `D-${diffDays}`, bg: 'bg-amber-400 text-slate-900 font-extrabold' };
    } else if (now >= start && now <= end) {
      const currentDayNum = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return { label: `🔥 여행 중 (Day ${currentDayNum})`, bg: 'bg-emerald-400 text-slate-900 font-extrabold animate-pulse' };
    } else {
      return { label: '✈️ 여행 완료', bg: 'bg-blue-300 text-slate-900 font-bold' };
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: trip.title,
          text: `🌊 ${trip.title} 일정표 (${trip.duration})\n베이스캠프: ${trip.basecamp}`,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to copy link
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const basecampMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent('부산 사하구 당리동')}`;

  return (
    <header className="glass-header text-white p-5 pb-6 rounded-b-3xl shadow-lg relative overflow-hidden">
      {/* Decorative Ocean Waves Background Accent */}
      <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -top-12 w-36 h-36 bg-blue-300/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-3 py-1 text-xs rounded-full shadow-sm ${dDayBadge.bg}`}>
            {dDayBadge.label}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.2 text-xs font-medium bg-white/15 hover:bg-white/25 active:scale-95 transition rounded-full backdrop-blur-md border border-white/20 text-white"
            title="카카오톡/링크 공유"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? '복사 완료!' : '공유하기'}</span>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black tracking-tight mb-4 flex items-center gap-2">
          <span>🌊</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-50 to-sky-100">
            {trip.title}
          </span>
        </h1>

        {/* Information Summary Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-2.5 text-xs text-blue-50 shadow-inner">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-sky-200 mt-0.5 shrink-0" />
            <div>
              <span className="text-blue-200 font-medium">일정: </span>
              <span className="font-semibold text-white">2026.08.14 (금) ~ 08.17 (월)</span>
              <span className="ml-1.5 px-2 py-0.5 bg-sky-500/40 rounded-md text-[11px] text-white font-medium">
                {trip.duration}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Home className="w-4 h-4 text-sky-200 mt-0.5 shrink-0" />
            <div className="flex-1">
              <span className="text-blue-200 font-medium">베이스캠프: </span>
              <span className="font-semibold text-white">{trip.basecamp}</span>
              <a
                href={basecampMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 ml-2 text-[11px] text-sky-200 hover:text-white underline"
              >
                <MapPin className="w-3 h-3 inline" />
                지도보기
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-1 border-t border-white/10">
            <Target className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
            <div>
              <span className="text-amber-200 font-medium">여행 목표: </span>
              <span className="text-white font-medium leading-relaxed">{trip.goal}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
