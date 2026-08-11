'use client';

import React, { useState } from 'react';
import { FoodOption } from '@/types/itinerary';
import confetti from 'canvas-confetti';
import { Utensils, Sparkles, MapPin, ExternalLink, RotateCw, CheckCircle2 } from 'lucide-react';

interface FoodPickerModalProps {
  foodOptions: FoodOption[];
}

export default function FoodPickerModal({ foodOptions }: FoodPickerModalProps) {
  const [selectedFood, setSelectedFood] = useState<FoodOption | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handlePickRandom = () => {
    if (isSpinning || foodOptions.length === 0) return;

    setIsSpinning(true);
    let count = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * foodOptions.length);
      setSelectedFood(foodOptions[randomIndex]);
      count++;

      if (count >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);

        // Confetti celebration burst
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    }, 100);
  };

  return (
    <div className="px-4 py-4 animate-fade-in space-y-4">
      {/* Title Card */}
      <div className="glass-card rounded-2xl p-4 border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm text-center">
        <div className="inline-flex items-center justify-center p-3 bg-amber-500 text-white rounded-full mb-2 shadow-md">
          <Utensils className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          🍽️ 오늘 뭐 먹지? 맛집 결정 픽커
        </h2>
        <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
          송도/광안리/당리동 맛집 후보 중 오늘 가족과 함께 먹을 맛집을 룰렛으로 결정해보세요!
        </p>

        <button
          onClick={handlePickRandom}
          disabled={isSpinning}
          className={`mt-4 w-full py-3 px-4 rounded-xl font-black text-sm text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
            isSpinning
              ? 'bg-amber-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/30'
          }`}
        >
          <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? '맛집 추천 뽑는 중...' : '🎲 룰렛 돌리기 / 맛집 랜덤 추천'}</span>
        </button>
      </div>

      {/* Selected Result Highlight Box */}
      {selectedFood && (
        <div className="bg-white rounded-2xl p-4 border-2 border-amber-400 shadow-md relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 bg-amber-400 text-slate-900 text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>오늘의 당첨 맛집!</span>
          </div>

          <div className="flex items-start gap-3 mt-1">
            <span className="text-4xl p-2 bg-amber-100 rounded-2xl shrink-0">
              {selectedFood.icon}
            </span>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {selectedFood.category}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">
                {selectedFood.title}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                {selectedFood.description}
              </p>

              <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center gap-1 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>추천 메뉴: {selectedFood.recommendedMenu}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {selectedFood.location}
                  </span>
                  <a
                    href={`https://map.naver.com/v5/search/${encodeURIComponent(selectedFood.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md border border-emerald-200"
                  >
                    <span>네이버 지도</span>
                    <ExternalLink className="w-3 h-3 text-emerald-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Candidate List */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-bold text-slate-500 px-1">
          📋 맛집 후보 전체 목록 ({foodOptions.length}개)
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {foodOptions.map((food) => {
            const isSelected = selectedFood?.id === food.id;
            return (
              <div
                key={food.id}
                onClick={() => setSelectedFood(food)}
                className={`cursor-pointer bg-white rounded-xl p-3 border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/30 bg-amber-50/30 shadow-sm'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-xl p-1.5 bg-slate-100 rounded-lg shrink-0">
                    {food.icon}
                  </span>
                  <div className="truncate">
                    <h5 className="text-xs font-bold text-slate-800 truncate">
                      {food.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 font-medium truncate">
                      {food.recommendedMenu}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md shrink-0 ml-2">
                  #{food.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
