# 収支編集API

## 概要
既存の収支データを編集する。

---

## エンドポイント

```http
PUT /api/workspaces/{workspaceId}/transactions/{transactionId}
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
| transactionId | Integer | ○ | 編集対象の収支ID |

---

### リクエストパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| categoryId | Integer | ○ | カテゴリID |
| type | String | ○ | 種別（income / expense） |
| amount | Integer | ○ | 金額（円、正の整数） |
| date | String | ○ | 取引日（YYYY-MM-DD形式） |
| memo | String | 任意 | メモ（最大200文字） |

---

### リクエスト例

```json
{
  "categoryId": 2,
  "type": "expense",
  "amount": 2000,
  "date": "2026-05-14",
  "memo": "夕食代に変更"
}
```

---

## レスポンス

### 成功時

#### 200 OK

収支データの更新に成功した場合に返却する。

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
| updatedAt | String | 更新日時 |

---

### レスポンス例

```json
{
  "id": 100,
  "workspaceId": 10,
  "categoryId": 2,
  "type": "expense",
  "amount": 2000,
  "date": "2026-05-14",
  "memo": "夕食代に変更",
  "updatedAt": "2026-05-14T13:00:00"
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

指定した収支データまたはカテゴリが存在しない場合に返却する。

---

### エラーレスポンス例

```json
{
  "errorCode": "NOT_FOUND",
  "message": "指定された収支データが見つかりません。"
}
```
