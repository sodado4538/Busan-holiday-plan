'use client';

import React, { useState } from 'react';
import { ScheduleItem, ScheduleOption } from '@/types/itinerary';
import {
  Clock,
  MapPin,
  Utensils,
  Home,
  Train,
  Car,
  Compass,
  Coffee,
  Waves,
  ExternalLink,
  BedDouble,
  Footprints,
  MessageSquareHeart,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

interface ScheduleCardProps {
  item: ScheduleItem;
  isLast: boolean;
  onOptionChange?: (itemTime: string, selectedOption: ScheduleOption) => void;
}

export default function ScheduleCard({ item, isLast, onOptionChange }: ScheduleCardProps) {
  // Option selection state
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    item.selectedOptionId || (item.options && item.options[0]?.id) || ''
  );

  const activeOption = item.options?.find((opt) => opt.id === selectedOptionId);

  // Active details (either from activeOption or base item)
  const displayTitle = activeOption ? activeOption.title : item.title;
  const displayNote = activeOption?.note || item.note;
  const displayLocation = activeOption?.location || item.location;
  const displayMenu = activeOption?.menu || item.menu;
  const displayTags = activeOption?.tag ? [...item.tags, activeOption.tag] : item.tags;

  const handleSelectOption = (opt: ScheduleOption) => {
    setSelectedOptionId(opt.id);
    if (onOptionChange) {
      onOptionChange(item.time, opt);
    }
  };

  const getTagBadgeStyle = (tag: string) => {
    switch (tag) {
      case '가족다함께':
        return 'bg-blue-100 text-blue-800 border-blue-200/80';
      case '세식구만':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200/80';
      case '외식':
        return 'bg-amber-100 text-amber-800 border-amber-200/80 font-bold';
      case '집밥':
        return 'bg-orange-100 text-orange-800 border-orange-200/80 font-bold';
      case '이동':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case '관광':
      case '산책':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case '물놀이':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case '카페':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case '휴식':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case '본가':
        return 'bg-violet-100 text-violet-800 border-violet-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const renderItemIcon = () => {
    const text = `${displayTitle} ${displayTags.join(' ')}`;
    if (text.includes('SRT') || text.includes('부산역')) {
      return <Train className="w-4 h-4 text-blue-600" />;
    }
    if (text.includes('이동') || text.includes('차')) {
      return <Car className="w-4 h-4 text-slate-600" />;
    }
    if (text.includes('집밥') || text.includes('본가')) {
      return <Home className="w-4 h-4 text-orange-600" />;
    }
    if (text.includes('외식') || text.includes('식사') || text.includes('갈비') || text.includes('파스타') || text.includes('버거')) {
      return <Utensils className="w-4 h-4 text-amber-600" />;
    }
    if (text.includes('카페') || text.includes('디저트')) {
      return <Coffee className="w-4 h-4 text-rose-600" />;
    }
    if (text.includes('산책')) {
      return <Footprints className="w-4 h-4 text-sky-600" />;
    }
    if (text.includes('바다') || text.includes('모래놀이') || text.includes('분수') || text.includes('물놀이')) {
      return <Waves className="w-4 h-4 text-cyan-600" />;
    }
    if (text.includes('휴식') || text.includes('낮잠')) {
      return <BedDouble className="w-4 h-4 text-indigo-600" />;
    }
    return <Compass className="w-4 h-4 text-blue-500" />;
  };

  const isSpecialHighlight = displayTags.includes('외식') || displayTags.includes('관광') || displayNote?.includes('선결제') || item.options;

  return (
    <div className="relative flex gap-2.5 sm:gap-3 group">
      {/* Timeline Left Column */}
      <div className="flex flex-col items-center shrink-0 w-12 sm:w-14 pt-0.5">
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 tracking-tight bg-slate-200/80 px-1.5 py-0.5 rounded-full mb-1 text-center">
          {item.time.split(' ')[0]}
        </span>
        <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-400 shadow-sm flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
          {renderItemIcon()}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-300 via-slate-200 to-slate-200 my-1" />
        )}
      </div>

      {/* Timeline Right Column */}
      <div className="flex-1 pb-6 min-w-0">
        <div
          className={`rounded-2xl p-3.5 sm:p-4 transition-all duration-200 shadow-sm ${
            isSpecialHighlight
              ? 'glass-card border-blue-200/80 hover:shadow-md ring-1 ring-blue-500/10'
              : 'bg-white border border-slate-200/80 hover:border-slate-300'
          }`}
        >
          {/* Header Tag Badges & Time Range */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
            <div className="flex flex-wrap items-center gap-1">
              {Array.from(new Set(displayTags)).map((tag) => (
                <span
                  key={tag}
                  className={`text-[11px] px-2 py-0.5 rounded-md border font-medium ${getTagBadgeStyle(tag)}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
            {item.time.includes('-') && (
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5 shrink-0">
                <Clock className="w-3 h-3" />
                {item.time}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-slate-900 leading-snug tracking-tight mb-2 break-keep">
            {displayTitle}
          </h3>

          {/* Interactive Option Picker Switcher (if item has options) */}
          {item.options && item.options.length > 0 && (
            <div className="my-2.5 p-2.5 bg-slate-100/90 rounded-xl border border-slate-200/80 space-y-2">
              <div className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                <span>상황 맞춤 옵션 선택 (클릭하여 변경 가능)</span>
              </div>

              <div className="space-y-1.5">
                {item.options.map((opt) => {
                  const isOptSelected = opt.id === selectedOptionId;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-start justify-between gap-2 ${
                        isOptSelected
                          ? 'bg-blue-600 text-white shadow-md font-bold ring-1 ring-blue-400'
                          : 'bg-white text-slate-800 hover:bg-slate-200/70 border border-slate-200/80'
                      }`}
                    >
                      <div className="flex-1 whitespace-normal break-keep min-w-0">
                        <div className="font-extrabold leading-snug">{opt.title}</div>
                        {opt.note && (
                          <div
                            className={`text-[11px] mt-0.5 leading-relaxed break-keep font-medium ${
                              isOptSelected ? 'text-blue-100' : 'text-slate-500'
                            }`}
                          >
                            {opt.note}
                          </div>
                        )}
                      </div>
                      {isOptSelected && (
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Menu Info */}
          {displayMenu && (
            <div className="text-xs text-amber-900 font-semibold bg-amber-50/80 border border-amber-200/60 px-2.5 py-1.5 rounded-lg mb-2 flex items-start gap-1.5 break-keep">
              <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>메뉴: {displayMenu}</span>
            </div>
          )}

          {/* Note section */}
          {displayNote && (
            <div className="text-xs text-slate-600 bg-slate-50/90 rounded-xl p-2.5 mb-2 border border-slate-100 leading-relaxed break-keep flex items-start gap-1.5">
              <MessageSquareHeart className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>{displayNote}</span>
            </div>
          )}

          {/* Location button with Naver Map Link */}
          {displayLocation && (
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-600 font-medium flex items-center gap-1 min-w-0 break-keep">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="break-keep">{displayLocation}</span>
              </span>
              <a
                href={`https://map.naver.com/v5/search/${encodeURIComponent(displayLocation)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:scale-95 transition rounded-lg border border-emerald-200 shrink-0"
              >
                <span>네이버 지도</span>
                <ExternalLink className="w-3 h-3 text-emerald-600" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
