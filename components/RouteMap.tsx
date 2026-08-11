'use client';

import React, { useEffect, useRef } from 'react';
import { ScheduleItem } from '@/types/itinerary';
import { MapPin, Navigation } from 'lucide-react';

interface RouteMapProps {
  schedule: ScheduleItem[];
  dayNumber: number;
}

export default function RouteMap({ schedule, dayNumber }: RouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Filter schedule items that have valid lat/lng coordinates
  const locItems = schedule.filter((item) => item.lat && item.lng);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = mapContainerRef.current;
    if (!container) return;

    // Dynamically import Leaflet to prevent SSR window reference error
    import('leaflet').then((L) => {
      if (!mapContainerRef.current) return;
      const targetContainer = mapContainerRef.current;

      // Fix default Leaflet icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Cleanup existing map instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Default center: Busan (35.1026, 128.9715)
      const defaultCenter: [number, number] = locItems.length > 0
        ? [locItems[0].lat!, locItems[0].lng!]
        : [35.1026, 128.9715];

      const map = L.map(targetContainer, {
        center: defaultCenter,
        zoom: 12,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      // Add OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Add Zoom Control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      if (locItems.length === 0) return;

      const latLngs: [number, number][] = [];

      locItems.forEach((item, idx) => {
        const lat = item.lat!;
        const lng = item.lng!;
        latLngs.push([lat, lng]);

        // Create Custom HTML Marker with Number Badge
        const customMarkerIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="
              width: 32px;
              height: 32px;
              background: linear-gradient(135deg, #0284c7, #0369a1);
              color: white;
              font-weight: 800;
              font-size: 13px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid white;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            ">
              ${idx + 1}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(item.location || item.title)}`;

        const popupContent = `
          <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
            <div style="font-size: 11px; font-weight: 700; color: #0284c7; margin-bottom: 2px;">
              STOP ${idx + 1} • ${item.time}
            </div>
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
              ${item.title}
            </div>
            ${item.note ? `<div style="font-size: 11px; color: #475569; margin-bottom: 6px;">${item.note}</div>` : ''}
            <a href="${naverUrl}" target="_blank" rel="noopener noreferrer" style="
              display: inline-flex;
              align-items: center;
              gap: 4px;
              font-size: 11px;
              font-weight: 700;
              color: #059669;
              text-decoration: none;
              background: #ecfdf5;
              padding: 4px 8px;
              border-radius: 6px;
              border: 1px solid #a7f3d0;
            ">
              📍 네이버 길찾기 ↗
            </a>
          </div>
        `;

        L.marker([lat, lng], { icon: customMarkerIcon })
          .addTo(map)
          .bindPopup(popupContent);
      });

      // Draw Polyline Connecting Points
      if (latLngs.length > 1) {
        L.polyline(latLngs, {
          color: '#0284c7',
          weight: 4,
          opacity: 0.8,
          dashArray: '8, 8',
        }).addTo(map);

        // Fit Bounds to show all markers smoothly
        const bounds = L.latLngBounds(latLngs);
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [schedule, dayNumber]);

  return (
    <div className="px-4 py-3 animate-fade-in">
      {/* Route Summary Header */}
      <div className="bg-white rounded-2xl p-3.5 mb-3 border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-800">
              Day {dayNumber} 이동 동선 지도
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              주요 거점 {locItems.length}곳 순서별 연결 경로
            </p>
          </div>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 bg-sky-50 text-sky-700 rounded-lg border border-sky-200">
          📍 {locItems.length}개 핀 표시
        </span>
      </div>

      {/* Leaflet Map Canvas Container */}
      <div className="w-full h-80 rounded-2xl overflow-hidden shadow-inner border border-slate-300 relative z-10">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Stop Points Sequence List */}
      <div className="mt-3 bg-slate-100/80 rounded-2xl p-3 border border-slate-200">
        <div className="text-[11px] font-bold text-slate-500 mb-2 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>오늘의 방문 순서:</span>
        </div>
        <div className="space-y-1.5">
          {locItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-slate-200/70"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-800 truncate">{item.title}</span>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0 ml-2 font-medium">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
