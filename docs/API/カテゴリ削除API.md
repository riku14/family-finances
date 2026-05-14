# カテゴリ削除API

## 概要
使用しなくなったカテゴリを削除する。バックエンドでは論理削除（deletedAtフラグ）として扱う。

---

## エンドポイント

```http
DELETE /api/workspaces/{workspaceId}/categories/{categoryId}
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
| categoryId | Integer | ○ | 削除対象のカテゴリID |

---

### リクエスト例

```http
DELETE /api/workspaces/10/categories/1
```

---

## レスポンス

### 成功時

#### 204 No Content

論理削除に成功した場合に返却する。レスポンスボディはなし。

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

指定したカテゴリが存在しない、または既に削除済みの場合に返却する。

---

### エラーレスポンス例

```json
{
  "errorCode": "NOT_FOUND",
  "message": "指定されたカテゴリが見つかりません。"
}
```

---

### 409 Conflict

該当カテゴリに紐づく収支データが存在し削除できない場合に返却する。（運用方針によっては不要）

---

### エラーレスポンス例

```json
{
  "errorCode": "CONFLICT",
  "message": "このカテゴリは収支データで使用されているため削除できません。"
}
```
