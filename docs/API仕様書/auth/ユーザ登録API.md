# ユーザ登録API

## 概要
メールアドレス・パスワード・ニックネームを受け取り、新規アカウントを作成する。
登録完了後は自動的にログイン状態となり、アクセストークンを返す。
登録時に個人ワークスペースを自動生成する。

---

## エンドポイント

```http
POST /api/users
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
| email | String | ○ | 登録するメールアドレス |
| password | String | ○ | 登録するパスワード |
| userName | String | 任意 | ニックネーム。未入力の場合はメールアドレスを表示名として使用する。 |

---

### リクエスト例

```json
{
  "email": "user@example.com",
  "password": "password123",
  "userName": "user1"
}
```

---

## レスポンス

### 成功時

#### 201 Created

アカウントの作成が完了した場合に返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| email | String | 登録したメールアドレス |
| userName | String | 登録したニックネーム。未入力の場合はメールアドレスが設定される。 |
| userId | Integer | 採番されたユーザーID |
| createdAt | String | 登録日時 |
| workspaces | Array | 登録時に自動生成された個人ワークスペース |
| -  workspaceId | Integer | ワークスペースID |
| -  workspaceName | String | ワークスペース名 |
| -  type | String | 種別（PERSONAL） |
| -  role | String | ワークスペース内権限（ADMIN） |
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
### 409 Conflict

入力されたメールアドレスが既に登録済みの場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "ALREADY_EXISTS",
  "message": "このメールアドレスは既に登録されています。"
}
```

---
### 422 Unprocessable Entity

入力内容がバリデーションエラーとなった場合に返す（メールアドレス形式不正、パスワード要件未充足など）。

---

### エラーレスポンス例

```json
{
  "errorCode": "VALIDATION_ERROR",
  "message": "入力内容に誤りがあります。"
}
```

---
