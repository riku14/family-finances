# パスワードリセットAPI

## 概要
ユーザーが入力した新しいパスワードで、現在のパスワードを上書きする。

---

## エンドポイント

```http
PATCH /api/users/me/password
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
| currentPassword | String | ○ | 入力された現在のパスワード |
| newPassword | String | ○ | 入力された新しいパスワード |

---

### リクエスト例

```json
{
  "currentPassword": "currentPassword123",
  "newPassword": "newPassword123"
}
```

---

## レスポンス

### 成功時

#### 200 OK

パスワードの変更が完了した場合に返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| message | String | パスワード変更が完了した旨を示すメッセージ |

---

### レスポンス例

```json
{
  "message": "パスワードの変更が完了しました。"
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

現在のパスワードまたは新しいパスワードのどちらかが入力されていない場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "BAD_REQUEST",
  "message": "現在のパスワードと新しいパスワードを入力してください。"
}
```

---
### 401 Unauthorized

トークンが一致しなかった場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "UNAUTHORIZED",
  "message": "認証に失敗しました。"
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
