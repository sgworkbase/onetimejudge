"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

// ---------------------------------------------------------
// 型定義 (状態管理用)
// ---------------------------------------------------------
type AuthStatus = 'loading' | 'success' | 'fail' | 'error';

// メインのコンテンツ部分
function JudgeContent() {
  const searchParams = useSearchParams();
  const guess = searchParams.get("guess"); // URLパラメータ取得

  // ---------------------------------------------------------
  // 1. State管理
  // ---------------------------------------------------------
  const [status, setStatus] = useState<AuthStatus>('loading'); // 処理状態
  const [actualTemp, setActualTemp] = useState<number | null>(null); // 実測値

  // ---------------------------------------------------------
  // 2. API連携 & 判定ロジック
  // ---------------------------------------------------------
  useEffect(() => {
    // guessがない場合は即終了
    if (!guess) return;

    const fetchWeather = async () => {
      try {
        // APIコール (東京駅周辺の天気)
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true"
        );
        
        if (!res.ok) throw new Error("API Error");

        const data = await res.json();
        const currentTemp = data.current_weather.temperature; // 実測値 (例: 15.8)
        
        // データ整形 (切り捨て)
        const roundedTemp = Math.floor(currentTemp); // 例: 15
        setActualTemp(currentTemp); // 画面表示用に保持

        // 判定 (少しだけウェイトを入れて"計算してる感"を出す演出)
        setTimeout(() => {
          if (Number(guess) === roundedTemp) {
            setStatus('success');
          } else {
            setStatus('fail');
          }
        }, 1000); // 1秒待つ

      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    fetchWeather();
  }, [guess]); // guessの値が変わるたびに実行

  // ---------------------------------------------------------
  // 3. 画面描画
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        
        {/* Loading状態 */}
        {status === 'loading' && (
          <div className="py-10">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xl font-bold text-gray-700 animate-pulse">Authenticating...</p>
            <p className="text-xs text-gray-400 mt-2">Connecting to Environmental Data Grid</p>
          </div>
        )}

        {/* Success状態 */}
        {status === 'success' && (
          <div className="py-6 animate-bounce-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">認証成功！</h2>
            <p className="text-gray-600 mb-6 font-medium">Welcome to the secret area.</p>
            
            <div className="bg-green-50 p-6 rounded-lg mb-6 border border-green-200">
              <p className="text-sm text-gray-500 mb-1">現在の東京の気温</p>
              <p className="text-4xl font-bold text-green-700">{actualTemp}℃</p>
            </div>

            <Link href="/" className="block w-full py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors shadow-md">
              ログアウト
            </Link>
          </div>
        )}

        {/* Fail状態 */}
        {status === 'fail' && (
          <div className="py-6">
            <div className="text-6xl mb-4">⛔</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">認証失敗</h2>
            <p className="text-gray-600 mb-6">パスワード（気温）が一致しません。</p>
            
            {/* デバッグ情報 */}
            <div className="bg-red-50 p-4 rounded-lg mb-6 text-left border border-red-200">
              <p className="text-xs text-red-500 font-bold mb-2">[DEBUG INFO]</p>
              <div className="flex justify-between text-sm text-gray-700 border-b border-red-200 pb-2 mb-2">
                <span>あなたの入力:</span>
                <span className="font-bold">{guess}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>API実測値:</span>
                <span className="font-bold">{actualTemp}℃</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">※正解は {actualTemp ? Math.floor(actualTemp) : '--'} でした</p>

              {/* 答え合わせ用リンク */}
              <div className="mt-4 pt-3 border-t border-red-200 text-center">
                <a 
                  href="https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center justify-center gap-1"
                >
                  📡 API生データを確認 (JSON)
                  <span className="text-gray-400">↗</span>
                </a>
              </div>
            </div>

            <Link href="/" className="block w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-md">
              再入力する
            </Link>
          </div>
        )}

        {/* Error状態 */}
        {status === 'error' && (
          <div className="py-6">
            <p className="text-5xl mb-4">⚠️</p>
            <p className="text-red-600 font-bold text-lg mb-2">System Error</p>
            <p className="text-sm text-gray-500 mb-6">外部データへの接続に失敗しました。</p>
            <Link href="/" className="text-blue-600 hover:underline">Topへ戻る</Link>
          </div>
        )}

      </div>
    </div>
  );
}

// ページ本体
export default function JudgePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <JudgeContent />
    </Suspense>
  );
}