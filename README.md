# family-finances

学習用の家計簿アプリ（Spring Boot + React）

## 技術スタック

| 領域 | 技術 |
|------|------|
| バックエンド | Java 21 / Spring Boot 3.5 |
| フロントエンド | Vite / React / TypeScript |
| DB | PostgreSQL 16 |
| API設計 | OpenAPI 3.0 |

## セットアップ

```bash
mise install          # Java / Gradle / Node をインストール
npm install           # フロントツール（Prism 等）をインストール
docker compose up -d  # PostgreSQL 起動
```

## 開発

### バックエンド

```bash
cd backend
./gradlew bootRun     # サーバー起動 (localhost:8089)
./gradlew build       # ビルド（openapi.yaml からコード生成も自動実行）
```

### フロントエンド

```bash
npm run mock          # モックサーバー起動 (localhost:4010)
npm run gen:types     # openapi.yaml から TypeScript 型を生成
npm run docs          # Swagger UI を開く
```

## openapi.yaml を変更したとき

```bash
# バックエンド: インターフェース/DTO を再生成
cd backend && ./gradlew openApiGenerate

# フロントエンド: TypeScript 型を再生成
npm run gen:types
```
