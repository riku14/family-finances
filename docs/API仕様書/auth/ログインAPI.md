# ログインAPI

## 概要
メールアドレスとパスワードが一致するか確認し、ログイン用のアクセストークンを発行する。

---

## エンドポイント

```http
POST /api/auth/login
```

---

## リクエスト

### ヘッダー

| 項目 | 値 |
|---|---|
| Content-Type | application/json |

---

### リクエストパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| email | String | ○ | ログインするユーザーのメールアドレス |
| password | String | ○ | アカウント登録時に作成したパスワード |

---

### リクエスト例

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## レスポンス

### 成功時

#### 200 OK

ユーザーのログインが完了し、アカウント情報が返される。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| email | String | 登録しているユーザーのメールアドレス |
| userName | String | 登録されているユーザーのニックネーム |
| userId | Integer | 登録されているユーザーID |
| createdAt | String | 登録日時 |
| workspaces | Array | ユーザーが参加しているワークスペース一覧 |
| - workspaceId | Integer | ワークスペースID |
| - workspaceName | String | ワークスペース名 |
| - type | String | 種別（PERSONAL / GROUP） |
| - role | String | ワークスペース内権限（ADMIN / MEMBER） |
| accessToken | String | 認証が必要なAPIを使用する際に利用するトークン |

---

### レスポンス例

```json
{
  "email": "user@example.com",
  "userName": "user1",
  "userId": 1,
  "createdAt": "2026-05-14T10:00:00Z",
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
    }
  ],
  "accessToken": "access_token_sample"
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

メールアドレスまたはパスワードが入力されていない場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "BAD_REQUEST",
  "message": "メールアドレスとパスワードを入力してください。"
}
```

---
### 401 Unauthorized

パスワードが誤っている場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "UNAUTHORIZED",
  "message": "メールアドレスまたはパスワードが正しくありません。"
}
```

---
### 404 Not Found

入力されたメールアドレスのアカウントが存在しない場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "USER_NOT_FOUND",
  "message": "アカウントが存在しません。"
}
```

---
### 422 Unprocessable Entity

入力されたパスワードに対してバリデーションエラーが発生した場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "VALIDATION_ERROR",
  "message": "入力内容に誤りがあります。"
}
```

---
