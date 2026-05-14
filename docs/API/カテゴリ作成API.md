# カテゴリ作成API

## 概要
カテゴリを新規作成する。カテゴリはワークスペースごとに独立して管理される。

---

## エンドポイント

```http
POST /api/workspaces/{workspaceId}/categories
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
| name | String | ○ | カテゴリ名 |
| type | String | ○ | 種別（income：収入 / expense：支出） |
| color | String | 任意 | 表示色（HEXカラーコード） |

---

### リクエスト例

```json
{
  "name": "食費",
  "type": "expense",
  "color": "#FF5733"
}
```

---

## レスポンス

### 成功時

#### 201 Created

カテゴリの作成に成功した場合に返却する。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| id | Integer | カテゴリID |
| workspaceId | Integer | 所属ワークスペースID |
| name | String | カテゴリ名 |
| type | String | 種別 |
| color | String | 表示色 |
| createdAt | String | 作成日時 |

---

### レスポンス例

```json
{
  "id": 1,
  "workspaceId": 10,
  "name": "食費",
  "type": "expense",
  "color": "#FF5733",
  "createdAt": "2026-05-14T10:00:00"
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
  "message": "カテゴリ名は必須です。"
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

### 409 Conflict

同一ワークスペース内に同名のカテゴリが既に存在する場合に返却する。

---

### エラーレスポンス例

```json
{
  "errorCode": "CONFLICT",
  "message": "同名のカテゴリが既に登録されています。"
}
```
