# グループ一覧取得API

## 概要
ログインユーザーが参加しているグループ一覧を取得する。

---

## エンドポイント

```http
GET /api/groups
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

参加しているグループ一覧を取得できた場合に返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| groupList | Array | グループ一覧 |
| &nbsp;&nbsp;&nbsp;&nbsp;└ groupId | Integer | グループID |
| &nbsp;&nbsp;&nbsp;&nbsp;└ groupName | String | グループ名 |
| &nbsp;&nbsp;&nbsp;&nbsp;└ role | String | グループ内の権限 |
| &nbsp;&nbsp;&nbsp;&nbsp;└ workspaceId | Integer | ワークスペースID |

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
  ]
}
```

---

## エラー

### 401 Unauthorized

トークンが無効、または期限切れで認証に失敗した場合に返す。

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