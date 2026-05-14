# ワークスペース一覧取得API

## 概要
ログインユーザーが保持しているワークスペース一覧を取得する。

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
| Content-Type | application/json |
| Authorization | Bearer <accessToken> |

---

## レスポンス

### 成功時

#### 200 OK

ワークスペース一覧を取得できた場合に返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| groupList | Array | 参加しているグループ一覧 |
| groupId | Integer | グループID |
| groupName | String | グループ名 |
| role | String | グループでの権限 |
| workspaceId | Integer | ワークスペースID |
| personalWorkspaceId | Integer | 個人用ワークスペースID |

---

### レスポンス例

```json
{
  "groupList": [
    {
      "groupId": 1,
      "groupName": "開発チーム",
      "role": "ADMIN",
      "workspaceId": 10
    },
    {
      "groupId": 2,
      "groupName": "営業チーム",
      "role": "MEMBER",
      "workspaceId": 11
    }
  ],
  "personalWorkspaceId": 1
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
