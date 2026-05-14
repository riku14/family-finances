# 履歴表示API

## 概要
指定した条件に合致する収支データを取得する。期間・カテゴリ・種別での絞り込みに対応する。

---

## エンドポイント

```http
GET /api/workspaces/{workspaceId}/transactions
```

---

## リクエスト

### ヘッダー

| 項目 | 値 |
|---|---|
| Authorization | Bearer {token} |

---

### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| workspaceId | Integer | ○ | 対象ワークスペースのID |

---

### クエリパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| from | String | 任意 | 開始日（YYYY-MM-DD形式） |
| to | String | 任意 | 終了日（YYYY-MM-DD形式） |
| categoryId | Integer | 任意 | カテゴリIDで絞り込み |
| type | String | 任意 | 種別での絞り込み（income / expense） |
| page | Integer | 任意 | ページ番号（デフォルト：1） |
| limit | Integer | 任意 | 1ページあたりの件数（デフォルト：50、最大100） |

---

### リクエスト例

```http
GET /api/workspaces/10/transactions?from=2026-05-01&to=2026-05-31&type=expense&page=1&limit=50
```

---

## レスポンス

### 成功時

#### 200 OK

取得に成功した場合に返却する。該当データが0件の場合はtransactionsを空配列で返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| transactions | Array | 収支データの配列 |
| - id | Integer | 収支ID |
| - categoryId | Integer | カテゴリID |
| - categoryName | String | カテゴリ名 |
| - type | String | 種別 |
| - amount | Integer | 金額 |
| - date | String | 取引日 |
| - memo | String | メモ |
| pagination | Object | ページ情報 |
| pagination.page | Integer | 現在のページ番号 |
| pagination.limit | Integer | 1ページあたりの件数 |
| pagination.totalCount | Integer | 総件数 |
| pagination.totalPages | Integer | 総ページ数 |

---

### レスポンス例

```json
{
  "transactions": [
    {
      "id": 100,
      "categoryId": 1,
      "categoryName": "食費",
      "type": "expense",
      "amount": 1500,
      "date": "2026-05-14",
      "memo": "ランチ代"
    },
    {
      "id": 101,
      "categoryId": 2,
      "categoryName": "交通費",
      "type": "expense",
      "amount": 500,
      "date": "2026-05-14",
      "memo": "電車代"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "totalCount": 2,
    "totalPages": 1
  }
}
```

---

## エラー

### 400 Bad Request

クエリパラメータの形式が不正な場合に返却する。

---

### エラーレスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| errorCode | String | エラーコード |
| message | String | エラーメッセージ |

---

### エラーレスポンス例

```json
{
  "errorCode": "INVALID_PARAMETER",
  "message": "日付の形式が不正です。"
}
```

---

### 401 Unauthorized

認証エラー時に返却する。

---

### エラーレスポンス例

```json
{
  "errorCode": "UNAUTHORIZED",
  "message": "認証に失敗しました。"
}
```

---

### 404 Not Found

指定したワークスペースが存在しない場合に返却する。

---

### エラーレスポンス例

```json
{
  "errorCode": "NOT_FOUND",
  "message": "指定されたワークスペースが見つかりません。"
}
```
