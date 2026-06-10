# ワークスペース参加API

## 概要
招待トークンを利用して、グループワークスペースに参加する。
ワークスペースからの脱退機能はV2以降で実装予定。

---

## エンドポイント

```http
POST /api/workspaces/invitations/accept
```

---

## リクエスト

### ヘッダー

| 項目 | 値 |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer <accessToken> |

---

### リクエストパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| inviteToken | String | ○ | ワークスペース招待時に発行されたトークン |

---

### リクエスト例

```json
{
  "inviteToken": "invite_token_sample"
}
```

---

## レスポンス

### 成功時

#### 201 Created

ワークスペースにメンバーを追加できた場合に返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| workspaceId | Integer | ワークスペースID。以降の収支編集、画面切り替え等に利用する。 |
| workspaceName | String | ワークスペース名 |
| type | String | ワークスペース種別（GROUP） |
| members | Array | ワークスペースに所属しているメンバー一覧 |
| - userId | Integer | メンバーのユーザーID |
| - userName | String | メンバーの表示名（ニックネーム） |
| - role | String | ワークスペース内での権限（ADMIN / MEMBER） |

---

### レスポンス例

```json
{
  "workspaceId": 10,
  "workspaceName": "開発チーム",
  "type": "GROUP",
  "members": [
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
### 400 Bad Request

inviteTokenが入力されていない場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "BAD_REQUEST",
  "message": "招待トークンを入力してください。"
}
```

---
### 401 Unauthorized

ユーザーがログインしていない場合に返す。

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

招待トークンが存在しない、または期限切れの場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "NOT_FOUND",
  "message": "招待トークンが無効または期限切れです。"
}
```

---
### 409 Conflict

すでにそのワークスペースに参加していた場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "ALREADY_JOINED",
  "message": "既にこのワークスペースに参加しています。"
}
```

---
