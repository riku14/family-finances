# ワークスペース作成API

## 概要
グループワークスペースを作成する。作成者はワークスペースの管理者となる。
個人ワークスペースはユーザー登録時に自動生成されるため、本APIではGROUPタイプのみ作成可能。

---

## エンドポイント

```http
POST /api/workspaces
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
| name | String | 任意 | ワークスペース名。未入力の場合は `Group` をデフォルト名とする。 |

---

### リクエスト例

```json
{
  "name": "開発チーム"
}
```

---

## レスポンス

### 成功時

#### 201 Created

ワークスペースを作成できた場合に返す。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| workspaceId | Integer | 自動採番されたワークスペースID |
| workspaceName | String | 作成されたワークスペース名 |
| type | String | ワークスペース種別（GROUP） |
| members | Array | ワークスペースのメンバー一覧。ID順で格納する。 |
| - userId | Integer | ユーザーID |
| - userName | String | ユーザー名 |
| - role | String | ワークスペース内権限（ADMIN / MEMBER） |

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
### 422 Unprocessable Entity

入力されたワークスペース名に対してバリデーションエラーが発生した場合に返す。

---

### エラーレスポンス例

```json
{
  "errorCode": "VALIDATION_ERROR",
  "message": "入力内容に誤りがあります。"
}
```

---
