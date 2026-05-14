# グループ作成API

## 概要
グループを作成する。作成者は作成したグループの管理者となる。

---

## エンドポイント

```http
POST /api/groups
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
| groupName | String | 任意 | 入力された場合はその値をグループ名とする。未入力の場合は `Group` をデフォルトのグループ名とする。 |

---

### リクエスト例

```json
{
  "groupName": "開発チーム"
}
```

---

## レスポンス

### 成功時

#### 201 Created

グループを作成できた場合に返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| groupName | String | 作成されたグループ名 |
| groupId | Integer | 自動採番されたグループID。ユーザー管理APIで利用する。 |
| workspaceId | Integer | 自動採番されたワークスペースID。収支管理で利用する。 |
| groupMember | Array | グループに所属しているメンバー一覧。ID順で格納する。 |

---

### レスポンス例

```json
{
  "groupName": "開発チーム",
  "groupId": 1,
  "workspaceId": 10,
  "groupMember": [
    {
      "userId": 1,
      "userName": "user1",
      "role": "ADMIN"
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
### 422 Unprocessable Entity

入力されたグループ名に対してバリデーションエラーが発生した場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "VALIDATION_ERROR",
  "message": "入力内容に誤りがあります。"
}
```

---
