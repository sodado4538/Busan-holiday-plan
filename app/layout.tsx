import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '🌊 2026 부산 가족 여름 휴가 일정표',
  description: '가족 부산 3박 4일 일정 가이드 (송도, 다대포, 광안리)',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#0284c7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </head>
      <body className="bg-slate-900 min-h-screen flex justify-center items-start sm:py-6 sm:px-4">
        <div className="w-full max-w-md bg-slate-50 min-h-screen sm:min-h-[92vh] sm:rounded-3xl shadow-2xl overflow-hidden relative flex flex-col border border-slate-200/50">
          {children}
        </div>
      </body>
    </html>
  );
}
