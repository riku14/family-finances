# 集計API

## 概要
指定した月のカテゴリ別合計など、集計結果を取得する。月単位での収入合計・支出合計・カテゴリ別内訳を返す。

---

## エンドポイント

```http
GET /api/workspaces/{workspaceId}/summary
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

---

### クエリパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| yearMonth | String | ○ | 集計対象の年月（YYYY-MM形式） |

---

### リクエスト例

```http
GET /api/workspaces/10/summary?yearMonth=2026-05
```

---

## レスポンス

### 成功時

#### 200 OK

集計に成功した場合に返却する。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| yearMonth | String | 対象年月 |
| totalIncome | Integer | 収入合計 |
| totalExpense | Integer | 支出合計 |
| balance | Integer | 差引（収入 - 支出） |
| categorySummaries | Array | カテゴリ別集計の配列 |
| categorySummaries[].categoryId | Integer | カテゴリID |
| categorySummaries[].categoryName | String | カテゴリ名 |
| categorySummaries[].type | String | 種別 |
| categorySummaries[].totalAmount | Integer | カテゴリ別合計金額 |
| categorySummaries[].count | Integer | 該当件数 |

---

### レスポンス例

```json
{
  "yearMonth": "2026-05",
  "totalIncome": 300000,
  "totalExpense": 185000,
  "balance": 115000,
  "categorySummaries": [
    {
      "categoryId": 1,
      "categoryName": "食費",
      "type": "expense",
      "totalAmount": 45000,
      "count": 28
    },
    {
      "categoryId": 2,
      "categoryName": "交通費",
      "type": "expense",
      "totalAmount": 12000,
      "count": 15
    },
    {
      "categoryId": 10,
      "categoryName": "給与",
      "type": "income",
      "totalAmount": 300000,
      "count": 1
    }
  ]
}
```

---

## エラー

### 400 Bad Request

yearMonthの形式が不正、または未指定の場合に返却する。

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
  "errorCode": "INVALID_PARAMETER",
  "message": "yearMonthはYYYY-MM形式で指定してください。"
}
```

---

### 401 Unauthorized

認証エラー時に返却する。

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

指定したワークスペースが存在しない場合に返却する。

---

### エラーレスポンス例

```json
{
  "errorCode": "NOT_FOUND",
  "message": "指定されたワークスペースが見つかりません。"
}
```
