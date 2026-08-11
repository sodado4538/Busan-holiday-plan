'use client';

import React from 'react';
import { DayItinerary } from '@/types/itinerary';

interface DayTabsProps {
  days: DayItinerary[];
  activeDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
}

export default function DayTabs({ days, activeDayNumber, onSelectDay }: DayTabsProps) {
  const currentDay = days.find((d) => d.dayNumber === activeDayNumber) || days[0];

  // Safely count schedule items whether day has schedule array or scenarios array
  const scheduleCount = currentDay.schedule?.length ?? (currentDay.scenarios?.[0]?.schedule?.length || 0);

  return (
    <div className="px-4 pt-4 pb-2 sticky top-0 z-20 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      {/* Tab Buttons Row */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-200/70 rounded-2xl">
        {days.map((day) => {
          const isActive = day.dayNumber === activeDayNumber;
          // Format date string "2026-08-14" -> "8/14"
          const [, month, dateNum] = day.date.split('-');
          const shortDate = `${parseInt(month)}/${parseInt(dateNum)}`;

          return (
            <button
              key={day.dayNumber}
              onClick={() => onSelectDay(day.dayNumber)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-b from-blue-600 to-sky-600 text-white font-bold shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/40 font-medium'
              }`}
            >
              <span className={`text-[11px] tracking-tight ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                {shortDate} ({day.dayOfWeek})
              </span>
              <span className="text-sm font-extrabold tracking-tight mt-0.5">
                Day {day.dayNumber}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Sub-header */}
      <div className="mt-3 flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-1.5 font-semibold text-slate-800 truncate">
          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 animate-ping" />
          <span className="text-blue-700 font-extrabold shrink-0">Day {currentDay.dayNumber}:</span>
          <span className="truncate text-slate-700">{currentDay.title}</span>
        </div>
        <span className="text-[11px] text-slate-500 shrink-0 font-medium ml-1">
          {scheduleCount}개 일정
        </span>
      </div>
    </div>
  );
}
