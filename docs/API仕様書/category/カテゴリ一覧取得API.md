# カテゴリ一覧取得API

## 概要
指定したワークスペースに属するカテゴリの一覧を取得する。論理削除されたカテゴリは含まれない。

---

## エンドポイント

```http
GET /api/workspaces/{workspaceId}/categories
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
| type | String | 任意 | 種別での絞り込み（income / expense） |

---

### リクエスト例

```http
GET /api/workspaces/10/categories?type=expense
```

---

## レスポンス

### 成功時

#### 200 OK

カテゴリ一覧の取得に成功した場合に返却する。該当データが0件の場合は空配列を返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| categories | Array | カテゴリの配列 |
| - id | Integer | カテゴリID |
| - name | String | カテゴリ名 |
| - type | String | 種別 |
| - color | String | 表示色 |
| - createdAt | String | 作成日時 |

---

### レスポンス例

```json
{
  "categories": [
    {
      "id": 1,
      "name": "食費",
      "type": "expense",
      "color": "#FF5733",
      "createdAt": "2026-05-14T10:00:00"
    },
    {
      "id": 2,
      "name": "交通費",
      "type": "expense",
      "color": "#3498DB",
      "createdAt": "2026-05-14T10:05:00"
    }
  ]
}
```

---

## エラー

### 401 Unauthorized

認証エラー時に返却する。

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
