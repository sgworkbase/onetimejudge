"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Home() {
  // 1. State管理
  const [passcode, setPasscode] = useState("");

  // 2. ルーティング機能
  const router = useRouter();

  // 3. 認証ボタン押下時の処理
  const handleAuth = () => {
    router.push(`/judge?guess=${passcode}`);
  };

  // 4. 画面描画
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            OneTimeJudge
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Environmental Auth PoC
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label 
              htmlFor="passcode" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Passcode (Temperature)
            </label>
            <input
              id="passcode"
              type="number"
              placeholder="現在の気温を入力 (例: 25)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <button
            onClick={handleAuth}
            disabled={!passcode}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
          >
            認証する
          </button>
        </div>

      </div>
    </main>
  );
}