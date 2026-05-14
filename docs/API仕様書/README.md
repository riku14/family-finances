# API 仕様書

family-finances の REST API 一覧です。

## ベースURL

```
/api
```

## 認証

認証が必要なAPIは `Authorization: Bearer {token}` ヘッダーを付与してください。  
トークンはログインまたはユーザー登録のレスポンスから取得できます。

---

## API 一覧

### 認証 (`auth/`)

| API名 | メソッド | エンドポイント | 認証 |
|---|---|---|:---:|
| [ユーザー登録](auth/ユーザ登録API.md) | POST | `/api/users` | 不要 |
| [ログイン](auth/ログインAPI.md) | POST | `/api/auth/login` | 不要 |
| [ログアウト](auth/ログアウトAPI.md) | POST | `/api/auth/logout` | 必要 |
| [パスワードリセット](auth/パスワードリセットAPI.md) | POST | `/api/auth/password-reset` | 不要 |

---

### ユーザー (`user/`)

| API名 | メソッド | エンドポイント | 認証 |
|---|---|---|:---:|
| [ユーザー情報取得](user/ユーザ情報取得API.md) | GET | `/api/users/me` | 必要 |
| [プロフィール更新](user/プロフィール更新API.md) | PUT | `/api/users/me` | 必要 |

---

### ワークスペース (`workspace/`)

| API名 | メソッド | エンドポイント | 認証 |
|---|---|---|:---:|
| [ワークスペース一覧取得](workspace/ワークスペース一覧取得API.md) | GET | `/api/workspaces` | 必要 |
| [ワークスペース作成](workspace/ワークスペース作成API.md) | POST | `/api/workspaces` | 必要 |
| [ワークスペース参加](workspace/ワークスペース参加API.md) | POST | `/api/workspaces/join` | 必要 |
| [ワークスペース招待](workspace/ワークスペース招待API.md) | POST | `/api/workspaces/{workspaceId}/invite` | 必要 |

---

### 収支 (`transaction/`)

| API名 | メソッド | エンドポイント | 認証 |
|---|---|---|:---:|
| [収支履歴取得](transaction/収支履歴取得API.md) | GET | `/api/workspaces/{workspaceId}/transactions` | 必要 |
| [収支登録](transaction/収支登録API.md) | POST | `/api/workspaces/{workspaceId}/transactions` | 必要 |
| [収支編集](transaction/収支編集API.md) | PUT | `/api/workspaces/{workspaceId}/transactions/{transactionId}` | 必要 |
| [収支削除](transaction/収支削除API.md) | DELETE | `/api/workspaces/{workspaceId}/transactions/{transactionId}` | 必要 |

---

### カテゴリ (`category/`)

| API名 | メソッド | エンドポイント | 認証 |
|---|---|---|:---:|
| [カテゴリ一覧取得](category/カテゴリ一覧取得API.md) | GET | `/api/workspaces/{workspaceId}/categories` | 必要 |
| [カテゴリ作成](category/カテゴリ作成API.md) | POST | `/api/workspaces/{workspaceId}/categories` | 必要 |
| [カテゴリ編集](category/カテゴリ編集API.md) | PUT | `/api/workspaces/{workspaceId}/categories/{categoryId}` | 必要 |
| [カテゴリ削除](category/カテゴリ削除API.md) | DELETE | `/api/workspaces/{workspaceId}/categories/{categoryId}` | 必要 |

---

## 共通エラーレスポンス

全APIで共通のエラーレスポンス形式を使用します。

```json
{
  "errorCode": "ERROR_CODE",
  "message": "エラーメッセージ"
}
```

| ステータスコード | 説明 |
|---|---|
| 400 Bad Request | リクエストパラメータが不正 |
| 401 Unauthorized | 認証エラー（トークン未指定・期限切れ） |
| 403 Forbidden | 権限なし |
| 404 Not Found | リソースが存在しない |
| 409 Conflict | データの重複 |
| 422 Unprocessable Entity | バリデーションエラー |
