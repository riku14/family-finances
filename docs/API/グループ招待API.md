# グループ招待API

## 概要
指定したグループへの招待リンクを発行する。

---

## エンドポイント

```http
POST /api/groups/{groupId}/invitations
```

---

## リクエスト

### ヘッダー

| 項目 | 値 |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer <accessToken> |

---

### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| groupId | Integer | ○ | 招待リンクを発行する対象のグループID |

---

### リクエスト例

```json
{}
```

---

## レスポンス

### 成功時

#### 201 Created

招待リンクを発行できた場合に返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| inviteToken | String | 招待用トークン。groupIdと紐づける。 |
| expiresAt | String | 招待リンクの有効期限。発行から72時間後を設定する。 |

---

### レスポンス例

```json
{
  "inviteToken": "invite_token_sample",
  "expiresAt": "2026-05-17T10:00:00"
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

認証に失敗した場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "UNAUTHORIZED",
  "message": "認証に失敗しました。"
}
```

---
### 403 Forbidden

グループの管理者権限がない場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "FORBIDDEN",
  "message": "この操作を行う権限がありません。"
}
```

---
