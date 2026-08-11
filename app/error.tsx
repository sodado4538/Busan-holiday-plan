'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <span className="text-4xl mb-3">🌊</span>
      <h2 className="text-lg font-black text-slate-800 mb-1">일정표를 불러오는 중 오류가 발생했습니다</h2>
      <p className="text-xs text-slate-500 mb-4">{error?.message || '잠시 후 다시 시도해보세요.'}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        다시 시도하기
      </button>
    </div>
  );
}
