'use client';

import React from 'react';
import { DayScenario } from '@/types/itinerary';
import { Compass, CheckCircle2 } from 'lucide-react';

interface BeachScenarioSelectorProps {
  scenarios: DayScenario[];
  activeScenarioId: string;
  onSelectScenario: (id: string) => void;
}

export default function BeachScenarioSelector({
  scenarios,
  activeScenarioId,
  onSelectScenario,
}: BeachScenarioSelectorProps) {
  return (
    <div className="bg-white rounded-2xl p-3 mb-3 border border-slate-200 shadow-sm animate-fade-in">
      <div className="text-[11px] font-extrabold text-blue-700 mb-2 flex items-center gap-1.5 px-1">
        <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
        <span>3일차 해수욕장 맞춤 코스 선택 (당일 상황에 맞춰 변경 가능)</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {scenarios.map((sc) => {
          const isActive = sc.id === activeScenarioId;

          return (
            <button
              key={sc.id}
              onClick={() => onSelectScenario(sc.id)}
              className={`flex flex-col items-center justify-between p-2.5 rounded-xl border text-center transition-all ${
                isActive
                  ? 'bg-gradient-to-b from-blue-600 to-sky-600 text-white font-bold border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className="w-full">
                <span className="text-[10px] block opacity-90 truncate font-semibold mb-0.5">
                  {sc.badge}
                </span>
                <span className="text-xs font-black tracking-tight block leading-tight break-keep">
                  {sc.name}
                </span>
              </div>

              {isActive && (
                <div className="mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white mx-auto" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
