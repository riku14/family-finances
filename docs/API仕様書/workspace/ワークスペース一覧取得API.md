# ワークスペース一覧取得API

## 概要
ログインユーザーが参加しているワークスペース一覧を取得する。個人ワークスペースおよびグループワークスペースの両方が含まれる。

---

## エンドポイント

```http
GET /api/workspaces
```

---

## リクエスト

### ヘッダー

| 項目 | 値 |
|---|---|
| Authorization | Bearer <accessToken> |

---

### クエリパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| type | String | 任意 | 種別での絞り込み（PERSONAL / GROUP） |

---

### リクエスト例

```http
GET /api/workspaces?type=GROUP
```

---

## レスポンス

### 成功時

#### 200 OK

ワークスペース一覧を取得できた場合に返す。該当データが0件の場合は空配列を返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| workspaces | Array | ワークスペース一覧 |
| - workspaceId | Integer | ワークスペースID |
| - workspaceName | String | ワークスペース名 |
| - type | String | 種別（PERSONAL / GROUP） |
| - role | String | ワークスペース内権限（ADMIN / MEMBER） |

---

### レスポンス例

```json
{
  "workspaces": [
    {
      "workspaceId": 1,
      "workspaceName": "個人ワークスペース",
      "type": "PERSONAL",
      "role": "ADMIN"
    },
    {
      "workspaceId": 10,
      "workspaceName": "開発チーム",
      "type": "GROUP",
      "role": "ADMIN"
    },
    {
      "workspaceId": 11,
      "workspaceName": "営業チーム",
      "type": "GROUP",
      "role": "MEMBER"
    }
  ]
}
```

---

## エラー

### エラーレスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| errorCode | String | エラーコード |
| message | String | エラーメッセージ |

---
### 401 Unauthorized

トークンが無効、または期限切れで認証に失敗した場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "UNAUTHORIZED",
  "message": "認証に失敗しました。"
}
```

---
