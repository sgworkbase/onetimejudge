# OneTimeJudge 🌡️

## プロジェクト概要
**"Environmental Auth PoC"**
現在の「気温」を一時的なパスコードとして利用する、環境依存型の認証システムの実証実験（PoC）アプリケーションです。

ユーザーが入力した気温と、外部気象APIから取得した実測値を照合し、誤差の範囲内であれば認証成功とみなします。

## 🚀 デモ (Demo)
動作デモはこちら:

## 🛠 技術スタック (Tech Stack)
モダンなフロントエンド技術を採用し、サーバーレス構成で構築しています。

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **API:** Open-Meteo API (天気情報取得)
- **Deployment:** Vercel

## ✨ 主な機能
1. **Top画面:** ユーザーによる気温（パスコード）入力
2. **判定画面:**
   - クライアントサイドでの動的なステータス管理
   - Loading / Success / Fail のUI切り替え
   - 外部APIとの非同期通信 (Async/Await)
3. **セキュリティ:** 入力値チェックおよびルーティング制御

## 💻 開発環境のセットアップ (Getting Started)

リポジトリをクローンし、以下のコマンドでローカルサーバーを起動します。

```bash
# 依存ライブラリのインストール
npm install

# 開発サーバーの起動
npm run dev
