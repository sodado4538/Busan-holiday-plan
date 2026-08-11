import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <span className="text-5xl mb-3">🌊</span>
      <h2 className="text-xl font-black text-slate-800 mb-1">페이지를 찾을 수 없습니다</h2>
      <p className="text-xs text-slate-500 mb-4">요청하신 여행 일정 페이지가 존재하지 않습니다.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        일정표 홈으로 돌아가기
      </Link>
    </div>
  );
}
