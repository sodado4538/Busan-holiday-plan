'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className="bg-slate-900 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
          <span className="text-4xl mb-3 block">🌊</span>
          <h2 className="text-base font-black text-slate-800 mb-1">앱 오류가 발생했습니다</h2>
          <p className="text-xs text-slate-500 mb-4">{error?.message || '앱 초기화 중 오류가 발생했습니다.'}</p>
          <button
            onClick={() => reset()}
            className="w-full py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            다시 불러오기
          </button>
        </div>
      </body>
    </html>
  );
}
