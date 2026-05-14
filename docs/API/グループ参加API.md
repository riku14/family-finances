# グループ参加API

## 概要
招待トークンを利用して、グループ内に新しくメンバーを追加する。

---

## エンドポイント

```http
POST /api/groups/join
```

---

## リクエスト

### ヘッダー

| 項目 | 値 |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer <accessToken> |
| Invite-Token | Bearer <inviteToken> |

---

### リクエスト例

```json
{}
```

---

## レスポンス

### 成功時

#### 201 Created

グループにメンバーを追加できた場合に返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| workspaceId | Integer | ワークスペースID。以降の収支編集、画面切り替え等に利用する。 |
| groupName | String | グループ名 |
| groupMember | Array | グループに所属しているメンバー一覧 |

---

### レスポンス例

```json
{
  "workspaceId": 10,
  "groupName": "開発チーム",
  "groupMember": [
    {
      "userId": 1,
      "userName": "user1",
      "role": "ADMIN"
    },
    {
      "userId": 2,
      "userName": "user2",
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

ユーザーがログインまたは登録していない場合に返す。登録またはログイン画面に遷移する。

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

すでにそのグループに参加していた場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "ALREADY_JOINED_GROUP",
  "message": "既にこのグループに参加しています。"
}
```

---
