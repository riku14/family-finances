# 収支削除API

## 概要
収支データを削除する。バックエンドでは論理削除（deletedAtフラグ）として扱う。

---

## エンドポイント

```http
DELETE /api/workspaces/{workspaceId}/transactions/{transactionId}
```

---

## リクエスト

### ヘッダー

| 項目 | 値 |
|---|---|
| Authorization | Bearer {token} |

---

### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| workspaceId | Integer | ○ | 対象ワークスペースのID |
| transactionId | Integer | ○ | 削除対象の収支ID |

---

### リクエスト例

```http
DELETE /api/workspaces/10/transactions/100
```

---

## レスポンス

### 成功時

#### 204 No Content

削除に成功した場合に返却する。レスポンスボディはなし。

---

## エラー

### 401 Unauthorized

認証エラー時に返却する。

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

### 404 Not Found

指定した収支データが存在しない、または既に削除済みの場合に返却する。

---

### エラーレスポンス例

```json
{
  "errorCode": "NOT_FOUND",
  "message": "指定された収支データが見つかりません。"
}
```
