'use client';

import React, { useState } from 'react';
import { ScheduleItem, ScheduleOption } from '@/types/itinerary';
import ScheduleCard from './ScheduleCard';
import { Filter, Layers } from 'lucide-react';

interface TimelineProps {
  schedule: ScheduleItem[];
  dayNumber: number;
  onOptionChange?: (itemTime: string, selectedOption: ScheduleOption) => void;
}

export default function Timeline({ schedule, dayNumber, onOptionChange }: TimelineProps) {
  const [activeFilter, setActiveFilter] = useState<string>('전체');

  const availableTags = Array.from(
    new Set(schedule.flatMap((item) => item.tags))
  );

  const filteredSchedule = schedule.filter((item) => {
    if (activeFilter === '전체') return true;
    return item.tags.includes(activeFilter);
  });

  return (
    <div key={dayNumber} className="px-4 py-4 animate-fade-in">
      {/* Tag Quick Filters */}
      <div className="mb-4 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium shrink-0 pr-1 border-r border-slate-200">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span>필터:</span>
        </div>

        <button
          onClick={() => setActiveFilter('전체')}
          className={`text-xs px-2.5 py-1 rounded-full border transition shrink-0 font-medium ${
            activeFilter === '전체'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          전체 ({schedule.length})
        </button>

        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`text-xs px-2.5 py-1 rounded-full border transition shrink-0 font-medium ${
              activeFilter === tag
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Timeline Schedule List */}
      {filteredSchedule.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
          <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>선택한 태그(#{activeFilter})에 해당하는 일정이 없습니다.</p>
        </div>
      ) : (
        <div className="mt-2">
          {filteredSchedule.map((item, index) => (
            <ScheduleCard
              key={`${dayNumber}-${index}-${item.time}`}
              item={item}
              isLast={index === filteredSchedule.length - 1}
              onOptionChange={onOptionChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
