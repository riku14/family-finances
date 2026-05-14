# 収支登録API

## 概要
収支データ（収入または支出）を登録する。

---

## エンドポイント

```http
POST /api/workspaces/{workspaceId}/transactions
```

---

## リクエスト

### ヘッダー

| 項目 | 値 |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer {token} |

---

### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| workspaceId | Integer | ○ | 対象ワークスペースのID |

---

### リクエストパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| categoryId | Integer | ○ | カテゴリID |
| type | String | ○ | 種別（income：収入 / expense：支出） |
| amount | Integer | ○ | 金額（円、正の整数） |
| date | String | ○ | 取引日（YYYY-MM-DD形式） |
| memo | String | 任意 | メモ（最大200文字） |

---

### リクエスト例

```json
{
  "categoryId": 1,
  "type": "expense",
  "amount": 1500,
  "date": "2026-05-14",
  "memo": "ランチ代"
}
```

---

## レスポンス

### 成功時

#### 201 Created

収支データの登録に成功した場合に返却する。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| id | Integer | 収支ID |
| workspaceId | Integer | 所属ワークスペースID |
| categoryId | Integer | カテゴリID |
| type | String | 種別 |
| amount | Integer | 金額 |
| date | String | 取引日 |
| memo | String | メモ |
| createdAt | String | 作成日時 |

---

### レスポンス例

```json
{
  "id": 100,
  "workspaceId": 10,
  "categoryId": 1,
  "type": "expense",
  "amount": 1500,
  "date": "2026-05-14",
  "memo": "ランチ代",
  "createdAt": "2026-05-14T12:30:00"
}
```

---

## エラー

### 400 Bad Request

リクエストパラメータが不正な場合に返却する。

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
  "message": "金額は1以上の整数で指定してください。"
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

指定したカテゴリが存在しない場合に返却する。

---

### エラーレスポンス例

```json
{
  "errorCode": "NOT_FOUND",
  "message": "指定されたカテゴリが見つかりません。"
}
```
