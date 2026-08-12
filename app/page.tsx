'use client';

import React, { useState } from 'react';
import itineraryData from '@/data/itinerary.json';
import { ItineraryData, ScheduleOption, DayScenario } from '@/types/itinerary';
import Header from '@/components/Header';
import DayTabs from '@/components/DayTabs';
import Timeline from '@/components/Timeline';
import RouteMap from '@/components/RouteMap';
import DadaepoTimer from '@/components/DadaepoTimer';
import BeachScenarioSelector from '@/components/BeachScenarioSelector';
import BeachTipCard from '@/components/BeachTipCard';
import { MapPin, ArrowUp, Calendar, Map } from 'lucide-react';

export default function Page() {
  const [data, setData] = useState<ItineraryData>(itineraryData as ItineraryData);
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [activeViewMode, setActiveViewMode] = useState<'timeline' | 'map'>('timeline');

  // Day 3 Beach Scenario selection state (songjeong | gijang | songdo)
  const [activeScenarioId, setActiveScenarioId] = useState<string>('songjeong');

  const currentDay = data.days.find((d) => d.dayNumber === activeDayNumber) || data.days[0];

  // Active scenario for Day 3
  const currentScenario: DayScenario | undefined = currentDay.scenarios?.find(
    (sc) => sc.id === activeScenarioId
  ) || currentDay.scenarios?.[0];

  // Schedule to render (for Day 3, use currentScenario.schedule; otherwise currentDay.schedule)
  const activeSchedule = (activeDayNumber === 3 && currentScenario)
    ? currentScenario.schedule
    : (currentDay.schedule || []);

  // Option change handler for A/B choices inside schedule items
  const handleOptionChange = (itemTime: string, selectedOption: ScheduleOption) => {
    const updatedDays = data.days.map((day) => {
      if (day.dayNumber !== activeDayNumber) return day;

      if (day.dayNumber === 3 && day.scenarios) {
        const updatedScenarios = day.scenarios.map((sc) => {
          if (sc.id !== activeScenarioId) return sc;

          const updatedSchedule = sc.schedule.map((item) => {
            if (item.time !== itemTime) return item;
            return {
              ...item,
              title: selectedOption.title,
              note: selectedOption.note || item.note,
              location: selectedOption.location || item.location,
              lat: selectedOption.lat || item.lat,
              lng: selectedOption.lng || item.lng,
              menu: selectedOption.menu || item.menu,
              selectedOptionId: selectedOption.id,
            };
          });

          return { ...sc, schedule: updatedSchedule };
        });

        return { ...day, scenarios: updatedScenarios };
      } else {
        const currentSched = day.schedule || [];
        const updatedSchedule = currentSched.map((item) => {
          if (item.time !== itemTime) return item;
          return {
            ...item,
            title: selectedOption.title,
            note: selectedOption.note || item.note,
            location: selectedOption.location || item.location,
            lat: selectedOption.lat || item.lat,
            lng: selectedOption.lng || item.lng,
            menu: selectedOption.menu || item.menu,
            selectedOptionId: selectedOption.id,
          };
        });

        return { ...day, schedule: updatedSchedule };
      }
    });

    setData({ ...data, days: updatedDays });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const basecampMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent('부산 사하구 당리동')}`;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col pb-24 relative">
      {/* Top Header */}
      <Header trip={data.trip} />

      {/* Sticky Day Selection Tabs */}
      <DayTabs
        days={data.days}
        activeDayNumber={activeDayNumber}
        onSelectDay={(dayNum) => {
          setActiveDayNumber(dayNum);
        }}
      />

      {/* View Mode Switcher Sub-Header (Timeline vs Map) */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between border-b border-slate-200/50 bg-white">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full">
          <button
            onClick={() => setActiveViewMode('timeline')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
              activeViewMode === 'timeline'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>📱 타임라인</span>
          </button>

          <button
            onClick={() => setActiveViewMode('map')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
              activeViewMode === 'map'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>🗺️ 동선 지도</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {activeViewMode === 'timeline' && (
          <div>
            {/* Dadaepo Timer Widget & Parking Tip Card for Day 2 */}
            {activeDayNumber === 2 && (
              <div className="px-4 pt-3 pb-0">
                <DadaepoTimer />
                {currentDay.parkingTip && (
                  <BeachTipCard
                    parkingTip={currentDay.parkingTip}
                    cafes={['차선책 (뷰 1위)', '랑데자뷰 (고층 뷰)', '프랭크커핀바', '오설록']}
                    beachName="광안리해수욕장"
                  />
                )}
              </div>
            )}

            {/* Day 3 Beach Scenario Switcher & Parking Tip Card */}
            {activeDayNumber === 3 && currentDay.scenarios && (
              <div className="px-4 pt-3 pb-0">
                <BeachScenarioSelector
                  scenarios={currentDay.scenarios}
                  activeScenarioId={activeScenarioId}
                  onSelectScenario={setActiveScenarioId}
                />
                {currentScenario && (
                  <BeachTipCard
                    parkingTip={currentScenario.parkingTip}
                    cafes={currentScenario.cafes}
                    beachName={currentScenario.beachName}
                  />
                )}
              </div>
            )}

            <Timeline
              schedule={activeSchedule}
              dayNumber={activeDayNumber}
              onOptionChange={handleOptionChange}
            />
          </div>
        )}

        {activeViewMode === 'map' && (
          <div>
            {/* Allow Day 3 scenario switching on map view as well */}
            {activeDayNumber === 3 && currentDay.scenarios && (
              <div className="px-4 pt-3 pb-0">
                <BeachScenarioSelector
                  scenarios={currentDay.scenarios}
                  activeScenarioId={activeScenarioId}
                  onSelectScenario={setActiveScenarioId}
                />
              </div>
            )}
            <RouteMap
              schedule={activeSchedule}
              dayNumber={activeDayNumber}
            />
          </div>
        )}
      </div>

      {/* Bottom Sticky Mobile Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none p-3">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-lg text-white rounded-2xl p-2.5 shadow-2xl border border-slate-700/60 flex items-center justify-between gap-2 pointer-events-auto">
          {/* Day prev/next quick switcher */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            {data.days.map((d) => (
              <button
                key={d.dayNumber}
                onClick={() => {
                  setActiveDayNumber(d.dayNumber);
                  scrollToTop();
                }}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition ${
                  activeDayNumber === d.dayNumber
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                D{d.dayNumber}
              </button>
            ))}
          </div>

          {/* Basecamp Naver Map shortcut */}
          <a
            href={basecampMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition active:scale-95 shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>본가 지도</span>
          </a>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white rounded-xl transition border border-slate-700"
            title="맨 위로"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
