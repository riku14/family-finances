# ユーザ情報取得API

## 概要
保存されているログインユーザーの情報を取得する。

---

## エンドポイント

```http
GET /api/users/me
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

ユーザー情報の取得が完了した場合に返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| email | String | 取得したユーザーのメールアドレス |
| userName | String | 取得したユーザーのニックネーム |
| userId | Integer | 取得したユーザーID |

---

### レスポンス例

```json
{
  "email": "user@example.com",
  "userName": "user1",
  "userId": 1
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
