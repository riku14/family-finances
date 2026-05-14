# カテゴリ編集API

## 概要
既存のカテゴリを編集する。

---

## エンドポイント

```http
PUT /api/workspaces/{workspaceId}/categories/{categoryId}
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
| categoryId | Integer | ○ | 編集対象のカテゴリID |

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
  "name": "外食費",
  "type": "expense",
  "color": "#FFA500"
}
```

---

## レスポンス

### 成功時

#### 200 OK

カテゴリの更新に成功した場合に返却する。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| id | Integer | カテゴリID |
| workspaceId | Integer | 所属ワークスペースID |
| name | String | カテゴリ名 |
| type | String | 種別 |
| color | String | 表示色 |
| updatedAt | String | 更新日時 |

---

### レスポンス例

```json
{
  "id": 1,
  "workspaceId": 10,
  "name": "外食費",
  "type": "expense",
  "color": "#FFA500",
  "updatedAt": "2026-05-14T11:00:00"
}
```

---

## エラー

### 400 Bad Request

リクエストパラメータが不正な場合に返却する。

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
