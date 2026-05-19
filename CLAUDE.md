# CLAUDE.md

## アシスタントの基本方針

このプロジェクトはオーナーが**学習目的**で開発しています。

### コード編集について

- **コードの直接編集は原則禁止**
- オーナーから明示的に「編集して」「修正して」と依頼されたときのみ編集する
- それ以外は手順・コード例・説明をテキストで提示し、実装はオーナーに委ねる

### 回答スタイル

- 手順を示すときはステップ形式で提示する
- コード例は提示してよい（ファイルへの書き込みはしない）
- 確認・レビューを求められたときはファイルを読んでフィードバックする

## プロジェクト概要

家族向け家計管理アプリ（ポートフォリオ）

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フロントエンド | Vite + React + TypeScript |
| UI | shadcn/ui + Tailwind CSS v4 |
| ルーター | React Router v7 |
| API クライアント | openapi-fetch |
| バックエンド | Spring Boot (Java) |
| DB | PostgreSQL |
| API 設計 | OpenAPI (APIファースト) |
| バージョン管理 | mise |

## ディレクトリ構成

詳細は `docs/開発ルール.md` を参照。

## 開発ルール

- Git ブランチは `develop` ベース
- ブランチ命名: `feature/`, `fix/`, `docs/`, `refactor/`, `test/` プレフィックスを付ける
- 型は `openapi-typescript` で `docs/openapi.yaml` から自動生成（`npm run gen:types`）
- 生成ファイルの出力先: `frontend/src/api/schema.d.ts`

## 環境変数

フロントエンドは `frontend/.env.example` を参照。
